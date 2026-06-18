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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import type { WebsiteProject } from '@/types';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  url: z.string().url({ message: "Valid URL is required" }),
  logoUrl: z.string().optional(),
  order: z.coerce.number().min(0).default(0),
});

interface Props {
  website: WebsiteProject | null;
  onSuccess: () => void;
}

export default function WebsiteForm({ website, onSuccess }: Props) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: website?.name || '',
      url: website?.url || '',
      logoUrl: website?.logoUrl || '',
      order: website?.order || 0,
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const downloadURL = await uploadToCloudinary(file);
      form.setValue('logoUrl', downloadURL, { shouldValidate: true });
      toast({ title: "Logo uploaded" });
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
      const websiteData = {
        ...values,
        updatedAt: serverTimestamp(),
      };

      if (website) {
        await updateDoc(doc(firestore, 'pkcreative_websiteProjects', website.id), websiteData);
        toast({ title: "Website project updated" });
      } else {
        await addDoc(collection(firestore, 'pkcreative_websiteProjects'), {
          ...websiteData,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Website project added" });
      }
      onSuccess();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error saving website", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const logoUrl = form.watch('logoUrl');
  const urlValue = form.watch('url');

  const getFaviconUrl = (url: string) => {
    try {
      if (!url) return '';
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=256`;
    } catch {
      return '';
    }
  };

  const autoLogoUrl = getFaviconUrl(urlValue);
  const displayLogo = logoUrl || autoLogoUrl;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Website Name</FormLabel>
            <FormControl><Input placeholder="Google" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="url" render={({ field }) => (
          <FormItem>
            <FormLabel>Website URL</FormLabel>
            <FormControl><Input placeholder="https://www.google.com" {...field} /></FormControl>
            <FormDescription>Must include https://</FormDescription>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="logoUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>Custom Logo (Optional)</FormLabel>
            <div className="flex gap-4 items-center">
              {displayLogo ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border bg-background flex-shrink-0 p-2">
                  <Image src={displayLogo} alt="Preview" fill className="object-contain p-2" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl border border-dashed flex items-center justify-center text-xs text-muted-foreground bg-muted">
                    Logo
                </div>
              )}
              <div className="flex-1 space-y-2">
                 <FormControl><Input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={handlePhotoUpload} disabled={isUploading} /></FormControl>
                 {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                 <FormDescription>If left empty, we will try to auto-fetch the logo from the URL.</FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="order" render={({ field }) => (
        <FormItem>
            <FormLabel>Display Order</FormLabel>
            <FormControl><Input type="number" {...field} /></FormControl>
            <FormDescription>Lower numbers appear first.</FormDescription>
            <FormMessage />
        </FormItem>
        )} />

        <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
          {isLoading ? 'Saving...' : (website ? 'Update Website' : 'Add Website')}
        </Button>
      </form>
    </Form>
  );
}
