"use client";

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, deleteDoc, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Plus, CalendarIcon, Instagram, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import type { InstagramPost } from '@/types';
import InstagramPostForm from './instagram-post-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function InstagramPlanner() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);

  const postsQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_instagramPosts'), orderBy('scheduledTime', 'desc')) : null
  , [firestore]);

  const { data: posts, isLoading } = useCollection<InstagramPost>(postsQuery);

  const handleDelete = async (id: string) => {
    if (!firestore || !window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteDoc(doc(firestore, 'pkcreative_instagramPosts', id));
      toast({ title: "Post deleted" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error deleting post" });
    }
  };

  const getStatusBadge = (status: InstagramPost['status']) => {
    switch(status) {
        case 'SCHEDULED': return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"><Clock className="mr-1 h-3 w-3" /> Scheduled</Badge>;
        case 'PUBLISHED': return <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20"><CheckCircle2 className="mr-1 h-3 w-3" /> Published</Badge>;
        case 'FAILED': return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" /> Failed</Badge>;
        default: return <Badge variant="outline">Draft</Badge>;
    }
  }

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Instagram className="h-8 w-8 text-pink-500" />
                Instagram Planner
            </h1>
            <p className="text-muted-foreground">Draft your posts and schedule them for auto-publishing or email reminders.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) setEditingPost(null); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create Instagram Post'}</DialogTitle>
            </DialogHeader>
            <InstagramPostForm 
                post={editingPost} 
                onSuccess={() => setIsDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col group relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
                 {getStatusBadge(post.status)}
            </div>
            <CardContent className="p-0 relative aspect-square bg-muted">
              {post.imageUrl ? (
                <Image src={post.imageUrl} alt="Instagram post" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">No Image</div>
              )}
            </CardContent>
            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <p className="text-sm line-clamp-3 leading-relaxed whitespace-pre-wrap">{post.caption}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {post.scheduledTime ? format(new Date(post.scheduledTime), 'PPP p') : 'No date set'}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setEditingPost(post); setIsDialogOpen(true); }}>Edit</Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(post.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
          </Card>
        ))}
        {posts?.length === 0 && (
          <div className="col-span-full py-24 text-center border border-dashed rounded-xl text-muted-foreground">
            No posts scheduled. Click "New Post" to start planning.
          </div>
        )}
      </div>
    </div>
  );
}
