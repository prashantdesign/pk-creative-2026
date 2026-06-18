'use client';
import React from 'react';
import type { SiteContent } from '@/types';
import { Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import Logo from '../logo';

import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const Footer = ({ content: initialContent }: { content?: SiteContent | null }) => {
  const firestore = useFirestore();
  const siteContentRef = useMemoFirebase(() => firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null, [firestore]);
  const { data: fetchedContent } = useDoc<SiteContent>(siteContentRef);
  
  const content = initialContent || fetchedContent;
  const socialLinks = content?.socials;

  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <Logo siteName={content?.siteName} logoUrl={content?.logoUrl} />
          <p className="text-muted-foreground whitespace-pre-line">
            {content?.footerDescription || "Creative Solutions For Modern Brands. \n Website Design • Branding • Social Media"}
          </p>
          <div className="flex flex-col gap-1 text-sm font-medium mt-2">
            {socialLinks?.linkedin && <span className="flex items-center gap-2"><span className="text-primary">🌐</span> <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></span>}
            {socialLinks?.email && <span className="flex items-center gap-2"><span className="text-primary">📧</span> <a href={`mailto:${socialLinks.email}`} className="hover:text-primary transition-colors">{socialLinks.email}</a></span>}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
           <h4 className="font-headline font-semibold text-lg">Quick Links</h4>
           <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
           <a href="/work" className="text-muted-foreground hover:text-primary transition-colors">Work</a>
           {content?.isTeamSectionVisible !== false && (
             <a href="/team" className="text-muted-foreground hover:text-primary transition-colors">Team</a>
           )}
           <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex flex-col gap-2">
            <h4 className="font-headline font-semibold text-lg">Socials</h4>
            <div className="flex items-center gap-4">
                {socialLinks?.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>}
                {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>}
                {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>}
                {socialLinks?.email && <a href={`mailto:${socialLinks.email}`} aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors"><Mail /></a>}
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>{content?.footerCopyrightText || `© ${new Date().getFullYear()} PK Creative. All Rights Reserved.`}</p>
      </div>
    </footer>
  );
};

export default Footer;
