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
  heroTitle: z.string().min(1, "Title is required."),
  heroSubtitle: z.string().min(1, "Subtitle is required."),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  
  aboutText: z.string().min(1, "Bio is required."),
  aboutImageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  
  stats: z.array(z.object({
    label: z.string().min(1, 'Label is required.'),
    value: z.string().min(1, 'Value is required.'),
  })).optional(),

  skillsSectionTitle: z.string().optional(),
  skillsSectionDescription: z.string().optional(),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required.')
  })).optional(),

  toolsSectionTitle: z.string().optional(),
  toolsSectionDescription: z.string().optional(),
  tools: z.array(z.object({
    name: z.string().min(1, 'Tool name is required.'),
    iconUrl: z.string().url('Icon URL is required.'),
  })).optional(),
  
  gallerySectionTitle: z.string().optional(),
  gallerySectionDescription: z.string().optional(),

  portfolioSectionTitle: z.string().optional(),
  portfolioSectionDescription: z.string().optional(),

  services: z.array(z.object({
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(1, 'Description is required.'),
    icon: z.string().min(1, 'Icon name is required.')
  })).optional(),

  targetAudience: z.array(z.string()).optional(),

  theme: z.enum(['light', 'dark']).default('dark'),

  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  twitter: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  instagram: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),

  geminiModel: z.string().optional(),
  isAiFeatureEnabled: z.boolean().default(true),
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
      heroTitle: "",
      heroSubtitle: "",
      ctaText: "",
      ctaLink: "",
      aboutText: "",
      aboutImageUrl: "",
      stats: [],
      skillsSectionTitle: "Skills & Expertise",
      skillsSectionDescription: "",
      skills: [
        { name: "Graphic Design & Branding" },
        { name: "AI in Design (Image Generation & Enhancement)" },
        { name: "Social Media Design & Content Creation" },
        { name: "E-commerce Design (Amazon & Flipkart)" },
        { name: "Packaging & Label Design" },
        { name: "Digital Marketing Creatives" }
      ],
      toolsSectionTitle: "Tools I Use",
      toolsSectionDescription: "",
      tools: [],
      gallerySectionTitle: "Gallery",
      gallerySectionDescription: "",
      portfolioSectionTitle: "My Work",
      portfolioSectionDescription: "",
      services: [],
      targetAudience: [],
      theme: 'dark',
      linkedin: "",
      twitter: "",
      instagram: "",
      email: "",
      geminiModel: "models/gemini-1.5-flash",
      isAiFeatureEnabled: true,
    },
  });
  
  const { fields: statsFields, append: appendStat, remove: removeStat } = useFieldArray({
    control: form.control,
    name: "stats",
  });
  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });
  const { fields: toolsFields, append: appendTool, remove: removeTool } = useFieldArray({
    control: form.control,
    name: "tools",
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
        heroTitle: siteContent.heroTitle,
        heroSubtitle: siteContent.heroSubtitle,
        ctaText: siteContent.ctaText,
        ctaLink: siteContent.ctaLink,
        aboutText: siteContent.aboutText,
        aboutImageUrl: siteContent.aboutImageUrl,
        stats: siteContent.stats,
        skillsSectionTitle: siteContent.skillsSectionTitle || "Skills & Expertise",
        skillsSectionDescription: siteContent.skillsSectionDescription || "",
        skills: siteContent.skills?.map(s => ({ name: s })) || [],
        toolsSectionTitle: siteContent.toolsSectionTitle || "Tools I Use",
        toolsSectionDescription: siteContent.toolsSectionDescription || "",
        tools: siteContent.tools || [],
        gallerySectionTitle: siteContent.gallerySectionTitle || "Gallery",
        gallerySectionDescription: siteContent.gallerySectionDescription || "",
        portfolioSectionTitle: siteContent.portfolioSectionTitle || "My Work",
        portfolioSectionDescription: siteContent.portfolioSectionDescription || "",
        services: siteContent.services || [],
        targetAudience: siteContent.targetAudience || [],
        theme: siteContent.theme || 'dark',
        linkedin: siteContent.socials?.linkedin,
        twitter: siteContent.socials?.twitter,
        instagram: siteContent.socials?.instagram,
        email: siteContent.socials?.email,
        geminiModel: siteContent.aiSettings?.geminiModel || 'models/gemini-1.5-flash',
        isAiFeatureEnabled: siteContent.aiSettings?.isAiFeatureEnabled === undefined ? true : siteContent.aiSettings.isAiFeatureEnabled,
      });
    }
  }, [siteContent, form]);

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>, field: any) => {
    const convertedUrl = convertGoogleDriveLink(e.target.value);
    field.onChange(convertedUrl);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'aboutImageUrl' | `tools.${number}.iconUrl` ) => {
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
      skills: values.skills?.map(s => s.name),
      socials: {
        linkedin: values.linkedin,
        twitter: values.twitter,
        instagram: values.instagram,
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
                  <FormItem><FormLabel>Site Name</FormLabel><FormControl><Input placeholder="PK Creative" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
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
          <AccordionItem value="about">
            <AccordionTrigger className="text-xl font-semibold">About Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormField control={form.control} name="aboutText" render={({ field }) => (
                <FormItem><FormLabel>Biography</FormLabel><FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="space-y-2">
                <FormLabel>Your Picture</FormLabel>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="pt-4">
                    <FormField
                      control={form.control}
                      name="aboutImageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} value={field.value ?? ''} onBlur={(e) => handleUrlBlur(e, field)} />
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
                        <Input type="file" onChange={(e) => handleImageUpload(e, 'aboutImageUrl')} disabled={isUploading} />
                      </FormControl>
                      {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                      <FormMessage />
                    </FormItem>
                  </TabsContent>
                </Tabs>
                {aboutImageUrl && (
                  <div className="mt-4">
                    <FormLabel>Image Preview</FormLabel>
                    <div className="mt-2 relative aspect-square w-48 bg-muted rounded-md">
                      <Image src={aboutImageUrl} alt="About Me preview" fill className="rounded-md object-contain" />
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="stats">
            <AccordionTrigger className="text-xl font-semibold">Stats Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormLabel>Statistics</FormLabel>
              <FormDescription>Add key metrics to display on your site.</FormDescription>
              {statsFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2 p-2 border rounded-lg">
                  <div className="flex-grow grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name={`stats.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl><Input placeholder="e.g., 5+" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`stats.${index}.label`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Label</FormLabel>
                          <FormControl><Input placeholder="e.g., Years Experience" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeStat(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendStat({ label: '', value: '' })}>
                Add Stat
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="skills">
            <AccordionTrigger className="text-xl font-semibold">Skills Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <FormField control={form.control} name="skillsSectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="skillsSectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormLabel>Skills List</FormLabel>
              <FormDescription>Add skills to showcase your expertise.</FormDescription>
               {skillsFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2 p-2 border rounded-lg">
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel>Skill</FormLabel>
                          <FormControl><Input placeholder="e.g., Graphic Design" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '' })}>
                Add Skill
              </Button>
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="tools">
            <AccordionTrigger className="text-xl font-semibold">Tools Section</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormField control={form.control} name="toolsSectionTitle" render={({ field }) => (
                  <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="toolsSectionDescription" render={({ field }) => (
                  <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormLabel>Tools List</FormLabel>
              <FormDescription>Add tools you use, with an icon for each.</FormDescription>
              {toolsFields.map((field, index) => {
                const toolIconUrl = form.watch(`tools.${index}.iconUrl`);
                return (
                  <div key={field.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-grow space-y-4">
                       <FormField
                          control={form.control}
                          name={`tools.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tool Name</FormLabel>
                              <FormControl><Input placeholder="e.g., Figma" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <div className="space-y-2">
                          <Tabs defaultValue="url" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="url">URL</TabsTrigger>
                              <TabsTrigger value="upload">Upload</TabsTrigger>
                            </TabsList>
                            <TabsContent value="url" className="pt-4">
                              <FormField
                                control={form.control}
                                name={`tools.${index}.iconUrl`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Icon URL</FormLabel>
                                    <FormControl><Input placeholder="https://..." {...field} onBlur={(e) => handleUrlBlur(e, field)} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TabsContent>
                             <TabsContent value="upload" className="pt-4">
                               <FormItem>
                                <FormLabel>Upload an icon</FormLabel>
                                <FormControl>
                                    <Input type="file" onChange={(e) => handleImageUpload(e, `tools.${index}.iconUrl`)} disabled={uploadingIndex === index} />
                                </FormControl>
                                {uploadingIndex === index && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                                <FormMessage />
                               </FormItem>
                            </TabsContent>
                          </Tabs>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        {toolIconUrl && (
                            <div className="mt-2 relative h-16 w-16 bg-muted rounded-md">
                                <Image src={toolIconUrl} alt="Tool Icon Preview" fill className="rounded-md object-contain p-1" />
                            </div>
                        )}
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeTool(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                )
              })}
              <Button type="button" variant="outline" size="sm" onClick={() => appendTool({ name: '', iconUrl: '' })}>
                Add Tool
              </Button>
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
              <FormLabel>Our Services</FormLabel>
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
                          <FormLabel>Icon Name</FormLabel>
                          <FormControl><Input placeholder="e.g., monitor, layout, search" {...field} /></FormControl>
                          <FormDescription>Use Lucide icon names in lowercase (e.g., "monitor", "smartphone").</FormDescription>
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
              <Button type="button" variant="outline" size="sm" onClick={() => appendService({ title: '', description: '', icon: 'check-circle-2' })}>
                Add Service
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="audience">
            <AccordionTrigger className="text-xl font-semibold">Target Audience</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <FormLabel>Who We Help</FormLabel>
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
          <AccordionItem value="socials">
            <AccordionTrigger className="text-xl font-semibold">Contact & Socials</AccordionTrigger>
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
