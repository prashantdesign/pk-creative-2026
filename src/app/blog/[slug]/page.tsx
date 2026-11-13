import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, absoluteUrl, SITE_URL } from '@/lib/seo';
import { POSTS, getPost, wordCount } from '@/lib/posts';
import { getCategory } from '@/content/categories';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import JsonLd from '@/components/json-ld';
import RichText, { slugifyHeading } from '@/components/blog/rich-text';
import { ArrowRight, Clock } from 'lucide-react';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const meta = buildMetadata({ title: `${post.title} | PK Creative`, description: post.description, path, keywords: post.keywords, image: `${path}/opengraph-image` });
  return {
    ...meta,
    authors: [{ name: 'PK Creative', url: SITE_URL }],
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.date, modifiedTime: post.date, section: getCategory(post.category)?.name, authors: ['PK Creative'] },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const siteContent = await getInitialSiteContent();
  const path = `/blog/${post.slug}`;
  const cat = getCategory(post.category)!;
  const moreInCategory = POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const internal = post.related.filter((r) => r.href.startsWith('/') && !r.href.startsWith('/blog/'));
  const sibling = post.related.filter((r) => r.href.startsWith('/blog/'));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
            image: absoluteUrl(`${path}/opengraph-image`),
            author: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'PK Creative' },
            publisher: { '@id': `${SITE_URL}/#organization` },
            articleSection: cat.name,
            keywords: post.keywords.join(', '),
            wordCount: wordCount(post),
            inLanguage: 'en-IN',
          },
          ...(post.faq?.length ? [faqJsonLd(post.faq.map((f) => ({ question: f.q, answer: f.a })))] : []),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/blog' },
            { name: cat.name, path: `/blog/category/${cat.slug}` },
            { name: post.title, path },
          ]),
        ]}
      />
      <Header content={siteContent} />
      <main id="main-content" className="flex-1 pb-20">
        <article className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link> / <Link href="/blog" className="hover:text-primary">Guides</Link> /{' '}
            <Link href={`/blog/category/${cat.slug}`} className="hover:text-primary">{cat.name}</Link>
          </nav>
          <h1 className="font-headline text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
            <span>·</span> <span>{post.readMinutes} min read</span> <span>·</span> <span>By PK Creative</span>
          </p>
          <p className="mt-8 text-lg leading-relaxed text-foreground/90"><RichText text={post.intro} /></p>

          {post.sections.length > 3 && (
            <nav aria-label="In this article" className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5">
              <p className="text-sm font-semibold">In this article</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                {post.sections.map((s) => (
                  <li key={s.heading}><a href={`#${slugifyHeading(s.heading)}`} className="hover:text-primary">{s.heading}</a></li>
                ))}
              </ol>
            </nav>
          )}

          {post.sections.map((s) => (
            <section key={s.heading} className="mt-10" aria-labelledby={slugifyHeading(s.heading)}>
              <h2 id={slugifyHeading(s.heading)} className="scroll-mt-24 font-headline text-2xl font-bold tracking-tight">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-3 leading-relaxed text-muted-foreground"><RichText text={para} /></p>
              ))}
              {s.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
                  {s.list.map((li) => <li key={li}><RichText text={li} /></li>)}
                </ul>
              )}
            </section>
          ))}

          {post.faq && post.faq.length > 0 && (
            <section className="mt-12" aria-labelledby="faq">
              <h2 id="faq" className="font-headline text-2xl font-bold tracking-tight">Frequently asked questions</h2>
              <dl className="mt-4 divide-y divide-border">
                {post.faq.map((f) => (
                  <div key={f.q} className="py-4">
                    <dt className="font-semibold">{f.q}</dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground"><RichText text={f.a} /></dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <ul aria-label="Topics" className="mt-10 flex flex-wrap gap-2">
            {post.keywords.map((k) => (
              <li key={k} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{k}</li>
            ))}
          </ul>

          <aside className="mt-14 rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
            <h2 className="font-headline text-xl font-bold">Want this done for you?</h2>
            <p className="mt-2 text-muted-foreground">PK Creative builds fast websites from ₹10,000 with an admin panel and SEO basics included. Tell us what you need and get a free quote within one business day.</p>
            <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
              Get a free quote <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {internal.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {internal.map((r) => (
                  <Link key={r.href} href={r.href} className="rounded-full border border-border px-4 py-1.5 hover:border-primary/40 hover:text-primary">{r.label}</Link>
                ))}
              </div>
            )}
          </aside>

          {(sibling.length > 0 || moreInCategory.length > 0) && (
            <section className="mt-12" aria-labelledby="keep-reading">
              <h2 id="keep-reading" className="font-headline text-xl font-bold">Keep reading</h2>
              <ul className="mt-4 space-y-2">
                {(sibling.length ? sibling : moreInCategory.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))).map((r) => (
                  <li key={r.href}><Link href={r.href} className="text-primary hover:underline">{r.label}</Link></li>
                ))}
              </ul>
              <p className="mt-4 text-sm"><Link href={`/blog/category/${cat.slug}`} className="text-muted-foreground hover:text-primary">More {cat.name.toLowerCase()} guides →</Link></p>
            </section>
          )}
        </article>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
