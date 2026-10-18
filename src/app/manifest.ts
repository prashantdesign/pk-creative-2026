import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PK Creative | Website Design, Branding & SEO Agency',
    short_name: 'PK Creative',
    description: 'PK Creative - Website Design, UI/UX, Branding and Social Media Management for modern brands.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'en-IN',
    categories: ['business', 'design', 'productivity'],
    background_color: '#111111',
    theme_color: '#612af5',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
