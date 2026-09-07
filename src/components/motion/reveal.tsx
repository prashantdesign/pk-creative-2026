'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof typeof motion;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Scroll-into-view reveal. Fades + slides a block on first view.
 * Collapses to a plain fade (or nothing) when reduced motion is requested.
 */
export function Reveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const from = reduced ? {} : offset[direction];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(rest as any)}
    >
      {children}
    </Comp>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  once?: boolean;
}

/**
 * Word-by-word mask reveal for headings. Each word rises from behind a clip.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  as = 'h2',
  once = true,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const Tag = as as any;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: '110%' },
    visible: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.5 }}
        className="inline"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
          >
            <motion.span variants={child} className={cn('inline-block', wordClassName)}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Shared stagger container + item for lists of cards. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
