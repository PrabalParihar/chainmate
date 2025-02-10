# ChainMate

ChainMate is your AI-powered crypto companion that makes digital finance feel natural. Send, receive, and manage crypto through simple conversations - as easy as chatting with a friend. Built on Base blockchain for security you can trust.

## ⚡ Features

- **Natural Language Interactions** - Chat naturally to manage your crypto
- **Base Integration** - Built on Base L2 for fast, low-cost transactions
- **Smart Transaction Management** - AI-powered transaction validation and processing
- **Real-time Updates** - Instant transaction status and portfolio updates
- **Enhanced Security** - Multi-layer security with Privy authentication

## 🛠️ Built With

- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Authentication**: Privy for Web3 auth
- **Blockchain**: Base (Ethereum L2)
- **AI**: Custom-trained language model for crypto interactions
- **State Management**: React Server Components + Custom hooks
- **Real-time Updates**: WebSocket integration

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chainmate.git
cd chainmate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_BASE_RPC_URL=your_base_rpc_url
NEXT_PUBLIC_AI_API_KEY=your_ai_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

1. Connect your wallet using Privy authentication
2. Start a new chat session
3. Use natural language to:
   - Send transactions: "Send 0.1 ETH to 0x..."
   - Check balances: "What's my current balance?"
   - Get market info: "How's ETH doing today?"
   - Monitor transactions: "Show my recent transactions"

## 🔒 Security

ChainMate implements several security measures:
- Multi-stage transaction verification
- Amount validation
- Address verification
- Rate limiting
- Suspicious activity monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Base blockchain for L2 infrastructure
- Privy for authentication services
- OpenAI for language model capabilities
- Ethereum community for continuous support

## 📧 Contact


Project Link: [https://github.com/PrabalParihar/chainmate](https://github.com/yourusername/chainmate)

---

Built with ❤️ for the Web3 community
