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
        'mb-12 md:mb-20',
        centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left',
        className
      )}
    >
      {eyebrow && (
        <Reveal
          className={cn(
            'mb-3 block text-sm font-semibold text-primary sm:text-base',
            centered && 'mx-auto'
          )}
        >
          {eyebrow}
        </Reveal>
      )}
      {title && (
        <TextReveal
          as="h2"
          text={title}
          className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        />
      )}
      {description && (
        <Reveal
          as="p"
          delay={0.1}
          className={cn(
            'mt-5 text-lg leading-snug text-muted-foreground sm:text-xl md:text-2xl',
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
