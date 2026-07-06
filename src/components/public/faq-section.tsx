'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

type FAQItem = { question: string; answer: string };

const faqItems: FAQItem[] = [
  {
    question: "What is your starting price for a website?",
    answer: "Our custom website designs start at ₹10,000. Unlike traditional templates, this baseline package includes a fully integrated, custom admin panel (CMS) so you can easily manage and update your content without touching code."
  },
  {
    question: "What features are included in the ₹10k package?",
    answer: "The starter package covers a custom layout design, responsive mobile optimization, a secure contact form, fundamental SEO indexing, and an intuitive administrative dashboard to update website texts, images, and links."
  },
  {
    question: "Do you offer e-commerce and complex web applications?",
    answer: "Absolutely! We design and develop e-commerce systems, database integrations, client portals, and custom web platforms. These are custom-quoted depending on your design pages, transactional needs, and module complexity."
  },
  {
    question: "How long does a website project take to deliver?",
    answer: "A standard landing page or business website typically takes 7 to 10 business days to design and launch. Large-scale web applications or specialized e-commerce setups usually take 3 to 6 weeks depending on details."
  }
];

function FAQCard({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-border/60 py-4">
      <button
        onClick={onClick}
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
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full mix-blend-multiply filter blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
            <h2 className="text-3xl md:text-5xl font-headline font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about our pricing, deliverables, or timeline? Here are quick answers to our most common inquiries.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/50 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Admin Dashboards Included Standard</span>
            </div>
          </motion.div>

          {/* Accordion Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/30 border border-border/40 rounded-3xl p-6 sm:p-10 shadow-sm"
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
