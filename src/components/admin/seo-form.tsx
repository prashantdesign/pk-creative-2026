"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { evaluateSeo } from '@/lib/seo-score';
import { SITE_URL } from '@/lib/seo';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { CheckCircle2, Circle, ExternalLink, Sparkles } from 'lucide-react';
import type { SiteContent } from '@/types';

const formSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  ogImageUrl: z.string().optional(),
  gaTrackingId: z.string().optional(),
  googleSiteVerification: z.string().optional(),
  bingSiteVerification: z.string().optional(),
  twitterHandle: z.string().optional(),
  phone: z.string().optional(),
  businessEmail: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  priceRange: z.string().optional(),
  sameAsText: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const emptyValues: FormValues = {
  metaTitle: '', metaDescription: '', keywords: '', ogImageUrl: '', gaTrackingId: '',
  googleSiteVerification: '', bingSiteVerification: '', twitterHandle: '',
  phone: '', businessEmail: '', streetAddress: '', city: '', region: '', postalCode: '',
  latitude: '', longitude: '', priceRange: '', sameAsText: '',
};

/** Counter that turns green inside the recommended range and amber outside it. */
function Counter({ value, min, max }: { value: string; min: number; max: number }) {
  const n = value.length;
  const ok = n >= min && n <= max;
  return (
    <span className={`text-xs tabular-nums ${n === 0 ? 'text-muted-foreground' : ok ? 'text-emerald-500' : 'text-amber-500'}`}>
      {n} / {min}-{max} characters
    </span>
  );
}

