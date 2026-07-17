import { firebaseConfig } from '@/firebase/config';
import type { SiteContent } from '@/types';

export async function getInitialSiteContent(): Promise<SiteContent | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  // 1. Try loading via firebase-admin first (bypasses rules in production)
  try {
    const { initializeApp, getApps } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');
    
    const apps = getApps();
    const adminApp = apps.length === 0 ? initializeApp({ projectId }) : apps[0];
    const db = getFirestore(adminApp);
    const snap = await db.collection('pkcreative_siteContent').doc('global').get();
    if (snap.exists) {
      return snap.data() as SiteContent;
    }
  } catch (error) {
    console.warn("Server-side Admin SDK content fetch failed (normal in dev):", error);
  }

  // 2. Fallback to client REST fetch (with ISR cache revalidation)
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pkcreative_siteContent/global`;
    const response = await fetch(url, { next: { revalidate: 600 } }); // Cache for 10 minutes
    if (response.ok) {
      const data = await response.json();
      const fields = data.fields;
      if (fields) {
        return {
          siteName: fields.siteName?.stringValue || 'PK Creative',
          logoUrl: fields.logoUrl?.stringValue || '',
          theme: fields.theme?.stringValue || 'dark',
          areAnimationsEnabled: fields.areAnimationsEnabled?.booleanValue !== false,
          isMaintenanceModeEnabled: fields.isMaintenanceModeEnabled?.booleanValue === true,
          isServicesSectionVisible: fields.isServicesSectionVisible?.booleanValue !== false,
          isTeamSectionVisible: fields.isTeamSectionVisible?.booleanValue !== false,
          isWebsiteShowcaseVisible: fields.isWebsiteShowcaseVisible?.booleanValue !== false,
          isTestimonialsSectionVisible: fields.isTestimonialsSectionVisible?.booleanValue !== false,
          footerDescription: fields.footerDescription?.stringValue || '',
          footerCopyrightText: fields.footerCopyrightText?.stringValue || '',
        } as SiteContent;
      }
    }
  } catch (error) {
    console.error("Server-side REST fallback fetch failed:", error);
  }

  return null;
}
