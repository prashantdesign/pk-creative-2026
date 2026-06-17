'use client';
import React, { useMemo } from 'react';
import GalleryForm from '@/components/admin/gallery-form';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { GalleryImage } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditGalleryImagePage({ params }: { params: { imageId: string } }) {
  const firestore = useFirestore();
  
  const imageRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'galleryImages', params.imageId);
  }, [firestore, params.imageId]);

  const { data: image, loading } = useDoc<GalleryImage>(imageRef);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Gallery Image</h1>
        <Card>
          <CardHeader>
            <CardTitle>Image Details</CardTitle>
            <CardDescription>
              Loading image details...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!image) {
    return <div>Image not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Gallery Image</h1>
      <Card>
        <CardHeader>
          <CardTitle>Image Details</CardTitle>
          <CardDescription>
            Update the details for your gallery image. Changes will be saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GalleryForm image={image} />
        </CardContent>
      </Card>
    </div>
  );
}

    