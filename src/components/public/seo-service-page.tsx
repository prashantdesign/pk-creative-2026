'use client';

import React, { useState } from 'react';
import type { SiteContent } from '@/types';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, TextReveal, staggerContainer, staggerItem } from '@/components/motion/reveal';
import Magnetic from '@/components/motion/magnetic';
import JsonLd from '@/components/json-ld';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd, SERVICE_LINKS } from '@/lib/seo';

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
  /** Canonical path of this page, e.g. /services/seo (feeds JSON-LD + related links) */
  path: string;
  /** Meta description, reused for the Service schema */
  description: string;
  /** Geographic area served (for local landing pages) */
  area?: string;
}

export default function SeoServicePage({
  siteContent,
  keywordTitle,
  keywordSubtitle,
  introductionText,
  features,
  processSteps,
  faqs,
  path,
  description,
  area,
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
        <JsonLd
          data={[
            webPageJsonLd({ name: keywordTitle, description, path }),
            serviceJsonLd({ name: keywordTitle, description, path, area }),
            faqJsonLd(faqs),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: keywordTitle, path },
            ]),
          ]}
        />
        <Header content={siteContent} />

        <main id="main-content" className="flex-grow">
          {/* Hero */}
          <section className="relative overflow-hidden py-20 md:py-28">

            <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
              <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <a href="/" className="hover:text-primary">Home</a>
                <span aria-hidden>/</span>
                <a href="/services" className="hover:text-primary">Services</a>
                <span aria-hidden>/</span>
                <span className="text-foreground/80" aria-current="page">{keywordTitle}</span>
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-sm font-semibold text-primary sm:text-base"
              >
                <span>Premium agency offerings</span>
              </motion.div>

              <TextReveal
                as="h1"
                once={false}
                text={keywordTitle}
                className="font-headline text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl"
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
                    <a href="/#contact">Get a free quote</a>
                  </Button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full px-8 py-6 text-base font-semibold hover:bg-secondary/40 sm:w-auto"
                    asChild
                  >
                    <a href="/work">See our work</a>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </section>

          {/* Overview */}
          <section className="relative bg-secondary py-20">
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
                  className="mb-4 font-headline text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
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
                    <div
                      className="flex h-full flex-col gap-4 rounded-[2rem] bg-secondary p-6 sm:p-8"
                    >
                      <div className="w-fit rounded-xl bg-background p-3 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="font-headline text-lg font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Process */}
          <section className="relative bg-background py-24 md:py-32">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
              <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                <TextReveal
                  as="h2"
                  text="Our Working Process"
                  className="mb-4 font-headline text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
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
                    className="relative flex gap-4 rounded-[2rem] bg-secondary p-6 sm:p-8"
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
                  className="mb-4 font-headline text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
                />
                <Reveal as="p" delay={0.1} className="text-base text-muted-foreground">
                  Common queries regarding our services, tools, and pricing plans.
                </Reveal>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl bg-secondary"
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

          {/* Related services: internal links help users and crawlers */}
          <section className="py-16">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
              <h2 className="mb-6 text-center font-headline text-2xl font-bold text-foreground">Explore more services</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {SERVICE_LINKS.filter((l) => l.href !== path).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-full border border-border/60 bg-secondary/20 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden bg-[#1d1d1f] py-20 text-center text-white md:py-28">
            <Reveal className="container relative z-10 mx-auto max-w-4xl px-4 md:px-6">
              <h2 className="mb-6 font-headline text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                Ready to grow your digital presence?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                Whether you need a dynamic local website, a custom branding layout, or a
                high-converting booking platform, we have you covered.
              </p>
              <Magnetic>
                <Button
                  size="lg"
                  className="rounded-full bg-white px-10 py-6 text-base font-medium text-[#1d1d1f] transition-transform hover:scale-[1.03] hover:bg-white"
                  asChild
                >
                  <a href="/#contact" className="inline-flex items-center gap-2">
                    <span>Get a free quote</span>
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
