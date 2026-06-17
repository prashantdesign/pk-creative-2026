'use client';
import React, { useMemo } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { GalleryCategory } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import GalleryCategoryForm from '@/components/admin/gallery-category-form';

export default function EditGalleryCategoryPage({ params }: { params: { categoryId: string } }) {
  const firestore = useFirestore();
  
  const categoryRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'galleryCategories', params.categoryId);
  }, [firestore, params.categoryId]);

  const { data: category, loading } = useDoc<GalleryCategory>(categoryRef);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Gallery Category</h1>
        <Card>
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>
              Loading category details...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Gallery Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Update the details for your gallery category. Changes will be saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GalleryCategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
