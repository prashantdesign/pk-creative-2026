"use client";

import React, { useMemo } from 'react';
import type { SiteContent, WebsiteProject } from '@/types';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
  } catch {
    return '';
  }
};

export default function WebsiteShowcaseSection({ content }: { content: SiteContent | null }) {
  const firestore = useFirestore();

  const websitesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'pkcreative_websiteProjects'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: websites, isLoading } = useCollection<WebsiteProject>(websitesQuery);

  if (!websites || websites.length === 0) {
    return null; // Don't render the section if there are no websites to showcase
  }

  return (
    <section id="website-showcase" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {content?.websiteShowcaseTitle || "Websites We've Built"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content?.websiteShowcaseDescription || "Explore some of our latest web design and development projects."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {websites.map((website, index) => {
            const displayLogo = website.logoUrl || getFaviconUrl(website.url);

            return (
              <div 
                key={website.id} 
                className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 mb-6 rounded-2xl bg-background border flex items-center justify-center shadow-sm overflow-hidden p-3 transition-transform duration-500 group-hover:scale-110">
                  {displayLogo ? (
                    <Image src={displayLogo} alt={website.name} width={80} height={80} className="object-contain" />
                  ) : (
                    <span className="text-3xl font-bold text-muted-foreground">{website.name.charAt(0)}</span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground text-center line-clamp-1">{website.name}</h3>
                
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-muted-foreground mb-6 hover:text-primary transition-colors line-clamp-1 break-all text-center"
                >
                  {website.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>

                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                >
                  <a href={website.url} target="_blank" rel="noopener noreferrer">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
