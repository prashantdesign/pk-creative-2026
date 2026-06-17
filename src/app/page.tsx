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
import PortfolioSection from '@/components/public/portfolio-section';
import ContactSection from '@/components/public/contact-section';
import Footer from '@/components/public/footer';
import ProjectModal from '@/components/public/project-modal';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const firestore = useFirestore();

  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading } = useDoc<SiteContent>(siteContentRef);



  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (siteContent?.isMaintenanceModeEnabled) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Under Maintenance</h1>
          <p className="text-muted-foreground">My portfolio is currently undergoing some updates. Please check back soon!</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen bg-background ${siteContent?.areAnimationsEnabled ? '' : 'no-animations'}`}>
      <Header siteName={siteContent?.siteName} />
      <main className="flex-grow">
        <HeroSection content={siteContent} />
        <ServicesSection content={siteContent} />
        <TargetAudienceSection content={siteContent} />
        {(siteContent?.isPortfolioSectionVisible ?? true) && <PortfolioSection content={siteContent} onProjectClick={handleProjectClick} />}
        <ContactSection />
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
  );
}

    