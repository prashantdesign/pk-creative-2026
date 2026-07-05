'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { convertGoogleDriveLink } from '@/lib/utils';
import Image from 'next/image';
import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Skeleton } from '../ui/skeleton';
import { Trash2, MessageSquareQuote, Download, Upload } from 'lucide-react';
import type { SiteContent } from '@/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  testimonialsSectionTitle: z.string().optional(),
  testimonialsSectionDescription: z.string().optional(),
  testimonials: z.array(z.object({
    name: z.string().min(1, 'Name is required.'),
    role: z.string().optional().or(z.literal('')),
    content: z.string().min(1, 'Content is required.'),
    avatarUrl: z.string().optional(),
  })).optional(),
});

export default function TestimonialsClient() {
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
      testimonialsSectionTitle: "Client Stories",
      testimonialsSectionDescription: "Hear what our partners have to say about working with us.",
      testimonials: [],
    },
  });

  const { fields: testimonialsFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
    control: form.control,
    name: "testimonials",
  });

  useEffect(() => {
    if (siteContent) {
      form.reset({
        testimonialsSectionTitle: siteContent.testimonialsSectionTitle || "Client Stories",
        testimonialsSectionDescription: siteContent.testimonialsSectionDescription || "Hear what our partners have to say about working with us.",
        testimonials: siteContent.testimonials || [],
      });
    }
  }, [siteContent, form]);

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>, field: any) => {
    const convertedUrl = convertGoogleDriveLink(e.target.value);
    field.onChange(convertedUrl);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadingIndex(index);
      
      try {
          const downloadURL = await uploadToCloudinary(file);
          form.setValue(`testimonials.${index}.avatarUrl`, downloadURL, { shouldValidate: true });
          toast({title: "Avatar uploaded successfully"});
      } catch (error: any) {
          toast({variant: "destructive", title: "Avatar upload failed", description: error.message});
          console.error("Cloudinary upload error: ", error);
      } finally {
          setUploadingIndex(null);
      }
  }

  const handleDownloadTemplate = () => {
    const currentTestimonials = form.getValues('testimonials') || [];
    
    const data = currentTestimonials.map(t => ({
      'Client Name': t.name || '',
      'Role & Company': t.role || '',
      'Testimonial Quote': t.content || '',
      'Avatar URL': t.avatarUrl || ''
    }));
    
    if (data.length === 0) {
      data.push({
        'Client Name': 'Jane Doe',
        'Role & Company': 'CEO, TechFlow',
        'Testimonial Quote': 'Great service and stunning design!',
        'Avatar URL': 'https://res.cloudinary.com/djhqgz0vh/image/upload/v1783278488/kindpng_248253_gxapyn.png'
      });
    }
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const cols = [{ wch: 20 }, { wch: 25 }, { wch: 45 }, { wch: 35 }];
    worksheet['!cols'] = cols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Testimonials');
    
    XLSX.writeFile(workbook, 'testimonials_template.xlsx');
    toast({
      title: "Template Downloaded",
      description: "You can edit this template and upload it again to bulk add testimonials.",
    });
  };

  const handleUploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        if (!data) throw new Error("Could not read file data.");
        
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const rows = XLSX.utils.sheet_to_json<any>(worksheet);
        if (rows.length === 0) {
          toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "The uploaded file contains no data rows.",
          });
          return;
        }
        
        const newTestimonials: any[] = [];
        let skippedRowsCount = 0;
        
        rows.forEach((row: any) => {
          const name = row['Client Name'] ?? row['name'] ?? row['Name'] ?? '';
          const role = row['Role & Company'] ?? row['role'] ?? row['Role'] ?? row['Company'] ?? '';
          const content = row['Testimonial Quote'] ?? row['content'] ?? row['Quote'] ?? row['Testimonial'] ?? '';
          const avatarUrl = row['Avatar URL'] ?? row['avatarUrl'] ?? row['Avatar'] ?? '';
          
          if (!name.toString().trim() || !content.toString().trim()) {
            skippedRowsCount++;
            return;
          }
          
          newTestimonials.push({
            name: name.toString().trim(),
            role: role.toString().trim(),
            content: content.toString().trim(),
            avatarUrl: avatarUrl.toString().trim(),
          });
        });
        
        if (newTestimonials.length === 0) {
          toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "No valid rows found. Each testimonial needs a Name and Quote.",
          });
          return;
        }
        
        newTestimonials.forEach(testimonial => {
          appendTestimonial(testimonial);
        });
        
        toast({
          title: "Testimonials Imported",
          description: `Successfully added ${newTestimonials.length} testimonial(s).${skippedRowsCount > 0 ? ` Skipped ${skippedRowsCount} incomplete row(s).` : ''}`,
        });
        
        e.target.value = '';
      } catch (err: any) {
        toast({
          variant: "destructive",
          title: "Error Parsing File",
          description: err.message || "An error occurred while reading the Excel file.",
        });
        console.error(err);
      }
    };
    
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "File Read Error",
        description: "There was an error reading the file.",
      });
    };
    
    reader.readAsBinaryString(file);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if(!firestore || !siteContentRef) return;
    setIsLoading(true);

    setDoc(siteContentRef, values, { merge: true })
        .then(() => {
            toast({
                title: "Testimonials Updated",
                description: "Your testimonials have been saved successfully.",
              });
        })
        .catch(async (serverError) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your testimonials.",
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
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto"><Skeleton className="h-96 w-full" /></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="p-0">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
              <MessageSquareQuote className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Testimonials Section</h2>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-dashed">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-2">Section Settings</h3>
                  <FormField control={form.control} name="testimonialsSectionTitle" render={({ field }) => (
                      <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="testimonialsSectionDescription" render={({ field }) => (
                      <FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b">
                    <div>
                      <FormLabel className="text-base">Client Quotes</FormLabel>
                      <FormDescription>Add feedback from your clients to display on the homepage.</FormDescription>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={handleDownloadTemplate} className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Template
                      </Button>
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs gap-1">
                          <Upload className="h-3.5 w-3.5" />
                          Import Excel
                        </span>
                        <input
                          type="file"
                          accept=".xlsx, .xls"
                          className="hidden"
                          onChange={handleUploadExcel}
                        />
                      </label>
                      <Button type="button" size="sm" onClick={() => appendTestimonial({ name: '', role: '', content: '', avatarUrl: '' })}>
                        Add Testimonial
                      </Button>
                    </div>
                  </div>
                  
                  {testimonialsFields.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
                      <MessageSquareQuote className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium">No testimonials yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">Click the button above to add your first client quote.</p>
                      <Button type="button" variant="outline" onClick={() => appendTestimonial({ name: '', role: '', content: '', avatarUrl: '' })}>
                        Add Testimonial
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {testimonialsFields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-4 p-6 border rounded-lg bg-background shadow-sm relative group">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeTestimonial(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          <div className="w-full space-y-4 pr-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name={`testimonials.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`testimonials.${index}.role`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Role & Company (Optional)</FormLabel>
                                    <FormControl><Input placeholder="e.g., CEO, TechFlow" {...field} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name={`testimonials.${index}.content`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Testimonial Quote</FormLabel>
                                  <FormControl><Textarea className="h-24" placeholder="Their quote..." {...field} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`testimonials.${index}.avatarUrl`}
                              render={({ field }) => (
                                <FormItem className="bg-muted/20 p-4 rounded-lg border border-dashed">
                                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 bg-background">
                                      <Image 
                                        src={field.value && field.value.trim() !== '' 
                                          ? field.value 
                                          : 'https://res.cloudinary.com/djhqgz0vh/image/upload/v1783278488/kindpng_248253_gxapyn.png'} 
                                        alt="Avatar" 
                                        fill 
                                        className="object-cover" 
                                      />
                                    </div>
                                    <div className="flex-1 w-full space-y-2">
                                      <FormLabel>Avatar URL (Optional)</FormLabel>
                                      <FormControl><Input placeholder="https://..." {...field} value={field.value ?? ''} onBlur={(e) => handleUrlBlur(e, field)} /></FormControl>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground uppercase font-medium">Or upload:</span>
                                        <Input type="file" className="h-8 text-xs max-w-[250px]" onChange={(e) => handleImageUpload(e, index)} disabled={uploadingIndex === index} />
                                        {uploadingIndex === index && <span className="text-xs text-primary animate-pulse">Uploading...</span>}
                                      </div>
                                    </div>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t sticky bottom-0 bg-background pb-4">
                  <Button type="submit" size="lg" disabled={isLoading || uploadingIndex !== null} className="w-full md:w-auto">
                    {isLoading ? 'Saving Changes...' : 'Save Testimonials'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
