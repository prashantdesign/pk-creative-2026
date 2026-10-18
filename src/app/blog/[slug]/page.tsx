import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, absoluteUrl, SITE_URL } from '@/lib/seo';
import { POSTS, getPost } from '@/lib/posts';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import JsonLd from '@/components/json-ld';
import { ArrowRight, Clock } from 'lucide-react';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = buildMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}`, keywords: post.keywords });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.date } };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const siteContent = await getInitialSiteContent();
  const path = `/blog/${post.slug}`;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: absoluteUrl(path),
            image: absoluteUrl('/opengraph-image'),
            author: { '@id': `${SITE_URL}/#organization` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            inLanguage: 'en-IN',
          },
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/blog' }, { name: post.title, path }]),
        ]}
      />
      <Header content={siteContent} />
      <main id="main-content" className="flex-1 pb-20">
        <article className="container mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a> / <a href="/blog" className="hover:text-primary">Guides</a>
          </nav>
          <h1 className="font-headline text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time> · {post.readMinutes} min read
          </p>
          <p className="mt-8 text-lg leading-relaxed text-foreground/90">{post.intro}</p>
          {post.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-headline text-2xl font-bold tracking-tight">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{para}</p>
              ))}
              {s.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
          <aside className="mt-14 rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
            <h2 className="font-headline text-xl font-bold">Want this done for you?</h2>
            <p className="mt-2 text-muted-foreground">Websites from ₹10,000 with an admin panel and SEO included. Get a free quote within one business day.</p>
            <a href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Get a free quote <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {post.related.map((r) => (
                <a key={r.href} href={r.href} className="rounded-full border border-border px-4 py-1.5 hover:border-primary/40 hover:text-primary">{r.label}</a>
              ))}
            </div>
          </aside>
        </article>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
