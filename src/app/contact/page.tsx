import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import ContactSection from '@/components/public/contact-section';
import PageHero from '@/components/public/page-hero';
import JsonLd from '@/components/json-ld';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'Contact PK Creative | Get a Free Website & Branding Quote',
  description: 'Get in touch with PK Creative to discuss website design, branding, graphic design, social media or SEO. Free quote, reply within one business day.',
  path: '/contact',
  keywords: ['contact web design agency', 'hire website designer India', 'free website quote'],
});

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
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Contact PK Creative', description: 'Contact the PK Creative team', path: '/contact', type: 'ContactPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
        ]}
      />
      <Header content={siteContent} />
      
      <main id="main-content" className="flex-grow">
        <PageHero
          eyebrow="Get in touch"
          title="Let's Build Together"
          description="Have a project in mind? We'd love to collaborate. Fill out the form below or reach us directly at info@pkcreative.in."
        />

        <ContactSection content={siteContent} hideHeader />
      </main>

      <Footer content={siteContent} />
    </div>
  );
}
