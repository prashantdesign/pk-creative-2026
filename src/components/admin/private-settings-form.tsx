"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Eye, EyeOff, Copy, Check } from 'lucide-react';
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
  adminEmails: z.array(z.object({
    email: z.string().email({ message: "Invalid email" }).or(z.literal(''))
  })),
  
  metaAppId: z.string().optional(),
  metaAppSecret: z.string().optional(),
  instagramAccountId: z.string().optional(),
  metaAccessToken: z.string().optional(),
});

export default function PrivateSettingsForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyDetails = () => {
    const values = form.getValues();
    const details = `SMTP Host: ${values.smtpHost || ''}\nSMTP Port: ${values.smtpPort || ''}\nSMTP Username: ${values.smtpUser || ''}\nSender Email: ${values.smtpSender || ''}`;
    navigator.clipboard.writeText(details).then(() => {
      setCopied(true);
      toast({
        title: "Details Copied",
        description: "SMTP configuration details copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
      adminEmails: [{ email: "info@pkcreative.in" }],
      metaAppId: "",
      metaAppSecret: "",
      instagramAccountId: "",
      metaAccessToken: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "adminEmails"
  });

  useEffect(() => {
    if (settings) {
      const emailList = settings.adminEmail
        ? settings.adminEmail.split(',').map(e => ({ email: e.trim() }))
        : [{ email: "info@pkcreative.in" }];

      form.reset({
        smtpHost: settings.smtpHost || "smtp.gmail.com",
        smtpPort: settings.smtpPort || "587",
        smtpUser: settings.smtpUser || "pkcreative.in@gmail.com",
        smtpPass: settings.smtpPass || "",
        smtpSender: settings.smtpSender || "info@pkcreative.in",
        adminEmails: emailList,
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

    const emailString = values.adminEmails
      .map(item => item.email.trim())
      .filter(Boolean)
      .join(',');

    const submitValues = {
      smtpHost: values.smtpHost,
      smtpPort: values.smtpPort,
      smtpUser: values.smtpUser,
      smtpPass: values.smtpPass,
      smtpSender: values.smtpSender,
      adminEmail: emailString,
      metaAppId: values.metaAppId,
      metaAppSecret: values.metaAppSecret,
      instagramAccountId: values.instagramAccountId,
      metaAccessToken: values.metaAccessToken,
    };

    setDoc(settingsRef, submitValues, { merge: true })
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
              requestResourceData: submitValues,
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
              <div className="flex justify-between items-center pb-2 border-b border-border/20">
                <span className="text-sm text-muted-foreground">Configure your outgoing email settings here.</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyDetails}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Details</span>
                    </>
                  )}
                </Button>
              </div>
              
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
                    <FormItem>
                      <FormLabel>SMTP Password (or App Password)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                            value={field.value ?? ''} 
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center p-1"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )} />
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="smtpSender" render={({ field }) => (
                    <FormItem><FormLabel>Sender Email ("From")</FormLabel><FormControl><Input placeholder="noreply@pkcreative.in" type="email" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="space-y-4 pt-4 border-t border-border/40">
                <div>
                  <FormLabel className="text-base font-semibold block">Admin Notification Emails ("To")</FormLabel>
                  <FormDescription className="mt-1">Where should contact form inquiries and reminders be sent? Add one or more emails.</FormDescription>
                </div>
                
                <div className="space-y-3 max-w-md">
                  {fields.map((fieldItem, index) => (
                    <div key={fieldItem.id} className="flex gap-2 items-center">
                      <FormField 
                        control={form.control} 
                        name={`adminEmails.${index}.email`} 
                        render={({ field }) => (
                          <FormItem className="flex-grow space-y-0">
                            <FormControl>
                              <Input 
                                placeholder="admin@pkcreative.in" 
                                type="email" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )} 
                      />
                      {fields.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => remove(index)}
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 shrink-0"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => append({ email: "" })}
                  className="flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Add Email
                </Button>
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
