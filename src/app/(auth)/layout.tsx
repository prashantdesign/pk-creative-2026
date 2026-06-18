import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PK Creative Admin Login',
  manifest: '/admin/manifest.webmanifest',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
