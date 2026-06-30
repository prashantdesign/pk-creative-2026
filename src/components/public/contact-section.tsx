'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, type FormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { SiteContent } from '@/types';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const initialState: FormState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full py-6 text-lg font-semibold rounded-xl">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactSection({ content }: { content?: SiteContent | null }) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const availableServices = content?.services?.map(s => s.title) || [
    'Website Design', 'UI/UX Design', 'Branding', 'Social Media', 'SEO Optimization'
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  useEffect(() => {
    if (state.message) {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      } else {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
        setSelectedServices([]);
      }
    }
  }, [state, toast]);

  const hasImage = !!content?.contactImageUrl;

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">{content?.contactSectionTitle || "Let's Work Together"}</h2>
          <p className="text-xl text-muted-foreground">
            {content?.contactSectionDescription || "Ready to elevate your brand? Fill out the form below and we'll be in touch shortly."}
          </p>
        </div>

        <div className={`mx-auto ${hasImage ? 'max-w-6xl' : 'max-w-2xl'}`}>
          <div className={`bg-background rounded-3xl shadow-2xl border border-border/50 overflow-hidden ${hasImage ? 'grid lg:grid-cols-2' : ''}`}>
            
            {/* Visual Column */}
            {hasImage && (
              <div className="relative hidden lg:block h-full min-h-[600px] bg-muted">
                <Image 
                  src={content.contactImageUrl!} 
                  alt="Contact Us" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            )}

            {/* Form Column */}
            <div className="p-8 md:p-12 animate-fade-in-up animation-delay-300">
              <form ref={formRef} action={formAction} className="space-y-8">
                <input type="hidden" name="services" value={JSON.stringify(selectedServices)} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base">Name</Label>
                    <Input id="name" name="name" type="text" placeholder="John Doe" className="bg-secondary/50 border-border/50 focus:bg-background transition-colors h-12" required />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" className="bg-secondary/50 border-border/50 focus:bg-background transition-colors h-12" required />
                  </div>
                </div>

                <div className="space-y-3 flex flex-col">
                  <Label className="text-base">I'm inquiring about...</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between font-normal text-muted-foreground h-12 px-4 bg-secondary/50 border-border/50 hover:bg-background hover:text-foreground">
                        {selectedServices.length > 0 
                          ? <span className="text-foreground truncate font-medium">{selectedServices.join(', ')}</span> 
                          : "Select services..."}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-64 overflow-y-auto">
                      {availableServices.map((service) => (
                        <DropdownMenuCheckboxItem
                          key={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                          onSelect={(e) => e.preventDefault()}
                        >
                          {service}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-base">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us about your project..." 
                    className="min-h-[160px] bg-secondary/50 border-border/50 focus:bg-background transition-colors resize-y" 
                    required 
                  />
                </div>

                <SubmitButton />
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
