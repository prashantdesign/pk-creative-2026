"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ProjectCategory } from '@/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  order: z.coerce.number().default(0),
});

type CategoryFormValues = z.infer<typeof formSchema>;

function saveCategory(firestore: any, categoryId: string | undefined, data: any) {
  const categoryData = { ...data, updatedAt: serverTimestamp() };
  if (categoryId) {
    const categoryRef = doc(firestore, 'projectCategories', categoryId);
    setDoc(categoryRef, categoryData, { merge: true }).catch(async (serverError: any) => {
        const permissionError = new FirestorePermissionError({
          path: categoryRef.path,
          operation: 'update',
          requestResourceData: categoryData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  } else {
    const collRef = collection(firestore, 'projectCategories');
    const finalData = { ...categoryData, createdAt: serverTimestamp() };
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

export default function ProjectCategoryForm({ category }: { category?: ProjectCategory }) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues: Partial<CategoryFormValues> = {
    name: category?.name || '',
    order: category?.order || 0,
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: CategoryFormValues) => {
    if(!firestore) {
        toast({ variant: "destructive", title: "Firestore not available" });
        return;
    }
    setIsSaving(true);
    saveCategory(firestore, category?.id, data);
    toast({
      title: category ? "Category Updated" : "Category Added",
      description: "Your category has been saved.",
    });
    router.push('/admin/project-categories');
    router.refresh();
    setIsSaving(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Category Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="order" render={({ field }) => (
            <FormItem><FormLabel>Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Category'}
        </Button>
      </form>
    </Form>
  );
}
