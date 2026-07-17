import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import AboutSection from '@/components/public/about-section';
import SkillsSection from '@/components/public/skills-section';
import ToolsSection from '@/components/public/tools-section';
import StatsSection from '@/components/public/stats-section';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us | PK Creative Design & Development Agency',
  description: 'Learn more about PK Creative, our design philosophies, custom engineering, creative vision, and team of design specialists.',
  alternates: {
    canonical: '/about',
  },
};

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
      <Header content={siteContent} />
      
      <main className="flex-grow pt-20">
        <div className="py-12 bg-secondary/10 border-b border-border/40 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-foreground mb-4">
              About PK Creative
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
              Creative Solutions For Modern Brands. Discover our story, expert capabilities, and client-centric vision.
            </p>
          </div>
        </div>

        <AboutSection content={siteContent} />
        <StatsSection />
        <SkillsSection />
        <ToolsSection />
      </main>

      <Footer content={siteContent} />
    </div>
  );
}
