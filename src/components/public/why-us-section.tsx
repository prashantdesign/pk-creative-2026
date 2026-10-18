'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, LineChart, Wallet, Headphones, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/public/section-header';
import TiltCard from '@/components/motion/tilt-card';
import { staggerContainer, staggerItem } from '@/components/motion/reveal';

const reasons = [
  { icon: Zap, title: 'Lightning fast', text: 'Next.js builds that score high on Core Web Vitals, which users and Google both reward.' },
  { icon: LineChart, title: 'SEO-ready by default', text: 'Semantic markup, schema, sitemaps and clean metadata on every page we ship.' },
  { icon: Wallet, title: 'Honest pricing', text: 'Dynamic websites from ₹10,000 with the admin panel included. No hidden extras.' },
  { icon: ShieldCheck, title: 'Secure & reliable', text: 'Hardened headers, protected admin and reliable hosting on modern infrastructure.' },
  { icon: Sparkles, title: 'Premium design', text: 'Custom visuals and motion crafted for your brand, never a recycled template.' },
  { icon: Headphones, title: 'Real support', text: 'Direct access to the people building your site, before and after launch.' },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-secondary/20 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.18),transparent)]  "
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why PK Creative"
          title="Everything a growing brand needs, in one place"
          description="PK Creative is a website design and branding agency in Ahmedabad serving businesses across India: design that turns heads and engineering that gets found on Google."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div key={r.title} variants={staggerItem}>
              <TiltCard
                max={5}
                className="group h-full rounded-3xl border border-border bg-background p-6 transition-colors duration-300 hover:border-primary/40 sm:p-8"
              >
                <r.icon className="mb-5 h-8 w-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mb-2 font-headline text-xl font-bold">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{r.text}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
