'use client';
import React from 'react';
import Image from 'next/image';
import type { SiteContent } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ content }: { content: SiteContent | null }) => {
  const defaultHeroMedia = "/pk_hero_visual.png";
  const mediaUrl = content?.heroMediaUrl || defaultHeroMedia;
  const hasMedia = true;
  const isVideo = mediaUrl.toLowerCase().includes('.mp4');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };



  return (
    <section id="home" className={`relative overflow-hidden bg-background ${hasMedia ? 'pt-4 pb-20 md:pt-6 md:pb-24 lg:pt-8 lg:pb-32' : 'py-16'}`}>
      {/* Background Glowing Blobs with Infinite floating logic */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full mix-blend-multiply filter blur-[128px] pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className={`grid gap-12 items-center ${hasMedia ? 'lg:grid-cols-[1.25fr_0.75fr]' : 'grid-cols-1 text-center justify-items-center'}`}>
          
          {/* Text Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`space-y-8 ${hasMedia ? 'max-w-2xl' : 'max-w-5xl mx-auto'}`}
          >
            <motion.div 
              variants={itemVariants}
              className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary shadow-sm mb-6 ${!hasMedia ? 'mx-auto' : ''}`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Creative Solutions For Modern Brands</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter text-foreground leading-[1.1] ${!hasMedia ? 'lg:text-9xl' : ''}`}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-muted-foreground">
                {content?.heroTitle || 'We Are PK Creative'}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className={`text-xl md:text-2xl text-muted-foreground font-body leading-relaxed ${!hasMedia ? 'mx-auto max-w-2xl' : ''}`}
            >
              {content?.heroSubtitle ||
                'We deliver premium Website Design, UI/UX, Branding, and Social Media Management.'}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className={`pt-4 flex flex-col sm:flex-row items-center gap-4 ${!hasMedia ? 'justify-center' : ''}`}
            >
              <motion.div 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-7 rounded-full text-lg font-semibold shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.6)] w-full"
                >
                  <a href={content?.ctaLink || "#services"}>
                    <span className="relative z-10 flex items-center">
                      {content?.ctaText || 'Our Services'}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  </a>
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-7 rounded-full text-lg font-medium border-border hover:bg-accent hover:text-accent-foreground transition-all w-full"
                >
                  <a href="#contact">
                    Contact Us
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Media Column with premium float and shadow shift */}
          {hasMedia && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1,
                y: [0, -10, 0]
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 25px 60px -15px rgba(97, 42, 245, 0.3)",
                transition: { duration: 0.4 }
              }}
              className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl group border border-border/50 mx-auto lg:mx-0 lg:justify-self-end cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              {isVideo ? (
                <video 
                  src={mediaUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Hero Visual"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </motion.div>
          )}

        </div>
      </div>
      
      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
