'use client';
import React from 'react';
import SectionHeader from './section-header';
import { Icons } from '../icons';
import type { SiteContent } from '@/types';

interface ServicesSectionProps {
  content?: SiteContent | null;
}

const ServicesSection = ({ content }: ServicesSectionProps) => {
  const activeServices = content?.services || [];
  
  if (activeServices.length === 0) return null;

  return (
    <section id="services" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          title={content?.servicesSectionTitle || "Our Services"} 
          subtitle={content?.servicesSectionDescription || "Everything you need to grow your modern brand."} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {activeServices.map((service, index) => (
            <div key={index} className="bg-background p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center">
                <Icons name={service.icon} className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
