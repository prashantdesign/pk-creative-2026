import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd, absoluteUrl } from '@/lib/seo';
import { POSTS, postsByCategory } from '@/lib/posts';
import { CATEGORIES } from '@/content/categories';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import PageHero from '@/components/public/page-hero';
import PostCard from '@/components/blog/post-card';
import JsonLd from '@/components/json-ld';

export const revalidate = 3600;

const base = buildMetadata({
  title: 'Guides | Website, SEO & Branding Tips for Indian Businesses',
  description: `${POSTS.length}+ practical guides on website design cost, SEO, local search, branding, UI/UX, social media and speed from the PK Creative team in Ahmedabad.`,
  path: '/blog',
  keywords: ['website design guides', 'SEO tips India', 'web design blog', 'digital marketing guides India'],
});
export const metadata: Metadata = {
  ...base,
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/feed.xml' } },
};

export default async function BlogIndex() {
  const siteContent = await getInitialSiteContent();
  const latest = POSTS.slice(0, 12);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Guides', description: 'PK Creative guides', path: '/blog', type: 'CollectionPage' }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: latest.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/blog/${p.slug}`), name: p.title })),
          },
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/blog' }]),
        ]}
      />
      <Header content={siteContent} />
      <main id="main-content" className="flex-1 pb-16">
        <PageHero eyebrow="Guides" title="Grow with better websites" description="Straight answers on website cost, SEO, branding and marketing, written for Indian businesses." />

        <section aria-labelledby="topics" className="container mx-auto px-4 pt-4 md:px-6">
          <h2 id="topics" className="sr-only">Browse by topic</h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
                  {c.name} <span className="ml-2 text-xs text-muted-foreground">{postsByCategory(c.slug).length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="latest" className="container mx-auto px-4 py-12 md:px-6">
          <h2 id="latest" className="mb-6 font-headline text-2xl font-bold tracking-tight">Latest guides</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>

        <div className="container mx-auto space-y-12 px-4 md:px-6">
          {CATEGORIES.map((c) => (
            <section key={c.slug} aria-labelledby={`cat-${c.slug}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-3">
                <h2 id={`cat-${c.slug}`} className="font-headline text-xl font-bold tracking-tight">{c.name}</h2>
                <Link href={`/blog/category/${c.slug}`} className="text-sm font-semibold text-primary hover:underline">All {c.name.toLowerCase()} guides</Link>
              </div>
              <ul className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                {postsByCategory(c.slug).slice(0, 6).map((p) => (
                  <li key={p.slug}><Link href={`/blog/${p.slug}`} className="block py-1 text-muted-foreground hover:text-primary">{p.title}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
