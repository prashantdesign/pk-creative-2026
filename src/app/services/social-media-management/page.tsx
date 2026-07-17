import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import SeoServicePage from '@/components/public/seo-service-page';
import { Calendar, Instagram, Film, FileCode, Users, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Social Media Management | Creative Content & Account Growth',
  description: 'PK Creative offers full social media management starting at ₹10,000. Curated Instagram grids, reels video editing, content planning, and target audience engagement.',
  alternates: {
    canonical: '/services/social-media-management',
  },
};

export default async function SocialMediaManagementPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    {
      title: 'Curated Grid Design',
      description: 'Stunning visual grids designed specifically to reflect your brand identity on Instagram and LinkedIn.',
      icon: <Instagram className="h-6 w-6" />,
    },
    {
      title: 'Short-Form Video Editing',
      description: 'Engaging Reels, Shorts, and TikTok video edits with trending sound synchronization and animated subtitles.',
      icon: <Film className="h-6 w-6" />,
    },
    {
      title: 'Interactive Content Planning',
      description: 'Drafting custom post copy, research-backed hashtags, and post scheduling setups.',
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: 'Custom Brand Templates',
      description: 'Creating reusable Canva or Photoshop templates to maintain consistency across post variations.',
      icon: <FileCode className="h-6 w-6" />,
    },
    {
      title: 'Audience Engagement',
      description: 'Active comment moderation, direct message (DM) templates creation, and niche-community building.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Monthly Growth Metrics',
      description: 'Detailed analytics reports detailing impressions, link clicks, profile visits, and follower gains.',
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Content Strategy Audit',
      description: 'We analyze your current social media channels, target demographics, and competitor feeds to build a custom content matrix.',
    },
    {
      step: '02',
      title: 'Monthly Planning & Calendar',
      description: 'We prepare a monthly calendar defining topics, copywriting hooks, and visual formats (graphics vs videos) for your approval.',
    },
    {
      step: '03',
      title: 'Creative Asset Production',
      description: 'We edit video assets, design graphics, and write compelling post copy aligned with the plan.',
    },
    {
      step: '04',
      title: 'Posting & Performance Review',
      description: 'We publish posts during peak audience hours, monitor reactions, and review data to optimize content for next month.',
    },
  ];

  const faqs = [
    {
      question: 'What is the starting price for social media packages?',
      answer: 'Our social media packages start at ₹10,000 per month. This covers strategy auditing, custom grid design layouts, reels video editing, copy creation, and monthly report summaries.',
    },
    {
      question: 'Do you manage organic follow growth?',
      answer: 'Yes! We focus on organic growth strategies. We optimize your profiles, research relevant keywords for SEO, create highly shareable reels, and engage with related accounts to attract real customers.',
    },
    {
      question: 'Will I need to provide photos and video clips?',
      answer: 'Yes, providing your product photos, room videos, or raw footage helps us capture the authenticity of your business. We then polish them, add graphics, captions, and trends to make them go viral.',
    },
    {
      question: 'Can you set up automatic message (DM) auto-responders?',
      answer: 'Yes. We set up smart keyword-based auto-responders (e.g. sending a pricing link when someone comments "PRICE" or "BOOK") to capture and nurture leads instantly.',
    },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      keywordTitle="Social Media Management"
      keywordSubtitle="Turn social followers into paying clients with custom visual feeds, reels video edits, and strategy planning starting at ₹10,000/month."
      introductionText={`In today's digital landscape, your social media profile acts as a second homepage. At PK Creative, we construct premium social strategies that showcase your products, room details, or services beautifully.

Whether you need curated aesthetic feeds, short-form reels editing to jump on viral algorithms, or content calendars that free up your schedule, we handle it all.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
