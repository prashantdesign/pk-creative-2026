'use client';

import React from 'react';
import type { SiteContent } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialsSectionProps {
  content: SiteContent | null;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const testimonials = content?.testimonials;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold tracking-tight mb-4 animate-fade-in-up">
            {content?.testimonialsSectionTitle || "Client Stories"}
          </h2>
          {content?.testimonialsSectionDescription && (
            <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-300">
              {content.testimonialsSectionDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
              <Card className="h-full bg-background border-none shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                <CardContent className="p-8 flex flex-col h-full justify-between">
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
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      {testimonial.role && testimonial.role.trim() !== '' && (
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
