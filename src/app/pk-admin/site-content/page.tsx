import React from 'react';
import SiteContentForm from '@/components/admin/site-content-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function SiteContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Site Content</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Website Content</CardTitle>
          <CardDescription>
            Update the content for the Hero and About sections of your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SiteContentForm />
        </CardContent>
      </Card>
    </div>
  );
}
