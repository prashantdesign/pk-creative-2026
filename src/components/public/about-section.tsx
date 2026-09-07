'use client';

import React from 'react';
import type { SiteContent } from '@/types';
import Image from 'next/image';
import { Reveal, TextReveal } from '@/components/motion/reveal';
import TiltCard from '@/components/motion/tilt-card';

const FALLBACK_STATS = [
  { value: '120+', label: 'Projects shipped' },
  { value: '7+', label: 'Years in craft' },
  { value: '98%', label: 'Client retention' },
];

const AboutSection = ({ content }: { content: SiteContent | null }) => {
  const stats =
    (content as any)?.stats?.length
      ? ((content as any).stats as { value: string; label: string }[])
      : FALLBACK_STATS;

  return (
    <section id="about" className="relative overflow-hidden bg-secondary py-20 md:py-28">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-40" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Who we are
            </Reveal>
            <TextReveal
              as="h2"
              text="About Us"
              className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            />
            <Reveal
              as="p"
              delay={0.1}
              className="whitespace-pre-wrap text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {content?.aboutText ||
                'We are a passionate team of designers and engineers with a love for building beautiful, intuitive digital experiences that move brands forward.'}
            </Reveal>

            <Reveal delay={0.15} className="grid grid-cols-3 gap-4 pt-4">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="rounded-2xl border border-border/60 bg-background/60 p-4">
                  <div className="font-headline text-2xl font-extrabold text-primary sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal direction="left" className="mx-auto w-full max-w-sm md:max-w-none">
            <TiltCard
              max={9}
              className="overflow-hidden rounded-3xl border border-border/50 bg-background shadow-xl"
            >
              <Image
                src={content?.aboutImageUrl || '/pk_about_visual.png'}
                alt="About PK Creative"
                width={520}
                height={520}
                className="h-auto w-full object-contain"
              />
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
