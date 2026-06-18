'use client';
import React from 'react';
import type { SiteContent, Service } from '@/types';
import { Icons } from '@/components/icons';
import { ArrowUpRight } from 'lucide-react';

const defaultServices: Service[] = [
  { title: 'Website Design', description: 'Stunning, high-conversion websites tailored for your brand.', icon: 'monitor' },
  { title: 'UI/UX Design', description: 'Intuitive user experiences that keep customers coming back.', icon: 'layout' },
  { title: 'Branding', description: 'Memorable brand identities that stand out in the market.', icon: 'pen-tool' },
  { title: 'Social Media', description: 'Engaging content that drives organic growth and reach.', icon: 'share-2' },
  { title: 'SEO Optimization', description: 'Climb the search rankings and dominate your niche.', icon: 'search' },
];

export default function ServicesSection({ content }: { content: SiteContent | null }) {
  const services = content?.services?.length ? content.services : defaultServices;

  return (
    <section id="services" className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full mix-blend-multiply filter blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4 text-foreground animate-fade-in-up">
              {content?.servicesSectionTitle || 'Our Services'}
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-300">
              {content?.servicesSectionDescription || 'Everything you need to grow your modern brand.'}
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          {services.map((service, index) => {
            // Make the first and fourth items span wider on large screens for the "bento" look
            const isWide = index === 0 || index === 3;
            
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-background border border-border p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 animate-fade-in-up ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                      <Icons name={service.icon || 'star'} className="h-7 w-7" />
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground/50 group-hover:text-primary transition-colors duration-500" />
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
