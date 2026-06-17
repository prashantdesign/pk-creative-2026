'use client';

import React, { useMemo } from 'react';
import { collection, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Project, ContactMessage } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { format, subDays, startOfDay } from 'date-fns';
import { Badge } from '../ui/badge';
import { Briefcase, Mail, MailOpen } from 'lucide-react';

export default function DashboardClient() {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'projects')) : null
  , [firestore]);

  const messagesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'contactMessages'), orderBy('timestamp', 'desc')) : null
  , [firestore]);

  const { data: projects, isLoading: projectsLoading } = useCollection<Project>(projectsQuery);
  const { data: messages, isLoading: messagesLoading } = useCollection<ContactMessage>(messagesQuery);

  const totalProjects = useMemo(() => projects?.length ?? 0, [projects]);
  const totalMessages = useMemo(() => messages?.length ?? 0, [messages]);
  const unreadMessages = useMemo(() => messages?.filter(m => !m.isRead).length ?? 0, [messages]);
  
  const recentMessages = useMemo(() => messages?.slice(0, 5) ?? [], [messages]);

  const chartData = useMemo(() => {
    if (!messages) return [];
    
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      return {
        date: format(date, 'MMM d'),
        count: 0,
      };
    }).reverse();

    messages.forEach(message => {
      if (message.timestamp) {
        const messageDate = message.timestamp.toDate();
        const dayEntry = last7Days.find(d => format(startOfDay(messageDate), 'MMM d') === d.date);
        if (dayEntry) {
          dayEntry.count++;
        }
      }
    });

    return last7Days;
  }, [messages]);

  if (projectsLoading || messagesLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-80" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-4xl font-bold">{totalProjects}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-4xl font-bold">{totalMessages}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MailOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-4xl font-bold">{unreadMessages}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Messages Received (Last 7 Days)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false}/>
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Recent Messages</CardTitle></CardHeader>
        <CardContent>
          {/* Mobile View */}
          <div className="grid gap-4 md:hidden">
            {recentMessages.length > 0 ? recentMessages.map(msg => (
                <Card key={msg.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-base">{msg.name}</CardTitle>
                                <CardDescription>{msg.email}</CardDescription>
                            </div>
                            <Badge variant={msg.isRead ? 'secondary' : 'default'}>{msg.isRead ? 'Read' : 'Unread'}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm line-clamp-3">{msg.message}</p>
                    </CardContent>
                    <CardFooter>
                         <p className="text-xs text-muted-foreground">{msg.timestamp ? format(msg.timestamp.toDate(), 'PP') : 'N/A'}</p>
                    </CardFooter>
                </Card>
            )) : (
                <div className="text-center text-muted-foreground py-12">No messages yet.</div>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMessages.length > 0 ? recentMessages.map(msg => (
                  <TableRow key={msg.id}>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell className="max-w-sm truncate">{msg.message}</TableCell>
                    <TableCell>{msg.timestamp ? format(msg.timestamp.toDate(), 'PP') : 'N/A'}</TableCell>
                    <TableCell><Badge variant={msg.isRead ? 'secondary' : 'default'}>{msg.isRead ? 'Read' : 'Unread'}</Badge></TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">No messages yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
