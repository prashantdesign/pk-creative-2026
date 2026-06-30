"use client";

import React, { useState, useEffect } from 'react';
import type { Project, SiteContent } from '@/types';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

import Header from '@/components/public/header';
import HeroSection from '@/components/public/hero-section';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(() => import('@/components/public/services-section'));
const TargetAudienceSection = dynamic(() => import('@/components/public/target-audience-section'));
const WebsiteShowcaseSection = dynamic(() => import('@/components/public/website-showcase-section'));
const PortfolioSection = dynamic(() => import('@/components/public/portfolio-section'));
const TestimonialsSection = dynamic(() => import('@/components/public/testimonials-section'));
const ContactSection = dynamic(() => import('@/components/public/contact-section'));
const Footer = dynamic(() => import('@/components/public/footer'));
import ProjectModal from '@/components/public/project-modal';

export default function HomeClient({ initialSiteContent }: { initialSiteContent: SiteContent | null }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (siteContent?.isMaintenanceModeEnabled) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Under Maintenance</h1>
          <p className="text-muted-foreground">My portfolio is currently undergoing some updates. Please check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className={`flex flex-col min-h-screen bg-background ${siteContent?.areAnimationsEnabled ? '' : 'no-animations'}`}>
        <Header content={siteContent} />
        <main className="flex-grow">
          <HeroSection content={siteContent} />
          {(siteContent?.isServicesSectionVisible ?? true) && <ServicesSection content={siteContent} />}
          {(siteContent?.isTargetAudienceSectionVisible ?? true) && <TargetAudienceSection content={siteContent} />}
          {(siteContent?.isWebsiteShowcaseVisible ?? true) && <WebsiteShowcaseSection content={siteContent} />}
          {(siteContent?.isPortfolioSectionVisible ?? true) && <PortfolioSection content={siteContent} onProjectClick={handleProjectClick} />}
          {(siteContent?.isTestimonialsSectionVisible ?? true) && <TestimonialsSection content={siteContent} />}
          <ContactSection content={siteContent} />
        </main>
        <Footer content={siteContent} />
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}
