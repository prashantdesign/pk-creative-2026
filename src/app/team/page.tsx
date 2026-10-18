import React from 'react';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import TeamGrid from './team-grid';
import PageHero from '@/components/public/page-hero';
import JsonLd from '@/components/json-ld';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'Meet the Team | Designers & Developers at PK Creative',
  description: 'Meet the designers, developers and strategists behind PK Creative, a creative agency building premium digital experiences.',
  path: '/team',
  keywords: ['PK Creative team', 'web designers', 'creative agency team India'],
});

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Our Team', description: 'The PK Creative team', path: '/team', type: 'AboutPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Team', path: '/team' }]),
        ]}
      />
      <Header />
      <main id="main-content" className="flex-1 pb-16">
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
