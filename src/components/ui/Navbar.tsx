import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { Wallet, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateChatId } from "../../lib/utils";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export function Navbar({ 
  homeSectionRef,
  whySectionRef 
}: { 
  homeSectionRef: React.RefObject<HTMLDivElement | null>;
  whySectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();
  const { user, authenticated, login, ready } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  const handleStartChat = async () => {
    if (!user?.id) {
      toast.error('Please connect your wallet to start chatting');
      return;
    }
    
    const chatId = generateChatId();

    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId,
          userId: user.id,
          title: chatId
        })
      });

      if (!response.ok) throw new Error('Failed to create chat session');

      router.push(`/chat/${chatId}`);
      toast.success('Chat session initialized!');
    } catch (error) {
      toast.error('Unable to start chat session');
      console.error('Chat creation error:', error);
    }
  };

  const scrollToHome = () => {
    homeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWhy = () => {
    whySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (authenticated && user?.id) {
      toast.success('Wallet connected successfully!', {
        id: 'auth-success',
        duration: 2000
      });

      fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          did: user.id,
          email: user?.email?.address || null,
        }),
      })
      .then(response => response.json())
      .then(data => console.log('User profile synced:', data))
      .catch(err => console.error('Profile sync failed:', err));
    }
  }, [authenticated, user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto">
        <div className="backdrop-blur-lg bg-black/40 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo Section */}
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={scrollToHome}
              >
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                  <Wallet className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-white text-xl font-semibold tracking-wide">
                  Chain<span className="text-blue-400">Mate</span>
                </div>
              </div>

              {/* Navigation & Actions */}
              <div className="flex items-center gap-6">
                <button 
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm transition-colors"
                  onClick={scrollToWhy}
                >
                  Features
                </button>
                
                <a 
                  href="https://docs.chainmate.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm transition-colors"
                >
                  Docs
                </a>

                {authenticated ? (
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm truncate max-w-[180px]">
                      {user?.email?.address || user?.wallet?.address}
                    </span>
                    <button
                      onClick={handleStartChat}
                      className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm border border-blue-500/20 hover:border-blue-500/40 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Start Chat</span>
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={disableLogin}
                    onClick={login}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-all"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}