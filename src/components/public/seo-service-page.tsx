'use client';

import React, { useState } from 'react';
import type { SiteContent } from '@/types';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, TextReveal, staggerContainer, staggerItem } from '@/components/motion/reveal';
import TiltCard from '@/components/motion/tilt-card';
import Magnetic from '@/components/motion/magnetic';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface SeoServicePageProps {
  siteContent: SiteContent | null;
  keywordTitle: string;
  keywordSubtitle: string;
  introductionText: string;
  features: Feature[];
  processSteps: ProcessStep[];
  faqs: FAQ[];
}

export default function SeoServicePage({
  siteContent,
  keywordTitle,
  keywordSubtitle,
  introductionText,
  features,
  processSteps,
  faqs,
}: SeoServicePageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (siteContent?.isMaintenanceModeEnabled) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Under Maintenance</h1>
        <p className="text-muted-foreground">
          My portfolio is currently undergoing some updates. Please check back soon!
        </p>
      </div>
    );
  }

  const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);
  const areAnimationsEnabled = siteContent?.areAnimationsEnabled ?? true;

  return (
    <MotionConfig reducedMotion={areAnimationsEnabled === false ? 'always' : 'user'}>
      <div
        className={`flex min-h-screen flex-col bg-background ${
          areAnimationsEnabled ? '' : 'no-animations'
        }`}
      >
        <Header content={siteContent} />

        <main className="flex-grow">
          {/* Hero */}
          <section className="relative overflow-hidden py-20 md:py-28">
            <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px] animate-aurora"
            />

            <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
              >
                <Sparkles className="h-3 w-3" />
                <span>Premium Agency Offerings</span>
              </motion.div>

              <TextReveal
                as="h1"
                once={false}
                text={keywordTitle}
                className="font-headline text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl"
              >
                {keywordSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              >
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] sm:w-auto"
                    asChild
                  >
                    <a href="/#contact">Get Started Today</a>
                  </Button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full px-8 py-6 text-base font-semibold hover:bg-secondary/40 sm:w-auto"
                    asChild
                  >
                    <a href="/work">Explore Our Work</a>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </section>

          {/* Overview */}
          <section className="relative border-y border-border/40 bg-secondary/10 py-16">
            <Reveal className="container mx-auto max-w-3xl px-4 text-center md:px-6">
              <h2 className="mb-6 font-headline text-2xl font-bold text-foreground">Overview</h2>
              <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
                {introductionText}
              </p>
            </Reveal>
          </section>

          {/* Features */}
          <section className="relative py-20 md:py-28">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                <TextReveal
                  as="h2"
                  text="What We Offer"
                  className="mb-4 font-headline text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                />
                <Reveal as="p" delay={0.1} className="text-base text-muted-foreground md:text-lg">
                  Explore the specific deliverables and tools we bring to ensure project success.
                </Reveal>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              >
                {features.map((feature, index) => (
                  <motion.div key={index} variants={staggerItem}>
                    <TiltCard
                      max={6}
                      className="flex h-full flex-col gap-4 rounded-2xl border border-border/55 bg-secondary/20 p-6 transition-colors duration-300 hover:border-primary/40"
                    >
                      <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="font-headline text-lg font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Process */}
          <section className="relative border-y border-border/40 bg-secondary/15 py-20 md:py-28">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
              <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                <TextReveal
                  as="h2"
                  text="Our Working Process"
                  className="mb-4 font-headline text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                />
                <Reveal as="p" delay={0.1} className="text-base text-muted-foreground">
                  How we take your project from an initial concept to a high-converting result.
                </Reveal>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {processSteps.map((step, index) => (
                  <Reveal
                    key={index}
                    delay={index * 0.08}
                    className="relative flex gap-4 rounded-2xl border border-border/40 bg-background/50 p-6"
                  >
                    <div className="absolute right-4 top-4 font-headline text-3xl font-extrabold text-primary/15">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="mb-2 font-headline text-lg font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto max-w-3xl px-4 md:px-6">
              <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                <TextReveal
                  as="h2"
                  text="Frequently Asked Questions"
                  className="mb-4 font-headline text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
                />
                <Reveal as="p" delay={0.1} className="text-base text-muted-foreground">
                  Common queries regarding our services, tools, and pricing plans.
                </Reveal>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-border/40 bg-secondary/10"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          activeFaq === index ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="whitespace-pre-line border-t border-border/20 p-5 pt-4 text-sm leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden border-t border-border/40 bg-gradient-to-br from-primary/10 to-indigo-500/5 py-16 text-center md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.25),transparent_60%)]"
            />
            <Reveal className="container relative z-10 mx-auto max-w-4xl px-4 md:px-6">
              <h2 className="mb-6 font-headline text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Ready to Grow Your Digital Presence?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Whether you need a dynamic local website, a custom branding layout, or a
                high-converting booking platform, we have you covered.
              </p>
              <Magnetic>
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-10 py-6 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                  asChild
                >
                  <a href="/#contact" className="inline-flex items-center gap-2">
                    <span>Start Your Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
            </Reveal>
          </section>
        </main>

        <Footer content={siteContent} />
      </div>
    </MotionConfig>
  );
}
