'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Icons } from '@/components/icons';
import { motion } from 'framer-motion';

type Service = { title: string; description: string; icon?: string };

const defaultServices: Service[] = [
  { title: 'Website Design', description: 'Stunning, high-conversion websites tailored for your brand.', icon: 'monitor' },
  { title: 'UI/UX Design', description: 'Intuitive user experiences that keep customers coming back.', icon: 'layout' },
  { title: 'Branding', description: 'Memorable brand identities that stand out in the market.', icon: 'pen-tool' },
  { title: 'Social Media', description: 'Engaging content that drives organic growth and reach.', icon: 'share-2' },
  { title: 'SEO Optimization', description: 'Climb the search rankings and dominate your niche.', icon: 'search' },
];

export default function ServicesSection({ content }: { content: SiteContent | null }) {
  const services = content?.services?.length ? content.services : defaultServices;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 16 }
    }
  };

  return (
    <section id="services" className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Decorative background element */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full mix-blend-multiply filter blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4 text-foreground">
              {content?.servicesSectionTitle || 'Our Services'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {content?.servicesSectionDescription || 'Everything you need to grow your modern brand.'}
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout with staggered trigger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.015,
                  borderColor: "rgba(97, 42, 245, 0.35)",
                  boxShadow: "0 25px 50px -12px rgba(97, 42, 245, 0.18)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.99 }}
                className="group relative overflow-hidden rounded-3xl bg-background border border-border p-8 min-h-[300px] cursor-pointer flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <motion.div 
                      className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500"
                      whileHover={{ rotate: 10, scale: 1.05 }}
                    >
                      <Icons name={service.icon || 'star'} className="h-7 w-7" />
                    </motion.div>
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary">{service.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
