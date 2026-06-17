"use client";

import React, { useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useFirestore, useDoc, useCollection } from '@/firebase';
import { generateProjectDetails } from '@/ai/flows/generate-project-details';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { convertGoogleDriveLink } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Sparkles } from 'lucide-react';
import type { Project, SiteContent, ProjectCategory } from '@/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectCategoryId: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("A valid main image URL is required"),
  projectImages: z.array(z.string().url()),
  toolsUsed: z.string(),
  order: z.coerce.number(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  outcome: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof formSchema>;

function saveProject(firestore: any, projectId: string | undefined, data: any) {
  const projectData = { ...data, updatedAt: serverTimestamp() };
  if (projectId) {
    const projectRef = doc(firestore, 'projects', projectId);
    setDoc(projectRef, projectData, { merge: true }).catch(async (serverError: any) => {
        const permissionError = new FirestorePermissionError({
          path: projectRef.path,
          operation: 'update',
          requestResourceData: projectData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  } else {
    const collRef = collection(firestore, 'projects');
    const finalData = { ...projectData, createdAt: serverTimestamp() };
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

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'siteContent', 'global') : null, [firestore]);
  const { data: siteContent } = useDoc<SiteContent>(siteContentRef);

  const categoriesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'projectCategories'), orderBy('name'));
  }, [firestore]);
  const { data: categories, isLoading: categoriesLoading } = useCollection<ProjectCategory>(categoriesQuery);


  const defaultValues: Partial<ProjectFormValues> = {
    title: project?.title || '',
    description: project?.description || '',
    projectCategoryId: project?.projectCategoryId || '',
    imageUrl: project?.imageUrl || '',
    projectImages: project?.projectImages || [],
    toolsUsed: project?.toolsUsed || '',
    order: project?.order || 0,
    problem: project?.problem || '',
    solution: project?.solution || '',
    outcome: project?.outcome || '',
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projectImages",
  });

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>, field: any) => {
    const convertedUrl = convertGoogleDriveLink(e.target.value);
    field.onChange(convertedUrl);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'imageUrl' | 'projectImages') => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
          const downloadURL = await uploadToCloudinary(file);
          
          if (fieldName === 'imageUrl') {
              form.setValue('imageUrl', downloadURL, { shouldValidate: true });
          } else {
              append(downloadURL);
          }
          toast({title: "Image uploaded successfully"});
      } catch (error: any) {
          toast({variant: "destructive", title: "Image upload failed", description: error.message});
          console.error("Cloudinary upload error: ", error);
      } finally {
          setIsUploading(false);
      }
  }

  const handleGenerateAIDetails = async () => {
    const title = form.getValues('title');
    const description = form.getValues('description');

    if (!title) {
        toast({ variant: 'destructive', title: 'Title is required to generate details.' });
        return;
    }

    setIsGenerating(true);
    toast({ title: 'Generating AI content...', description: 'This may take a moment.'});
    try {
        const result = await generateProjectDetails({
            title,
            description,
            modelName: siteContent?.aiSettings?.geminiModel,
        });

        form.setValue('problem', result.problem);
        form.setValue('solution', result.solution);
        form.setValue('outcome', result.outcome);
        toast({ title: 'Success!', description: 'Case study details have been generated.' });
    } catch (error: any) {
        console.error('AI Generation Error:', error);
        toast({ variant: 'destructive', title: 'AI Generation Failed', description: error.message });
    } finally {
        setIsGenerating(false);
    }
  }

  const onSubmit = (data: ProjectFormValues) => {
    if(!firestore) {
        toast({ variant: "destructive", title: "Firestore not available" });
        return;
    }
    setIsSaving(true);
    saveProject(firestore, project?.id, data);
    toast({
      title: project ? "Project Updated" : "Project Created",
      description: "Your project has been saved successfully.",
    });
    router.push('/admin/projects');
    router.refresh();
    setIsSaving(false);
  };
  
  const mainImageUrl = form.watch('imageUrl');
  const additionalImages = form.watch('projectImages');
  const projectTitle = form.watch('title');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Project Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <div className="space-y-6">
             <FormField
                control={form.control}
                name="projectCategoryId"
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
             <FormField control={form.control} name="toolsUsed" render={({ field }) => (
                <FormItem><FormLabel>Tools Used</FormLabel><FormControl><Input placeholder="Figma, Photoshop" {...field} /></FormControl><FormDescription>Comma-separated values.</FormDescription><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="order" render={({ field }) => (
                <FormItem><FormLabel>Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={['images', 'caseStudy']} className="w-full">
          <AccordionItem value="images">
            <AccordionTrigger className="text-xl font-semibold">Project Images</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              <div className="space-y-2 p-4 border rounded-lg">
                <FormLabel className="font-semibold">Main Image</FormLabel>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="pt-4">
                    <FormField control={form.control} name="imageUrl" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl><Input placeholder="https://..." {...field} onBlur={(e) => handleUrlBlur(e, field)} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </TabsContent>
                  <TabsContent value="upload" className="pt-4">
                    <FormItem>
                      <FormLabel>Upload an image file</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={(e) => handleImageUpload(e, 'imageUrl')} disabled={isUploading} />
                      </FormControl>
                      {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                      <FormMessage />
                    </FormItem>
                  </TabsContent>
                </Tabs>
                {mainImageUrl && (
                  <div className="mt-4">
                    <FormLabel>Preview</FormLabel>
                    <div className="mt-2 relative aspect-video w-full max-w-sm bg-muted rounded-md">
                      <Image src={mainImageUrl} alt="Main image preview" fill className="rounded-md object-contain" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-4 border rounded-lg">
                <FormLabel className="font-semibold">Additional Images</FormLabel>
                <FormDescription>Add image URLs for the project carousel.</FormDescription>
                {fields.map((field, index) => (
                  <div key={field.id} className="p-2 border rounded-md">
                    <div className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`projectImages.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormLabel>Image URL #{index + 1}</FormLabel>
                            <FormControl><Input {...field} onBlur={(e) => handleUrlBlur(e, field)} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="mt-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {additionalImages?.[index] && (
                      <div className="mt-4">
                        <FormLabel>Preview</FormLabel>
                        <div className="mt-2 relative aspect-video w-full max-w-xs bg-muted rounded-md">
                          <Image src={additionalImages[index]} alt={`Preview ${index + 1}`} fill className="rounded-md object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-4 pt-4">
                  <Button type="button" variant="outline" size="sm" onClick={() => append("")}>
                    Add by URL
                  </Button>
                  <div className="flex-grow">
                    <FormLabel className="text-sm font-normal">Or upload to add</FormLabel>
                    <Input type="file" onChange={(e) => handleImageUpload(e, 'projectImages')} disabled={isUploading || isGenerating} />
                    {isUploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {(siteContent?.aiSettings?.isAiFeatureEnabled ?? true) && (
            <AccordionItem value="caseStudy">
              <AccordionTrigger className="text-xl font-semibold">Case Study Details</AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                  <div className="flex justify-end">
                      <Button type="button" variant="outline" onClick={handleGenerateAIDetails} disabled={isGenerating || !projectTitle}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isGenerating ? 'Generating...' : 'Generate with AI'}
                      </Button>
                  </div>
                  <FormField control={form.control} name="problem" render={({ field }) => (
                      <FormItem><FormLabel>The Problem</FormLabel><FormControl><Textarea className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="solution" render={({ field }) => (
                      <FormItem><FormLabel>The Solution</FormLabel><FormControl><Textarea className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="outcome" render={({ field }) => (
                      <FormItem><FormLabel>Outcome</FormLabel><FormControl><Textarea className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>

        <Button type="submit" disabled={isSaving || isUploading || isGenerating || categoriesLoading}>
          {isSaving ? 'Saving...' : 'Save Project'}
        </Button>
      </form>
    </Form>
  );
}
