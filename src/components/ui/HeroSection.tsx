"use client";
import { motion } from "framer-motion";
import { Wallet, ArrowRight, MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <div className="h-screen relative bg-black overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Glowing orb effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl" />

      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4">
          {/* Main content */}
          <div className="flex flex-col items-center gap-8">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="flex items-center gap-3 bg-white/5 p-2 pr-6 rounded-2xl"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/80 font-medium">Meet your new crypto companion</span>
            </motion.div>

            {/* Main heading with typing effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <span className="block text-4xl md:text-6xl font-bold text-white mb-4">
                Crypto Made 
                <span className="relative mx-4">
                  Natural
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </span>
              </span>
              <span className="block text-4xl md:text-6xl font-bold text-white">
                Conversation Made Simple
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center text-gray-400 text-lg max-w-2xl"
            >
              Just chat naturally with ChainMate to manage your crypto. Send, receive, and track your assets 
              as easily as texting a friend.
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Start Chatting
                <MessageSquare className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="group flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Stats section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-8 mt-12 px-6 py-4 bg-white/5 rounded-2xl backdrop-blur-sm"
            >
              {[
                ["24/7", "AI Support"],
                ["100ms", "Response Time"],
                ["Base", "Blockchain"]
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}