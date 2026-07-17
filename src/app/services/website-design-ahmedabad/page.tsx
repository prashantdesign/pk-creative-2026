import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import SeoServicePage from '@/components/public/seo-service-page';
import { Layout, Shield, Search, Cpu, Globe, Rocket } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Website Design Ahmedabad | Custom Web Development Agency',
  description: 'PK Creative offers premium website design in Ahmedabad starting at ₹10,000. Custom landing pages, listing portals, and booking systems with simple admin panels.',
  alternates: {
    canonical: '/services/website-design-ahmedabad',
  },
};

export default async function WebsiteDesignAhmedabadPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    {
      title: 'Mobile-Responsive UX',
      description: 'Stunning layouts that render flawlessly across iPhones, tablets, and desktops.',
      icon: <Layout className="h-6 w-6" />,
    },
    {
      title: 'Integrated Admin Panel',
      description: 'Add, update, or edit listings, rooms, or catalog items instantly without coding.',
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: 'Local SEO Engineering',
      description: 'Optimized page markup and local schema tags to rank high on Ahmedabad local search.',
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: 'Next.js App Router Speed',
      description: 'Engineered for near-instant load speeds to decrease bounce rates and boost rankings.',
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: 'Custom Google Maps Integration',
      description: 'Make it easy for local clients in Ahmedabad to discover your physical address.',
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: '1-Click Leads to Email',
      description: 'Receive customer inquiries directly in your inbox the second they submit a form.',
      icon: <Rocket className="h-6 w-6" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Local Market Discovery',
      description: 'We research your local competitors in Ahmedabad to identify keyword gaps and layout trends that drive conversions.',
    },
    {
      step: '02',
      title: 'Wireframes & Brand Alignment',
      description: 'We draft interactive wireframes using your preferred brand colors (like our premium purple theme) and typography.',
    },
    {
      step: '03',
      title: 'Full Stack Development',
      description: 'We build your application using clean Next.js architecture, Tailwind CSS, and secure database connections.',
    },
    {
      step: '04',
      title: 'Local SEO & Launch',
      description: 'We deploy to Vercel/App Hosting, verify local sitemap tags, and submit your new URLs directly to Google Search Console.',
    },
  ];

  const faqs = [
    {
      question: 'What is the cost of website design in Ahmedabad?',
      answer: 'Our professional web design packages start at a flat rate of ₹10,000. This includes custom branding layout, responsive layouts, a secure admin panel, contact leads integration, and basic local SEO setup.',
    },
    {
      question: 'Do you create real estate or catalog sites for local Ahmedabad businesses?',
      answer: 'Yes! We specialize in custom listings sites for real estate agencies, restaurant digital menus, homestay catalogs, and product directories. All sites include an easy admin panel to manage files.',
    },
    {
      question: 'How long does it take to launch a website?',
      answer: 'A standard local business website or custom landing page is typically fully designed, developed, and deployed within 3 to 7 business days.',
    },
    {
      question: 'Can I edit the website contents myself?',
      answer: 'Absolutely. We set up a protected admin panel dashboard so you can upload images, write descriptions, and update prices in real-time without needing any developer.',
    },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      keywordTitle="Website Design Ahmedabad"
      keywordSubtitle="Capture local leads and bypass high portal commissions with custom, fast-loading business websites starting at ₹10,000."
      introductionText={`PK Creative is your trusted website development partner in Ahmedabad. We build custom-coded, high-performance landing pages and web apps designed to convert visitors into paying clients.

From real estate brokers in Prahlad Nagar and SG Highway to local boutiques in C.G. Road and cafes in Vastrapur, we ensure your business ranks at the top of local searches. Our websites are built with clean code and no bloated templates, guaranteeing maximum speed and professional aesthetics.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
