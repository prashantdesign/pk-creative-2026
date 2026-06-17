import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import GalleryCategoryForm from '@/components/admin/gallery-category-form';

export default function NewGalleryCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Gallery Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new category for your gallery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GalleryCategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
