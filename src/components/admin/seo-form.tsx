"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { SiteContent } from '@/types';

const formSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  ogImageUrl: z.string().optional(),
  gaTrackingId: z.string().optional(),
});

export default function SeoForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const firestore = useFirestore();
  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading: isFetching } = useDoc<SiteContent>(siteContentRef as any);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      ogImageUrl: "",
      gaTrackingId: "",
    },
  });

  useEffect(() => {
    if (siteContent && siteContent.seoSettings) {
      form.reset({
        metaTitle: siteContent.seoSettings.metaTitle || "",
        metaDescription: siteContent.seoSettings.metaDescription || "",
        keywords: siteContent.seoSettings.keywords || "",
        ogImageUrl: siteContent.seoSettings.ogImageUrl || "",
        gaTrackingId: siteContent.seoSettings.gaTrackingId || "",
      });
    }
  }, [siteContent, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const downloadURL = await uploadToCloudinary(file);
      form.setValue('ogImageUrl', downloadURL, { shouldValidate: true });
      toast({title: "Image uploaded successfully"});
    } catch (error: any) {
      toast({variant: "destructive", title: "Upload failed", description: error.message});
    } finally {
      setIsUploading(false);
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if(!firestore || !siteContentRef) return;
    setIsLoading(true);

    const dataToSave = {
      seoSettings: values
    };

    setDoc(siteContentRef, dataToSave, { merge: true })
        .then(() => {
            toast({
                title: "SEO Settings Saved",
                description: "Your meta tags and analytics ID have been updated.",
              });
        })
        .catch(async (serverError) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your SEO settings.",
              });
        })
        .finally(() => {
            setIsLoading(false);
        });
  };

  const applyProfessionalSeo = () => {
    form.reset({
      ...form.getValues(),
      metaTitle: "PK Creative | Premium Design & UI/UX Agency",
      metaDescription: "We are a premier creative agency specializing in cutting-edge website design, UI/UX, branding, and comprehensive social media management. We transform your vision into an impactful digital reality.",
      keywords: "design agency, website design, ui ux, branding, premium portfolio, creative studio",
      ogImageUrl: "/pk_hero_visual.png"
    });
    toast({ title: "Professional SEO Applied!", description: "Scroll down and click 'Save SEO Settings' to publish." });
  };

  if (isFetching) {
    return <Skeleton className="h-96 w-full" />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-primary/10 p-6 rounded-xl border border-primary/20 animate-fade-in-up">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">🚀 Launch Ready SEO Template</h3>
            <p className="text-sm text-muted-foreground mt-1">Instantly fill SEO metadata with professional keywords and descriptions.</p>
          </div>
          <Button type="button" onClick={applyProfessionalSeo} variant="default" className="whitespace-nowrap h-11 px-6 shadow-md hover:shadow-lg transition-all">
            ✨ Apply Professional SEO
          </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Global Meta Tags</CardTitle>
                <CardDescription>Configure how your site appears in Google Search results and social media shares.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="metaTitle" render={({ field }) => (
                  <FormItem><FormLabel>Global Meta Title</FormLabel><FormControl><Input placeholder="PK Creative | Premium Agency" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="metaDescription" render={({ field }) => (
                  <FormItem><FormLabel>Global Meta Description</FormLabel><FormControl><Textarea placeholder="We build modern brands..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="keywords" render={({ field }) => (
                  <FormItem><FormLabel>Keywords</FormLabel><FormDescription>Comma separated (e.g., UI design, web development, branding)</FormDescription><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="ogImageUrl" render={({ field }) => (
                  <FormItem className="space-y-4">
                      <div className="space-y-2">
                        <FormLabel>Open Graph Image URL</FormLabel>
                        <FormControl><Input placeholder="https://..." {...field} value={field.value ?? ''} /></FormControl>
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Or upload an image file</FormLabel>
                        <FormControl>
                          <Input type="file" onChange={handleImageUpload} disabled={isUploading} />
                        </FormControl>
                        {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                        <FormDescription>The image shown when your website is shared on Twitter, LinkedIn, Facebook, etc.</FormDescription>
                      </div>
                      <FormMessage />
                  </FormItem>
              )} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Google Analytics</CardTitle>
                <CardDescription>Track your visitors by connecting Google Analytics 4.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="gaTrackingId" render={({ field }) => (
                  <FormItem><FormLabel>GA Tracking ID (G-XXXXXXX)</FormLabel><FormControl><Input placeholder="G-XXXXXXXXXX" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading || isUploading}>{isLoading ? 'Saving...' : 'Save SEO Settings'}</Button>
      </form>
    </Form>
  );
}
