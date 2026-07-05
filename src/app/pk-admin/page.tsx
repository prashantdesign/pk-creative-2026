import React from 'react';
import DashboardClient from '@/components/admin/dashboard-client';

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardClient />
    </div>
  );
}
