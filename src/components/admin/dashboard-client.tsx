'use client';

import React, { useMemo } from 'react';
import { collection, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import Link from 'next/link';
import { useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { evaluateSeo } from '@/lib/seo-score';
import type { Project, ContactMessage, GalleryImage, TeamMember, WebsiteProject, SiteContent } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { format, subDays, startOfDay } from 'date-fns';
import { Badge } from '../ui/badge';
import { Briefcase, Mail, MailOpen, Images, Users, Globe, Search, ArrowUpRight, CheckCircle2, Circle, Plus, ExternalLink, Sparkles } from 'lucide-react';

export default function DashboardClient() {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_projects')) : null
  , [firestore]);

  const messagesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_contactMessages'), orderBy('timestamp', 'desc')) : null
  , [firestore]);

  const { data: projects, isLoading: projectsLoading } = useCollection<Project>(projectsQuery);
  const { data: messages, isLoading: messagesLoading } = useCollection<ContactMessage>(messagesQuery);

  const galleryQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'pkcreative_galleryImages')) : null, [firestore]);
  const teamQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'pkcreative_teamMembers')) : null, [firestore]);
  const websitesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'pkcreative_websiteProjects')) : null, [firestore]);
  const siteRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: gallery } = useCollection<GalleryImage>(galleryQuery);
  const { data: team } = useCollection<TeamMember>(teamQuery);
  const { data: websites } = useCollection<WebsiteProject>(websitesQuery);
  const { data: siteContent } = useDoc<SiteContent>(siteRef as any);
  const seo = useMemo(() => evaluateSeo(siteContent?.seoSettings, siteContent), [siteContent]);

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

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const scoreColor = seo.score >= 80 ? 'text-emerald-500' : seo.score >= 50 ? 'text-amber-500' : 'text-red-500';
  const stats = [
    { label: 'Projects', value: totalProjects, icon: Briefcase, href: '/pk-admin/projects' },
    { label: 'Gallery images', value: gallery?.length ?? 0, icon: Images, href: '/pk-admin/gallery' },
    { label: 'Team members', value: team?.length ?? 0, icon: Users, href: '/pk-admin/team' },
    { label: 'Showcased sites', value: websites?.length ?? 0, icon: Globe, href: '/pk-admin/websites' },
    { label: 'Total messages', value: totalMessages, icon: Mail, href: '/pk-admin/messages' },
    { label: 'Unread messages', value: unreadMessages, icon: MailOpen, href: '/pk-admin/messages', highlight: unreadMessages > 0 },
  ];
  const quickActions = [
    { label: 'New project', href: '/pk-admin/projects/new' },
    { label: 'Add gallery image', href: '/pk-admin/gallery/new' },
    { label: 'Edit site content', href: '/pk-admin/site-content' },
    { label: 'SEO settings', href: '/pk-admin/seo' },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-background to-background p-6 md:p-8">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-1 flex items-center gap-2 text-sm font-medium text-primary"><Sparkles className="h-4 w-4" />{format(new Date(), 'EEEE, d MMMM yyyy')}</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{greeting}, welcome back.</h2>
            <p className="mt-1 text-muted-foreground">
              {unreadMessages > 0 ? `You have ${unreadMessages} unread message${unreadMessages > 1 ? 's' : ''} waiting.` : 'Inbox is clear. Nice work.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((a) => (
              <Link key={a.href} href={a.href} className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-primary/50 hover:text-primary">
                <Plus className="h-3.5 w-3.5" />{a.label}
              </Link>
            ))}
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              View site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((st) => (
          <Link key={st.label} href={st.href} className="group">
            <Card className={`h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-md ${st.highlight ? 'border-primary/50 bg-primary/5' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{st.label}</CardTitle>
                <st.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </CardHeader>
              <CardContent><p className="text-3xl font-bold">{st.value}</p></CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" />SEO health</CardTitle>
            <CardDescription>How ready your site is to rank on Google, based on your saved SEO settings.</CardDescription>
          </div>
          <div className="text-right">
            <p className={`text-4xl font-bold ${scoreColor}`}>{seo.score}<span className="text-lg text-muted-foreground">/100</span></p>
            <Link href="/pk-admin/seo" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Improve <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full transition-all duration-700 ${seo.score >= 80 ? 'bg-emerald-500' : seo.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${seo.score}%` }} />
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {seo.checks.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm">
                {c.passed ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                <span className={c.passed ? 'text-muted-foreground' : 'font-medium'}>{c.label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

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
