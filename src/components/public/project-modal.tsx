'use client';

import React from 'react';
import type { Project } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Icons } from '../icons';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  const allImages = [project.imageUrl, ...(project.projectImages || [])].filter(Boolean);
  const tools = project.toolsUsed ? project.toolsUsed.split(',').map(tool => tool.trim()) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-3xl">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-6 -mr-6 space-y-8">
            {allImages.length > 0 && (
                <Carousel className="w-full">
                <CarouselContent>
                    {allImages.map((img, index) => (
                    <CarouselItem key={index}>
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image src={img} alt={`${project.title} image ${index + 1}`} fill className="object-contain" />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                {allImages.length > 1 && (
                    <>
                        <CarouselPrevious className="left-[-50px]" />
                        <CarouselNext className="right-[-50px]"/>
                    </>
                )}
                </Carousel>
            )}

          {tools.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                    <Badge key={tool} variant="secondary" className="flex items-center gap-1.5">
                        <Icons name={tool} className="h-3 w-3" />
                        {tool}
                    </Badge>
                ))}
              </div>
            </div>
          )}

          {project.problem && (
            <div>
              <h3 className="text-lg font-semibold mb-2">The Problem</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <h3 className="text-lg font-semibold mb-2">The Solution</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{project.solution}</p>
            </div>
          )}

          {project.outcome && (
            <div>
              <h3 className="text-lg font-semibold mb-2">The Outcome</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{project.outcome}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
