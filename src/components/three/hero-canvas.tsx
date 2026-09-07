'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type SceneModule = typeof import('./hero-scene');

/** Isolates any WebGL failure so it can never blank the page. */
class SceneBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    if (process.env.NODE_ENV === 'development') console.warn('HeroScene disabled:', err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Decides whether the WebGL hero is worth loading:
 *  - fine pointer + viewport >= 1024px
 *  - prefers-reduced-motion not set
 *  - pauses the render loop when scrolled out of view
 *
 * three/r3f are imported imperatively AFTER mount so the server and the first
 * client render produce an identical tree (no next/dynamic id desync), and the
 * heavy bundle never touches the critical path. A CSS gradient orb stands in
 * everywhere else so layout never shifts.
 */
export default function HeroCanvas({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<SceneModule['default'] | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const okViewport = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!okViewport || reduced) return;
    setEnabled(true);
    let cancelled = false;
    import('./hero-scene')
      .then((m) => {
        if (!cancelled) setScene(() => m.default);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!enabled || !wrap.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '120px',
    });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div ref={wrap} className={className}>
      {/* Animated CSS orb — a finished visual on its own; dims once WebGL paints */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 transition-opacity duration-1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: Scene ? 0.4 : 1 }}
      >
        <div className="absolute left-1/2 top-1/2 aspect-square w-[62%] max-w-[520px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#6d28d9,#c4b5fd,#7c3aed,#8b5cf6)] opacity-70 blur-2xl" />
          <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#c4b5fd,#5b21b6_60%,#2e1065)] shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.45)] animate-float" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_70%,transparent_55%,rgba(124,58,237,0.35))]" />
        </div>
      </motion.div>

      {Scene && (
        <SceneBoundary>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Scene active={inView} />
          </motion.div>
        </SceneBoundary>
      )}
    </div>
  );
}
