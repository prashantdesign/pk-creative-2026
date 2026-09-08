'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroCanvas from '@/components/three/hero-canvas';
import Magnetic from '@/components/motion/magnetic';
import Marquee from '@/components/motion/marquee';

const MARQUEE_ITEMS = [
  'Website Design',
  'UI / UX',
  'Branding',
  'Social Media',
  'SEO',
  'Motion',
  'E-commerce',
  'Strategy',
];

const HeroSection = ({ content }: { content: SiteContent | null }) => {
  const reduced = useReducedMotion();
  const title = content?.heroTitle || 'We Are PK Creative';
  const subtitle =
    content?.heroSubtitle ||
    'We craft premium websites, UI/UX, branding and social media for modern brands.';

  const words = title.split(' ');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="home"
      className="relative isolate flex flex-col overflow-hidden bg-background lg:min-h-[84vh]"
    >
      {/* Decorative grid + aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-[0.4]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-20 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px] animate-aurora"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-15%] -z-20 h-[460px] w-[460px] rounded-full bg-fuchsia-500/20 blur-[150px] animate-aurora"
        style={{ animationDelay: '-6s' }}
      />

      <div className="container relative z-10 mx-auto flex flex-1 items-center px-4 pb-14 pt-10 sm:px-6 sm:pt-14 md:pt-20 lg:pb-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          {/* Text column */}
          <motion.div variants={container} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-md sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Creative Solutions For Modern Brands</span>
            </motion.div>

            <h1 className="font-headline text-[2.6rem] font-black leading-[1.05] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem]">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    variants={item}
                    className={
                      i >= words.length - 2
                        ? 'inline-block text-gradient-primary'
                        : 'inline-block'
                    }
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 inline-flex items-center gap-2.5 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold text-foreground sm:text-sm"
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
              <span>
                <span className="font-bold text-primary">Dynamic Websites</span> from{' '}
                <span className="font-bold text-primary">₹10,000</span>
              </span>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Magnetic className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="group relative w-full overflow-hidden rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-[0_20px_60px_-18px_hsl(var(--primary))] transition-all hover:bg-primary/90 sm:w-auto"
                >
                  <a href={content?.ctaLink || '#services'}>
                    <span className="relative z-10 flex items-center justify-center">
                      {content?.ctaText || 'Our Services'}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-border px-8 py-6 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground sm:w-auto"
                >
                  <a href="#contact">Start a Project</a>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* 3D logo object — desktop only; mobile hero is text-only */}
          <div className="pointer-events-none relative hidden h-[460px] w-full lg:block xl:h-[520px]">
            <HeroCanvas className="absolute inset-0" />
          </div>
        </div>
      </div>

      {/* Running services marquee — full width, below the fold content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative z-10 border-y border-border/50 bg-background/40 py-3 backdrop-blur-sm"
        style={{ ['--gap' as string]: '2.5rem' }}
      >
        <Marquee speed={26}>
          {MARQUEE_ITEMS.map((label) => (
            <span
              key={label}
              className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-muted-foreground sm:text-base"
            >
              {label}
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};

export default HeroSection;
