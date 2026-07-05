'use client';
import React, { useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/admin-sidebar';

import PKLoader from '@/components/pk-loader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/pk-admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/pk-admin/login');
    }
  }, [user, loading, router, isLoginPage]);

  if (isLoginPage) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        {children}
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <PKLoader />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-end border-b bg-background px-4 md:hidden">
            <SidebarTrigger />
        </header>
        <div className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
