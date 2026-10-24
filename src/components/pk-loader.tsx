"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const sizes = { sm: 56, md: 96, lg: 144 } as const;

/**
 * Branded PK Creative loader: a PK monogram inside a spinning gradient ring with an orbiting
 * dot, a breathing glow and animated dots. Used for route changes, sections and admin screens.
 */
export default function PKLoader({
  size = 'md',
  label,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const px = sizes[size];
  const spin = (duration: number, reverse = false) =>
    reduced ? {} : { rotate: reverse ? -360 : 360, transition: { duration, repeat: Infinity, ease: 'linear' as const } };

  return (
    <div role="status" aria-live="polite" className={cn('flex flex-col items-center justify-center gap-4 p-8', className)}>
      <div className="relative" style={{ width: px, height: px }}>
        {/* breathing glow */}
        <motion.div
          aria-hidden
          className="absolute -inset-4 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.35),transparent)]"
          animate={reduced ? {} : { scale: [0.9, 1.15, 0.9], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* spinning gradient ring */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)) 200deg, #38bdf8 320deg, transparent 360deg)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))',
          }}
          animate={spin(1.4)}
        />
        {/* counter-rotating orbit with dot */}
        <motion.div aria-hidden className="absolute inset-2" animate={spin(2.6, true)}>
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
        </motion.div>
        {/* monogram */}
        <motion.div
          className="absolute inset-[18%] flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#8b5cf6] font-headline font-extrabold tracking-tighter text-primary-foreground shadow-lg shadow-primary/40"
          style={{ fontSize: px * 0.26 }}
          animate={reduced ? {} : { scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          PK<span className="text-white/70">.</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span>{label ?? 'Loading'}</span>
        <span className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={reduced ? {} : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/** Fills a section-sized area while its data or code loads. */
export function PKSectionLoader({ label, minHeight = 320 }: { label?: string; minHeight?: number }) {
  return (
    <div className="flex w-full items-center justify-center" style={{ minHeight }}>
      <PKLoader label={label} />
    </div>
  );
}

/** Full-screen loader for route transitions. */
export function PKPageLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="animate-loader-in fixed inset-0 z-[70] flex items-center justify-center bg-background/95">
      <PKLoader size="lg" label={label} />
    </div>
  );
}
