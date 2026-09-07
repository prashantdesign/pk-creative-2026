'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Reveal, TextReveal } from '@/components/motion/reveal';

interface SectionHeaderProps {
  title?: string;
  description?: string;
  eyebrow?: string;
  align?: 'center' | 'left';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  eyebrow,
  align = 'center',
  className,
}) => {
  if (!title && !description && !eyebrow) return null;

  const centered = align === 'center';

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
        className
      )}
    >
      {eyebrow && (
        <Reveal
          className={cn(
            'mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary',
            centered && 'mx-auto'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </Reveal>
      )}
      {title && (
        <TextReveal
          as="h2"
          text={title}
          className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        />
      )}
      {description && (
        <Reveal
          as="p"
          delay={0.1}
          className={cn(
            'mt-4 text-base text-muted-foreground sm:text-lg',
            centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
