"use client";

import React, { useState, useEffect } from 'react';
import type { SiteContent } from '@/types';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { MotionConfig } from 'framer-motion';

import Header from '@/components/public/header';
import HeroSection from '@/components/public/hero-section';
import AboutSection from '@/components/public/about-section';
import ServicesSection from '@/components/public/services-section';
import TargetAudienceSection from '@/components/public/target-audience-section';
import WebsiteShowcaseSection from '@/components/public/website-showcase-section';
import TestimonialsSection from '@/components/public/testimonials-section';
import ContactSection from '@/components/public/contact-section';
import Footer from '@/components/public/footer';

export default function HomeClient({ initialSiteContent }: { initialSiteContent: SiteContent | null }) {
  const firestore = useFirestore();

  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  
  // Use initialSiteContent as fallback during loading to prevent layout shifts and keep SSR HTML
  const { data: liveSiteContent } = useDoc<SiteContent>(siteContentRef);
  const siteContent = liveSiteContent || initialSiteContent;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  if (siteContent?.isMaintenanceModeEnabled) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Under Maintenance</h1>
          <p className="text-muted-foreground">My portfolio is currently undergoing some updates. Please check back soon!</p>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion={siteContent?.areAnimationsEnabled === false ? "always" : "user"}>
      <div className={`flex flex-col min-h-screen bg-background ${siteContent?.areAnimationsEnabled ? '' : 'no-animations'}`}>
        <Header content={siteContent} />
        <main className="flex-grow">
          <HeroSection content={siteContent} />
          <AboutSection content={siteContent} />
          {(siteContent?.isServicesSectionVisible ?? true) && <ServicesSection content={siteContent} />}
          {(siteContent?.isTargetAudienceSectionVisible ?? true) && <TargetAudienceSection content={siteContent} />}
          {(siteContent?.isWebsiteShowcaseVisible ?? true) && <WebsiteShowcaseSection content={siteContent} />}
          <ContactSection content={siteContent} />
          {(siteContent?.isTestimonialsSectionVisible ?? true) && <TestimonialsSection content={siteContent} />}
        </main>
        <Footer content={siteContent} />
      </div>
    </MotionConfig>
  );
}
