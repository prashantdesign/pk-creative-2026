'use client';

import React, { useState } from 'react';
import type { SiteContent } from '@/types';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionConfig } from 'framer-motion';

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
        <p className="text-muted-foreground">My portfolio is currently undergoing some updates. Please check back soon!</p>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const areAnimationsEnabled = siteContent?.areAnimationsEnabled ?? true;

  return (
    <MotionConfig reducedMotion={areAnimationsEnabled === false ? "always" : "user"}>
      <div className={`flex flex-col min-h-screen bg-background ${areAnimationsEnabled ? '' : 'no-animations'}`}>
        <Header content={siteContent} />
        
        <main className="flex-grow">
          {/* Hero Banner */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
            {/* Glowing background blooms */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[80px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6"
              >
                <Sparkles className="h-3 w-3" />
                <span>Premium Agency Offerings</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 font-headline"
              >
                {keywordTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
              >
                {keywordSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <Button size="lg" className="w-full sm:w-auto text-white bg-primary hover:bg-primary/95 text-base font-semibold py-6 px-8 rounded-xl shadow-lg shadow-primary/25 transition-transform duration-200 hover:scale-[1.02]" asChild>
                  <a href="/#contact">Get Started Today</a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base font-semibold py-6 px-8 rounded-xl hover:bg-secondary/40" asChild>
                  <a href="/work">Explore Our Work</a>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Introduction Block */}
          <section className="py-16 bg-secondary/10 relative border-y border-border/40">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
              <h2 className="text-2xl font-bold mb-6 font-headline text-foreground">Overview</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {introductionText}
              </p>
            </div>
          </section>

          {/* Features Bento Grid */}
          <section className="py-20 md:py-28 relative">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline text-foreground mb-4">
                  What We Offer
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Explore the specific deliverables and tools we bring to ensure project success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(var(--primary), 0.3)" }}
                    className="p-6 rounded-2xl border border-border/55 bg-secondary/20 backdrop-blur-sm transition-all duration-300 flex flex-col gap-4"
                  >
                    <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Steps */}
          <section className="py-20 md:py-28 bg-secondary/15 relative border-y border-border/40">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline text-foreground mb-4">
                  Our Working Process
                </h2>
                <p className="text-muted-foreground text-base">
                  How we take your project from an initial concept to a high-converting result.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-6 rounded-xl border border-border/40 bg-background/50 relative">
                    <div className="absolute top-4 right-4 text-3xl font-extrabold text-primary/15 font-headline">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold font-headline mb-2 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs Accordion */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-base">
                  Common queries regarding our services, tools, and pricing plans.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-border/40 rounded-xl overflow-hidden bg-secondary/10">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                          activeFaq === index ? 'rotate-180' : ''
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
                          <div className="p-5 pt-0 border-t border-border/20 text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
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

          {/* Call-to-action */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-indigo-500/5 border-t border-border/40 relative overflow-hidden text-center">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-headline mb-6 text-foreground">
                Ready to Grow Your Digital Presence?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Whether you need a dynamic local website in Ahmedabad, a custom branding layout, or a high-converting homestay booking platform, we have you covered.
              </p>
              <Button size="lg" className="text-white bg-primary hover:bg-primary/95 text-base font-semibold py-6 px-10 rounded-xl shadow-lg transition-transform duration-200 hover:scale-[1.02]" asChild>
                <a href="/#contact" className="inline-flex items-center gap-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer content={siteContent} />
      </div>
    </MotionConfig>
  );
}
