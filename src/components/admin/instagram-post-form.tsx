"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { InstagramPost } from '@/types';
import Image from 'next/image';

const formSchema = z.object({
  imageUrl: z.string().url({ message: "Image is required" }),
  caption: z.string().min(1, { message: "Caption is required" }),
  scheduledTime: z.string().min(1, { message: "Schedule time is required" }),
  status: z.enum(['DRAFT', 'SCHEDULED']),
});

interface Props {
  post: InstagramPost | null;
  onSuccess: () => void;
}

export default function InstagramPostForm({ post, onSuccess }: Props) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Default to 1 hour from now for new posts
  const defaultDate = new Date();
  defaultDate.setHours(defaultDate.getHours() + 1);
  // Format to YYYY-MM-DDThh:mm for datetime-local input
  const defaultDateString = new Date(defaultDate.getTime() - defaultDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: post?.imageUrl || '',
      caption: post?.caption || '',
      scheduledTime: post?.scheduledTime || defaultDateString,
      status: post?.status === 'PUBLISHED' || post?.status === 'FAILED' ? 'SCHEDULED' : (post?.status || 'SCHEDULED'),
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const downloadURL = await uploadToCloudinary(file);
      form.setValue('imageUrl', downloadURL, { shouldValidate: true });
      toast({ title: "Image uploaded" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) return;
    setIsLoading(true);

    try {
      const postData = {
        ...values,
        updatedAt: serverTimestamp(),
      };

      if (post) {
        await updateDoc(doc(firestore, 'pkcreative_instagramPosts', post.id), postData);
        toast({ title: "Post updated successfully" });
      } else {
        await addDoc(collection(firestore, 'pkcreative_instagramPosts'), {
          ...postData,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Post scheduled successfully" });
      }
      onSuccess();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error saving post", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = form.watch('imageUrl');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>Post Image</FormLabel>
            <div className="flex gap-4 items-start">
              {imageUrl && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                  <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 space-y-3">
                 <div className="space-y-1">
                   <FormLabel className="text-xs text-muted-foreground">Image URL</FormLabel>
                   <FormControl><Input placeholder="https://..." {...field} value={field.value || ''} /></FormControl>
                 </div>
                 <div className="space-y-1">
                   <FormLabel className="text-xs text-muted-foreground">Or Upload File</FormLabel>
                   <FormControl><Input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} disabled={isUploading} /></FormControl>
                   {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                 </div>
                 <FormDescription>Paste a URL or upload a file. Instagram requires aspect ratios between 4:5 and 1.91:1.</FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="caption" render={({ field }) => (
          <FormItem>
            <FormLabel>Caption & Hashtags</FormLabel>
            <FormControl><Textarea className="min-h-[150px]" placeholder="Write your amazing caption here..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="scheduledTime" render={({ field }) => (
            <FormItem>
                <FormLabel>Scheduled Date & Time</FormLabel>
                <FormControl><Input type="datetime-local" {...field} /></FormControl>
                <FormDescription>Your local timezone.</FormDescription>
                <FormMessage />
            </FormItem>
            )} />

            <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                <SelectContent>
                    <SelectItem value="SCHEDULED">Scheduled (Ready to Post)</SelectItem>
                    <SelectItem value="DRAFT">Draft (Do not post yet)</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )} />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
          {isLoading ? 'Saving...' : (post ? 'Update Post' : 'Schedule Post')}
        </Button>
      </form>
    </Form>
  );
}
