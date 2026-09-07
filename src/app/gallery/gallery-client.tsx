'use client';

import React from 'react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteContent } from '@/types';

import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import GallerySection from '@/components/public/gallery-section';
import PageHero from '@/components/public/page-hero';

export default function GalleryClient({ initialSiteContent }: { initialSiteContent: SiteContent | null }) {
  const firestore = useFirestore();

  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: liveSiteContent } = useDoc<SiteContent>(siteContentRef);
  const siteContent = liveSiteContent || initialSiteContent;

  return (
    <div className={`flex flex-col min-h-screen bg-background ${siteContent?.areAnimationsEnabled ? '' : 'no-animations'}`}>
      <Header content={siteContent || undefined} />
      <main className="flex-grow">
        <PageHero
          eyebrow="Showcase"
          title={siteContent?.gallerySectionTitle || 'Creative Gallery'}
          description={
            siteContent?.gallerySectionDescription ||
            'A visual portfolio of graphics, campaigns, and brand work.'
          }
        />
        <GallerySection content={siteContent || null} hideHeader />
      </main>
      <Footer content={siteContent || null} />
    </div>
  );
}
