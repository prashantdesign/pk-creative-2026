export type PostSection = { heading: string; body: string[]; list?: string[] };
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  keywords: string[];
  intro: string;
  sections: PostSection[];
  related: { label: string; href: string }[];
};

export const POSTS: Post[] = [
  {
    slug: 'website-design-cost-in-india',
    title: 'Website Design Cost in India (2026): What ₹10,000 Gets You',
    description:
      'A clear 2026 breakdown of website design cost in India: template vs custom, what is included at ₹10,000, and what pushes prices up.',
    date: '2026-10-18',
    readMinutes: 5,
    keywords: ['website design cost in India', 'website development price India', 'how much does a website cost'],
    intro:
      'Quotes for the same website can range from ₹5,000 to ₹5,00,000. This guide explains what actually drives website design cost in India so you can compare proposals fairly.',
    sections: [
      {
        heading: 'Typical website design cost in India',
        body: ['Prices depend on how much is custom-built, how many pages you need and whether you need to edit content yourself.'],
        list: [
          '₹5,000-₹10,000: template-based brochure site, limited customisation.',
          '₹10,000-₹30,000: custom-designed business website with admin panel, contact form and basic SEO.',
          '₹30,000-₹1,00,000: larger sites, booking or catalogue systems, integrations, multiple languages.',
          '₹1,00,000+: e-commerce stores, client portals and custom web applications.',
        ],
      },
      {
        heading: 'What a ₹10,000 website should include',
        body: [
          'At PK Creative, dynamic websites start at ₹10,000 and include a custom layout, mobile-first responsive design, an admin panel to update text and images without code, a lead form that emails you, and the SEO fundamentals: clean metadata, sitemap and fast loading.',
          'If a quote leaves out the admin panel, mobile design or basic SEO, it is not comparable.',
        ],
      },
      {
        heading: 'What pushes the price up',
        body: ['Every extra module adds design and testing time.'],
        list: ['Number of unique page layouts', 'Online payments and e-commerce', 'Booking or listing systems', 'Custom animations and 3D', 'Content writing and photography', 'Ongoing SEO and maintenance'],
      },
      {
        heading: 'Hidden costs to ask about',
        body: [
          'Ask who owns the code and domain, what hosting costs per year, whether revisions are limited and what support is included after launch. Reliable agencies answer these in writing.',
        ],
      },
    ],
    related: [
      { label: 'Website design in Ahmedabad', href: '/services/website-design-ahmedabad' },
      { label: 'Website design in Rajasthan', href: '/services/website-design-rajasthan' },
    ],
  },
  {
    slug: 'how-to-choose-web-design-agency-ahmedabad',
    title: 'How to Choose a Web Design Agency in Ahmedabad: 7 Questions to Ask',
    description:
      'Hiring a website designer in Ahmedabad? Use these 7 questions about portfolio, SEO, pricing, ownership and support before you sign.',
    date: '2026-10-18',
    readMinutes: 4,
    keywords: ['web design agency Ahmedabad', 'website designer Ahmedabad', 'hire web developer Ahmedabad'],
    intro:
      'Ahmedabad has hundreds of freelancers and agencies. These seven questions help you separate the ones who deliver results from the ones who only deliver screenshots.',
    sections: [
      {
        heading: '1. Can I see live websites, not just mock-ups?',
        body: ['Open their portfolio sites on your phone. Check speed, readability and whether the site looks the same on mobile as on desktop.'],
      },
      {
        heading: '2. Is SEO built in?',
        body: ['Ask about page titles, structured data, sitemap, image optimisation and Core Web Vitals. SEO bolted on later costs more and works worse.'],
      },
      {
        heading: '3. Will I be able to edit the site myself?',
        body: ['A simple admin panel lets you change text, photos and prices without paying a developer each time.'],
      },
      {
        heading: '4. Who owns the code, design and domain?',
        body: ['You should. Get ownership in writing before paying the final instalment.'],
      },
      {
        heading: '5. What does the price include?',
        body: ['Compare scope, not totals: number of pages, revisions, mobile design, forms, SEO setup and training.'],
      },
      {
        heading: '6. How long will it take?',
        body: ['A business website typically takes 7-10 working days. Be wary of both 24-hour promises and three-month timelines for simple sites.'],
      },
      {
        heading: '7. What happens after launch?',
        body: ['Look for support, backups and a clear path to grow: SEO, ads and social media under one roof saves coordination time.'],
      },
    ],
    related: [
      { label: 'Website design Ahmedabad', href: '/services/website-design-ahmedabad' },
      { label: 'See our work', href: '/work' },
    ],
  },
  {
    slug: 'local-seo-checklist-small-business-india',
    title: 'Local SEO Checklist for Small Businesses in India (12 Steps)',
    description:
      'A practical 12-step local SEO checklist: Google Business Profile, NAP consistency, local schema, reviews and city landing pages.',
    date: '2026-10-18',
    readMinutes: 5,
    keywords: ['local SEO India', 'Google Business Profile', 'local SEO checklist', 'rank on Google Maps'],
    intro:
      'Local searches like "web designer near me" or "cafe in Vastrapur" convert far better than generic ones. This checklist covers what moves the needle.',
    sections: [
      {
        heading: 'Claim and complete your Google Business Profile',
        body: ['Choose the most accurate primary category, add services, hours, photos and a description. Post updates regularly.'],
      },
      {
        heading: 'Keep your name, address and phone identical everywhere',
        body: ['Use exactly the same business name, address and phone on your website, Google profile, Instagram and directories.'],
      },
      {
        heading: 'Build a fast, mobile-friendly website',
        body: ['Most local searches happen on phones. Pages that load in under 2.5 seconds rank and convert better.'],
      },
      {
        heading: 'Add local structured data',
        body: ['LocalBusiness schema tells Google your address, services and area served. PK Creative sites include it by default.'],
      },
      {
        heading: 'Create a page per service and per city you serve',
        body: ['Write genuinely useful pages, for example "Website Design in Ahmedabad", with real examples, pricing and FAQs. Avoid copy-pasted pages that only swap the city name.'],
      },
      {
        heading: 'Collect and answer reviews',
        body: ['Ask happy customers for a Google review right after delivery and reply to every review politely.'],
      },
      {
        heading: 'Submit your sitemap and track results',
        body: ['Verify the site in Google Search Console, submit sitemap.xml, request indexing for key pages and monitor queries weekly.'],
      },
    ],
    related: [
      { label: 'SEO services', href: '/services/seo' },
      { label: 'Contact us for a free audit', href: '/contact' },
    ],
  },
  {
    slug: 'why-nextjs-websites-rank-faster',
    title: 'Why Next.js Websites Load Faster and Rank Better',
    description:
      'How Next.js improves Core Web Vitals, crawlability and SEO compared with heavy page-builder templates.',
    date: '2026-10-18',
    readMinutes: 4,
    keywords: ['Next.js SEO', 'Core Web Vitals', 'fast website India', 'Next.js website developer'],
    intro:
      'Google measures real-user speed through Core Web Vitals. Sites built on Next.js start with big advantages in all three metrics.',
    sections: [
      {
        heading: 'Server-rendered HTML that crawlers can read',
        body: ['Pages arrive as complete HTML, so search engines and AI crawlers see your content immediately instead of waiting for JavaScript to build it.'],
      },
      {
        heading: 'Automatic image optimisation',
        body: ['Next.js serves AVIF/WebP at the right size for each device and lazy-loads below-the-fold images, improving Largest Contentful Paint.'],
      },
      {
        heading: 'Static generation with fresh content',
        body: ['Pages are pre-built and cached on a global CDN, then regenerated on a schedule. Visitors get instant loads while your admin edits still go live quickly.'],
      },
      {
        heading: 'Less JavaScript, better interaction',
        body: ['Code-splitting loads only what each page needs, which reduces Interaction to Next Paint and helps on budget phones.'],
      },
      {
        heading: 'Clean metadata and structured data',
        body: ['Built-in metadata APIs make canonical URLs, Open Graph tags and JSON-LD easy to apply consistently on every page.'],
      },
    ],
    related: [
      { label: 'Website design Ahmedabad', href: '/services/website-design-ahmedabad' },
      { label: 'SEO services', href: '/services/seo' },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
