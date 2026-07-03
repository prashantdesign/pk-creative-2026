'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { SiteContent, GalleryImage, GalleryCategory } from '@/types';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PKLoader from '@/components/pk-loader';

interface GallerySectionProps {
  content: SiteContent | null;
}

function useWindowColumns() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setColumns(4);
      } else if (width >= 1024) {
        setColumns(3);
      } else if (width >= 640) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}

const GalleryImageItem = ({ image, index, onClick }: { image: GalleryImage, index: number, onClick: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const skeletonHeight = useMemo(() => {
    const heights = ['h-48', 'h-64', 'h-80', 'h-56', 'h-72'];
    return heights[index % heights.length];
  }, [index]);
  
  return (
    <div className="animate-fade-in-up" style={{animationDelay: `${(index % 10) * 50}ms`}}>
      <Card className="overflow-hidden group cursor-pointer border-none bg-transparent shadow-none" onClick={onClick}>
        <CardContent className="p-0 relative w-full overflow-hidden">
          {!isLoaded && <Skeleton className={`w-full ${skeletonHeight} rounded-lg`} />}
          <img
             src={image.imageUrl}
             alt={image.title || 'Gallery image'}
             loading="lazy"
             className={`w-full h-auto rounded-lg transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100 group-hover:scale-[1.02]' : 'absolute inset-0 opacity-0 scale-95'}`}
             onLoad={() => setIsLoaded(true)}
             onError={() => setIsLoaded(true)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default function GallerySection({ content, hideHeader = false }: GallerySectionProps) {
  const firestore = useFirestore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imagesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_galleryImages'), orderBy('order', 'asc')) : null
  , [firestore]);

  const categoriesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_galleryCategories'), orderBy('order', 'asc')) : null
  , [firestore]);

  const { data: images, isLoading: imagesLoading } = useCollection<GalleryImage>(imagesQuery);
  const { data: categories, isLoading: categoriesLoading } = useCollection<GalleryCategory>(categoriesQuery);

  const filteredImages = useMemo(() => {
    if (!images) return [];
    if (selectedCategory === 'all') return images;
    return images.filter(img => img.galleryCategoryId === selectedCategory);
  }, [images, selectedCategory]);

  const sortedImages = useMemo(() => {
    return [...filteredImages].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }, [filteredImages]);

  const visibleImages = useMemo(() => {
    return sortedImages.slice(0, visibleCount);
  }, [sortedImages, visibleCount]);

  const columnsCount = useWindowColumns();

  const columns = useMemo(() => {
    const cols: GalleryImage[][] = Array.from({ length: columnsCount }, () => []);
    visibleImages.forEach((img, idx) => {
      cols[idx % columnsCount].push(img);
    });
    return cols;
  }, [visibleImages, columnsCount]);
  
  const isLoading = imagesLoading || categoriesLoading;

  // Infinite Scroll Observer using Callback Ref pattern
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < sortedImages.length) {
        setVisibleCount((prev) => prev + 10);
      }
    }, { rootMargin: '200px' });

    if (node) observer.current.observe(node);
  }, [visibleCount, sortedImages.length]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedCategory]);

  // Lightbox Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    
    if (e.key === 'Escape') {
      setLightboxIndex(null);
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'ArrowRight') {
      setLightboxIndex((prev) => (prev !== null && prev < sortedImages.length - 1 ? prev + 1 : prev));
    }
  }, [lightboxIndex, sortedImages.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight animate-fade-in-up">
              {content?.gallerySectionTitle || 'Gallery'}
            </h2>
            {content?.gallerySectionDescription && (
              <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up animation-delay-300">
                {content.gallerySectionDescription}
              </p>
            )}
          </div>
        )}

        {isLoading ? (
            <div className="flex gap-4">
              {Array.from({ length: columnsCount }).map((_, colIdx) => (
                <div key={colIdx} className="flex-1 flex flex-col gap-4">
                  <Skeleton className="w-full h-64 rounded-lg" />
                  <Skeleton className="w-full h-48 rounded-lg" />
                </div>
              ))}
            </div>
        ) : (
            <>
                <div className="flex justify-center flex-wrap gap-2 mb-12 animate-fade-in-up animation-delay-600">
                    <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('all')}
                        className="rounded-full"
                    >
                        All
                    </Button>
                    {categories?.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory(cat.id)}
                          className="rounded-full"
                        >
                          {cat.name}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-4 items-start">
                    {columns.map((colImages, colIdx) => (
                        <div key={colIdx} className="flex-1 flex flex-col gap-4">
                            {colImages.map((image) => {
                                const globalIndex = sortedImages.findIndex(img => img.id === image.id);
                                return (
                                    <GalleryImageItem 
                                      key={image.id} 
                                      image={image} 
                                      index={globalIndex} 
                                      onClick={() => setLightboxIndex(globalIndex)} 
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                
                {/* Infinite Scroll trigger point */}
                {visibleCount < sortedImages.length && (
                  <div ref={lastElementRef} className="py-12 flex justify-center opacity-70">
                    <PKLoader size="sm" />
                  </div>
                )}

                {sortedImages.length === 0 && (
                    <div className="text-center col-span-full py-12 text-muted-foreground">
                        No images found in this category.
                    </div>
                )}
            </>
        )}
      </div>

      {/* Full-Screen Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 p-2 rounded-full bg-black/50 hover:bg-black/80"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="h-8 w-8" />
          </button>
          
          {lightboxIndex > 0 && (
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 hidden md:block"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}

          <div className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-12 flex flex-col justify-center items-center" onClick={() => setLightboxIndex(null)}>
            <img 
              src={sortedImages[lightboxIndex].imageUrl} 
              alt={sortedImages[lightboxIndex].title || 'Lightbox image'}
              loading="lazy"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-6 text-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white text-xl font-medium">{sortedImages[lightboxIndex].title}</h3>
              <p className="text-gray-400 text-sm mt-2">{lightboxIndex + 1} of {sortedImages.length}</p>
            </div>
          </div>

          {lightboxIndex < sortedImages.length - 1 && (
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 hidden md:block"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
