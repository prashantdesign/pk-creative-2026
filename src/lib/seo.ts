import type { SiteContent } from '@/types';

export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://pkcreative.in').replace(/\/$/, '');
export const SITE_NAME = 'PK Creative';
export const DEFAULT_TITLE = 'PK Creative | Website Design, Branding & SEO Agency in India';
export const DEFAULT_DESCRIPTION =
  'PK Creative is a premium creative agency in India offering custom website design from ₹10,000, UI/UX, branding, graphic design, SEO and social media management for modern brands.';
export const DEFAULT_KEYWORDS = [
  'website design agency India',
  'website design Ahmedabad',
  'website design Rajasthan',
  'web development company',
  'UI UX design',
  'branding agency',
  'graphic design',
  'social media management',
  'SEO services India',
  'Next.js website developer',
  'PK Creative',
];
export const DEFAULT_OG_IMAGE = '/opengraph-image';

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const SERVICE_LINKS = [
  { label: 'Website Design Ahmedabad', href: '/services/website-design-ahmedabad' },
  { label: 'Website Design Rajasthan', href: '/services/website-design-rajasthan' },
  { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  { label: 'Branding', href: '/services/branding' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'Social Media Management', href: '/services/social-media-management' },
  { label: 'SEO Services', href: '/services/seo' },
];

export const HOME_FAQS = [
  {
    question: 'What is your starting price for a website?',
    answer:
      'Our custom website designs start at ₹10,000. Unlike traditional templates, this baseline package includes a fully integrated, custom admin panel (CMS) so you can easily manage and update your content without touching code.',
  },
  {
    question: 'What features are included in the ₹10k package?',
    answer:
      'The starter package covers a custom layout design, responsive mobile optimization, a secure contact form, fundamental SEO indexing, and an intuitive administrative dashboard to update website texts, images, and links.',
  },
  {
    question: 'Do you offer e-commerce and complex web applications?',
    answer:
      'Absolutely! We design and develop e-commerce systems, database integrations, client portals, and custom web platforms. These are custom-quoted depending on your design pages, transactional needs, and module complexity.',
  },
  {
    question: 'How long does a website project take to deliver?',
    answer:
      'A standard landing page or business website typically takes 7 to 10 business days to design and launch. Large-scale web applications or specialized e-commerce setups usually take 3 to 6 weeks depending on details.',
  },
  {
    question: 'Will my website rank on Google?',
    answer:
      'Every site we build ships with clean semantic markup, fast Core Web Vitals, structured data (JSON-LD), an XML sitemap and Search Console setup, which gives you the strongest technical foundation for ranking. Rankings also depend on content and competition, and our SEO service covers that ongoing work.',
  },
];

type Seo = NonNullable<SiteContent['seoSettings']>;

const socialUrls = (content?: SiteContent | null) => {
  const s = content?.socials;
  return [s?.instagram, s?.linkedin, s?.twitter, ...(content?.seoSettings?.sameAs || [])].filter(
    (u): u is string => !!u && /^https?:\/\//.test(u)
  );
};

export function organizationJsonLd(content?: SiteContent | null) {
  const seo: Seo = content?.seoSettings || {};
  const logo = content?.logoUrl || absoluteUrl('/icon-512x512.png');
  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: content?.siteName || SITE_NAME,
    alternateName: ['PK Creative', 'PK Creative Agency', 'pkcreative.in'],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: logo },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: seo.metaDescription || DEFAULT_DESCRIPTION,
    priceRange: seo.priceRange || '₹10,000+',
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'AdministrativeArea', name: 'Gujarat' },
      { '@type': 'AdministrativeArea', name: 'Rajasthan' },
      { '@type': 'City', name: 'Ahmedabad' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: seo.streetAddress || undefined,
      addressLocality: seo.city || 'Ahmedabad',
      addressRegion: seo.region || 'Gujarat',
      postalCode: seo.postalCode || undefined,
      addressCountry: 'IN',
    },
    email: content?.socials?.email || seo.businessEmail || undefined,
    telephone: seo.phone || undefined,
    sameAs: socialUrls(content),
    knowsAbout: [
      'Website design',
      'Web development',
      'UI/UX design',
      'Branding',
      'Graphic design',
      'Social media management',
      'Search engine optimization',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Creative & digital services',
      itemListElement: SERVICE_LINKS.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.label, url: absoluteUrl(s.href) },
      })),
    },
  };
  if (seo.latitude && seo.longitude) {
    business.geo = { '@type': 'GeoCoordinates', latitude: seo.latitude, longitude: seo.longitude };
  }
  return business;
}

export function websiteJsonLd(content?: SiteContent | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: content?.siteName || SITE_NAME,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceJsonLd(opts: { name: string; description: string; path: string; area?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: opts.area ? { '@type': 'AdministrativeArea', name: opts.area } : { '@type': 'Country', name: 'India' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '10000',
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: 10000 },
    },
  };
}

export function webPageJsonLd(opts: { name: string; description: string; path: string; type?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type || 'WebPage',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

/** Shared per-page metadata builder: canonical, OpenGraph and Twitter in one place. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
}) {
  const image = opts.image || DEFAULT_OG_IMAGE;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.path,
      siteName: SITE_NAME,
      type: 'website' as const,
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: opts.title,
      description: opts.description,
      images: [image],
    },
    ...(opts.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
