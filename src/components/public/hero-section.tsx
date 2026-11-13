'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { SiteContent } from '@/types';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { optimizeImageUrl } from '@/lib/image-url';

const HeroSection = ({ content }: { content: SiteContent | null }) => {
  const mediaUrl = content?.heroMediaUrl || '/pk_hero_visual.webp';
  const isVideo = mediaUrl.toLowerCase().includes('.mp4');
  const secondaryHref = content?.ctaLink || '#services';

  return (
    <section id="home" className="relative overflow-hidden bg-background pt-14 sm:pt-20 md:pt-24">
      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <p className="text-sm font-semibold text-primary sm:text-base">
          Creative solutions for modern brands
        </p>

        <h1
          className="mx-auto mt-4 max-w-4xl font-headline text-[2.6rem] font-black leading-[1.08] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          {content?.heroTitle || 'Websites & brands built to grow your business'}
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-lg leading-snug text-muted-foreground sm:text-xl md:text-2xl"
        >
          {content?.heroSubtitle || 'Premium website design, UI/UX, branding and social media management.'}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <Link
            href="#contact"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Get a free quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={secondaryHref}
            className="group inline-flex min-h-12 items-center gap-1 text-base font-medium text-primary hover:underline"
          >
            {content?.ctaText || 'Our services'}
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Dynamic websites from <span className="font-semibold text-foreground">₹10,000</span> · 7-day delivery · SEO-ready · Admin panel included
        </p>

        <div
          className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-secondary shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] sm:mt-16 sm:rounded-[2.25rem] md:aspect-[16/10]"
        >
          {isVideo ? (
            <video src={mediaUrl} autoPlay loop muted playsInline className="h-full w-full object-cover" />
          ) : (
            <Image
              src={optimizeImageUrl(mediaUrl, 1600)}
              alt="PK Creative - website design, branding and SEO for modern brands"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              priority
              fetchPriority="high"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
