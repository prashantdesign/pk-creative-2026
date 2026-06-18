"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { convertGoogleDriveLink } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '../ui/skeleton';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { SiteContent } from '@/types';
import { Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Image from 'next/image';
import { Switch } from '../ui/switch';

const formSchema = z.object({
  siteName: z.string().optional(),
  logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  heroTitle: z.string().min(1, "Title is required."),
  heroSubtitle: z.string().min(1, "Subtitle is required."),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  
  gallerySectionTitle: z.string().optional(),
  gallerySectionDescription: z.string().optional(),

  portfolioSectionTitle: z.string().optional(),
  portfolioSectionDescription: z.string().optional(),

  servicesSectionTitle: z.string().optional(),
  servicesSectionDescription: z.string().optional(),
  services: z.array(z.object({
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(1, 'Description is required.'),
    icon: z.string().optional()
  })).optional(),

  targetAudienceSectionTitle: z.string().optional(),
  targetAudienceSectionDescription: z.string().optional(),

  targetAudience: z.array(z.string()).optional(),

  theme: z.enum(['light', 'dark', 'system']).default('dark'),

  contactSectionTitle: z.string().optional(),
  contactSectionDescription: z.string().optional(),

  footerDescription: z.string().optional(),
  footerCopyrightText: z.string().optional(),

  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  twitter: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  instagram: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  whatsapp: z.string().optional().or(z.literal('')),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),

  geminiModel: z.string().optional(),
  isAiFeatureEnabled: z.boolean().default(true),
  
  aboutImageUrl: z.string().optional(),

  isWebsiteShowcaseVisible: z.boolean().default(true),
  websiteShowcaseTitle: z.string().optional(),
  websiteShowcaseDescription: z.string().optional(),
});


