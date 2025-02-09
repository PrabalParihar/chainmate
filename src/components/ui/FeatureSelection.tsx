import { motion } from "framer-motion";
import {
  IconRobot,
  IconDeviceMobile,
  IconLock,
  IconBrandDiscord
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  return (
    <div className="w-full px-4 py-8">
      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* AI Assistant Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-900/20 to-transparent p-6 rounded-2xl border border-blue-800/30 hover:border-blue-600/50 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-900/30 rounded-lg">
              <IconRobot className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Smart AI Assistant</h3>
              <p className="text-gray-400 leading-relaxed">
                Meet your personal crypto companion that understands natural commands. 
                
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-purple-900/20 to-transparent p-6 rounded-2xl border border-purple-800/30 hover:border-purple-600/50 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-900/30 rounded-lg">
              <IconDeviceMobile className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Mobile-First Experience</h3>
              <p className="text-gray-400 leading-relaxed">
                Manage your crypto on the go. Instant notifications, quick actions, 
                and seamless mobile experience that feels native.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-green-900/20 to-transparent p-6 rounded-2xl border border-green-800/30 hover:border-green-600/50 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-900/30 rounded-lg">
              <IconLock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Bank-Grade Security</h3>
              <p className="text-gray-400 leading-relaxed">
                Your funds, your control. Multi-sig wallets, biometric authentication, 
                and real-time fraud detection keep you protected.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Community Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-pink-900/20 to-transparent p-6 rounded-2xl border border-pink-800/30 hover:border-pink-600/50 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-pink-900/30 rounded-lg">
              <IconBrandDiscord className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Vibrant Community</h3>
              <p className="text-gray-400 leading-relaxed">
                Join our growing community of crypto enthusiasts. Share tips, get help,
                and be part of the future of finance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      
    </div>
  );
}