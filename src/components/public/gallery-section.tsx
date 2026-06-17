'use client';

import React, { useState, useMemo } from 'react';
import type { SiteContent, GalleryImage, GalleryCategory } from '@/types';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

interface GallerySectionProps {
  content: SiteContent | null;
}

export default function GallerySection({ content }: GallerySectionProps) {
  const firestore = useFirestore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const imagesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'galleryImages'), orderBy('order', 'asc')) : null
  , [firestore]);

  const categoriesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'galleryCategories'), orderBy('order', 'asc')) : null
  , [firestore]);

  const { data: images, isLoading: imagesLoading } = useCollection<GalleryImage>(imagesQuery);
  const { data: categories, isLoading: categoriesLoading } = useCollection<GalleryCategory>(categoriesQuery);

  const filteredImages = useMemo(() => {
    if (!images) return [];
    if (selectedCategory === 'all') return images;
    return images.filter(img => img.galleryCategoryId === selectedCategory);
  }, [images, selectedCategory]);
  
  const isLoading = imagesLoading || categoriesLoading;

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
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

        {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square w-full" />
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredImages.map((image, index) => (
                        <div key={image.id} className={`animate-fade-in-up`} style={{animationDelay: `${600 + index * 100}ms`}}>
                        <Card className="overflow-hidden group cursor-pointer">
                            <CardContent className="p-0 relative aspect-square">
                            <Image
                                src={image.imageUrl}
                                alt={image.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint="gallery image"
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-sm font-medium drop-shadow-md">{image.title}</p>
                            </div>
                            </CardContent>
                        </Card>
                        </div>
                    ))}
                </div>
                {filteredImages.length === 0 && (
                    <div className="text-center col-span-full py-12 text-muted-foreground">
                        No images found in this category.
                    </div>
                )}
            </>
        )}
      </div>
    </section>
  );
}
