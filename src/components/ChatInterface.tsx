"use client";
import { useState, useRef, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";
import { 
  Wallet, 
  SendHorizontal, 
  Bot, 
  ChevronDown,
  Loader2
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sender: "user" | "assistant";
  timestamp?: Date;
}

interface TransactionDetails {
  amount: string;
  recipient: string;
  hash: string;
}

export default function ChatInterface() {
  const { user } = usePrivy();
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(true);
  const [showTransactionPreview, setShowTransactionPreview] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<TransactionDetails | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      const chat = chatEndRef.current;
      chat.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history
  useEffect(() => {
    const loadMessages = async () => {
      if (!params?.chatId) return;
      
      try {
        const response = await fetch(`/api/chat?chatId=${params.chatId}`);
        if (!response.ok) throw new Error('Failed to load chat history');
        
        const data = await response.json();
        const formattedMessages = data.map((msg: any) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp || Date.now())
        }));
        
        setMessages(formattedMessages);
      } catch (error) {
        toast.error('Unable to load chat history');
      } finally {
        setLoadingChat(false);
      }
    };
    loadMessages();
  }, [params?.chatId]);

  // Auto-resize input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user?.id) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userId: user.id,
          chatId: params?.chatId,
          isFirstMessage: messages.length === 0
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Stream not available');

      const aiMessage: Message = {
        role: 'assistant',
        content: '',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const content = line.slice(6);
            if (content === '[DONE]') continue;

            try {
              const parsed = JSON.parse(content);
              
              // Handle transaction data
              if (parsed.tool === 'cryptoTransfer') {
                setPendingTransaction({
                  amount: parsed.parameters.amount,
                  recipient: parsed.parameters.to,
                  hash: parsed.parameters.txHash || 'Pending...'
                });
                setShowTransactionPreview(true);
              }

              setMessages(prev => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg.sender === 'assistant') {
                  lastMsg.content += parsed.content || '';
                }
                return updated;
              });
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          }
        }
      }
    } catch (error) {
      toast.error('Message failed to send');
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-blue-400" />
            <span className="font-medium">ChainMate Assistant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Wallet className="w-4 h-4" />
            <span>Connected: {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loadingChat ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
            <Bot className="w-12 h-12 text-gray-600" />
            <p>Start your conversation with ChainMate</p>
            <div className="text-sm">Try asking about:</div>
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {["Check balance", "Send tokens", "Track transaction", "Market info"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 bg-gray-800/50 rounded-full text-sm hover:bg-gray-800 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-blue-500/20' : 'bg-gray-800/60'} 
                rounded-2xl p-4 backdrop-blur-sm border ${message.sender === 'user' ? 'border-blue-500/20' : 'border-gray-700'}`}
              >
                <ReactMarkdown
                  className="text-sm prose prose-invert max-w-none"
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    a: ({ children, href }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 transition-colors">
                        {children}
                      </a>
                    )
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                {message.timestamp && (
                  <div className="text-xs text-gray-500 mt-2">
                    {formatTime(new Date(message.timestamp))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Transaction Preview */}
      {showTransactionPreview && pendingTransaction && (
        <div className="mx-4 mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-400">Transaction Preview</h3>
            <button 
              onClick={() => setShowTransactionPreview(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <p>Amount: {pendingTransaction.amount} ETH</p>
            <p>To: {pendingTransaction.recipient.slice(0, 6)}...{pendingTransaction.recipient.slice(-4)}</p>
            <p>Status: {pendingTransaction.hash === 'Pending...' ? 
              <span className="text-yellow-400">Pending</span> : 
              <span className="text-green-400">Confirmed</span>
            }</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-black/40 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="max-w-screen-xl mx-auto">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 focus-within:border-blue-500/50 transition-colors">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Message ChainMate..."
                className="w-full p-3 bg-transparent resize-none text-white placeholder-gray-500 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <SendHorizontal className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}