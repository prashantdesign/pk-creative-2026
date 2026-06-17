'use client';
import React, { useMemo } from 'react';
import ProjectForm from '@/components/admin/project-form';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Project } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProjectPage({ params }: { params: { projectId: string } }) {
  const firestore = useFirestore();
  
  const projectRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, 'projects', params.projectId);
  }, [firestore, params.projectId]);

  const { data: project, loading } = useDoc<Project>(projectRef);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project</h1>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Loading project details...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Update the details for your project. Changes will be saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm project={project} />
        </CardContent>
      </Card>
    </div>
  );
}
