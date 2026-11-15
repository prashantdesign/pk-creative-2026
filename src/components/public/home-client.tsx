"use client";

import React, { useState, useEffect } from 'react';
import type { SiteContent } from '@/types';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';

import Header from '@/components/public/header';
import HeroSection from '@/components/public/hero-section';
import AboutSection from '@/components/public/about-section';
const ServicesSection = dynamic(() => import('@/components/public/services-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const TargetAudienceSection = dynamic(() => import('@/components/public/target-audience-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const WebsiteShowcaseSection = dynamic(() => import('@/components/public/website-showcase-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const TestimonialsSection = dynamic(() => import('@/components/public/testimonials-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const ContactSection = dynamic(() => import('@/components/public/contact-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const ProcessSection = dynamic(() => import('@/components/public/process-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const WhyUsSection = dynamic(() => import('@/components/public/why-us-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
const CtaBanner = dynamic(() => import('@/components/public/cta-banner'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
import ServiceStrip from '@/components/public/service-strip';
const FAQSection = dynamic(() => import('@/components/public/faq-section'), { loading: () => <div className="min-h-[360px]" aria-hidden /> });
import Footer from '@/components/public/footer';

export default function HomeClient({ initialSiteContent, guides = null }: { initialSiteContent: SiteContent | null; guides?: React.ReactNode }) {
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
        <main id="main-content" className="flex-grow">
          <HeroSection content={siteContent} />
          <AboutSection content={siteContent} />
          <ServiceStrip />
          {(siteContent?.isServicesSectionVisible ?? true) && <ServicesSection content={siteContent} />}
          <WhyUsSection />
          {(siteContent?.isTargetAudienceSectionVisible ?? true) && <TargetAudienceSection content={siteContent} />}
          <ProcessSection />
          {(siteContent?.isWebsiteShowcaseVisible ?? true) && <WebsiteShowcaseSection content={siteContent} />}
          <CtaBanner />
          <FAQSection />
          <ContactSection content={siteContent} />
          {(siteContent?.isTestimonialsSectionVisible ?? true) && <TestimonialsSection content={siteContent} />}
          {guides}
        </main>
        <Footer content={siteContent} />
      </div>
    </MotionConfig>
  );
}
