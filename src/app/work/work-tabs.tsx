"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioSection from '@/components/public/portfolio-section';
import GallerySection from '@/components/public/gallery-section';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteContent, Project } from '@/types';
import ProjectModal from '@/components/public/project-modal';

export default function WorkTabs() {
  const firestore = useFirestore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent } = useDoc<SiteContent>(siteContentRef);

  return (
    <>
      <Tabs defaultValue="projects" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="projects" className="mt-0 outline-none focus:ring-0">
          <div className="-mt-16 sm:-mt-24">
            <PortfolioSection content={siteContent || null} onProjectClick={(p) => setSelectedProject(p)} hideHeader={true} />
          </div>
        </TabsContent>
        
        <TabsContent value="gallery" className="mt-0 outline-none focus:ring-0">
          <div className="-mt-16 sm:-mt-24">
            <GallerySection content={siteContent || null} hideHeader={true} />
          </div>
        </TabsContent>
      </Tabs>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
