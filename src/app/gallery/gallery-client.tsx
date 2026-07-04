'use client';

import React from 'react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteContent } from '@/types';

import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import GallerySection from '@/components/public/gallery-section';

export default function GalleryClient({ initialSiteContent }: { initialSiteContent: SiteContent | null }) {
  const firestore = useFirestore();

  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: liveSiteContent } = useDoc<SiteContent>(siteContentRef);
  const siteContent = liveSiteContent || initialSiteContent;

  return (
    <div className={`flex flex-col min-h-screen bg-background ${siteContent?.areAnimationsEnabled ? '' : 'no-animations'}`}>
      <Header content={siteContent || undefined} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6">
          <GallerySection content={siteContent || null} />
        </div>
      </main>
      <Footer content={siteContent || null} />
    </div>
  );
}
