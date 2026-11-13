import { CATEGORIES, getCategory } from '@/content/categories';
import { LEGACY_POSTS } from '@/content/posts/legacy';
import type { Post, RawPost } from '@/content/posts/types';
import { EXTRAS } from '@/content/posts/extras';
import { DEEPER_A } from '@/content/posts/deeper-a';
import { DEEPER_B } from '@/content/posts/deeper-b';
import { DEEPER_C } from '@/content/posts/deeper-c';
import { WEB_DESIGN } from '@/content/posts/web-design';
import { SEO } from '@/content/posts/seo';
import { LOCAL_SEO } from '@/content/posts/local-seo';
import { BRANDING } from '@/content/posts/branding';
import { UI_UX } from '@/content/posts/ui-ux';
import { SOCIAL_MEDIA } from '@/content/posts/social-media';
import { GRAPHIC_DESIGN } from '@/content/posts/graphic-design';
import { PERFORMANCE } from '@/content/posts/performance';
import { GROWTH } from '@/content/posts/growth';
import { ECOMMERCE } from '@/content/posts/ecommerce';

export type { Post, PostSection } from '@/content/posts/types';
export type BlogPost = Post & { category: string };

const BY_CATEGORY: Record<string, RawPost[]> = {
  'web-design': WEB_DESIGN,
  seo: SEO,
  'local-seo': LOCAL_SEO,
  branding: BRANDING,
  'ui-ux': UI_UX,
  'social-media': SOCIAL_MEDIA,
  'graphic-design': GRAPHIC_DESIGN,
  performance: PERFORMANCE,
  growth: GROWTH,
  ecommerce: ECOMMERCE,
};

const withExtras = (p: RawPost): RawPost => {
  const x = EXTRAS[p.slug];
  const deeper = DEEPER_A[p.slug] || DEEPER_B[p.slug];
  if (!x && !deeper && !DEEPER_C[p.slug]) return p;
  const sections = [...p.sections];
  const more = DEEPER_C[p.slug];
  const extra = [...(x?.sections || []), ...(deeper ? [deeper] : []), ...(more ? [more] : [])];
  if (extra.length) sections.splice(Math.max(1, sections.length - 1), 0, ...extra);
  return { ...p, sections, faq: x?.faq || p.faq };
};

const words = (p: RawPost) =>
  [p.intro, ...p.sections.flatMap((s) => [s.heading, ...s.body, ...(s.list || [])]), ...(p.faq || []).flatMap((f) => [f.q, f.a])].join(' ').split(/\s+/).filter(Boolean).length;

export const wordCount = (p: RawPost) => words(p);

// Publish dates run oldest -> newest, interleaving categories so the feed stays varied.
// Deterministic (no Date.now) so builds are stable and "date modified" never lies.
const START = Date.UTC(2026, 5, 1);
const STEP_DAYS = 1.45;
const isoDay = (i: number) => new Date(START + Math.round(i * STEP_DAYS) * 86400000).toISOString().slice(0, 10);

function build(): BlogPost[] {
  const queues = CATEGORIES.map((c) => ({ category: c.slug, items: [...(BY_CATEGORY[c.slug] || [])] }));
  const ordered: { raw: RawPost; category: string }[] = [];
  let left = true;
  while (left) {
    left = false;
    for (const q of queues) {
      const next = q.items.shift();
      if (next) {
        ordered.push({ raw: next, category: q.category });
        left = true;
      }
    }
  }

  const fresh = ordered.map(({ raw, category }, i) => ({ raw: withExtras(raw), category, date: isoDay(i) }));
  const all = [
    ...fresh,
    ...LEGACY_POSTS.map(({ category, date, ...raw }) => ({ raw: withExtras(raw as RawPost), category, date })),
  ];

  const inCategory = (c: string) => all.filter((a) => a.category === c);

  const posts = all.map(({ raw, category, date }): BlogPost => {
    const cat = getCategory(category)!;
    const siblings = inCategory(category).filter((a) => a.raw.slug !== raw.slug);
    // Pick neighbours around this post in the category so related links spread across the whole set
    const idx = inCategory(category).findIndex((a) => a.raw.slug === raw.slug);
    const picks = [1, 2, 3].map((n) => siblings[(idx + n * 2) % Math.max(siblings.length, 1)]).filter(Boolean);
    const unique = [...new Map(picks.map((p) => [p.raw.slug, p])).values()];
    const legacyRelated = (LEGACY_POSTS.find((l) => l.slug === raw.slug) as unknown as { related?: { label: string; href: string }[] })?.related;
    return {
      ...raw,
      category,
      date,
      readMinutes: Math.max(3, Math.round(words(raw) / 200)),
      related: [
        ...(legacyRelated || []),
        cat.service,
        ...unique.map((u) => ({ label: u.raw.title, href: `/blog/${u.raw.slug}` })),
      ].filter((v, i, a) => a.findIndex((x) => x.href === v.href) === i),
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export const POSTS: BlogPost[] = build();
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const postsByCategory = (slug: string) => POSTS.filter((p) => p.category === slug);
