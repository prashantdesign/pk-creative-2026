import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import SeoServicePage from '@/components/public/seo-service-page';
import { BarChart, Search, Zap, Code, ShieldCheck, Link2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'SEO Services | Rank Higher on Google Search Results',
  description: 'PK Creative offers complete search engine optimization (SEO) services starting at ₹10,000. On-page optimization, site speed tuning, sitemaps, and local search rankings.',
  alternates: {
    canonical: '/services/seo',
  },
};

export default async function SeoServicesPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    {
      title: 'Local Keyword Research',
      description: 'Find high-intent search terms (like local service/location keywords) that buy-ready clients are actively typing.',
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: 'Next.js Speed Tuning',
      description: 'Optimizing image load metrics and core web vitals to ensure perfect search indexing priority.',
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: 'On-Page Content Tuning',
      description: 'Structuring tag hierarchies (H1, H2), text densities, and image alt descriptions safely without keyword stuffing.',
      icon: <BarChart className="h-6 w-6" />,
    },
    {
      title: 'Technical Schema Markup',
      description: 'Creating customized JSON-LD structured data to show stars, prices, and FAQs directly inside Google Search listings.',
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: 'Link Intersect Building',
      description: 'Internal anchor-text mapping and strategies to earn authoritative external references and link signals.',
      icon: <Link2 className="h-6 w-6" />,
    },
    {
      title: 'Console Audit & Verification',
      description: 'Registering xml sitemaps, indexing pages, and setting up Google Search Console tracking dashboards.',
      icon: <ShieldCheck className="h-6 w-6" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'SEO Performance Audit',
      description: 'We run deep crawls to check your site speed, mobile usability, indexing bugs, and keyword gaps.',
    },
    {
      step: '02',
      title: 'Strategic Keyword Mapping',
      description: 'We group targeted search queries and assign them to specific pages, planning custom layouts for each service.',
    },
    {
      step: '03',
      title: 'Code & Content Optimization',
      description: 'We rewrite titles, compress media files, integrate schemas, and improve code structures for instant loading.',
    },
    {
      step: '04',
      title: 'Indexing & Tracking Setup',
      description: 'We submit your sitemaps to search engines and configure real-time tracking (Google Analytics and Search Console).',
    },
  ];

  const faqs = [
    {
      question: 'What is the starting price for SEO optimization packages?',
      answer: 'Our professional SEO setup packages start at a flat rate of ₹10,000. This includes search audits, custom keyword mapping, metadata writing, schema markup integrations, and sitemap submissions.',
    },
    {
      question: 'How long does it take to see results from SEO?',
      answer: 'Unlike paid ads, SEO is an organic, long-term growth engine. Most businesses start noticing changes in keywords positions and organic clicks within 4 to 8 weeks after deployment.',
    },
    {
      question: 'What is Schema Markup, and does it help?',
      answer: 'Schema Markup (JSON-LD) is structured code added to your website header to help search bots understand its category. Adding this enables Google to display rich results, such as room prices, review stars, or FAQ accordions, right on the search page, boosting click-through rates.',
    },
    {
      question: 'Will you audit my Google Search Console records?',
      answer: 'Yes! We link your domain to Google Search Console and monitor indexation records, search queries, and crawling errors to ensure Google indexes all your pages.',
    },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      keywordTitle="SEO Services"
      keywordSubtitle="Boost your search discoverability and drive organic customer leads with search-engine-optimized layouts starting at ₹10,000."
      introductionText={`Having a website is useless if no one can find it on the web. At PK Creative, we build technical search engine optimization (SEO) foundations that help your agency or local business rank at the top of Google.

We write clean, lightweight markup using Next.js, structure schema files properly, and optimize page load speeds so search engine crawlers rank your page over bloated competitor templates.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
