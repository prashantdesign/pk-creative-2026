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
}

export default function PortfolioSection({ content, onProjectClick }: PortfolioSectionProps) {
  const firestore = useFirestore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projectsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'projects'), orderBy('order', 'asc')) : null
  , [firestore]);

  const categoriesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'projectCategories'), orderBy('order', 'asc')) : null
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
    <section id="work" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight animate-fade-in-up">
            {content?.portfolioSectionTitle || 'My Work'}
          </h2>
          {content?.portfolioSectionDescription && (
            <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up animation-delay-300">
              {content.portfolioSectionDescription}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-wrap gap-2 mb-12 animate-fade-in-up animation-delay-600">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {categories?.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={`animate-fade-in-up`} style={{animationDelay: `${600 + index * 150}ms`}}>
                  <Card 
                    className="overflow-hidden group cursor-pointer h-full flex flex-col" 
                    onClick={() => onProjectClick(project)}
                  >
                    <CardContent className="p-0 relative aspect-[4/3]">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint="project image"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300" />
                      <div className="absolute bottom-4 left-4 p-2">
                        <h3 className="text-xl font-semibold text-white drop-shadow-md">{project.title}</h3>
                        <p className="text-sm text-white/90 drop-shadow-md line-clamp-2">{project.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
             {filteredProjects.length === 0 && (
                <div className="text-center col-span-full py-12 text-muted-foreground">
                    No projects found in this category.
                </div>
             )}
          </>
        )}
      </div>
    </section>
  );
}
