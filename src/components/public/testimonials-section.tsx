'use client';

import React from 'react';
import type { SiteContent } from '@/types';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/components/motion/reveal';
import TiltCard from '@/components/motion/tilt-card';
import SectionHeader from '@/components/public/section-header';

interface TestimonialsSectionProps {
  content: SiteContent | null;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const testimonials = content?.testimonials;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/2 rounded-full bg-primary/5 blur-[110px]"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Client stories"
          title={content?.testimonialsSectionTitle || 'Loved by the brands we build'}
          description={content?.testimonialsSectionDescription || undefined}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={staggerItem} className="h-full">
              <TiltCard
                max={5}
                className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-background p-6 sm:p-8"
              >
                <Quote className="mb-4 h-9 w-9 text-primary/20" />
                <p className="mb-8 flex-grow text-base leading-relaxed text-foreground/90 sm:text-lg">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
                    <Image
                      src={
                        testimonial.avatarUrl && testimonial.avatarUrl.trim() !== ''
                          ? testimonial.avatarUrl
                          : 'https://res.cloudinary.com/djhqgz0vh/image/upload/v1783278488/kindpng_248253_gxapyn.png'
                      }
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    {testimonial.role && testimonial.role.trim() !== '' && (
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
