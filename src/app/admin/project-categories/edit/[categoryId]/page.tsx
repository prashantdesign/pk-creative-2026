'use client';
import React, { useMemo } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { ProjectCategory } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProjectCategoryForm from '@/components/admin/project-category-form';

export default function EditProjectCategoryPage({ params }: { params: { categoryId: string } }) {
  const firestore = useFirestore();
  
  const categoryRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'projectCategories', params.categoryId);
  }, [firestore, params.categoryId]);

  const { data: category, loading } = useDoc<ProjectCategory>(categoryRef);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project Category</h1>
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
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Update the details for your project category. Changes will be saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectCategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
