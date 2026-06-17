import TestimonialsClient from '@/components/admin/testimonials-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Admin Dashboard',
};

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
      </div>
      <TestimonialsClient />
    </div>
  );
}
