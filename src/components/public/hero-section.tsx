'use client';
import React from 'react';
import Image from 'next/image';
import type { SiteContent } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = ({ content }: { content: SiteContent | null }) => {
  const defaultHeroMedia = "/pk_hero_visual.png";
  const mediaUrl = content?.heroMediaUrl || defaultHeroMedia;
  const hasMedia = true;
  const isVideo = mediaUrl.toLowerCase().includes('.mp4');

  return (
    <section id="home" className={`relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-background ${hasMedia ? 'pt-12 pb-24 md:pt-16 md:pb-28' : 'py-20'}`}>
      {/* Background Glowing Blobs for Premium Agency Feel */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className={`grid gap-12 items-center ${hasMedia ? 'lg:grid-cols-2' : 'grid-cols-1 text-center justify-items-center'}`}>
          
          {/* Text Column */}
          <div className={`space-y-8 animate-fade-in-up ${hasMedia ? 'max-w-2xl' : 'max-w-5xl mx-auto'}`}>
            <div className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary shadow-sm mb-6 ${!hasMedia ? 'mx-auto' : ''}`}>
              <Sparkles className="h-4 w-4" />
              <span>Creative Solutions For Modern Brands</span>
            </div>
            
            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter text-foreground leading-[1.1] ${!hasMedia ? 'lg:text-9xl' : ''}`}>
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-muted-foreground">
                {content?.heroTitle || 'We Are PK Creative'}
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-muted-foreground font-body leading-relaxed ${!hasMedia ? 'mx-auto max-w-2xl' : ''}`}>
              {content?.heroSubtitle ||
                'We deliver premium Website Design, UI/UX, Branding, and Social Media Management.'}
            </p>
            
            <div className={`pt-8 flex flex-col sm:flex-row items-center gap-4 ${!hasMedia ? 'justify-center' : ''}`}>
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-7 rounded-full text-lg font-semibold shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.6)] hover:-translate-y-1 w-full sm:w-auto"
              >
                <a href={content?.ctaLink || "#services"}>
                  <span className="relative z-10 flex items-center">
                    {content?.ctaText || 'Our Services'}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="px-8 py-7 rounded-full text-lg font-medium border-border hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-1 w-full sm:w-auto"
              >
                <a href="#contact">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>

          {/* Media Column */}
          {hasMedia && (
            <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up animation-delay-300 group border border-border/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              {isVideo ? (
                <video 
                  src={mediaUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={mediaUrl}
                  alt="Hero Visual"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
          )}

        </div>
      </div>
      
      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
