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
          <div className="max-w-sm mx-auto w-full animate-fade-in-up animation-delay-300">
            <img
              src={content?.aboutImageUrl || "/pk_about_visual.png"}
              alt="About us"
              className="rounded-lg w-full h-auto object-contain shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
