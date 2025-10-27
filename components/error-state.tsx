'use client';

import { motion } from 'framer-motion';
import { CloudOff, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="inline-block p-6 bg-red-500/20 rounded-full mb-6"
        >
          <CloudOff className="text-white" size={64} />
        </motion.div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-lg text-white/80 mb-8">
          {error}
        </p>
        
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-8 py-3 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-xl 
                     flex items-center gap-2 mx-auto transition-all duration-200 shadow-lg"
          >
            <RefreshCw size={20} />
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
