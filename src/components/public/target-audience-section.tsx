'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Icons } from '@/components/icons';
import { Reveal } from '@/components/motion/reveal';
import Marquee from '@/components/motion/marquee';

const defaultAudience = [
  'Tech Startups',
  'E-commerce Brands',
  'Real Estate Agencies',
  'Healthcare Providers',
  'Creative Professionals',
  'SaaS Platforms',
  'Local Businesses',
];

const getIconForText = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('tech') || lower.includes('saas') || lower.includes('software')) return 'cpu';
  if (lower.includes('commerce') || lower.includes('shop') || lower.includes('retail')) return 'shopping-bag';
  if (lower.includes('health') || lower.includes('medical') || lower.includes('doctor')) return 'heart';
  if (lower.includes('real estate') || lower.includes('property') || lower.includes('home')) return 'home';
  if (lower.includes('food') || lower.includes('restaurant')) return 'coffee';
  if (lower.includes('creative') || lower.includes('art') || lower.includes('design')) return 'pen-tool';
  if (lower.includes('finance') || lower.includes('bank')) return 'dollar-sign';
  return 'briefcase';
};

export default function TargetAudienceSection({ content }: { content: SiteContent | null }) {
  const audience = content?.targetAudience?.length ? content.targetAudience : defaultAudience;

  return (
    <section
      id="audience"
      className="relative overflow-hidden bg-[#1d1d1f] py-24 text-white md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.25),transparent_55%)]"
      />

      <Reveal className="container relative z-10 mx-auto mb-14 max-w-3xl px-4 text-center sm:px-6 md:mb-20">
        <span className="mb-3 block text-sm font-semibold text-white/70 sm:text-base">
          Who we help
        </span>
        <h2 className="font-headline text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          {content?.targetAudienceSectionTitle || 'Built for ambitious brands'}
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          {content?.targetAudienceSectionDescription ||
            'We partner with teams across industries to ship digital experiences that convert.'}
        </p>
      </Reveal>

      <div
        className="relative z-10 [--gap:1.5rem]"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
      >
        <Marquee speed={38}>
          {audience.map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-white/25 hover:bg-white/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Icons name={getIconForText(client)} className="h-5 w-5 text-primary" />
              </span>
              <span className="text-base font-medium tracking-wide text-white sm:text-lg">
                {client}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
