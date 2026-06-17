import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ProjectCategoryForm from '@/components/admin/project-category-form';

export default function NewProjectCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Project Category</h1>
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new category for your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectCategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
