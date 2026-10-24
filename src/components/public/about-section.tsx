'use client';

import { optimizeImageUrl } from '@/lib/image-url';
import React from 'react';
import type { SiteContent } from '@/types';
import Image from 'next/image';
import { Reveal, TextReveal } from '@/components/motion/reveal';

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
    <section id="about" className="relative overflow-hidden bg-secondary py-24 md:py-32">

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <Reveal className="mb-3 block text-sm font-semibold text-primary sm:text-base">
              Who we are
            </Reveal>
            <TextReveal
              as="h2"
              text="About Us"
              className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
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
                <div key={s.label} className="rounded-2xl bg-background p-4">
                  <div className="font-headline text-2xl font-extrabold text-primary sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal direction="left" className="mx-auto w-full max-w-sm md:max-w-none">
            <div className="overflow-hidden rounded-[2rem] bg-background">
              <Image
                src={optimizeImageUrl(content?.aboutImageUrl, 1000) || '/pk_about_visual.webp'}
                alt="About PK Creative"
                width={520}
                height={520}
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
