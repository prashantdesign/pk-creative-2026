export type Category = {
  slug: string;
  name: string;
  /** Used as the category page H1 / meta description */
  title: string;
  description: string;
  /** The service page this topic feeds, for internal linking and CTAs */
  service: { label: string; href: string };
};

export const CATEGORIES: Category[] = [
  {
    slug: 'web-design',
    name: 'Website Design',
    title: 'Website Design & Development Guides',
    description: 'Practical guides on planning, designing and launching business websites in India: cost, pages, content, mobile design and what to ask your developer.',
    service: { label: 'Website design in Ahmedabad', href: '/services/website-design-ahmedabad' },
  },
  {
    slug: 'seo',
    name: 'SEO & Ranking',
    title: 'SEO & Google Ranking Guides',
    description: 'Clear, usable SEO advice for Indian businesses: keywords, on-page SEO, technical SEO, content, links and how to measure real results.',
    service: { label: 'SEO services', href: '/services/seo' },
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    title: 'Local SEO Guides for Ahmedabad, Gujarat & Rajasthan',
    description: 'Win "near me" searches: Google Business Profile, reviews, citations and local landing pages for city and regional businesses.',
    service: { label: 'Website design in Rajasthan', href: '/services/website-design-rajasthan' },
  },
  {
    slug: 'branding',
    name: 'Branding',
    title: 'Branding & Logo Design Guides',
    description: 'How to build a brand people remember: positioning, names, logos, colour, typography and brand guidelines for growing businesses.',
    service: { label: 'Branding services', href: '/services/branding' },
  },
  {
    slug: 'ui-ux',
    name: 'UI/UX Design',
    title: 'UI/UX Design Guides',
    description: 'Make websites and apps easier to use and easier to buy from: layout, navigation, forms, mobile UX, research and accessibility.',
    service: { label: 'UI/UX design', href: '/services/ui-ux-design' },
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    title: 'Social Media Marketing Guides',
    description: 'Instagram, LinkedIn, Facebook and YouTube advice for small businesses: content planning, reels, posting rhythm, ads and reporting.',
    service: { label: 'Social media management', href: '/services/social-media-management' },
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    title: 'Graphic Design Guides',
    description: 'Design that sells: brochures, packaging, posters, social creatives, print files and working well with a designer.',
    service: { label: 'Graphic design', href: '/services/graphic-design' },
  },
  {
    slug: 'performance',
    name: 'Speed & Performance',
    title: 'Website Speed & Core Web Vitals Guides',
    description: 'Make your website load fast: Core Web Vitals, images, fonts, hosting, caching and mobile performance explained plainly.',
    service: { label: 'Fast website design', href: '/services/website-design-ahmedabad' },
  },
  {
    slug: 'growth',
    name: 'Marketing & Growth',
    title: 'Digital Marketing & Lead Generation Guides',
    description: 'Turn visitors into enquiries: landing pages, WhatsApp, email, Google Ads, analytics and simple systems for steady leads.',
    service: { label: 'SEO services', href: '/services/seo' },
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & Web Apps',
    title: 'E-commerce & Web App Guides',
    description: 'Selling online in India: store platforms, payments, product pages, shipping, custom portals and when a web app is worth it.',
    service: { label: 'Website design in Ahmedabad', href: '/services/website-design-ahmedabad' },
  },
  {
    slug: 'industries',
    name: 'Industry Guides',
    title: 'Website & Marketing Guides by Industry',
    description: 'What a website should include for your type of business: clinics, restaurants, schools, manufacturers, shops and more, with SEO and marketing tips for each.',
    service: { label: 'Website design in Ahmedabad', href: '/services/website-design-ahmedabad' },
  },
  {
    slug: 'how-to',
    name: 'How-To & Tutorials',
    title: 'Step-by-Step Website & SEO Tutorials',
    description: 'Clear step-by-step tutorials: set up tools, fix common website and SEO problems and understand the terms you keep hearing.',
    service: { label: 'SEO services', href: '/services/seo' },
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
