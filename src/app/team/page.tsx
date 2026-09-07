import React from 'react';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import TeamGrid from './team-grid';
import PageHero from '@/components/public/page-hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team | PK Creative',
  description: 'Meet the creative minds behind PK Creative Agency.',
};

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16">
        <PageHero
          eyebrow="The Agency"
          title="Meet Our Team"
          description="A collective of designers, strategists, and creators dedicated to building impactful digital experiences."
        />
        <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <TeamGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
}
