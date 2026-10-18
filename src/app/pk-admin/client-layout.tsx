'use client';
import React, { useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/admin-sidebar';

import Logo from '@/components/logo';
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
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" />
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative z-10 flex w-full justify-center">{children}</div>
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
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 md:hidden">
            <Logo />
            <SidebarTrigger />
        </header>
        <div className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
