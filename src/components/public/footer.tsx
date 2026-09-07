'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Linkedin, Twitter, Instagram, Mail, MessageCircle, ArrowUpRight, ArrowUp } from 'lucide-react';
import Logo from '../logo';
import { Reveal } from '@/components/motion/reveal';
import Magnetic from '@/components/motion/magnetic';

import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const Footer = ({ content: initialContent }: { content?: SiteContent | null }) => {
  const firestore = useFirestore();
  const siteContentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null),
    [firestore]
  );
  const { data: fetchedContent } = useDoc<SiteContent>(siteContentRef);

  const content = initialContent || fetchedContent;
  const socialLinks = content?.socials;

  const socials = [
    socialLinks?.instagram && { icon: Instagram, href: socialLinks.instagram, label: 'Instagram' },
    socialLinks?.twitter && { icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
    socialLinks?.linkedin && { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    socialLinks?.email && { icon: Mail, href: `mailto:${socialLinks.email}`, label: 'Email' },
  ].filter(Boolean) as { icon: typeof Mail; href: string; label: string }[];

  const links = [
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/work' },
    ...(content?.isTeamSectionVisible !== false ? [{ label: 'Team', href: '/team' }] : []),
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/#contact' },
  ];

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (v: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-secondary/20">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
      />

      <div className="container relative z-10 mx-auto px-4 py-16 md:px-6 md:py-20">
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-border/50 pb-12 md:flex-row md:items-end">
          <h2 className="max-w-xl font-headline text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Let&apos;s build something{' '}
            <span className="text-gradient-primary">worth remembering.</span>
          </h2>
          <Magnetic>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start a project
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </Reveal>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-2 md:max-w-sm">
            <Logo siteName={content?.siteName} logoUrl={content?.logoUrl} />
            <p className="whitespace-pre-line text-sm text-muted-foreground sm:text-base">
              {content?.footerDescription ||
                'Creative Solutions For Modern Brands. \n Website Design • Branding • Social Media'}
            </p>
            <div className="mt-2 flex flex-col gap-1.5 text-sm font-medium">
              {socialLinks?.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" /> {socialLinks.email}
                </a>
              )}
              {socialLinks?.whatsapp && (
                <a
                  href={
                    socialLinks.whatsapp.startsWith('http')
                      ? socialLinks.whatsapp
                      : `https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-headline text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </h4>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-headline text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Social
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-4 border-t border-border/50 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row md:px-6">
        <p>
          {content?.footerCopyrightText ||
            `© ${new Date().getFullYear()} PK Creative. All Rights Reserved.`}
        </p>
        <button
          onClick={scrollTop}
          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
