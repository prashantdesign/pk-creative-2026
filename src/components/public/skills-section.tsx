"use client";

import React from 'react';
import type { SiteContent } from '@/types';
import { motion } from 'framer-motion';
import SectionHeader from './section-header';
import { staggerContainer } from '@/components/motion/reveal';

interface SkillsSectionProps {
  content?: SiteContent | null;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ content }) => {
  if (!content?.skills || content.skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Capabilities"
          title={content.skillsSectionTitle}
          description={content.skillsSectionDescription}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {content.skills.map((skill, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
              }}
              className="rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:text-base"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
