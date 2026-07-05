import React from 'react';
import GalleryForm from '@/components/admin/gallery-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function NewGalleryImagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Gallery Image</h1>
      <Card>
        <CardHeader>
          <CardTitle>Image Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new image to your gallery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GalleryForm />
        </CardContent>
      </Card>
    </div>
  );
}

    