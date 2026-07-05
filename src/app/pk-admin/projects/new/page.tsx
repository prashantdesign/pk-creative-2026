import React from 'react';
import ProjectForm from '@/components/admin/project-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Add New Project</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new project to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
