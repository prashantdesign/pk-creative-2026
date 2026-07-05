import React from 'react';
import type { Metadata } from 'next';
import ClientAdminLayout from './client-layout';

export const metadata: Metadata = {
  title: 'PK Creative Admin',
  manifest: '/pk-admin/manifest.webmanifest',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
