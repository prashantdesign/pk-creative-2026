'use client';
import React from 'react';
import type { SiteContent } from '@/types';

const StatsSection = ({ content }: { content: SiteContent | null }) => {
  if (!content?.stats || content.stats.length === 0) {
    return null;
  }

  return (
    <section id="stats" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <p className="text-5xl font-bold text-primary">{stat.value}</p>
              <p className="text-lg text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
