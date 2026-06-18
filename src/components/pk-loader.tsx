"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function PKLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scaleMap = {
    sm: 0.5,
    md: 1,
    lg: 1.5,
  };
  const scale = scaleMap[size];

  return (
    <div className="flex items-center justify-center p-8" style={{ transform: `scale(${scale})` }}>
      <motion.div
        className="relative flex items-center justify-center overflow-hidden bg-gradient-to-tr from-primary to-primary/60 shadow-lg shadow-primary/30"
        initial={{ width: 48, height: 48, borderRadius: "50%" }}
        animate={{ 
          width: ["48px", "160px", "48px"],
          borderRadius: ["50%", "24px", "50%"]
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <motion.span
          className="absolute whitespace-nowrap text-primary-foreground font-headline font-bold text-lg tracking-wider"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          PK Creative
        </motion.span>
        
        {/* Inner pulsing core when it's a ball */}
        <motion.div 
          className="w-3 h-3 bg-primary-foreground rounded-full"
          animate={{
            scale: [1, 0, 1],
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}
