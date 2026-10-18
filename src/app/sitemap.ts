import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Static lastModified dates so crawlers are not told "everything changed today" on every request.
// Bump a date when that page's content meaningfully changes.
const routes = [
  { path: '', priority: 1.0, changeFreq: 'weekly' as const, lastModified: '2026-10-18' },
  { path: '/services', priority: 0.9, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/website-design-ahmedabad', priority: 0.9, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/website-design-rajasthan', priority: 0.9, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/ui-ux-design', priority: 0.8, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/branding', priority: 0.8, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/graphic-design', priority: 0.8, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/social-media-management', priority: 0.8, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/services/seo', priority: 0.8, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/work', priority: 0.8, changeFreq: 'weekly' as const, lastModified: '2026-10-18' },
  { path: '/about', priority: 0.7, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/contact', priority: 0.7, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
  { path: '/gallery', priority: 0.6, changeFreq: 'weekly' as const, lastModified: '2026-10-18' },
  { path: '/team', priority: 0.5, changeFreq: 'monthly' as const, lastModified: '2026-10-18' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
