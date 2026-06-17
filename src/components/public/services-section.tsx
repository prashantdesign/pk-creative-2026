'use client';
import React from 'react';
import SectionHeader from './section-header';
import { Monitor, Smartphone, PenTool, Layout, Search, Settings } from 'lucide-react';

const services = [
  {
    title: 'Website Design & Dev',
    description: 'Business, Portfolio, and E-commerce websites built with modern technologies.',
    icon: <Monitor className="h-8 w-8 text-primary" />
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces and landing pages that convert.',
    icon: <Layout className="h-8 w-8 text-primary" />
  },
  {
    title: 'Branding & Identity',
    description: 'Logo design, business profiles, and complete brand identity systems.',
    icon: <PenTool className="h-8 w-8 text-primary" />
  },
  {
    title: 'Social Media Management',
    description: 'Engaging post designs, festival creatives, and marketing campaigns.',
    icon: <Smartphone className="h-8 w-8 text-primary" />
  },
  {
    title: 'SEO Optimization',
    description: 'Rank higher on search engines and get found by your target clients.',
    icon: <Search className="h-8 w-8 text-primary" />
  },
  {
    title: 'Website Maintenance',
    description: 'Ongoing support, updates, and secure hosting for your peace of mind.',
    icon: <Settings className="h-8 w-8 text-primary" />
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Our Services" subtitle="Everything you need to grow your modern brand." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <div key={index} className="bg-background p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-headline mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
