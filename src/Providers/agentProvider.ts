import {
  AgentKit,
  CdpWalletProvider,
  wethActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  cdpApiActionProvider,
  cdpWalletActionProvider,
  pythActionProvider,
  basenameActionProvider,
} from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { NativeTransferSchema } from "@coinbase/agentkit/dist/action-providers/wallet/schemas";

dotenv.config();
const prisma = new PrismaClient();

function validateEnvironment(): void {
  const requiredVars = [
    "OPENAI_API_KEY",
    "CDP_API_KEY_NAME",
    "CDP_API_KEY_PRIVATE_KEY",
  ];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error("Missing environment variables:", missingVars.join(", "));
    process.exit(1);
  }

  if (!process.env.NETWORK_ID) {
    console.warn("NETWORK_ID not set, using base-sepolia");
  }
}

export async function initializeAgent({ userId }: { userId: string }) {
  validateEnvironment();

  try {
    // Check for existing wallet first
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletId: true, seed: true, networkId: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    console.log("Existing wallet data:", user);

    const apiKeyName = process.env.CDP_API_KEY_NAME!;
    const apiKeyPrivateKey = process.env.CDP_API_KEY_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    );
    const networkId = process.env.NETWORK_ID || "base-sepolia";

    // Construct config with wallet details if available
    const config = {
      apiKeyName: process.env.CDP_API_KEY_NAME!,
      apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!.replace(
        /\\n/g,
        "\n"
      ),
      networkId: process.env.NETWORK_ID || "base-sepolia",
      cdpWalletData: user.walletId
        ? JSON.stringify({
          walletId: user.walletId,
          seed: user.seed,
          networkId: user.networkId,
        })
        : undefined,
    };

    console.log("Config:", config);

    // Create or restore wallet
    const walletProvider = await CdpWalletProvider.configureWithWallet(config);

    // Persist new wallet if created (only if walletId doesn't exist)
    if (!user?.walletId) {
      const newWallet = await walletProvider.exportWallet();

      await prisma.user.update({
        where: { id: userId },
        data: {
          walletId: newWallet.walletId,
          networkId: newWallet.networkId,
          seed: newWallet.seed,
        },
      });
      console.log("Persisted new wallet:", newWallet);
    }
    const walletAddress = await walletProvider.getAddress();
    console.log("Wallet address:", walletAddress);

    // Initialize AgentKit
    const agentKit = await AgentKit.from({
      walletProvider,
      actionProviders: [
        wethActionProvider(),
        pythActionProvider(),
        walletActionProvider(),
        erc20ActionProvider(),
        basenameActionProvider(),
        cdpApiActionProvider({
          apiKeyName: process.env.CDP_API_KEY_NAME!,
          apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!.replace(
            /\\n/g,
            "\n"
          ),
        }),
        cdpWalletActionProvider({
          apiKeyName: process.env.CDP_API_KEY_NAME!,
          apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!.replace(
            /\\n/g,
            "\n"
          ),
        }),
      ],
    });

    const tools = await getLangChainTools(agentKit);
    // tools.forEach((tool) => {
    //   console.log(tool.name);
    //   console.log(tool.description);
    //   console.log(tool.responseFormat);
    //   // console.log(tool);
    // });
    const memory = new MemorySaver();

    return createReactAgent({
      llm: new ChatOpenAI({ model: "gpt-4o-mini" }),
      tools,
      checkpointSaver: memory,
      messageModifier: `
          You are a helpful onchain agent using the Coinbase Developer Platform.
          I'll provide you with an array of tools, if the tool you used to answer the user's question is present in the arrays, respond with a json in this exact format, along with all the arguements/parameters with there values, take for reference the example of making a transfer:
          {
            tool: "nativeTransfer",
            your_summary: "response_to_user",
            parameters: {
              amount: "0.0001",
              to: "0x29d0192B5cad82914331d946E9E1c526A7D35390",
              txHash: "0x0cfb802319ad915738defae0f3430b52a9bcceaf14a0fa6ba014ca2a4d3a6bc0" //the native transfer function returns the tx hash, so use that as the txHash parameter,
            },
          }

          NOTE: the number of parameters is not fixed, it depends on the tool used, so make sure to include all the parameters for the tool used accordingly.
          make sure the json is in valid format to be easily parsed and the keys are in lowercase as well as not surrounded by quotes.
          For queries like "what is my wallet address?" or "what is my balance?" respond with a simple plain text message, in which you can use markdown syntax if needed.
          Like this for example:
          "Your wallet address is 0x29d0192B5cad82914331d946E9E1c526A7D35390"
          "Your balance is 0.0001 ETH"
          ...other info available via the tool you used. but in normal conversation format.

          Never send duplicate responses. Also, when sending JSON, make sure to send it in the exact format as shown in the example.
          Important rules:
  - Use double quotes for ALL keys and string values
  - Never use markdown or backticks
  - Include ALL transaction parameters
  - For non-tool responses, use plain text without JSON
        `,
    });



  } catch (error: any) {
    console.error("Agent initialization failed:", error);

    if (error.code === "P2002") {
      console.error("Wallet conflict detected");
      throw new Error("Wallet already exists for another user");
    }

    throw error;
  }
}
