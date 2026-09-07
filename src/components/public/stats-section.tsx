'use client';
import React, { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '@/types';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: string, run: boolean) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!run) return;
    const match = target.match(/^(\D*)(\d[\d,.]*)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const [, prefix, numRaw, suffix] = match;
    const end = parseFloat(numRaw.replace(/,/g, ''));
    if (!isFinite(end)) {
      setDisplay(target);
      return;
    }
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(end * eased);
      setDisplay(`${prefix}${val.toLocaleString()}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return display;
}

function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const display = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-border/60 bg-background/50 p-6 text-center sm:p-8"
    >
      <p className="font-headline text-4xl font-extrabold text-gradient-primary sm:text-5xl">
        {display}
      </p>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{label}</p>
    </motion.div>
  );
}

const StatsSection = ({ content }: { content?: SiteContent | null }) => {
  if (!content?.stats || content.stats.length === 0) return null;

  return (
    <section id="stats" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {content.stats.map((stat, index) => (
            <Stat key={index} value={stat.value} label={stat.label} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
