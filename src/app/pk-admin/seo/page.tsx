import React from 'react';
import SeoForm from '@/components/admin/seo-form';

export default function SeoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">SEO & Analytics</h1>
        <p className="mt-1 text-muted-foreground">Control how PK Creative appears on Google and social media, and track your search health.</p>
      </div>
      <SeoForm />
    </div>
  );
}
