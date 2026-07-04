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
import { ChevronDown, User, Mail, LayoutGrid, PenLine, Send, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const initialState: FormState = {
  message: '',
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl bg-[#612af5] hover:bg-[#521ede] dark:bg-primary dark:hover:bg-primary/95 text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
    >
      <Send className="h-5 w-5 shrink-0" />
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactSection({ content }: { content?: SiteContent | null }) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
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
        setErrorCount(prev => prev + 1);
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

  const defaultContactImage = "/pk_contact_visual.png";
  const contactImage = content?.contactImageUrl || defaultContactImage;
  const hasImage = true;

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-4 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold mb-3 sm:mb-4">{content?.contactSectionTitle || "Let's Work Together"}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            {content?.contactSectionDescription || "Ready to elevate your brand? Fill out the form below and we'll be in touch shortly."}
          </p>
        </div>

        <div className={`mx-auto ${hasImage ? 'max-w-6xl' : 'max-w-2xl'}`}>
          <div className={`bg-background rounded-2xl sm:rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-border/40 overflow-hidden ${hasImage ? 'grid lg:grid-cols-2' : ''}`}>
            
            {/* Visual Column */}
            {hasImage && (
              <div className="relative hidden lg:block h-full min-h-[600px] bg-white dark:bg-zinc-950 border-r border-border/30">
                <Image 
                  src={contactImage} 
                  alt="Contact Us" 
                  fill 
                  className="object-contain p-4"
                  priority
                />
              </div>
            )}

            {/* Form Column */}
            <div 
              key={errorCount}
              className={`p-5 sm:p-8 md:p-12 bg-white dark:bg-card/50 flex flex-col justify-center animate-fade-in-up animation-delay-300 ${state.error ? 'animate-shake' : ''}`}
            >
              <form ref={formRef} action={formAction} className="space-y-4 sm:space-y-6">
                <input type="hidden" name="services" value={JSON.stringify(selectedServices)} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base font-medium text-foreground">Name</Label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                      <Input 
                        id="name" 
                        name="name" 
                        type="text" 
                        placeholder="John Doe" 
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-[#fcfcfd] dark:bg-zinc-900/50 border-border/85 focus:border-primary/50 focus:bg-background transition-all rounded-xl sm:rounded-2xl text-sm sm:text-base placeholder:text-muted-foreground/50" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base font-medium text-foreground">Email</Label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-[#fcfcfd] dark:bg-zinc-900/50 border-border/85 focus:border-primary/50 focus:bg-background transition-all rounded-xl sm:rounded-2xl text-sm sm:text-base placeholder:text-muted-foreground/50" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base font-medium text-foreground">Phone <span className="text-muted-foreground/60 text-xs sm:text-sm font-normal">(Optional)</span></Label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-[#fcfcfd] dark:bg-zinc-900/50 border-border/85 focus:border-primary/50 focus:bg-background transition-all rounded-xl sm:rounded-2xl text-sm sm:text-base placeholder:text-muted-foreground/50" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <Label className="text-sm sm:text-base font-medium text-foreground">I'm inquiring about...</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-between font-normal h-12 sm:h-14 pl-10 sm:pl-12 pr-4 bg-[#fcfcfd] dark:bg-zinc-900/50 border-border/85 hover:bg-background/80 hover:text-foreground rounded-xl sm:rounded-2xl text-sm sm:text-base relative text-muted-foreground transition-all focus:border-primary/50"
                          type="button"
                        >
                          <span className="absolute left-3.5 sm:left-4 flex items-center">
                            <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                          </span>
                          {selectedServices.length > 0 ? (
                            <span className="text-foreground truncate font-medium">{selectedServices.join(', ')}</span>
                          ) : (
                            <span className="text-muted-foreground/50">Select services...</span>
                          )}
                          <ChevronDown className="h-5 w-5 opacity-60 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-64 overflow-y-auto rounded-xl">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm sm:text-base font-medium text-foreground">Message</Label>
                  <div className="relative flex">
                    <PenLine className="absolute left-3.5 top-3.5 sm:left-4 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/60" />
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tell us about your project..." 
                      className="pl-10 sm:pl-12 pt-3 sm:pt-4 min-h-[120px] sm:min-h-[160px] bg-[#fcfcfd] dark:bg-zinc-900/50 border-border/85 focus:border-primary/50 focus:bg-background transition-all text-sm sm:text-base rounded-xl sm:rounded-2xl resize-y placeholder:text-muted-foreground/50" 
                      required 
                    />
                  </div>
                </div>

                <SubmitButton />
              </form>

              {content?.socials?.whatsapp && (
                <div className="mt-8 pt-6 border-t border-border/40 text-center flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2">
                  <span className="text-muted-foreground text-sm font-medium">Or chat with us instantly:</span>
                  <a 
                    href={content.socials.whatsapp.startsWith('http') ? content.socials.whatsapp : `https://wa.me/${content.socials.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 border border-primary/20 shadow-sm w-full sm:w-auto max-w-[280px] sm:max-w-none"
                  >
                    <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">WhatsApp - {content.socials.whatsapp.startsWith('http') ? 'Chat Now' : content.socials.whatsapp}</span>
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
