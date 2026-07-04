'use client';

import React, { useMemo, useState } from 'react';
import type { SiteContent, Project, ProjectCategory } from '@/types';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

interface PortfolioSectionProps {
  content: SiteContent | null;
  onProjectClick: (project: Project) => void;
  hideHeader?: boolean;
}

export default function PortfolioSection({ content, onProjectClick, hideHeader = false }: PortfolioSectionProps) {
  const firestore = useFirestore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projectsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_projects'), orderBy('order', 'asc')) : null
  , [firestore]);

  const categoriesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_projectCategories'), orderBy('order', 'asc')) : null
  , [firestore]);

  const { data: projects, isLoading: projectsLoading } = useCollection<Project>(projectsQuery);
  const { data: categories, isLoading: categoriesLoading } = useCollection<ProjectCategory>(categoriesQuery);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => p.projectCategoryId === selectedCategory);
  }, [projects, selectedCategory]);

  const isLoading = projectsLoading || categoriesLoading;

  return (
    <section id="work" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter mb-4 animate-fade-in-up">
                {content?.portfolioSectionTitle || 'Selected Work'}
              </h2>
              {content?.portfolioSectionDescription && (
                <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-300">
                  {content.portfolioSectionDescription}
                </p>
              )}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[500px] w-full rounded-2xl" />
            <Skeleton className="h-[500px] w-full rounded-2xl" />
            <Skeleton className="h-[500px] w-full rounded-2xl" />
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-up animation-delay-600">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="rounded-full px-6"
              >
                All
              </Button>
              {categories?.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full px-6"
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`animate-fade-in-up ${index % 2 !== 0 ? 'md:mt-16' : ''}`} 
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <Card 
                    className="overflow-hidden group cursor-pointer border-none bg-transparent shadow-none" 
                    onClick={() => onProjectClick(project)}
                  >
                    <CardContent className="p-0 relative w-full h-auto overflow-hidden rounded-3xl bg-secondary/10">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                        data-ai-hint="project image"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                        <h3 className="text-3xl font-bold text-white drop-shadow-lg mb-2">{project.title}</h3>
                        <p className="text-lg text-white/80 drop-shadow-md line-clamp-2">{project.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
             {filteredProjects.length === 0 && (
                <div className="text-center col-span-full py-24 text-muted-foreground border border-dashed rounded-3xl">
                    No projects found in this category.
                </div>
             )}
          </>
        )}
      </div>
    </section>
  );
}
