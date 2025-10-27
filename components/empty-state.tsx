'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl border border-white/30 text-center">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="inline-block p-6 bg-white/20 rounded-full mb-6"
        >
          <Search className="text-white" size={64} />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Welcome to Weather Dashboard
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 mb-2">
          Search for any city to get started
        </p>
        
        <p className="text-sm text-white/60">
          Try searching for &quot;London&quot;, &quot;New York&quot;, or &quot;Tokyo&quot;
        </p>
      </div>
    </motion.div>
  );
}
