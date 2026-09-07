'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from '@/components/motion/reveal';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/**
 * Shared banner for inner pages (About, Work, Team, Gallery, Contact).
 * Grid + aurora backdrop, word-reveal H1, consistent spacing.
 */
export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-secondary/10 py-16 sm:py-20 md:py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[360px] w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]"
      />

      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </motion.span>
        )}

        <TextReveal
          as="h1"
          text={title}
          once={false}
          className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
