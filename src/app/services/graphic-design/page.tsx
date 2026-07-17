import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import SeoServicePage from '@/components/public/seo-service-page';
import { Palette, PenTool, Image as ImageIcon, Briefcase, FileText, Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Graphic Design Services | Creative Logos & Marketing Assets',
  description: 'PK Creative provides custom graphic design services starting at ₹10,000. Professional brand logos, business cards, flyers, and digital marketing graphics.',
  alternates: {
    canonical: '/services/graphic-design',
  },
};

export default async function GraphicDesignServicesPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    {
      title: 'Custom Brand Logos',
      description: 'Handcrafted, high-resolution vector logos that capture your business identity.',
      icon: <PenTool className="h-6 w-6" />,
    },
    {
      title: 'Marketing & Ad Creatives',
      description: 'Engaging banners, social media advertisements, and promotional digital cards.',
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      title: 'Business Stationery Design',
      description: 'Professional business cards, letterheads, and corporate envelope assets.',
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: 'Marketing Brochures & Flyers',
      description: 'Print-ready catalog layouts, brochures, menus, and marketing collateral.',
      icon: <Layers className="h-6 w-6" />,
    },
    {
      title: 'Vector Art & Illustration',
      description: 'Tailor-made digital icons, mascot illustrations, and vector design templates.',
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: 'Corporate Presentation Slides',
      description: 'Elegant pitch decks, sales presentations, and investor PDF slide layouts.',
      icon: <Briefcase className="h-6 w-6" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Creative Briefing',
      description: 'We discuss your design expectations, reference styles, color preferences, and core marketing goals.',
    },
    {
      step: '02',
      title: 'Concept Drafting',
      description: 'Our design team prepares 2-3 initial sketches/layouts for your feedback and iteration.',
    },
    {
      step: '03',
      title: 'Vectorization & Polishing',
      description: 'We refine the chosen design in professional tools, ensuring geometric balance and exact typography.',
    },
    {
      step: '04',
      title: 'Final Assets Delivery',
      description: 'We deliver your designs in all standard file formats (SVG, PNG, PDF, AI) with full commercial usage rights.',
    },
  ];

  const faqs = [
    {
      question: 'What source file formats do you deliver?',
      answer: 'We provide full source files, including vector formats like Adobe Illustrator (AI), EPS, and SVG, alongside high-quality PNGs, JPEGs, and print-ready PDFs.',
    },
    {
      question: 'How many revisions are included in a design project?',
      answer: 'We typically include 3 to 5 rounds of revisions in our standard packages. We collaborate closely with you to ensure the final output matches your vision.',
    },
    {
      question: 'What is the starting price for graphic design packages?',
      answer: 'Our professional graphic design packages start at ₹10,000. This can cover full logo identity packages, promotional brochure designs, or a suite of social media marketing banners.',
    },
    {
      question: 'Do I own the copyright to the final designs?',
      answer: 'Yes! Once full payment is cleared, the intellectual property rights and copyrights are transferred completely to you. You are free to use them commercially.',
    },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      keywordTitle="Graphic Design Services"
      keywordSubtitle="Capture attention and build brand trust with custom, high-end graphic layout designs starting at ₹10,000."
      introductionText={`At PK Creative, we understand that high-quality visuals speak louder than words. We combine modern typography, balanced layouts, and customized illustrations to help your business stand out from competitors.

Whether you need a brand new vector logo for your startup, sales presentation decks, or print-ready brochures for local marketing, we deliver creative assets that drive results.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
