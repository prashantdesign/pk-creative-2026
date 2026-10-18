'use client';
import React from 'react';
import { Sparkles } from 'lucide-react';
import Marquee from '@/components/motion/marquee';
import { SERVICE_LINKS } from '@/lib/seo';

/** Scrolling strip of service links under the hero: motion plus crawlable internal links. */
export default function ServiceStrip() {
  return (
    <section aria-label="Our services" className="relative border-y border-border/50 bg-secondary/30 py-5">
      <div
        className="[--gap:2rem]"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
      >
        <Marquee speed={40}>
          {SERVICE_LINKS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="flex items-center gap-8 whitespace-nowrap font-headline text-lg font-semibold text-foreground/70 transition-colors hover:text-primary sm:text-xl"
            >
              {s.label}
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
