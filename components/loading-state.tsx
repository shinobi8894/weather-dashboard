'use client';

import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSnow } from 'lucide-react';

const clouds = [Cloud, CloudRain, CloudSnow];

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 text-center">
        <div className="flex justify-center gap-4 mb-8">
          {clouds.map((CloudIcon, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              <CloudIcon className="text-white" size={48} />
            </motion.div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          Fetching Weather Data
        </h2>
        <p className="text-white/80">
          Please wait while we gather the forecast...
        </p>
      </div>
    </motion.div>
  );
}
