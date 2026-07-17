import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import SeoServicePage from '@/components/public/seo-service-page';
import { Bed, Coins, Award, Star, Compass, ClipboardList } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Website Design Rajasthan | Hotel & Homestay Web Development',
  description: 'Premium website design in Rajasthan starting at ₹10,000. Direct booking pages, room galleries, and boutique portfolios for hotels in Jaipur, Udaipur, and Jodhpur.',
  alternates: {
    canonical: '/services/website-design-rajasthan',
  },
};

export default async function WebsiteDesignRajasthanPage() {
  const siteContent = await getInitialSiteContent();

  const features = [
    {
      title: 'Direct Booking Engine',
      description: 'Capture room inquiries and direct guest stays without paying 15-20% OTA commission fees.',
      icon: <Bed className="h-6 w-6" />,
    },
    {
      title: 'Heritage Style Layouts',
      description: 'Elegant, modern visual aesthetics optimized to highlight the royal vibe of Rajasthan properties.',
      icon: <Compass className="h-6 w-6" />,
    },
    {
      title: 'Room & Amenity Galleries',
      description: 'Showcase rooms, pools, and local guides in high-definition responsive visual carousels.',
      icon: <Star className="h-6 w-6" />,
    },
    {
      title: 'SEO Structured Snippets',
      description: 'JSON-LD schema configuration to index your room rates and reviews directly on Google Search.',
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: 'Zero Platform Cost',
      description: 'No monthly fees. We write clean, optimized code that runs directly on free-tier platforms.',
      icon: <Coins className="h-6 w-6" />,
    },
    {
      title: 'Admin Room Inventory',
      description: 'Easily update room availability, pricing tiers, and details on a simple custom dashboard.',
      icon: <ClipboardList className="h-6 w-6" />,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Property Analysis',
      description: 'We explore your listing details on OTA platforms to extract key highlights and build a unified narrative.',
    },
    {
      step: '02',
      title: 'Responsive Mockups',
      description: 'We design tailored layouts to present rooms, amenities, location benefits, and testimonials beautifully.',
    },
    {
      step: '03',
      title: 'Direct Lead Integration',
      description: 'We code custom enquiry forms that forward reservation details directly to your email instantly.',
    },
    {
      step: '04',
      title: 'Optimization & SEO Launch',
      description: 'We optimize image sizes for ultra-fast loading over mobile networks and publish to Google Search.',
    },
  ];

  const faqs = [
    {
      question: 'How does a direct website save commission costs?',
      answer: 'Third-party portals (OTAs like Booking.com or Agoda) take 15% to 22% commission on every room reservation. By leading clients to book directly on your own website, you save that entire fee, increasing your net margins.',
    },
    {
      question: 'What is the starting price for a hotel website in Rajasthan?',
      answer: 'Our custom-coded hotel and homestay website packages start at ₹10,000. This covers a home page layout, room showcase tabs, integrated booking forms, map directories, and complete admin management systems.',
    },
    {
      question: 'Do you create portfolios for local handicraft boutiques?',
      answer: 'Yes! We build stunning visual catalogs for boutique textile shops, jewelry designers, and craft studios in Rajasthan. These feature admin panels to manage collections.',
    },
    {
      question: 'Will the website load fast in rural resort areas?',
      answer: 'Absolutely. We code websites using Next.js and static site rendering, meaning pages load almost instantly even on slower mobile network connections in desert resort spots.',
    },
  ];

  return (
    <SeoServicePage
      siteContent={siteContent}
      keywordTitle="Website Design Rajasthan"
      keywordSubtitle="Build custom direct-booking pages and responsive portfolios for hotels, homestays, and boutiques in Rajasthan starting at ₹10,000."
      introductionText={`PK Creative is the leading design partner for the hospitality and tourism sectors in Rajasthan. We create beautiful, responsive website layouts that capture the unique cultural charm of Udaipur, Jaipur, Jodhpur, and Jaisalmer.

If you own a heritage guesthouse, boutique homestay, or desert luxury camp, relying solely on high-commission travel portals drains your revenue. We provide direct room booking layouts and visual catalogs that direct clients straight to your inbox.`}
      features={features}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
