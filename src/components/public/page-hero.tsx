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
    <section className="relative overflow-hidden bg-background pb-10 pt-16 sm:pb-14 sm:pt-24 md:pt-28">
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.28, 0.11, 0.32, 1] }}
            className="mb-4 block text-sm font-semibold text-primary sm:text-base"
          >
            {eyebrow}
          </motion.span>
        )}

        <TextReveal
          as="h1"
          text={title}
          once={false}
          className="font-headline text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.28, 0.11, 0.32, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-snug text-muted-foreground sm:text-xl md:text-2xl"
          >
            {description}
          </motion.p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
