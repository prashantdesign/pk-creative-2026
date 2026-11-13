import React from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Shared banner for inner pages. Server-rendered and visible on first paint (good for LCP). */
export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-background pb-10 pt-16 sm:pb-14 sm:pt-24 md:pt-28">
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && <span className="mb-4 block text-sm font-semibold text-primary sm:text-base">{eyebrow}</span>}
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-6xl md:text-7xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-snug text-muted-foreground sm:text-xl md:text-2xl">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
