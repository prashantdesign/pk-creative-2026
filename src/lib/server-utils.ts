import { cache } from 'react';
import type { SiteContent } from '@/types';

const DOC_PATH = 'pkcreative_siteContent/global';

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  timestampValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

/** Converts a Firestore REST "typed value" tree into plain JS. */
function decodeValue(v: FirestoreValue): unknown {
  if (v === undefined || v === null) return undefined;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue?.values || []).map(decodeValue);
  if ('mapValue' in v) return decodeFields(v.mapValue?.fields || {});
  return undefined;
}

function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));
}

/**
 * Loads the public site-content document on the server.
 *
 * Uses the Firestore REST API (public-read per firestore.rules) so it works on any host
 * (Vercel included) without service-account credentials, and is cached by the Next.js
 * data cache so pages can be statically regenerated instead of rendered per request.
 */
export const getInitialSiteContent = cache(async (): Promise<SiteContent | null> => {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${DOC_PATH}`;
    const response = await fetch(url, { next: { revalidate: 300, tags: ['site-content'] } });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data?.fields) return null;
    return decodeFields(data.fields) as unknown as SiteContent;
  } catch (error) {
    console.error('Failed to load site content on the server:', error);
    return null;
  }
});
