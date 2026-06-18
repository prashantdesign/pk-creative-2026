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
  isServicesSectionVisible: z.boolean().default(true),
  isTestimonialsSectionVisible: z.boolean().default(true),
  isTargetAudienceSectionVisible: z.boolean().default(true),
  isPortfolioSectionVisible: z.boolean().default(true),
  isTeamSectionVisible: z.boolean().default(true),
});

export default function SettingsForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const firestore = useFirestore();

  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading: isFetching } = useDoc<SiteContent>(siteContentRef as any);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isMaintenanceModeEnabled: false,
      areAnimationsEnabled: true,
      isServicesSectionVisible: true,
      isTestimonialsSectionVisible: true,
      isTargetAudienceSectionVisible: true,
      isPortfolioSectionVisible: true,
      isTeamSectionVisible: true,
    },
  });

  useEffect(() => {
    if (siteContent) {
      form.reset({
        isMaintenanceModeEnabled: siteContent.isMaintenanceModeEnabled || false,
        areAnimationsEnabled: siteContent.areAnimationsEnabled === undefined ? true : siteContent.areAnimationsEnabled,
        isServicesSectionVisible: siteContent.isServicesSectionVisible === undefined ? true : siteContent.isServicesSectionVisible,
        isTestimonialsSectionVisible: siteContent.isTestimonialsSectionVisible === undefined ? true : siteContent.isTestimonialsSectionVisible,
        isTargetAudienceSectionVisible: siteContent.isTargetAudienceSectionVisible === undefined ? true : siteContent.isTargetAudienceSectionVisible,
        isPortfolioSectionVisible: siteContent.isPortfolioSectionVisible === undefined ? true : siteContent.isPortfolioSectionVisible,
        isTeamSectionVisible: siteContent.isTeamSectionVisible === undefined ? true : siteContent.isTeamSectionVisible,
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
              name="isServicesSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Services Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the services section.
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
              name="isTestimonialsSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Testimonials Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the testimonials section.
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
              name="isTargetAudienceSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Show Target Audience Section</FormLabel>
                     <FormDescription>
                       Control the visibility of the "Who We Help" section.
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
            <FormField
              control={form.control}
              name="isTeamSectionVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Enable Team Page</FormLabel>
                     <FormDescription>
                      Control whether the Team page is accessible and visible in the navigation.
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

    