import type { Metadata } from 'next';
import { getInitialSiteContent } from '@/lib/server-utils';
import { SERVICE_LINKS } from '@/lib/seo';
import Header from '@/components/public/header';
import Footer from '@/components/public/footer';

export const metadata: Metadata = { title: 'Page not found | PK Creative', robots: { index: false, follow: true } };

export default async function NotFound() {
  const siteContent = await getInitialSiteContent();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header content={siteContent} />
      <main id="main-content" className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-headline text-7xl font-black text-gradient-primary sm:text-8xl">404</p>
        <h1 className="mt-4 font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">This page took a creative break</h1>
        <p className="mt-3 max-w-md text-muted-foreground">The page you are looking for does not exist or has moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to home</a>
          {SERVICE_LINKS.slice(0, 4).map((l) => (
            <a key={l.href} href={l.href} className="rounded-full border border-border px-5 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary">{l.label}</a>
          ))}
        </div>
      </main>
      <Footer content={siteContent} />
    </div>
  );
}
