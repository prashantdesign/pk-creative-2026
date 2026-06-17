'use client';
import React from 'react';
import SectionHeader from './section-header';
import { CheckCircle2 } from 'lucide-react';

const clients = [
  'Hotels & Resorts',
  'Safari Camps',
  'Restaurants & Cafes',
  'Bakeries',
  'Jewellery Brands',
  'Local Businesses',
  'Startups',
  'Coaches & Consultants',
  'Educational Institutes',
  'Service-Based Businesses'
];

const TargetAudienceSection = () => {
  return (
    <section id="audience" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4 text-white">Who We Help</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We partner with ambitious brands across various industries to deliver outstanding digital experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
              <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0" />
              <span className="font-medium text-white">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
