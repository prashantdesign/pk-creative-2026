'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = ({ content }: { content: SiteContent | null }) => {
  return (
    <section id="home" className="relative h-[calc(100vh-5rem)] min-h-[500px]">
      <div className="container mx-auto flex h-full flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="space-y-6 max-w-3xl animate-fade-in-up">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Creative Solutions For Modern Brands
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-foreground">
            {content?.heroTitle || 'We are PK Creative'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-body">
            {content?.heroSubtitle ||
              'We deliver premium Website Design, UI/UX, Branding, and Social Media Management.'}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="animate-fade-in-up animation-delay-300 bg-primary hover:bg-dark-purple text-white px-8 py-6 rounded-full text-lg">
              <a href="#services">
                {content?.ctaText || 'Our Services'}
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="animate-fade-in-up animation-delay-300 px-8 py-6 rounded-full text-lg">
              <a href="#contact">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
