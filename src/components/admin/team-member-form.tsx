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
import type { TeamMember } from '@/types';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  photoUrl: z.string().url({ message: "Photo is required" }),
  order: z.coerce.number().min(0).default(0),
});

interface Props {
  member: TeamMember | null;
  onSuccess: () => void;
}

export default function TeamMemberForm({ member, onSuccess }: Props) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || '',
      designation: member?.designation || '',
      photoUrl: member?.photoUrl || '',
      order: member?.order || 0,
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const downloadURL = await uploadToCloudinary(file);
      form.setValue('photoUrl', downloadURL, { shouldValidate: true });
      toast({ title: "Photo uploaded" });
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
      const memberData = {
        ...values,
        updatedAt: serverTimestamp(),
      };

      if (member) {
        await updateDoc(doc(firestore, 'pkcreative_teamMembers', member.id), memberData);
        toast({ title: "Team member updated" });
      } else {
        await addDoc(collection(firestore, 'pkcreative_teamMembers'), {
          ...memberData,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Team member added" });
      }
      onSuccess();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error saving member", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const photoUrl = form.watch('photoUrl');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="photoUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Photo</FormLabel>
            <div className="flex gap-4 items-start">
              {photoUrl && (
                <div className="relative w-24 h-32 rounded-lg overflow-hidden border">
                  <Image src={photoUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                 <FormControl><Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} disabled={isUploading} /></FormControl>
                 {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                 <FormDescription>Vertical portraits (3:4 ratio) work best.</FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="designation" render={({ field }) => (
            <FormItem>
                <FormLabel>Designation / Role</FormLabel>
                <FormControl><Input placeholder="Lead Designer" {...field} /></FormControl>
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
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
          {isLoading ? 'Saving...' : (member ? 'Update Team Member' : 'Add Team Member')}
        </Button>
      </form>
    </Form>
  );
}
