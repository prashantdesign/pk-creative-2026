'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  /** How far the element is pulled toward the cursor (px at edge). */
  strength?: number;
  className?: string;
}

/**
 * Pointer-attraction wrapper. Desktop pointers only; no-op for touch / reduced motion.
 * Wrap buttons, nav links, icons.
 */
export default function Magnetic({ children, strength = 18, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({
      x: (relX / (rect.width / 2)) * strength,
      y: (relY / (rect.height / 2)) * strength,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
