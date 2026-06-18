import React from 'react';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import { Metadata } from 'next';
import WorkTabs from './work-tabs';

export const metadata: Metadata = {
  title: 'Our Work | PK Creative',
  description: 'View our portfolio of projects and gallery of creative work.',
};

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Work</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    Explore our latest projects and creative gallery.
                </p>
            </div>
            
            <WorkTabs />
        </section>
      </main>
      <Footer />
    </div>
  );
}
