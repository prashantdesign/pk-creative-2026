import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';
import { POSTS } from '@/lib/posts';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import PageHero from '@/components/public/page-hero';
import JsonLd from '@/components/json-ld';
import { ArrowUpRight, Clock } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Guides | Website, SEO & Branding Tips for Indian Businesses',
  description: 'Practical guides on website design cost, hiring an agency, local SEO and fast websites from the PK Creative team.',
  path: '/blog',
  keywords: ['website design guides', 'SEO tips India', 'web design blog'],
});

export default async function BlogIndex() {
  const siteContent = await getInitialSiteContent();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Guides', description: 'PK Creative guides', path: '/blog', type: 'CollectionPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/blog' }]),
        ]}
      />
      <Header content={siteContent} />
      <main id="main-content" className="flex-1 pb-16">
        <PageHero eyebrow="Guides" title="Grow With Better Websites" description="Straight answers on website cost, SEO and choosing the right agency." />
        <section className="container mx-auto grid gap-5 px-4 py-14 md:grid-cols-2 md:px-6">
          {POSTS.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col gap-3 rounded-3xl border border-border bg-secondary/20 p-6 transition-colors hover:border-primary/40 sm:p-8">
              <span className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />{p.readMinutes} min read</span>
              <h2 className="font-headline text-xl font-bold leading-snug group-hover:text-primary">{p.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">Read guide <ArrowUpRight className="h-4 w-4" /></span>
            </a>
          ))}
        </section>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
