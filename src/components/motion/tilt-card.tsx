'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees. */
  max?: number;
  /** Adds a moving glare highlight. */
  glare?: boolean;
  children: React.ReactNode;
}

/**
 * Lightweight 3D hover tilt using CSS perspective transforms (no WebGL).
 * Falls back to a static card for touch / reduced motion.
 */
export default function TiltCard({
  max = 8,
  glare = true,
  className,
  children,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const onLeave = () => setT((s) => ({ ...s, rx: 0, ry: 0, active: false }));

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('relative [transform-style:preserve-3d]', className)}
      style={{ perspective: 900 }}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.5 }}
      {...(rest as any)}
    >
      {children}
      {glare && !reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: t.active ? 1 : 0,
            background: `radial-gradient(600px circle at ${t.gx}% ${t.gy}%, hsl(var(--primary) / 0.15), transparent 40%)`,
          }}
        />
      )}
    </motion.div>
  );
}
