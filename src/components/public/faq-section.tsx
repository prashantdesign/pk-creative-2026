'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { HOME_FAQS } from '@/lib/seo';

type FAQItem = { question: string; answer: string };

const faqItems: FAQItem[] = HOME_FAQS;

function FAQCard({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-border/60 py-4">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-lg text-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-3 pr-4">
          <HelpCircle className="h-5 w-5 text-primary shrink-0 opacity-70" />
          {item.question}
        </span>
        <ChevronDown 
          className={`h-5 w-5 shrink-0 transition-transform duration-300 text-muted-foreground ${isOpen ? 'rotate-180 text-primary' : ''}`} 
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground pb-6 pl-8 pr-4 leading-relaxed text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-background py-24 md:py-32">

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          
          {/* Header Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            <h2 className="font-headline text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about our pricing, deliverables, or timeline? Here are quick answers to our most common inquiries.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Admin Dashboards Included Standard</span>
            </div>
          </motion.div>

          {/* Accordion Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary rounded-[2rem] p-6 sm:p-10 shadow-sm"
          >
            <div className="divide-y divide-border/60">
              {faqItems.map((item, index) => (
                <FAQCard
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onClick={() => toggleOpen(index)}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
