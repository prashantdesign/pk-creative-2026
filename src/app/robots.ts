import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pkcreative.in';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/pk-admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
