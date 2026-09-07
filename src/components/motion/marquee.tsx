'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds per loop. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee. Duplicates content for a seamless loop.
 * CSS-animation driven; honours the global `.no-animations` kill switch.
 */
export default function Marquee({
  children,
  speed = 32,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div className={cn('group relative flex w-full overflow-hidden', className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            'flex shrink-0 items-center gap-[var(--gap,3rem)] pr-[var(--gap,3rem)]',
            'motion-reduce:animate-none',
            pauseOnHover && 'group-hover:[animation-play-state:paused]'
          )}
          style={{
            animation: `marquee-x ${speed}s linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
