import React from 'react';
import GalleryClient from '@/components/admin/gallery-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function GalleryPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Image
          </Link>
        </Button>
      </div>
      <GalleryClient />
    </div>
  );
}

    