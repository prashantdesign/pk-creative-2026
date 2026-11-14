import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd, absoluteUrl } from '@/lib/seo';
import { postsByCategory } from '@/lib/posts';
import { CATEGORIES, getCategory } from '@/content/categories';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import PageHero from '@/components/public/page-hero';
import PostCard from '@/components/blog/post-card';
import JsonLd from '@/components/json-ld';

export const revalidate = 3600;
export const dynamicParams = false;

export const generateStaticParams = () => CATEGORIES.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const cat = getCategory((await params).category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.title} | PK Creative`,
    description: cat.description,
    path: `/blog/category/${cat.slug}`,
    keywords: [cat.name.toLowerCase(), `${cat.name.toLowerCase()} guides India`, 'PK Creative'],
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const cat = getCategory((await params).category);
  if (!cat) notFound();
  const posts = postsByCategory(cat.slug);
  const siteContent = await getInitialSiteContent();
  const path = `/blog/category/${cat.slug}`;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          webPageJsonLd({ name: cat.title, description: cat.description, path, type: 'CollectionPage' }),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/blog/${p.slug}`), name: p.title })),
          },
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/blog' }, { name: cat.name, path }]),
        ]}
      />
      <Header content={siteContent} />
      <main id="main-content" className="flex-1 pb-16">
        <PageHero eyebrow={`${posts.length} guides`} title={cat.title} description={cat.description} />
        <section className="container mx-auto grid gap-5 px-4 py-10 md:grid-cols-2 md:px-6 lg:grid-cols-3">
          {posts.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
        </section>
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 pb-6 text-sm md:px-6">
          <Link href="/blog" className="rounded-full border border-border px-4 py-2 hover:border-primary/40 hover:text-primary">All guides</Link>
          <Link href={cat.service.href} className="rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">{cat.service.label}</Link>
        </div>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
