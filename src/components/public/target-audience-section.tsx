'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import Icons from '@/components/icons';

const defaultAudience = [
  'Tech Startups',
  'E-commerce Brands',
  'Real Estate Agencies',
  'Healthcare Providers',
  'Creative Professionals',
  'SaaS Platforms',
  'Local Businesses'
];

// Helper to auto-detect a good icon based on text
const getIconForText = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('tech') || lower.includes('saas') || lower.includes('software')) return 'cpu';
  if (lower.includes('commerce') || lower.includes('shop') || lower.includes('retail')) return 'shopping-bag';
  if (lower.includes('health') || lower.includes('medical') || lower.includes('doctor')) return 'heart';
  if (lower.includes('real estate') || lower.includes('property') || lower.includes('home')) return 'home';
  if (lower.includes('food') || lower.includes('restaurant')) return 'coffee';
  if (lower.includes('creative') || lower.includes('art') || lower.includes('design')) return 'pen-tool';
  if (lower.includes('finance') || lower.includes('bank')) return 'dollar-sign';
  return 'briefcase'; // default
};

export default function TargetAudienceSection({ content }: { content: SiteContent | null }) {
  const audience = content?.targetAudience?.length ? content.targetAudience : defaultAudience;

  // We duplicate the array to create a seamless infinite marquee effect
  const marqueeItems = [...audience, ...audience, ...audience];

  return (
    <section id="audience" className="py-24 bg-foreground text-background overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground z-0" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 mb-16 text-center max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6 text-background animate-fade-in-up">
          {content?.targetAudienceSectionTitle || 'Who We Help'}
        </h2>
        <p className="text-xl text-background/70 animate-fade-in-up animation-delay-300">
          {content?.targetAudienceSectionDescription || 'We partner with ambitious brands across various industries to deliver outstanding digital experiences.'}
        </p>
      </div>

      <div className="relative z-10 flex overflow-hidden group">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-foreground to-transparent z-20 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-foreground to-transparent z-20 pointer-events-none" />

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] gap-6 px-3">
          {marqueeItems.map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 bg-background/5 hover:bg-background/10 backdrop-blur-sm p-6 rounded-2xl border border-background/10 whitespace-nowrap transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icons name={getIconForText(client)} className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-medium tracking-wide text-background">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
