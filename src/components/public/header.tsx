'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/logo';
import type { SiteContent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '@/components/motion/magnetic';
import { Button } from '@/components/ui/button';

import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const Header = ({ content: initialContent }: { content?: SiteContent | null }) => {
  const firestore = useFirestore();
  const siteContentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pkcreative_siteContent', 'global') : null),
    [firestore]
  );
  const { data: fetchedContent } = useDoc<SiteContent>(siteContentRef);
  const content = initialContent || fetchedContent;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/work' },
    ...(content?.isTeamSectionVisible !== false ? [{ label: 'Team', href: '/team' }] : []),
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'border-b border-border/40 bg-background/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-[72px] md:px-6">
          <Magnetic strength={10}>
            <a href="/" className="flex items-center" aria-label="Home">
              <Logo siteName={content?.siteName} logoUrl={content?.logoUrl} />
            </a>
          </Magnetic>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Magnetic key={item.label} strength={12}>
                <a
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic strength={14}>
              <Button
                asChild
                className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              >
                <a href="/#contact">Let&apos;s Talk</a>
              </Button>
            </Magnetic>
          </div>

          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur-md md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
            <nav className="relative mt-24 flex flex-1 flex-col gap-2 px-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border/40 py-5 font-headline text-3xl font-bold tracking-tight text-foreground"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + navItems.length * 0.06, duration: 0.4 }}
                className="mt-8"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary py-6 text-base text-primary-foreground"
                >
                  <a href="/#contact" onClick={() => setIsOpen(false)}>
                    Let&apos;s Talk
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
