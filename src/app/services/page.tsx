import React from 'react';
import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import PageHero from '@/components/public/page-hero';
import JsonLd from '@/components/json-ld';
import { ArrowUpRight, Monitor, Layout, PenTool, Palette, Share2, Search, MapPin } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: 'Services | Website Design, UI/UX, Branding, SEO & Social Media | PK Creative',
  description:
    'Explore PK Creative services: website design in Ahmedabad and Rajasthan, UI/UX design, branding, graphic design, SEO and social media management. Websites from ₹10,000.',
  path: '/services',
  keywords: ['digital agency services India', 'website design services', 'branding services', 'SEO services', 'social media management'],
});

const services = [
  { title: 'Website Design in Ahmedabad', href: '/services/website-design-ahmedabad', icon: MapPin, text: 'Custom, fast websites with a built-in admin panel for Ahmedabad businesses.' },
  { title: 'Website Design in Rajasthan', href: '/services/website-design-rajasthan', icon: Monitor, text: 'Booking-ready websites for hotels, homestays and local brands across Rajasthan.' },
  { title: 'UI/UX Design', href: '/services/ui-ux-design', icon: Layout, text: 'Research-led interfaces, prototypes and design systems that convert.' },
  { title: 'Branding', href: '/services/branding', icon: Palette, text: 'Logos, style guides and complete brand identities that get remembered.' },
  { title: 'Graphic Design', href: '/services/graphic-design', icon: PenTool, text: 'Social creatives, print collateral and marketing visuals with a premium finish.' },
  { title: 'Social Media Management', href: '/services/social-media-management', icon: Share2, text: 'Content calendars, creatives and community growth across platforms.' },
  { title: 'SEO Services', href: '/services/seo', icon: Search, text: 'Technical and local SEO that helps you rank and earn organic leads.' },
];

export default async function ServicesIndexPage() {
  const siteContent = await getInitialSiteContent();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[
          webPageJsonLd({ name: 'Services', description: 'All PK Creative services', path: '/services', type: 'CollectionPage' }),
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
        ]}
      />
      <Header content={siteContent} />
      <main id="main-content" className="flex-1 pb-16">
        <PageHero
          eyebrow="What we do"
          title="Services Built To Grow Your Brand"
          description="From a first website to a full brand and search presence, everything under one creative roof."
        />
        <section className="container mx-auto grid gap-5 px-4 py-14 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
          {services.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group glow-ring flex flex-col gap-4 rounded-3xl border border-border bg-secondary/20 p-6 transition-colors hover:border-primary/40 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h2 className="font-headline text-xl font-bold">{s.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </a>
          ))}
        </section>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
