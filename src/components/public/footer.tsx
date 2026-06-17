'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import Logo from '../logo';

const Footer = ({ content }: { content: SiteContent | null }) => {
  const socialLinks = content?.socials;

  const hasSocials = socialLinks && (socialLinks.linkedin || socialLinks.twitter || socialLinks.instagram || socialLinks.email);

  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <Logo />
          <p className="text-muted-foreground">
            Creative Solutions For Modern Brands. <br/>
            Website Design • Branding • Social Media
          </p>
          <div className="flex flex-col gap-1 text-sm font-medium mt-2">
            <span className="flex items-center gap-2"><span className="text-primary">🌐</span> pkcreative.in</span>
            <span className="flex items-center gap-2"><span className="text-primary">📧</span> info@pkcreative.in</span>
            <span className="flex items-center gap-2"><span className="text-primary">📱</span> 7880092829</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
           <h4 className="font-headline font-semibold text-lg">Quick Links</h4>
           <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
           <a href="#work" className="text-muted-foreground hover:text-primary transition-colors">Work</a>
           <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex flex-col gap-2">
            <h4 className="font-headline font-semibold text-lg">Socials</h4>
            <div className="flex items-center gap-4">
                <a href="https://instagram.com/pkcreative.in" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>
                <a href={`mailto:info@pkcreative.in`} aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors"><Mail /></a>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PK Creative. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
