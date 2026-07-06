"use client";

import React, { useMemo, useState, useEffect } from 'react';
import type { SiteContent, WebsiteProject } from '@/types';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
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

const WebsiteCard = ({ 
  website, 
  index, 
  current, 
  api 
}: { 
  website: WebsiteProject; 
  index: number; 
  current: number; 
  api: CarouselApi | undefined 
}) => {
  const [imgError, setImgError] = useState(false);
  const displayLogo = website.logoUrl || getFaviconUrl(website.url);
  const isActive = current === index;

  return (
    <CarouselItem 
      className="pl-4 md:pl-8 basis-full sm:basis-[70%] md:basis-[50%] lg:basis-[40%] xl:basis-[35%] max-w-lg transition-transform duration-500"
      onClick={() => api?.scrollTo(index)}
    >
      <div 
        className={`group relative flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-700 ease-out h-full cursor-pointer
          ${isActive 
            ? 'bg-secondary/80 border-primary/40 scale-100 sm:scale-110 shadow-2xl z-10 opacity-100' 
            : 'bg-secondary/20 border-border/50 scale-90 sm:scale-95 opacity-50 hover:opacity-80'
          }
        `}
      >
        <div className={`w-full max-w-[200px] h-24 mb-6 rounded-2xl bg-background border flex items-center justify-center shadow-sm overflow-hidden p-4 transition-transform duration-700 ${isActive ? 'scale-110' : ''}`}>
          {displayLogo && !imgError ? (
            <img 
               src={displayLogo} 
               alt={`${website.name} logo`}
               className="object-contain w-full h-full" 
               loading="lazy"
               onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-4xl font-bold text-muted-foreground tracking-tight">{website.name.charAt(0)}</span>
          )}
        </div>
        
        <h3 className={`font-bold mb-2 text-foreground text-center line-clamp-1 transition-all duration-700 ${isActive ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {website.name}
        </h3>
        
        <a 
          href={website.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-muted-foreground mb-6 hover:text-primary transition-colors line-clamp-1 break-all text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {website.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>

        <div className={`w-full mt-auto transition-all duration-700 ${isActive ? 'opacity-100 h-auto translate-y-0' : 'opacity-0 h-0 overflow-hidden translate-y-4'}`}>
          <Button 
            asChild 
            variant="default" 
            className="w-full mt-4"
          >
            <a href={website.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </CarouselItem>
  );
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

  const showSkeletons = (!websites || websites.length === 0) && isLoading;

  if (!isLoading && (!websites || websites.length === 0)) {
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

        {showSkeletons ? (
          <div className="flex gap-6 justify-center flex-wrap max-w-7xl mx-auto py-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 min-w-[280px] max-w-lg p-8 rounded-2xl border border-border/50 bg-secondary/10 flex flex-col items-center h-[340px]">
                <Skeleton className="w-[120px] h-24 mb-6 rounded-2xl bg-muted" />
                <Skeleton className="w-40 h-8 mb-2 bg-muted animate-pulse" />
                <Skeleton className="w-32 h-4 mb-6 bg-muted animate-pulse" />
                <Skeleton className="w-full h-10 mt-auto bg-muted rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-4 md:-ml-8 py-12">
              {/* Artificially duplicate items if there are too few, to force Embla into a seamless infinite loop */}
              {((websites && websites.length > 0 && websites.length < 5) ? [...websites, ...websites, ...websites, ...websites] : (websites || [])).map((website, index) => (
                <WebsiteCard 
                  key={`${website.id}-${index}`} 
                  website={website} 
                  index={index} 
                  current={current} 
                  api={api} 
                />
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static transform-none h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all active:scale-95" />
              <CarouselNext className="static transform-none h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all active:scale-95" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
}
