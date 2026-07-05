'use client';

import React from 'react';
import type { SiteContent } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TestimonialsSectionProps {
  content: SiteContent | null;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const testimonials = content?.testimonials;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 16 }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Scroll-revealed Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold tracking-tight mb-4">
            {content?.testimonialsSectionTitle || "Client Stories"}
          </h2>
          {content?.testimonialsSectionDescription && (
            <p className="text-lg text-muted-foreground">
              {content.testimonialsSectionDescription}
            </p>
          )}
        </motion.div>

        {/* Staggered Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.015,
                boxShadow: "0 25px 50px -12px rgba(97, 42, 245, 0.15)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="h-full"
            >
              <Card className="h-full bg-background border-none shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden flex flex-col cursor-pointer">
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                <CardContent className="p-8 flex flex-col h-full justify-between flex-grow">
                  <p className="text-lg leading-relaxed mb-8 relative z-10 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 border border-muted">
                      <Image 
                        src={testimonial.avatarUrl && testimonial.avatarUrl.trim() !== '' 
                          ? testimonial.avatarUrl 
                          : 'https://res.cloudinary.com/djhqgz0vh/image/upload/v1783278488/kindpng_248253_gxapyn.png'} 
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
