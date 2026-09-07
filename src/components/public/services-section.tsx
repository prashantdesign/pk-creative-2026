'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Icons } from '@/components/icons';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, staggerItem } from '@/components/motion/reveal';
import TiltCard from '@/components/motion/tilt-card';
import SectionHeader from '@/components/public/section-header';

type Service = { title: string; description: string; icon?: string };

const defaultServices: Service[] = [
  { title: 'Website Design', description: 'Stunning, high-conversion dynamic websites starting from ₹10,000.', icon: 'monitor' },
  { title: 'UI/UX Design', description: 'Intuitive user experiences that keep customers coming back.', icon: 'layout' },
  { title: 'Branding', description: 'Memorable brand identities that stand out in the market.', icon: 'pen-tool' },
  { title: 'Social Media', description: 'Engaging content that drives organic growth and reach.', icon: 'share-2' },
  { title: 'SEO Optimization', description: 'Climb the search rankings and dominate your niche.', icon: 'search' },
];

export default function ServicesSection({ content }: { content: SiteContent | null }) {
  const services = content?.services?.length ? content.services : defaultServices;

  return (
    <section id="services" className="relative overflow-hidden bg-secondary/20 py-20 md:py-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/5 blur-[120px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader
          align="left"
          eyebrow="What we do"
          title={content?.servicesSectionTitle || 'Our Services'}
          description={content?.servicesSectionDescription || 'Everything you need to grow your modern brand.'}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={staggerItem}>
              <TiltCard
                max={6}
                className="group flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background p-6 transition-colors duration-300 hover:border-primary/40 sm:min-h-[280px] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground sm:h-14 sm:w-14">
                    <Icons name={service.icon || 'star'} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <span className="font-headline text-sm font-bold text-muted-foreground/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          <motion.div variants={staggerItem}>
            <a
              href="#contact"
              className="glow-ring flex h-full min-h-[220px] flex-col justify-between rounded-3xl border border-primary/30 bg-primary/5 p-6 transition-all duration-300 hover:bg-primary/10 sm:min-h-[280px] sm:p-8"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Have a project?
              </span>
              <span className="mt-8 flex items-center gap-2 text-xl font-bold sm:text-2xl">
                Let&apos;s build it together
                <Icons name="arrow-right" className="h-5 w-5" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
