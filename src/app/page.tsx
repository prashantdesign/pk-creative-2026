"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Project, SiteContent } from '@/types';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

import Header from '@/components/public/header';
import HeroSection from '@/components/public/hero-section';
import ServicesSection from '@/components/public/services-section';
import TargetAudienceSection from '@/components/public/target-audience-section';
import WebsiteShowcaseSection from '@/components/public/website-showcase-section';
import PortfolioSection from '@/components/public/portfolio-section';
import TestimonialsSection from '@/components/public/testimonials-section';
import ContactSection from '@/components/public/contact-section';
import Footer from '@/components/public/footer';
import ProjectModal from '@/components/public/project-modal';

import Preloader from '@/components/public/preloader';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const firestore = useFirestore();

  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading } = useDoc<SiteContent>(siteContentRef);

  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [loading]);

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
      <Preloader />
      <div className={`flex flex-col min-h-screen bg-background ${siteContent?.areAnimationsEnabled ? '' : 'no-animations'} ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
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

    