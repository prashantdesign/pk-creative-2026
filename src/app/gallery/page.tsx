import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/json-ld';
import GalleryClient from './gallery-client';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'Creative Gallery | Graphic Design & Branding Showcase | PK Creative',
  description: 'Explore the PK Creative gallery: graphic design, social media creatives, branding and campaign visuals crafted for modern brands.',
  path: '/gallery',
  keywords: ['graphic design gallery', 'branding showcase', 'social media creatives'],
});

export default async function GalleryPage() {
  const initialSiteContent = await getInitialSiteContent();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Creative Gallery', description: 'PK Creative gallery', path: '/gallery', type: 'CollectionPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }]),
        ]}
      />
      <GalleryClient initialSiteContent={initialSiteContent} />
    </>
  );
}
