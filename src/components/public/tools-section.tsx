'use client';

import React from 'react';
import type { SiteContent } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from './section-header';
import { staggerContainer, staggerItem } from '@/components/motion/reveal';

export default function ToolsSection({ content }: { content?: SiteContent | null }) {
  if (!content?.tools || content.tools.length === 0) return null;

  return (
    <section id="tools" className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Our stack"
          title={content.toolsSectionTitle}
          description={content.toolsSectionDescription}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6 md:grid-cols-6"
        >
          {content.tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-background p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 sm:h-20 sm:w-20">
                <Image
                  src={tool.iconUrl}
                  alt={tool.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-center text-xs font-medium text-muted-foreground sm:text-sm">
                {tool.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
