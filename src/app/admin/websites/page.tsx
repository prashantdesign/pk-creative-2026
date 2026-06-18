import WebsitesClient from '@/components/admin/websites-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Showcase | Admin Panel',
};

export default function WebsitesPage() {
  return <WebsitesClient />;
}
