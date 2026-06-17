import React from 'react';
import MessagesClient from '@/components/admin/messages-client';

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Contact Messages</h1>
      <MessagesClient />
    </div>
  );
}
