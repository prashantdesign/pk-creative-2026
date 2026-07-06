'use client';

import React from 'react';
import type { SiteContent } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = ({ content }: { content: SiteContent | null }) => {
  return (
    <section id="about" className="py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Column - Slide in from Left */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground">About Us</h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
              {content?.aboutText ||
                "We are a passionate team of designers with a love for creating beautiful and intuitive digital experiences."}
            </p>
          </motion.div>

          {/* Image Column - Slide in from Right & Hover Scale */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
            className="max-w-sm mx-auto w-full"
          >
            <motion.div
              whileHover={{ 
                scale: 1.03, 
                rotate: 0.5,
                boxShadow: "0 25px 50px -12px rgba(97, 42, 245, 0.2)",
                transition: { duration: 0.3 }
              }}
              className="rounded-2xl overflow-hidden shadow-lg border border-border/40 bg-background cursor-pointer"
            >
              <Image
                src={content?.aboutImageUrl || "/pk_about_visual.png"}
                alt="About us"
                width={384}
                height={384}
                className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.02]"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
