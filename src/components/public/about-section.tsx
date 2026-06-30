'use client';

import React from 'react';
import Image from 'next/image';
import type { SiteContent } from '@/types';

const AboutSection = ({ content }: { content: SiteContent | null }) => {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">About Us</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {content?.aboutText ||
                "We are a passionate team of designers with a love for creating beautiful and intuitive digital experiences."}
            </p>
          </div>
          <div className="relative aspect-square max-w-sm mx-auto w-full animate-fade-in-up animation-delay-300">
            <Image
              src={content?.aboutImageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"}
              alt="About us"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
