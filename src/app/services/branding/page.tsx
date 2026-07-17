import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import SeoServicePage from '@/components/public/seo-service-page';
import { Fingerprint, BookOpen, Compass, Award, Tag, ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Branding Services | Corporate Brand Identity Design',
  description: 'PK Creative offers complete branding services starting at ₹10,000. Brand style guides, logo packages, typography assets, and custom packaging designs.',
  alternates: {
    canonical: '/services/branding',
  },
};

export default async function BrandingServicesPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    {
      title: 'Brand Identity Design',
      description: 'Create a cohesive visual stamp with a unique logo system, sub-marks, and icons.',
      icon: <Fingerprint className="h-6 w-6" />,
    },
    {
      title: 'Brand Style Guidelines',
      description: 'Comprehensive brand books documenting color codes (HEX/RGB), typography scales, and logo usage rules.',
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: 'Corporate Tone & Voice',
      description: 'Defining communication style guides, email templates, and tagline suggestions.',
      icon: <Compass className="h-6 w-6" />,
    },
    {
      title: 'Typography Standards',
      description: 'Curating modern primary and secondary fonts to build strong visual hierarchy across print and digital media.',
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: 'Product Packaging Visuals',
      description: 'Creative design layouts for product boxes, bottles, wrapping labels, and paper carry bags.',
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      title: 'Brand Collateral Kits',
      description: 'Ready-to-print corporate merchandise templates (T-shirts, caps, mugs, badges, and tag labels).',
      icon: <Tag className="h-6 w-6" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Core Values Alignment',
      description: 'We explore your target market, competitor positioning, and brand personality to establish a strong positioning statement.',
    },
    {
      step: '02',
      title: 'Visual Identity Conception',
      description: 'Our design experts construct distinct logo marks, primary color schemes, and brand typography variations.',
    },
    {
      step: '03',
      title: 'Collateral & Asset Creation',
      description: 'We expand the core concept into secondary assets (business cards, letterheads, social grids, packaging layouts).',
    },
    {
      step: '04',
      title: 'Brand Guidelines Booklet',
      description: 'We compile all visual standards into a comprehensive Brand Style Guide PDF for easy handoff to your team.',
    },
  ];

  const faqs = [
    {
      question: 'What is a Brand Style Guide, and why is it needed?',
      answer: 'A Brand Style Guide is a reference manual that documents how your brand looks across different platforms. It defines color HEX codes, spacing rules, typography choices, and layout standards to ensure your brand always looks consistent and professional.',
    },
    {
      question: 'What is the starting price for branding services?',
      answer: 'Our corporate branding design packages start at ₹10,000. This includes logo marks, color schemes, typography curation, business stationery layouts, and a standard brand guidelines document.',
    },
    {
      question: 'Can you update or redesign an existing brand logo?',
      answer: 'Yes! We provide brand revitalization services. We can update your old logo assets, improve typography contrast, and build a unified design system around your updated mark.',
    },
    {
      question: 'Do you help with physical packaging design?',
      answer: 'We provide the vector files and flat layout drafts for product boxes, labels, and stickers. You can hand these files directly to your printing manufacturer.',
    },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      keywordTitle="Branding Services"
      keywordSubtitle="Build a lasting connection with your target clients through unified brand identity design systems starting at ₹10,000."
      introductionText={`A successful brand is more than just a logo—it is a unified customer experience. At PK Creative, we build complete corporate branding systems that reflect your values and create a professional first impression.

From color psychology and customized typography to product packaging outlines and complete Brand Books, we help your business build trust and charge premium prices.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