export default function SiteContentForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const firestore = useFirestore();

  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading: isFetching } = useDoc<SiteContent>(siteContentRef as any);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      logoUrl: "",
      heroTitle: "Creative Graphic & Brand Design Agency",
      heroSubtitle: "We design impactful visuals and digital experiences using creativity, strategy, and AI-powered tools. With years of experience, we help brands grow through strong visual identity, e-commerce design, and engaging digital content.",
      ctaText: "View Our Work",
      ctaLink: "",
      gallerySectionTitle: "Gallery",
      gallerySectionDescription: "",
      portfolioSectionTitle: "Our Work",
      portfolioSectionDescription: "",
      servicesSectionTitle: "Our Services",
      servicesSectionDescription: "Everything you need to grow your modern brand.",
      services: [],
      targetAudienceSectionTitle: "Who We Help",
      targetAudienceSectionDescription: "We partner with ambitious brands across various industries to deliver outstanding digital experiences.",
      targetAudience: [],
      contactSectionTitle: "Get in Touch",
      contactSectionDescription: "Have a project in mind or just want to say hello? Drop us a line.",
      footerDescription: "Creative Solutions For Modern Brands.\nWebsite Design • Branding • Social Media",
      footerCopyrightText: "© 2026 PK Creative. All Rights Reserved.",
      theme: 'dark',
      linkedin: "",
      twitter: "",
      instagram: "",
      whatsapp: "",
      email: "info@pkcreative.in",
      geminiModel: "models/gemini-1.5-flash",
      isAiFeatureEnabled: true,
      aboutImageUrl: "",
      isWebsiteShowcaseVisible: true,
      websiteShowcaseTitle: "Websites We've Built",
      websiteShowcaseDescription: "Check out some of the live websites we've designed and developed.",
    },
  });

  const { fields: servicesFields, append: appendService, remove: removeService } = useFieldArray({
    control: form.control,
    name: "services",
  });
  const { fields: audienceFields, append: appendAudience, remove: removeAudience } = useFieldArray({
    control: form.control,
    name: "targetAudience" as never, // cast due to flat array of strings
  });

  useEffect(() => {
    if (siteContent) {
      form.reset({
        siteName: siteContent.siteName || '',
        logoUrl: siteContent.logoUrl || '',
        heroTitle: siteContent.heroTitle,
        heroSubtitle: siteContent.heroSubtitle,
        ctaText: siteContent.ctaText,
        ctaLink: siteContent.ctaLink,
        gallerySectionTitle: siteContent.gallerySectionTitle || "Gallery",
        gallerySectionDescription: siteContent.gallerySectionDescription || "",
        portfolioSectionTitle: siteContent.portfolioSectionTitle || "Our Work",
        portfolioSectionDescription: siteContent.portfolioSectionDescription || "",
        servicesSectionTitle: siteContent.servicesSectionTitle || "Our Services",
        servicesSectionDescription: siteContent.servicesSectionDescription || "Everything you need to grow your modern brand.",
        services: siteContent.services || [],
        targetAudienceSectionTitle: siteContent.targetAudienceSectionTitle || "Who We Help",
        targetAudienceSectionDescription: siteContent.targetAudienceSectionDescription || "We partner with ambitious brands across various industries to deliver outstanding digital experiences.",
        targetAudience: siteContent.targetAudience || [],
        contactSectionTitle: siteContent.contactSectionTitle || "Get in Touch",
        contactSectionDescription: siteContent.contactSectionDescription || "Have a project in mind or just want to say hello? Drop us a line.",
        footerDescription: siteContent.footerDescription || "Creative Solutions For Modern Brands.\nWebsite Design • Branding • Social Media",
        footerCopyrightText: siteContent.footerCopyrightText || "© 2026 PK Creative. All Rights Reserved.",
        theme: siteContent.theme || 'dark',
        linkedin: siteContent.socials?.linkedin,
        twitter: siteContent.socials?.twitter,
        instagram: siteContent.socials?.instagram,
        whatsapp: siteContent.socials?.whatsapp,
        email: siteContent.socials?.email,
        geminiModel: siteContent.aiSettings?.geminiModel || 'models/gemini-1.5-flash',
        isAiFeatureEnabled: siteContent.aiSettings?.isAiFeatureEnabled === undefined ? true : siteContent.aiSettings.isAiFeatureEnabled,
        aboutImageUrl: siteContent.aboutImageUrl || "",
        isWebsiteShowcaseVisible: siteContent.isWebsiteShowcaseVisible === undefined ? true : siteContent.isWebsiteShowcaseVisible,
        websiteShowcaseTitle: siteContent.websiteShowcaseTitle || "Websites We've Built",
        websiteShowcaseDescription: siteContent.websiteShowcaseDescription || "Check out some of the live websites we've designed and developed.",
      });
    }
  }, [siteContent, form]);

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>, field: any) => {
    const convertedUrl = convertGoogleDriveLink(e.target.value);
    field.onChange(convertedUrl);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: any ) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if(typeof fieldName === 'string' && fieldName.startsWith('tools.')) {
        const index = parseInt(fieldName.split('.')[1], 10);
        setUploadingIndex(index);
      } else {
        setIsUploading(true);
      }
      
      try {
          const downloadURL = await uploadToCloudinary(file);
          form.setValue(fieldName, downloadURL, { shouldValidate: true });
          toast({title: "Image uploaded successfully"});
      } catch (error: any) {
          toast({variant: "destructive", title: "Image upload failed", description: error.message});
          console.error("Cloudinary upload error: ", error);
      } finally {
          setIsUploading(false);
          setUploadingIndex(null);
      }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if(!firestore || !siteContentRef) return;
    setIsLoading(true);

    const dataToSave = {
      ...values,
      socials: {
        linkedin: values.linkedin,
        twitter: values.twitter,
        instagram: values.instagram,
        whatsapp: values.whatsapp,
        email: values.email,
      },
      aiSettings: {
        geminiModel: values.geminiModel,
        isAiFeatureEnabled: values.isAiFeatureEnabled,
      }
    };

    setDoc(siteContentRef, dataToSave, { merge: true })
        .then(() => {
            toast({
                title: "Content Updated",
                description: "Your website content has been saved successfully.",
              });
        })
        .catch(async (serverError) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your content.",
              });
            const permissionError = new FirestorePermissionError({
              path: siteContentRef.path,
              operation: 'update',
              requestResourceData: dataToSave,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsLoading(false);
        });
  };

  const aboutImageUrl = form.watch('aboutImageUrl');

  if (isFetching) {
    return <Skeleton className="h-96 w-full" />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple" defaultValue={['hero', 'about', 'services', 'audience', 'stats', 'skills', 'tools', 'gallery', 'portfolio', 'theme', 'socials', 'ai']} className="w-full">
          <AccordionItem value="hero">
            <AccordionTrigger className="text-xl font-semibold">Hero Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormField control={form.control} name="siteName" render={({ field }) => (
                  <FormItem><FormLabel>Site Name (Text Logo)</FormLabel><FormControl><Input placeholder="PK Creative" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="logoUrl" render={({ field }) => (
                  <FormItem className="space-y-4">
                      <div className="space-y-2">
                        <FormLabel>Logo URL (Optional)</FormLabel>
                        <FormControl><Input placeholder="https://..." {...field} value={field.value ?? ''} onBlur={(e) => handleUrlBlur(e, field)} /></FormControl>
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Or upload a custom logo</FormLabel>
                        <FormControl>
                          <Input type="file" onChange={(e) => handleImageUpload(e, 'logoUrl' as any)} disabled={isUploading} />
                        </FormControl>
                        {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                        <FormDescription>If provided, this image will be used instead of the Site Name text in the header and footer.</FormDescription>
                      </div>
                      <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="heroTitle" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="heroSubtitle" render={({ field }) => (
                <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="ctaText" render={({ field }) => (
                <FormItem><FormLabel>CTA Button Text</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="ctaLink" render={({ field }) => (
                <FormItem><FormLabel>CTA Button Link</FormLabel><FormControl><Input {...field} placeholder="#work" value={field.value ?? ''}/></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gallery">
            <AccordionTrigger className="text-xl font-semibold">Gallery Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="gallerySectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="gallerySectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="portfolio">
            <AccordionTrigger className="text-xl font-semibold">Portfolio Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="portfolioSectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="portfolioSectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="services">
            <AccordionTrigger className="text-xl font-semibold">Services Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="servicesSectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="servicesSectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormLabel>Our Services List</FormLabel>
              <FormDescription>Add services to display on the homepage.</FormDescription>
              {servicesFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-grow space-y-4">
                    <FormField
                      control={form.control}
                      name={`services.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Title</FormLabel>
                          <FormControl><Input placeholder="e.g., UI/UX Design" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`services.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl><Textarea placeholder="Short description..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`services.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon Name (Optional)</FormLabel>
                          <FormControl><Input placeholder="e.g., monitor, layout, search" {...field} /></FormControl>
                          <FormDescription>Leave blank to auto-detect the best icon, or use a specific Lucide icon name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeService(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendService({ title: '', description: '', icon: '' })}>
                Add Service
              </Button>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="websiteShowcase">
            <AccordionTrigger className="text-xl font-semibold">Website Showcase Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">

              <FormField control={form.control} name="websiteShowcaseTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input placeholder="Websites We've Built" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="websiteShowcaseDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="audience">
            <AccordionTrigger className="text-xl font-semibold">Target Audience</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="targetAudienceSectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="targetAudienceSectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormLabel>Who We Help List</FormLabel>
              <FormDescription>List the industries or client types you serve.</FormDescription>
              {audienceFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2 p-2 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`targetAudience.${index}` as never}
                    render={({ field: inputField }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Client Type</FormLabel>
                        <FormControl><Input placeholder="e.g., Hotels & Resorts" {...inputField} value={(inputField.value as unknown as string) || ''} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeAudience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendAudience('')}>
                Add Target Audience
              </Button>
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="ai">
            <AccordionTrigger className="text-xl font-semibold">AI Settings</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormField
                control={form.control}
                name="isAiFeatureEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Enable AI Features</FormLabel>
                      <FormDescription>
                        Enable AI-powered case study generation in the project editor.
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
              <FormDescription>
                The API Key must be set as an environment variable (GEMINI_API_KEY) for security reasons.
              </FormDescription>
               <FormField control={form.control} name="geminiModel" render={({ field }) => (
                  <FormItem><FormLabel>Gemini Model Name</FormLabel><FormControl><Input placeholder="models/gemini-1.5-flash" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="theme">
            <AccordionTrigger className="text-xl font-semibold">Site Theme</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose a theme for your public website</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="light" />
                          </FormControl>
                          <FormLabel className="font-normal">Light</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dark" />
                          </FormControl>
                          <FormLabel className="font-normal">Dark</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contact">
            <AccordionTrigger className="text-xl font-semibold">Contact Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="contactSectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="contactSectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="footer">
            <AccordionTrigger className="text-xl font-semibold">Footer Settings</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="footerDescription" render={({ field }) => (
                  <FormItem><FormLabel>Footer Agency Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="footerCopyrightText" render={({ field }) => (
                  <FormItem><FormLabel>Copyright Text</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="socials">
            <AccordionTrigger className="text-xl font-semibold">Contact Links & Socials</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public Contact Email</FormLabel>
                    <FormDescription>The email address displayed publicly on your site.</FormDescription>
                    <FormControl><Input placeholder="your.email@example.com" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="linkedin" render={({ field }) => (
                  <FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="whatsapp" render={({ field }) => (
                  <FormItem><FormLabel>WhatsApp Number / Link</FormLabel><FormControl><Input placeholder="+1234567890 or wa.me/..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="twitter" render={({ field }) => (
                  <FormItem><FormLabel>Twitter URL</FormLabel><FormControl><Input placeholder="https://twitter.com/..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="instagram" render={({ field }) => (
                  <FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input placeholder="https://instagram.com/..." {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit" disabled={isLoading || isUploading || uploadingIndex !== null}>{isLoading ? 'Saving...' : 'Save Content'}</Button>
      </form>
    </Form>
  );
}
