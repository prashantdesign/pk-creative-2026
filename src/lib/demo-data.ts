import type { Project, ProjectCategory, GalleryCategory, GalleryImage, SiteContent } from '@/types';
import { Timestamp } from 'firebase/firestore';

const now = Timestamp.now();

// --- SITE CONTENT ---
export const DEMO_SITE_CONTENT: Omit<SiteContent, 'id'> = {
  siteName: 'PK Creative',
  heroTitle: 'We are PK Creative',
  heroSubtitle: 'Creative Solutions For Modern Brands. We deliver premium Website Design, UI/UX, Branding, and Social Media Management.',
  ctaText: 'Our Services',
  ctaLink: '#services',
  socials: {
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/pkcreative.in',
    email: 'info@pkcreative.in'
  },
  theme: 'light',
  isMaintenanceModeEnabled: false,
  areAnimationsEnabled: true,
  isGallerySectionVisible: true,
  isPortfolioSectionVisible: true,
  isServicesSectionVisible: true,
  isTestimonialsSectionVisible: true,
  isWebsiteShowcaseVisible: true,
  websiteShowcaseTitle: "Websites We've Built",
  websiteShowcaseDescription: "Check out some of the live websites we've designed and developed.",
  services: [
    { title: 'Website Design & Dev', description: 'Business, Portfolio, and E-commerce websites built with modern technologies.', icon: 'monitor' },
    { title: 'UI/UX Design', description: 'Beautiful, intuitive user interfaces and landing pages that convert.', icon: 'layout' },
    { title: 'Branding & Identity', description: 'Logo design, business profiles, and complete brand identity systems.', icon: 'pen-tool' },
    { title: 'Social Media Management', description: 'Engaging post designs, festival creatives, and marketing campaigns.', icon: 'smartphone' },
    { title: 'SEO Optimization', description: 'Rank higher on search engines and get found by your target clients.', icon: 'search' },
    { title: 'Website Maintenance', description: 'Ongoing support, updates, and secure hosting for your peace of mind.', icon: 'settings' }
  ],
  servicesSectionTitle: 'Our Services',
  servicesSectionDescription: 'Everything you need to grow your modern brand.',
  targetAudience: [
    'Hotels & Resorts', 'Safari Camps', 'Restaurants & Cafes', 'Bakeries', 'Jewellery Brands', 'Local Businesses', 'Startups', 'Coaches & Consultants', 'Educational Institutes', 'Service-Based Businesses'
  ],
  targetAudienceSectionTitle: 'Who We Help',
  targetAudienceSectionDescription: 'We partner with ambitious brands across various industries to deliver outstanding digital experiences.',
  testimonialsSectionTitle: 'Client Stories',
  testimonialsSectionDescription: 'Hear what our partners have to say about working with us.',
  testimonials: [
    {
      name: 'Priya Sharma',
      role: 'Founder, The Lotus Spa',
      content: 'PK Creative completely transformed our online presence. Our bookings increased by 40% in just two months!',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Rohan Desai',
      role: 'Marketing Head, UrbanEats',
      content: 'Their branding work was phenomenal. They understood our vision perfectly and delivered a highly engaging social media strategy.',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Ananya Verma',
      role: 'CEO, TechNova Solutions',
      content: 'Professional, creative, and highly dedicated. The new website they developed for us is not only beautiful but incredibly fast.',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ],
  contactSectionTitle: 'Get in Touch',
  contactSectionDescription: 'Have a project in mind or just want to say hello? Drop us a line.',
  footerDescription: 'Creative Solutions For Modern Brands.\nWebsite Design • Branding • Social Media',
  footerCopyrightText: '© 2026 PK Creative. All Rights Reserved.',
  aiSettings: {
    isAiFeatureEnabled: true,
    geminiModel: 'models/gemini-1.5-flash',
  }
};

// --- PROJECT DATA ---
export const DEMO_PROJECT_CATEGORIES: Omit<ProjectCategory, 'id'>[] = [
  { name: 'Branding', order: 1 },
  { name: 'UI/UX', order: 2 },
  { name: 'Print Design', order: 3 },
  { name: 'Motion Graphics', order: 4 },
];

export const DEMO_PROJECTS_RAW = [
  {
    title: 'Aura Branding',
    description: 'A complete branding and identity design for a new-age wellness company.',
    categoryName: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1711779323810-c12e1df42816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YWJzdHJhY3QlMjBicmFuZGluZ3xlbnwwfHx8fDE3Njk1MjU1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    projectImages: [
      'https://images.unsplash.com/photo-1762365189058-7be5b07e038b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8YnJhbmQlMjBtYXRlcmlhbHN8ZW58MHx8fHwxNzY5NTMxMDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwcm9qZWN0JTIwbWVldGluZ3xlbnwwfHx8fDE3Njk2NTg5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    toolsUsed: 'Figma, Illustrator, Photoshop',
    order: 1,
    problem: 'Aura, a new wellness startup, needed a strong brand identity to stand out in a crowded market. They lacked a visual language that communicated their values of tranquility, nature, and modern science.',
    solution: 'We developed a comprehensive brand system, including a new logo, color palette inspired by natural gradients, and custom typography. The identity was applied across all digital and print materials, from the website to packaging, creating a cohesive and calming user experience.',
    outcome: 'The new branding was met with overwhelmingly positive feedback, leading to a 40% increase in online engagement and successfully positioning Aura as a premium and trustworthy wellness brand.',
  },
  {
    title: 'SocialFeed App',
    description: 'A UI/UX design project for a mobile social media application.',
    categoryName: 'UI/UX',
    imageUrl: 'https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8fDE3Njk0OTY2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    projectImages: [
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx1aSUyMHdpcmVmcmFtZXxlbnwwfHx8fDE3Njk2NjAxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    toolsUsed: 'Figma, Spline',
    order: 2,
    problem: 'Existing social media apps were becoming cluttered and overwhelming for users. There was a need for a simpler, more intuitive interface focused on meaningful connections.',
    solution: 'We designed a minimalist UI centered around a chronological feed and direct messaging. By removing complex algorithms and intrusive ads, the user experience became more focused and enjoyable. Interactive prototypes were built in Figma to test and refine the user flow.',
    outcome: 'User testing showed a 95% satisfaction rate with the new design. The streamlined interface was praised for its ease of use and focus on content, proving that less can be more in social media design.',
  },
  {
    title: 'The Modernist Magazine',
    description: 'Print and layout design for a quarterly architecture magazine.',
    categoryName: 'Print Design',
    imageUrl: 'https://images.unsplash.com/photo-1616080808758-b8a2fc2ec5d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwcmludCUyMGRlc2lnbnxlbnwwfHx8fDE3Njk1MzEwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    projectImages: [],
    toolsUsed: 'InDesign, Photoshop',
    order: 3,
    problem: 'The Modernist needed a fresh layout that reflected its content—bold, clean, and contemporary architecture. The previous design felt dated and failed to engage a younger audience.',
    solution: 'A new grid system was established, emphasizing white space and strong typographic hierarchy. We introduced a dynamic photo-led approach to feature articles, making the magazine more visually compelling. The cover design was also revamped to be more iconic and collectible.',
    outcome: 'The redesign contributed to a 25% increase in subscriptions and a significant boost in social media mentions. The magazine is now seen as a leader in design and has won several print design awards.',
  },
  {
    title: 'Fintech Dashboard',
    description: 'A data-driven UI/UX project for a financial analytics platform.',
    categoryName: 'UI/UX',
    imageUrl: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx1aSUyMGRlc2lnbnxlbnwwfHx8fDE3Njk0OTI4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    projectImages: [],
    toolsUsed: 'Figma, After Effects',
    order: 4,
    problem: 'Financial analysts were struggling with complex, hard-to-navigate software. They needed a dashboard that could present vast amounts of data in a clear, actionable, and customizable way.',
    solution: 'We designed a modular dashboard where users could drag and drop widgets to create their own workspace. Data visualization was a key focus, with interactive charts and graphs that make complex data easy to understand. A dark mode was also implemented to reduce eye strain during long hours of use.',
    outcome: 'The new dashboard design reduced the time to find critical information by 60% and became the platform\'s most praised feature, directly contributing to a higher customer retention rate.',
  }
].map(p => ({...p, createdAt: now, updatedAt: now}));

// --- GALLERY DATA ---
export const DEMO_GALLERY_CATEGORIES: Omit<GalleryCategory, 'id'>[] = [
  { name: 'Abstract', order: 1 },
  { name: 'Architecture', order: 2 },
  { name: 'Nature', order: 3 },
];

export const DEMO_GALLERY_IMAGES_RAW = [
  {
    title: 'Colorful Shapes',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGFydHxlbnwwfHx8fDE3Njk2NjA1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryName: 'Abstract',
    order: 1,
  },
  {
    title: 'Geometric Patterns',
    imageUrl: 'https://images.unsplash.com/photo-1518976029331-2303b38121b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnZW9tZXRyaWMlMjBwYXR0ZXJufGVufDB8fHx8MTc2OTY2MDU5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    categoryName: 'Abstract',
    order: 2,
  },
  {
    title: 'Modern Facade',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzY5NjYwNjE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryName: 'Architecture',
    order: 3,
  },
  {
    title: 'Misty Forest',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzY5NjYwNjczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryName: 'Nature',
    order: 4,
  },
   {
    title: 'Clean Interior',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxpbnRlcmlvciUyMGRlc2lnbnxlbnwwfHx8fDE3Njk2NjA2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryName: 'Architecture',
    order: 5,
  },
  {
    title: 'Spring Bloom',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmbG93ZXJ8ZW58MHx8fHwxNzY5NjYwNjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    categoryName: 'Nature',
    order: 6,
  }
].map(p => ({...p, createdAt: now, updatedAt: now}));
