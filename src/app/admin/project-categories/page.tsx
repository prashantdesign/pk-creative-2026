import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import ProjectCategoriesClient from '@/components/admin/project-categories-client';

export default function ProjectCategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Project Categories</h1>
        <Button asChild>
          <Link href="/admin/project-categories/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
          </Link>
        </Button>
      </div>
      <ProjectCategoriesClient />
    </div>
  );
}