export default function SeoForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const firestore = useFirestore();
  const siteContentRef = useMemo(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: siteContent, loading: isFetching } = useDoc<SiteContent>(siteContentRef as any);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    const s = siteContent?.seoSettings;
    if (s) {
      form.reset({
        ...emptyValues,
        ...Object.fromEntries(Object.entries(s).filter(([k, v]) => typeof v === 'string' && k in emptyValues)),
        sameAsText: (s.sameAs || []).join('\n'),
      });
    }
  }, [siteContent, form]);

  const watched = form.watch();
  const liveScore = useMemo(
    () =>
      evaluateSeo(
        { ...watched, sameAs: (watched.sameAsText || '').split('\n').map((x) => x.trim()).filter(Boolean) },
        siteContent
      ),
    [watched, siteContent]
  );

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

  const onSubmit = (values: FormValues) => {
    if(!firestore || !siteContentRef) return;
    setIsLoading(true);

    const { sameAsText, ...rest } = values;
    const trimmed = Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, (v ?? '').toString().trim()]));
    const dataToSave = {
      seoSettings: {
        ...trimmed,
        sameAs: (sameAsText || '').split('\n').map((x) => x.trim()).filter((x) => /^https?:\/\//.test(x)),
      },
    };

    setDoc(siteContentRef, dataToSave, { merge: true })
        .then(() => {
            toast({
                title: "SEO Settings Saved",
                description: "Live on the site within about 5 minutes (pages refresh automatically).",
              });
        })
        .catch(() => {
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
      metaTitle: "PK Creative | Website Design, Branding & SEO Agency in India",
      metaDescription: "Premium website design from ₹10,000, UI/UX, branding, SEO and social media for modern brands. Based in Ahmedabad, serving all of India. Get a free quote.",
      keywords: "website design agency India, website design Ahmedabad, website design Rajasthan, web development company, UI UX design, branding agency, SEO services India, social media management, PK Creative",
      ogImageUrl: "/opengraph-image",
      city: form.getValues('city') || 'Ahmedabad',
      region: form.getValues('region') || 'Gujarat',
      priceRange: form.getValues('priceRange') || '₹10,000+',
    });
    toast({ title: "Professional SEO Applied!", description: "Review the fields, then click 'Save SEO Settings' to publish." });
  };

  if (isFetching) {
    return <Skeleton className="h-96 w-full" />
  }

  const title = watched.metaTitle || 'PK Creative | Website Design, Branding & SEO Agency in India';
  const description = watched.metaDescription || 'Premium website design from ₹10,000, UI/UX, branding, SEO and social media for modern brands.';
  const scoreColor = liveScore.score >= 80 ? 'text-emerald-500' : liveScore.score >= 50 ? 'text-amber-500' : 'text-red-500';

  const tools = [
    { label: 'Google Search Console', href: 'https://search.google.com/search-console' },
    { label: 'Submit sitemap', href: `https://search.google.com/search-console/sitemaps` },
    { label: 'View sitemap.xml', href: `${SITE_URL}/sitemap.xml` },
    { label: 'View robots.txt', href: `${SITE_URL}/robots.txt` },
    { label: 'Rich Results Test', href: `https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE_URL)}` },
    { label: 'PageSpeed Insights', href: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}` },
    { label: 'Bing Webmaster Tools', href: 'https://www.bing.com/webmasters' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-primary/10 p-6 rounded-xl border border-primary/20">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Launch Ready SEO Template</h3>
            <p className="text-sm text-muted-foreground mt-1">Instantly fill the title, description, keywords and business defaults with proven values.</p>
          </div>
          <Button type="button" onClick={applyProfessionalSeo} className="whitespace-nowrap h-11 px-6 shadow-md hover:shadow-lg transition-all">
            Apply Professional SEO
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Global Meta Tags</CardTitle>
                <CardDescription>Configure how your site appears in Google Search results and social media shares.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="metaTitle" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between"><FormLabel>Homepage Meta Title</FormLabel><Counter value={field.value ?? ''} min={30} max={60} /></div>
                    <FormControl><Input placeholder="PK Creative | Website Design, Branding & SEO Agency" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="metaDescription" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between"><FormLabel>Homepage Meta Description</FormLabel><Counter value={field.value ?? ''} min={70} max={160} /></div>
                    <FormControl><Textarea rows={3} placeholder="We build modern brands..." {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="keywords" render={({ field }) => (
                  <FormItem><FormLabel>Keywords</FormLabel><FormDescription>Comma separated. Mix services and places (e.g. website design Ahmedabad, branding agency India).</FormDescription><FormControl><Textarea rows={2} {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="ogImageUrl" render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Open Graph Image URL</FormLabel>
                      <FormControl><Input placeholder="https://... (1200x630 recommended)" {...field} value={field.value ?? ''} /></FormControl>
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Or upload an image file</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                      </FormControl>
                      {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                      <FormDescription>The image shown when your website is shared on WhatsApp, LinkedIn, Facebook, X, etc. Leave empty to use the auto-generated brand card.</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="twitterHandle" render={({ field }) => (
                  <FormItem><FormLabel>X / Twitter handle</FormLabel><FormControl><Input placeholder="@pkcreative" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Business Details</CardTitle>
                <CardDescription>Powers LocalBusiness structured data, which helps Google show your agency for city and &quot;near me&quot; searches.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+91 98765 43210" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="businessEmail" render={({ field }) => (
                  <FormItem><FormLabel>Business email</FormLabel><FormControl><Input placeholder="info@pkcreative.in" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="streetAddress" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>Street address</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Ahmedabad" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="region" render={({ field }) => (
                  <FormItem><FormLabel>State / Region</FormLabel><FormControl><Input placeholder="Gujarat" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="postalCode" render={({ field }) => (
                  <FormItem><FormLabel>Postal code</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="priceRange" render={({ field }) => (
                  <FormItem><FormLabel>Price range</FormLabel><FormControl><Input placeholder="₹10,000+" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="latitude" render={({ field }) => (
                  <FormItem><FormLabel>Latitude (optional)</FormLabel><FormControl><Input placeholder="23.0225" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="longitude" render={({ field }) => (
                  <FormItem><FormLabel>Longitude (optional)</FormLabel><FormControl><Input placeholder="72.5714" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="sameAsText" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Other profile links (one per line)</FormLabel>
                    <FormDescription>Google Business Profile, Behance, Dribbble, YouTube, Facebook... Instagram / LinkedIn / X are picked up automatically from Site Content.</FormDescription>
                    <FormControl><Textarea rows={3} placeholder="https://www.behance.net/pkcreative" {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics & Search Console</CardTitle>
                <CardDescription>Connect Google Analytics 4 and verify your site with search engines so you can track rankings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="gaTrackingId" render={({ field }) => (
                  <FormItem><FormLabel>GA Tracking ID (G-XXXXXXX)</FormLabel><FormControl><Input placeholder="G-XXXXXXXXXX" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="googleSiteVerification" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Search Console verification code</FormLabel>
                    <FormDescription>In Search Console choose &quot;HTML tag&quot; and paste only the content=&quot;...&quot; value.</FormDescription>
                    <FormControl><Input placeholder="abc123XYZ..." {...field} value={field.value ?? ''} /></FormControl><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="bingSiteVerification" render={({ field }) => (
                  <FormItem><FormLabel>Bing Webmaster verification code</FormLabel><FormControl><Input {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            <Button type="submit" size="lg" disabled={isLoading || isUploading}>{isLoading ? 'Saving...' : 'Save SEO Settings'}</Button>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Google preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="truncate text-xs text-muted-foreground">{SITE_URL.replace('https://', '')}</p>
                <p className="line-clamp-2 text-lg leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">{title.slice(0, 70)}</p>
                <p className="line-clamp-3 text-sm text-muted-foreground">{description.slice(0, 170)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base">SEO score</CardTitle>
                <span className={`text-3xl font-bold ${scoreColor}`}>{liveScore.score}</span>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {liveScore.checks.map((c) => (
                    <li key={c.id} className="flex items-start gap-2 text-sm" title={c.hint}>
                      {c.passed ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                      <span>
                        <span className={c.passed ? 'text-muted-foreground' : 'font-medium'}>{c.label}</span>
                        {!c.passed && <span className="block text-xs text-muted-foreground">{c.hint}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-base">SEO tools</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-2">
                {tools.map((t) => (
                  <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors hover:border-primary/50 hover:text-primary">
                    {t.label}<ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </form>
    </Form>
  );
}
