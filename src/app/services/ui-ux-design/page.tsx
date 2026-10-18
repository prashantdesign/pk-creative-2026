import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata } from '@/lib/seo';
import SeoServicePage from '@/components/public/seo-service-page';
import { Layers, PenTool, Smartphone, Users, Eye, Gauge } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'UI/UX Design Services in India | Websites & App Interfaces',
  description:
    'PK Creative designs conversion-focused UI/UX for websites, web apps and mobile interfaces. User research, wireframes, interactive prototypes and design systems starting at ₹10,000.',
  path: '/services/ui-ux-design',
  keywords: ['UI UX design India', 'UI UX design agency', 'website UI design', 'app interface design', 'design system', 'wireframes and prototypes'],
});

export default async function UiUxDesignPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    { title: 'User Research & Flows', description: 'We map who your customers are and how they move through your product so every screen has a clear job.', icon: <Users className="h-6 w-6" /> },
    { title: 'Wireframes & Prototypes', description: 'Low and high-fidelity layouts you can click through before a single line of production code is written.', icon: <Layers className="h-6 w-6" /> },
    { title: 'Visual Interface Design', description: 'Typography, colour and motion systems that feel premium and stay consistent across every page.', icon: <PenTool className="h-6 w-6" /> },
    { title: 'Mobile-First Layouts', description: 'Interfaces designed for thumbs first, then scaled up beautifully to tablets and desktops.', icon: <Smartphone className="h-6 w-6" /> },
    { title: 'Accessibility & Usability', description: 'Readable contrast, keyboard friendly flows and clear hierarchy so more people can convert.', icon: <Eye className="h-6 w-6" /> },
    { title: 'Performance-Aware Design', description: 'Designs planned around real loading budgets so beautiful never means slow.', icon: <Gauge className="h-6 w-6" /> },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery & Goals', description: 'We align on your audience, competitors and the exact actions the interface should drive.' },
    { step: '02', title: 'Structure & Wireframes', description: 'Information architecture and wireframes establish the layout before any styling begins.' },
    { step: '03', title: 'Visual Design & Prototype', description: 'We apply your brand, craft the components and deliver an interactive prototype for feedback.' },
    { step: '04', title: 'Handoff & Build Support', description: 'Developer-ready specs and a reusable component library, with optional build by our team.' },
  ];

  const faqs = [
    { question: 'How much does UI/UX design cost?', answer: 'UI/UX design for a business website starts at ₹10,000 including a custom layout and responsive screens. Larger products with many flows are quoted by scope.' },
    { question: 'Do you design mobile app interfaces too?', answer: 'Yes. We design iOS, Android and responsive web interfaces, including clickable prototypes for stakeholder and user testing.' },
    { question: 'Can you redesign my existing website?', answer: 'Absolutely. We audit your current site, keep what converts, and redesign the rest with a cleaner structure and modern visuals.' },
    { question: 'Will you also develop the design?', answer: 'Yes. Most clients take design and development together so the final site matches the design pixel for pixel and ships on a fast Next.js stack.' },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      path="/services/ui-ux-design"
      description="Conversion-focused UI/UX design for websites and apps: research, wireframes, prototypes and design systems from PK Creative."
      keywordTitle="UI/UX Design Services"
      keywordSubtitle="Interfaces that look premium, feel effortless and turn visitors into customers, starting at ₹10,000."
      introductionText={`Great UI/UX is the difference between a website people admire and a website people buy from. At PK Creative we design around real user behaviour, not guesswork.

Every project starts with your goals and audience, moves through wireframes and interactive prototypes, and ends with a polished, developer-ready design system you can keep growing.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
