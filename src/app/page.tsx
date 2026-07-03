import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import type { SiteContent } from '@/types';
import HomeClient from '@/components/public/home-client';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let initialSiteContent: SiteContent | null = null;
  
  try {
    // Fetch data server-side for perfect SEO indexing
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    const snap = await getDoc(doc(db, 'pkcreative_siteContent', 'global'));
    
    if (snap.exists()) {
      initialSiteContent = snap.data() as SiteContent;
    }
  } catch (error) {
    console.error("Error fetching initial site content for SSR:", error);
  }

  // Pass the fetched data to the Client Component for hydration
  return <HomeClient initialSiteContent={initialSiteContent} />;
}