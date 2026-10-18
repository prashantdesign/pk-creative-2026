import type { SiteContent } from '@/types';

export type SeoCheck = {
  id: string;
  label: string;
  hint: string;
  passed: boolean;
  weight: number;
};

type Seo = NonNullable<SiteContent['seoSettings']>;

/** Lightweight on-page SEO health check driven by what is saved in the admin panel. */
export function evaluateSeo(seo: Seo | undefined, content?: Partial<SiteContent> | null): { score: number; checks: SeoCheck[] } {
  const s = seo || {};
  const title = (s.metaTitle || '').trim();
  const desc = (s.metaDescription || '').trim();
  const keywords = (s.keywords || '').split(',').map((k) => k.trim()).filter(Boolean);

  const checks: SeoCheck[] = [
    { id: 'title', label: 'Meta title is 30-60 characters', hint: `Currently ${title.length}. Titles in this range are not truncated in Google results.`, passed: title.length >= 30 && title.length <= 60, weight: 15 },
    { id: 'desc', label: 'Meta description is 70-160 characters', hint: `Currently ${desc.length}. Write a benefit-led summary with a call to action.`, passed: desc.length >= 70 && desc.length <= 160, weight: 15 },
    { id: 'keywords', label: 'At least 5 target keywords', hint: `Currently ${keywords.length}. Include service + city phrases such as "website design Ahmedabad".`, passed: keywords.length >= 5, weight: 8 },
    { id: 'og', label: 'Social share (Open Graph) image set', hint: 'Shown when your link is shared on WhatsApp, LinkedIn, X and Facebook.', passed: !!s.ogImageUrl, weight: 8 },
    { id: 'gsc', label: 'Google Search Console verified', hint: 'Paste the verification code so Google can report indexing and rankings.', passed: !!s.googleSiteVerification, weight: 14 },
    { id: 'ga', label: 'Google Analytics connected', hint: 'Add your GA4 measurement ID (G-XXXXXXXXXX) to measure traffic.', passed: !!s.gaTrackingId, weight: 8 },
    { id: 'phone', label: 'Business phone added', hint: 'Used in LocalBusiness schema so Google can show your contact details.', passed: !!s.phone, weight: 8 },
    { id: 'address', label: 'Business city & address added', hint: 'Strengthens local SEO ("near me" and city searches).', passed: !!(s.city && (s.streetAddress || s.postalCode)), weight: 8 },
    { id: 'social', label: 'Social profiles linked', hint: 'Instagram / LinkedIn / X profiles feed the sameAs property in your schema.', passed: !!(content?.socials?.instagram || content?.socials?.linkedin || content?.socials?.twitter || (s.sameAs && s.sameAs.length)), weight: 6 },
    { id: 'hero', label: 'Homepage headline filled in', hint: 'The H1 of your homepage is the strongest on-page relevance signal.', passed: !!content?.heroTitle, weight: 5 },
    { id: 'maint', label: 'Site is not in maintenance mode', hint: 'Maintenance mode hides your pages from visitors and search engines.', passed: !content?.isMaintenanceModeEnabled, weight: 5 },
  ];

  const total = checks.reduce((a, c) => a + c.weight, 0);
  const earned = checks.filter((c) => c.passed).reduce((a, c) => a + c.weight, 0);
  return { score: Math.round((earned / total) * 100), checks };
}
