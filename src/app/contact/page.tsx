import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import ContactSection from '@/components/public/contact-section';
import PageHero from '@/components/public/page-hero';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us | Hire Web Design & Branding Agency - PK Creative',
  description: 'Get in touch with PK Creative to discuss website design, branding, graphic design, social media, or SEO services. Reply to info@pkcreative.in.',
  alternates: {
    canonical: '/contact',
  },
};

export default async function ContactPage() {
  const siteContent = await getInitialSiteContent();

  if (siteContent?.isMaintenanceModeEnabled) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Under Maintenance</h1>
        <p className="text-muted-foreground">My portfolio is currently undergoing some updates. Please check back soon!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header content={siteContent} />
      
      <main className="flex-grow">
        <PageHero
          eyebrow="Get in touch"
          title="Let's Build Together"
          description="Have a project in mind? We'd love to collaborate. Fill out the form below or reach us directly at info@pkcreative.in."
        />

        <ContactSection content={siteContent} />
      </main>

      <Footer content={siteContent} />
    </div>
  );
}
