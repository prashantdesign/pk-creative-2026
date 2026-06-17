import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, FolderKanban, Images } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Categories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <FolderKanban className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>Project Categories</CardTitle>
            <CardDescription>
              Organize your portfolio projects into logical groups. These categories will be used as filters on your public website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/project-categories">
                Manage Project Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Images className="w-8 h-8 mb-2 text-primary" />
            <CardTitle>Gallery Categories</CardTitle>
            <CardDescription>
              Group your gallery images. These will allow visitors to filter through your visual work collections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/gallery-categories">
                Manage Gallery Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
