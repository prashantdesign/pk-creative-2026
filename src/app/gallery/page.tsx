import React from 'react';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import type { SiteContent } from '@/types';
import GalleryClient from './gallery-client';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery | PK Creative',
  description: 'Explore our visual portfolio, graphics showcase, and creative gallery projects.',
};

export default async function GalleryPage() {
  let initialSiteContent: SiteContent | null = null;
  
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    const snap = await getDoc(doc(db, 'pkcreative_siteContent', 'global'));
    
    if (snap.exists()) {
      initialSiteContent = snap.data() as SiteContent;
    }
  } catch (error) {
    console.error("Error fetching initial site content for Gallery SSR:", error);
  }

  return <GalleryClient initialSiteContent={initialSiteContent} />;
}
