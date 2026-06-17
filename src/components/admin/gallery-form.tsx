"use client";

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { convertGoogleDriveLink } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { GalleryImage, GalleryCategory } from '@/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("A valid image URL is required"),
  galleryCategoryId: z.string().min(1, "Category is required"),
  order: z.coerce.number().default(0),
});

type GalleryFormValues = z.infer<typeof formSchema>;

function saveGalleryImage(firestore: any, imageId: string | undefined, data: any) {
  const imageData = { ...data, updatedAt: serverTimestamp() };
  if (imageId) {
    const imageRef = doc(firestore, 'galleryImages', imageId);
    setDoc(imageRef, imageData, { merge: true }).catch(async (serverError: any) => {
        const permissionError = new FirestorePermissionError({
          path: imageRef.path,
          operation: 'update',
          requestResourceData: imageData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  } else {
    const collRef = collection(firestore, 'galleryImages');
    const finalData = { ...imageData, createdAt: serverTimestamp() };
    addDoc(collRef, finalData).catch(async (serverError: any) => {
        const permissionError = new FirestorePermissionError({
          path: collRef.path,
          operation: 'create',
          requestResourceData: finalData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }
}

export default function GalleryForm({ image }: { image?: GalleryImage }) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categoriesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'galleryCategories'), orderBy('name'));
  }, [firestore]);
  const { data: categories, isLoading: categoriesLoading } = useCollection<GalleryCategory>(categoriesQuery);

  const defaultValues: Partial<GalleryFormValues> = {
    title: image?.title || '',
    imageUrl: image?.imageUrl || '',
    galleryCategoryId: image?.galleryCategoryId || '',
    order: image?.order || 0,
  };

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>, field: any) => {
    const convertedUrl = convertGoogleDriveLink(e.target.value);
    field.onChange(convertedUrl);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
          const downloadURL = await uploadToCloudinary(file);
          form.setValue('imageUrl', downloadURL, { shouldValidate: true });
          toast({title: "Image uploaded successfully"});
      } catch (error: any) {
          toast({variant: "destructive", title: "Image upload failed", description: error.message});
          console.error("Cloudinary upload error: ", error);
      } finally {
          setIsUploading(false);
      }
  }

  const onSubmit = (data: GalleryFormValues) => {
    if(!firestore) {
        toast({ variant: "destructive", title: "Firestore not available" });
        return;
    }
    setIsSaving(true);
    saveGalleryImage(firestore, image?.id, data);
    toast({
      title: image ? "Image Updated" : "Image Added",
      description: "Your gallery image has been saved.",
    });
    router.push('/admin/gallery');
    router.refresh();
    setIsSaving(false);
  };
  
  const imageUrl = form.watch('imageUrl');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem><FormLabel>Image Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField
            control={form.control}
            name="galleryCategoryId"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={categoriesLoading}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField control={form.control} name="order" render={({ field }) => (
            <FormItem><FormLabel>Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <div className="space-y-2">
          <FormLabel>Image</FormLabel>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="pt-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} onBlur={(e) => handleUrlBlur(e, field)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="upload" className="pt-4">
              <FormItem>
                <FormLabel>Upload an image file</FormLabel>
                <FormControl>
                  <Input type="file" onChange={handleImageUpload} disabled={isUploading} />
                </FormControl>
                {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                <FormMessage />
              </FormItem>
            </TabsContent>
          </Tabs>

          {imageUrl && (
            <div className="mt-4">
              <FormLabel>Image Preview</FormLabel>
              <div className="mt-2 relative aspect-video w-full max-w-sm">
                <Image src={imageUrl} alt="Image preview" fill className="rounded-md object-contain" />
              </div>
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSaving || isUploading || categoriesLoading}>
          {isSaving ? 'Saving...' : 'Save Image'}
        </Button>
      </form>
    </Form>
  );
}
