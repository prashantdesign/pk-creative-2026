import React from 'react';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import { Metadata } from 'next';
import WorkTabs from './work-tabs';
import PageHero from '@/components/public/page-hero';

export const metadata: Metadata = {
  title: 'Our Work | PK Creative',
  description: 'View our portfolio of projects and gallery of creative work.',
};

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16">
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
