"use client";

import React, { useMemo, useState, useEffect } from 'react';
import type { SiteContent, WebsiteProject } from '@/types';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";

const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    // Clearbit Logo API returns high-quality logos for domains
    return `https://logo.clearbit.com/${domain}`;
  } catch {
    return '';
  }
};

export default function WebsiteShowcaseSection({ content }: { content: SiteContent | null }) {
  const firestore = useFirestore();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const websitesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'pkcreative_websiteProjects'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: websites, isLoading } = useCollection<WebsiteProject>(websitesQuery);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!websites || websites.length === 0) {
    return null;
  }

  return (
    <section id="website-showcase" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {content?.websiteShowcaseTitle || "Websites We've Built"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content?.websiteShowcaseDescription || "Explore some of our latest web design and development projects."}
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4 md:-ml-8 py-10">
            {websites.map((website, index) => {
              const displayLogo = website.logoUrl || getFaviconUrl(website.url);
              const isActive = current === index;

              return (
                <CarouselItem key={website.id} className="pl-4 md:pl-8 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div 
                    className={`group relative flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-500 ease-out h-full
                      ${isActive 
                        ? 'bg-secondary/80 border-primary/40 scale-110 shadow-2xl z-10 opacity-100' 
                        : 'bg-secondary/20 border-border/50 scale-90 opacity-40 hover:opacity-70'
                      }
                    `}
                  >
                    {/* Adjusted container to allow wide logos to fit without being forced into a small square */}
                    <div className={`w-full max-w-[200px] h-24 mb-6 rounded-2xl bg-background border flex items-center justify-center shadow-sm overflow-hidden p-4 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`}>
                      {displayLogo ? (
                        <Image 
                           src={displayLogo} 
                           alt={website.name} 
                           width={200} 
                           height={80} 
                           className="object-contain w-full h-full" 
                        />
                      ) : (
                        <span className="text-3xl font-bold text-muted-foreground">{website.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <h3 className={`font-bold mb-2 text-foreground text-center line-clamp-1 transition-all ${isActive ? 'text-2xl' : 'text-xl'}`}>
                      {website.name}
                    </h3>
                    
                    <a 
                      href={website.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-muted-foreground mb-6 hover:text-primary transition-colors line-clamp-1 break-all text-center"
                    >
                      {website.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>

                    {/* Button only visible on active card, taking up space to prevent layout shift */}
                    <div className={`w-full mt-auto transition-all duration-500 ${isActive ? 'opacity-100 h-auto translate-y-0' : 'opacity-0 h-0 overflow-hidden translate-y-4'}`}>
                      <Button 
                        asChild 
                        variant="default" 
                        className="w-full mt-4"
                      >
                        <a href={website.url} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static transform-none h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="static transform-none h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
