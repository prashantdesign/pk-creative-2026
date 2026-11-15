import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type GuideLink = { slug: string; title: string; category: string };

/** Server-rendered internal links from the home page to fresh guides (helps crawling and visitors). */
export default function LatestGuides({ guides }: { guides: GuideLink[] }) {
  if (!guides.length) return null;
  return (
    <section aria-labelledby="latest-guides" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 id="latest-guides" className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">Latest guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">See all guides</Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <li key={g.slug}>
              <Link
                href={`/blog/${g.slug}`}
                style={{ ['--i' as string]: i }}
                className="card-rise hover-lift group flex h-full flex-col gap-2 rounded-3xl border border-border bg-secondary/20 p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{g.category}</span>
                <span className="font-headline text-lg font-bold leading-snug group-hover:text-primary">{g.title}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">Read <ArrowUpRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
