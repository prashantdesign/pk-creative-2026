import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import AboutSection from '@/components/public/about-section';
import SkillsSection from '@/components/public/skills-section';
import ToolsSection from '@/components/public/tools-section';
import StatsSection from '@/components/public/stats-section';
import PageHero from '@/components/public/page-hero';
import JsonLd from '@/components/json-ld';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'About PK Creative | Design & Development Agency in India',
  description: 'Learn about PK Creative: our story, design philosophy, custom Next.js engineering and the team building premium websites, brands and digital experiences.',
  path: '/about',
  keywords: ['about PK Creative', 'design agency India', 'web development team'],
});

export default async function AboutPage() {
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
          webPageJsonLd({ name: 'About PK Creative', description: 'About the PK Creative agency', path: '/about', type: 'AboutPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]),
        ]}
      />
      <Header content={siteContent} />
      
      <main id="main-content" className="flex-grow">
        <PageHero
          eyebrow="The Agency"
          title="About PK Creative"
          description="Creative Solutions For Modern Brands. Discover our story, expert capabilities, and client-centric vision."
        />

        <AboutSection content={siteContent} />
        <StatsSection content={siteContent} />
        <SkillsSection content={siteContent} />
        <ToolsSection content={siteContent} />
      </main>

      <Footer content={siteContent} />
    </div>
  );
}
