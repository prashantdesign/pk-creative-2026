"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the preloader after a delay when the animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4 seconds total duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="flex items-center justify-center bg-primary text-primary-foreground font-bold overflow-hidden"
            initial={{ 
              width: 40, 
              height: 40, 
              borderRadius: "50%", 
              y: -100, 
              opacity: 0 
            }}
            animate={{ 
              y: [-100, 0, -30, 0, 0, 0],
              opacity: [0, 1, 1, 1, 1, 1],
              width: ["40px", "40px", "40px", "40px", "40px", "280px"], 
              height: ["40px", "40px", "40px", "40px", "40px", "60px"],
              borderRadius: ["50%", "50%", "50%", "50%", "50%", "30px"]
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.15, 0.25, 0.35, 0.5, 1], // Drop, bounce up, bounce down, wait, expand
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <motion.span
              className="text-xl md:text-2xl whitespace-nowrap tracking-wider font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{
                duration: 2.5,
                times: [0, 0.8, 1],
                ease: "easeOut",
                delay: 0.2
              }}
            >
              PK Creative
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
