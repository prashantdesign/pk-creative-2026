import React from 'react';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import TeamGrid from './team-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team | PK Creative',
  description: 'Meet the creative minds behind PK Creative Agency.',
};

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                    The Agency
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Meet Our Team</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We are a collective of designers, strategists, and creators dedicated to building impactful digital experiences.
                </p>
            </div>
            
            <TeamGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
}
