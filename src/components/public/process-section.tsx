'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import SectionHeader from '@/components/public/section-header';
import { Reveal } from '@/components/motion/reveal';

const steps = [
  { icon: Search, title: 'Discover', text: 'We learn your brand, audience and goals, then map the fastest route to results.' },
  { icon: PenTool, title: 'Design', text: 'Wireframes and a premium UI tailored to your brand, reviewed with you before we build.' },
  { icon: Code2, title: 'Develop', text: 'Clean Next.js code, an easy admin panel, SEO foundations and blazing performance.' },
  { icon: Rocket, title: 'Launch & Grow', text: 'Deployment, Search Console setup and ongoing support so your site keeps growing.' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="How we work"
          title="From idea to launch in days, not months"
          description="A simple, transparent process with a real person on your project at every step."
        />

        <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[12%] right-[12%] top-12 hidden h-px origin-left bg-gradient-to-r from-transparent via-primary/50 to-transparent lg:block"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative h-full rounded-[2rem] bg-secondary p-6 sm:p-7">
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-primary">
                  <step.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-headline text-[11px] font-bold text-background">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-headline text-xl font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
