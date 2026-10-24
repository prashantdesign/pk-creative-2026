'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Icons } from '@/components/icons';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, staggerItem } from '@/components/motion/reveal';
import TiltCard from '@/components/motion/tilt-card';
import SectionHeader from '@/components/public/section-header';
import Link from 'next/link';

type Service = { title: string; description: string; icon?: string };

const defaultServices: Service[] = [
  { title: 'Website Design', description: 'Stunning, high-conversion dynamic websites starting from ₹10,000.', icon: 'monitor' },
  { title: 'UI/UX Design', description: 'Intuitive user experiences that keep customers coming back.', icon: 'layout' },
  { title: 'Branding', description: 'Memorable brand identities that stand out in the market.', icon: 'pen-tool' },
  { title: 'Social Media', description: 'Engaging content that drives organic growth and reach.', icon: 'share-2' },
  { title: 'SEO Optimization', description: 'Climb the search rankings and dominate your niche.', icon: 'search' },
];

/** Maps a CMS service title to its dedicated landing page so every card is a crawlable internal link. */
const hrefFor = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('ui') || t.includes('ux')) return '/services/ui-ux-design';
  if (t.includes('web') || t.includes('develop')) return '/services/website-design-ahmedabad';
  if (t.includes('brand') || t.includes('logo')) return '/services/branding';
  if (t.includes('social')) return '/services/social-media-management';
  if (t.includes('seo') || t.includes('search')) return '/services/seo';
  if (t.includes('graphic') || t.includes('design')) return '/services/graphic-design';
  return '/#contact';
};

export default function ServicesSection({ content }: { content: SiteContent | null }) {
  const services = content?.services?.length ? content.services : defaultServices;
  // Fill the last bento row: the CTA takes whatever columns are left (a full-width banner when the row is complete)
  const used = services.length ? 4 + 2 * (services.length - 1) : 0;
  const ctaSpan = used % 6 === 0 ? 6 : 6 - (used % 6);
  const ctaWide = ctaSpan === 6;

  return (
    <section id="services" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="What we do"
          title={content?.servicesSectionTitle || 'Our Services'}
          description={content?.servicesSectionDescription || 'Everything you need to grow your modern brand.'}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6"
        >
          {services.map((service, index) => {
            // Bento rhythm on desktop: first card wide, then 3-up rows
            const span = index === 0 ? 'lg:col-span-4' : index === 1 ? 'lg:col-span-2' : 'lg:col-span-2';
            const featured = index === 0;
            return (
              <motion.div key={index} variants={staggerItem} className={span}>
                <Link
                  href={hrefFor(service.title)}
                  className={`group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[2rem] bg-secondary p-6 transition-transform duration-500 ease-out hover:scale-[1.015] sm:p-8 ${featured ? 'lg:min-h-[260px]' : ''}`}
                >
                  <div
                    aria-hidden
                    className="hidden"
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-primary sm:h-14 sm:w-14">
                      <Icons name={service.icon || 'star'} className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                  </div>
                  <div className="relative mt-8">
                    <h3 className={`mb-2 font-bold transition-colors duration-300 group-hover:text-primary ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                      {service.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more
                      <Icons name="arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          <motion.div variants={staggerItem} className={ctaWide ? 'lg:col-span-6' : ctaSpan === 4 ? 'lg:col-span-4' : 'lg:col-span-2'}>
            <a
              href="#contact"
              className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] ${ctaWide ? 'min-h-[140px] gap-4 lg:flex-row lg:items-center' : 'min-h-[200px]'} bg-primary p-6 text-primary-foreground transition-transform duration-500 ease-out hover:scale-[1.015] sm:p-8`}
            >
              <span className="text-sm font-semibold text-primary-foreground/90">Have a project?</span>
              <span className={`flex items-center gap-2 text-xl font-bold sm:text-2xl ${ctaWide ? '' : 'mt-8'}`}>
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
