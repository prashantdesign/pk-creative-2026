import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pkcreative.in';

  const routes = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/gallery', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/team', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/work', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/services/website-design-ahmedabad', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/services/website-design-rajasthan', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/services/graphic-design', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/branding', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/social-media-management', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/services/seo', priority: 0.8, changeFreq: 'weekly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
