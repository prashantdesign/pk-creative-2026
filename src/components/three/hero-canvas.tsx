'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// three + r3f are only pulled when this actually mounts (desktop, motion allowed)
const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false });

/**
 * Decides whether the WebGL hero is worth loading:
 *  - fine pointer + viewport >= 1024px
 *  - prefers-reduced-motion not set
 *  - pauses the render loop when scrolled out of view
 * Otherwise renders a lightweight CSS gradient orb so layout never shifts.
 */
export default function HeroCanvas({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const okViewport = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (okViewport && !reduced) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !wrap.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div ref={wrap} className={className}>
      {/* CSS fallback / backdrop — always present */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#a78bfa,transparent_60%)] blur-2xl opacity-70 dark:opacity-60" />
        <div className="absolute left-[55%] top-[45%] h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_60%_60%,#7c3aed,transparent_65%)] blur-3xl opacity-60" />
      </motion.div>

      {enabled && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <HeroScene active={inView} />
        </motion.div>
      )}
    </div>
  );
}
