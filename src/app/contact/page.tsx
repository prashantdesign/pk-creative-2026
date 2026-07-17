import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import ContactSection from '@/components/public/contact-section';

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
      
      <main className="flex-grow pt-20">
        <div className="py-12 bg-secondary/10 border-b border-border/40 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground mb-4">
              Get In Touch
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
              Have a project in mind? We would love to collaborate. Fill out the contact form below or reach us directly at info@pkcreative.in.
            </p>
          </div>
        </div>

        <ContactSection content={siteContent} />
      </main>

      <Footer content={siteContent} />
    </div>
  );
}
