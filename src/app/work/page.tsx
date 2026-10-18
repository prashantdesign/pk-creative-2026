import React from 'react';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import { Metadata } from 'next';
import WorkTabs from './work-tabs';
import PageHero from '@/components/public/page-hero';
import JsonLd from '@/components/json-ld';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'Our Work | Website, Branding & Design Portfolio | PK Creative',
  description: 'Browse the PK Creative portfolio: websites, branding, UI/UX and graphic design projects delivered for modern brands across India.',
  path: '/work',
  keywords: ['web design portfolio', 'branding portfolio', 'PK Creative projects'],
});

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Our Work', description: 'PK Creative portfolio', path: '/work', type: 'CollectionPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]),
        ]}
      />
      <Header />
      <main id="main-content" className="flex-1 pb-16">
        <PageHero
          eyebrow="Portfolio"
          title="Our Work"
          description="Explore our latest projects and creative gallery."
        />
        <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
            <WorkTabs />
        </section>
      </main>
      <Footer />
    </div>
  );
}
