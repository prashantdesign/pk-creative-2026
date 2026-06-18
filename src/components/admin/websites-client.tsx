"use client";

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Plus, Globe } from 'lucide-react';
import Image from 'next/image';
import type { WebsiteProject } from '@/types';
import WebsiteForm from './website-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function WebsitesClient() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<WebsiteProject | null>(null);

  const websitesQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_websiteProjects'), orderBy('order', 'asc')) : null
  , [firestore]);

  const { data: websites, isLoading } = useCollection<WebsiteProject>(websitesQuery);

  const handleDelete = async (id: string) => {
    if (!firestore || !window.confirm("Are you sure you want to remove this website project?")) return;
    try {
      await deleteDoc(doc(firestore, 'pkcreative_websiteProjects', id));
      toast({ title: "Website removed" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error deleting website" });
    }
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
    } catch {
      return '';
    }
  };

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Globe className="h-8 w-8 text-primary" />
                Website Showcase
            </h1>
            <p className="text-muted-foreground">Manage the websites you've built to show them off on the home page.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) setEditingWebsite(null); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Website</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingWebsite ? 'Edit Website Project' : 'Add Website Project'}</DialogTitle>
            </DialogHeader>
            <WebsiteForm 
                website={editingWebsite} 
                onSuccess={() => setIsDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {websites?.map((website) => {
           const displayLogo = website.logoUrl || getFaviconUrl(website.url);
           return (
            <Card key={website.id} className="overflow-hidden flex flex-col group relative border-border">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4 text-center h-[240px]">
                {displayLogo ? (
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-sm bg-background p-2 border">
                        <Image src={displayLogo} alt={website.name} fill className="object-contain p-2" />
                    </div>
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center bg-muted rounded-2xl font-bold text-2xl text-muted-foreground">
                        {website.name.charAt(0)}
                    </div>
                )}
                
                <div>
                    <h3 className="font-bold text-lg leading-tight line-clamp-1">{website.name}</h3>
                    <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1 break-all">
                        {website.url.replace(/^https?:\/\//, '')}
                    </a>
                </div>

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm" className="h-8 shadow" onClick={() => { setEditingWebsite(website); setIsDialogOpen(true); }}>Edit</Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8 shadow" onClick={() => handleDelete(website.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                </CardContent>
            </Card>
           );
        })}
        {websites?.length === 0 && (
          <div className="col-span-full py-24 text-center border border-dashed rounded-xl text-muted-foreground">
            No website projects added yet. Click "Add Website" to create your first showcase item.
          </div>
        )}
      </div>
    </div>
  );
}
