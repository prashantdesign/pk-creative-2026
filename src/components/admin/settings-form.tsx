'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { SiteContent } from '@/types';

const formSchema = z.object({
  isMaintenanceModeEnabled: z.boolean().default(false),
  areAnimationsEnabled: z.boolean().default(true),
  isAboutSectionVisible: z.boolean().default(true),
  isStatsSectionVisible: z.boolean().default(true),
  isSkillsSectionVisible: z.boolean().default(true),
  isToolsSectionVisible: z.boolean().default(true),
  isGallerySectionVisible: z.boolean().default(true),
  isPortfolioSectionVisible: z.boolean().default(true),
});

export default function SettingsForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();

  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading: isFetching } = useDoc<SiteContent>(siteContentRef as any);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isMaintenanceModeEnabled: false,
      areAnimationsEnabled: true,
      isAboutSectionVisible: true,
      isStatsSectionVisible: true,
      isSkillsSectionVisible: true,
      isToolsSectionVisible: true,
      isGallerySectionVisible: true,
      isPortfolioSectionVisible: true,
    },
  });

  useEffect(() => {
    if (siteContent) {
      form.reset({
        isMaintenanceModeEnabled: siteContent.isMaintenanceModeEnabled || false,
        areAnimationsEnabled: siteContent.areAnimationsEnabled === undefined ? true : siteContent.areAnimationsEnabled,
        isAboutSectionVisible: siteContent.isAboutSectionVisible === undefined ? true : siteContent.isAboutSectionVisible,
        isStatsSectionVisible: siteContent.isStatsSectionVisible === undefined ? true : siteContent.isStatsSectionVisible,
        isSkillsSectionVisible: siteContent.isSkillsSectionVisible === undefined ? true : siteContent.isSkillsSectionVisible,
        isToolsSectionVisible: siteContent.isToolsSectionVisible === undefined ? true : siteContent.isToolsSectionVisible,
        isGallerySectionVisible: siteContent.isGallerySectionVisible === undefined ? true : siteContent.isGallerySectionVisible,
        isPortfolioSectionVisible: siteContent.isPortfolioSectionVisible === undefined ? true : siteContent.isPortfolioSectionVisible,
      });
    }
  }, [siteContent, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if(!firestore || !siteContentRef) return;
    setIsLoading(true);

    setDoc(siteContentRef, values, { merge: true })
        .then(() => {
            toast({
                title: "Settings Updated",
                description: "Your site settings have been saved.",
              });
        })
        .catch(async (serverError) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your settings.",
              });
            const permissionError = new FirestorePermissionError({
              path: siteContentRef.path,
              operation: 'update',
              requestResourceData: values,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsLoading(false);
        });
  };
  
  if (isFetching) {
    return <Skeleton className="h-96 w-full" />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
           <FormField
              control={form.control}
              name="isMaintenanceModeEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Maintenance Mode</FormLabel>
                    <FormDescription>
                      Enable this to show a maintenance page to visitors.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areAnimationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Animations</FormLabel>
                    <FormDescription>
                      Enable subtle animations and transitions on your site.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAboutSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show About Section</FormLabel>
                     <FormDescription>
                      Control the visibility of the 'About Me' section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="isStatsSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Stats Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the statistics section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSkillsSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Skills Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the skills section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isToolsSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Tools Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the tools section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isGallerySectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Gallery Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the image gallery section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPortfolioSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Portfolio Section</FormLabel>
                     <FormDescription>
                      Control the visibility of the project portfolio section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        </div>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Settings'}</Button>
      </form>
    </Form>
  );
}

    