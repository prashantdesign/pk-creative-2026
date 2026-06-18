"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { PrivateSettings } from '@/types';

const formSchema = z.object({
  smtpHost: z.string().optional(),
  smtpPort: z.string().optional(),
  smtpUser: z.string().optional(),
  smtpPass: z.string().optional(),
  smtpSender: z.string().email({ message: "Invalid email" }).optional().or(z.literal('')),
  adminEmail: z.string().email({ message: "Invalid email" }).optional().or(z.literal('')),
  
  metaAppId: z.string().optional(),
  metaAppSecret: z.string().optional(),
  instagramAccountId: z.string().optional(),
  metaAccessToken: z.string().optional(),
});

export default function PrivateSettingsForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const firestore = useFirestore();
  const settingsRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_privateSettings', 'global') : null, [firestore]);
  const { data: settings, loading: isFetching } = useDoc<PrivateSettings>(settingsRef as any);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUser: "pkcreative.in@gmail.com",
      smtpPass: "",
      smtpSender: "info@pkcreative.in",
      adminEmail: "info@pkcreative.in",
      metaAppId: "",
      metaAppSecret: "",
      instagramAccountId: "",
      metaAccessToken: "",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        smtpHost: settings.smtpHost || "smtp.gmail.com",
        smtpPort: settings.smtpPort || "587",
        smtpUser: settings.smtpUser || "pkcreative.in@gmail.com",
        smtpPass: settings.smtpPass || "",
        smtpSender: settings.smtpSender || "info@pkcreative.in",
        adminEmail: settings.adminEmail || "info@pkcreative.in",
        metaAppId: settings.metaAppId || "",
        metaAppSecret: settings.metaAppSecret || "",
        instagramAccountId: settings.instagramAccountId || "",
        metaAccessToken: settings.metaAccessToken || "",
      });
    }
  }, [settings, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if(!firestore || !settingsRef) return;
    setIsLoading(true);

    setDoc(settingsRef, values, { merge: true })
        .then(() => {
            toast({
                title: "Settings Saved",
                description: "Your private credentials have been securely saved.",
              });
        })
        .catch(async (serverError) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your settings. Check permissions.",
              });
            const permissionError = new FirestorePermissionError({
              path: settingsRef.path,
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
        <Accordion type="multiple" defaultValue={['smtp', 'meta']} className="w-full">
          
          <AccordionItem value="smtp">
            <AccordionTrigger className="text-xl font-semibold">SMTP Email Server</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="smtpHost" render={({ field }) => (
                    <FormItem><FormLabel>SMTP Host</FormLabel><FormControl><Input placeholder="smtp.gmail.com" type="text" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="smtpPort" render={({ field }) => (
                    <FormItem><FormLabel>SMTP Port</FormLabel><FormControl><Input placeholder="587" type="text" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="smtpUser" render={({ field }) => (
                    <FormItem><FormLabel>SMTP Username</FormLabel><FormControl><Input placeholder="you@example.com" type="text" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="smtpPass" render={({ field }) => (
                    <FormItem><FormLabel>SMTP Password (or App Password)</FormLabel><FormControl><Input placeholder="••••••••" type="password" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="smtpSender" render={({ field }) => (
                    <FormItem><FormLabel>Sender Email ("From")</FormLabel><FormControl><Input placeholder="noreply@pkcreative.in" type="email" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="adminEmail" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Notification Email ("To")</FormLabel>
                      <FormDescription>Where should cron job reminders be sent?</FormDescription>
                      <FormControl><Input placeholder="admin@pkcreative.in" type="email" {...field} value={field.value ?? ''} /></FormControl>
                      <FormMessage />
                    </FormItem>
                )} />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="meta">
            <AccordionTrigger className="text-xl font-semibold">Meta Developer API (Instagram)</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormDescription>
                Provide these API keys to enable automatic posting to your Instagram Professional Account. 
                Keep these completely secret.
              </FormDescription>
              <FormField control={form.control} name="metaAppId" render={({ field }) => (
                  <FormItem><FormLabel>Meta App ID</FormLabel><FormControl><Input type="text" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="metaAppSecret" render={({ field }) => (
                  <FormItem><FormLabel>Meta App Secret</FormLabel><FormControl><Input type="password" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="instagramAccountId" render={({ field }) => (
                  <FormItem><FormLabel>Instagram Account ID</FormLabel><FormControl><Input type="text" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="metaAccessToken" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long-Lived Page Access Token</FormLabel>
                    <FormControl><Input type="password" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Private Settings'}</Button>
      </form>
    </Form>
  );
}
