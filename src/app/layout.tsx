import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import ScrollProgress from '@/components/motion/scroll-progress';
import FloatingContact from '@/components/public/floating-contact';
import JsonLd from '@/components/json-ld';
import { FirebaseClientProvider } from '@/firebase';
import { FirebaseErrorListener } from '@/components/firebase-error-listener';
import { getInitialSiteContent } from '@/lib/server-utils';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const revalidate = 300;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getInitialSiteContent();
  const seo = content?.seoSettings || {};

  const title = seo.metaTitle || DEFAULT_TITLE;
  const description = seo.metaDescription || DEFAULT_DESCRIPTION;
  const keywords = seo.keywords ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean) : DEFAULT_KEYWORDS;
  const ogImage = seo.ogImageUrl || DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s` },
    description,
    keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'Design & Technology',
    formatDetection: { telephone: true, email: true, address: false },
    alternates: { canonical: '/' },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
      apple: [{ url: '/icon-192x192.png', sizes: '192x192' }],
    },
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'black-translucent' },
    verification: {
      google: seo.googleSiteVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: seo.bingSiteVerification ? { 'msvalidate.01': seo.bingSiteVerification } : undefined,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: seo.twitterHandle || undefined,
      creator: seo.twitterHandle || undefined,
      images: [ogImage],
    },
    other: {
      'geo.region': 'IN-GJ',
      'geo.placename': 'Ahmedabad',
      'geo.position': seo.latitude && seo.longitude ? `${seo.latitude};${seo.longitude}` : '23.0225;72.5714',
      ICBM: seo.latitude && seo.longitude ? `${seo.latitude}, ${seo.longitude}` : '23.0225, 72.5714',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getInitialSiteContent();
  const gaTrackingId = content?.seoSettings?.gaTrackingId || process.env.NEXT_PUBLIC_GA_ID || '';
  // Follow the visitor's system appearance unless the admin pins light or dark
  const pref = content?.theme === 'light' || content?.theme === 'dark' ? content.theme : 'system';
  const whatsapp = content?.socials?.whatsapp;

  return (
    <html lang="en-IN" suppressHydrationWarning data-theme={pref} className={`scroll-smooth ${pref === 'system' ? '' : pref}`}>
      <head>
        <script
          // Runs before first paint so 'system' appearance never flashes the wrong theme
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;if(d.dataset.theme==='system'){d.classList.add(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}}catch(e){}})()`,
          }}
        />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd data={[organizationJsonLd(content), websiteJsonLd(content)]} />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {gaTrackingId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId.replace(/[^A-Za-z0-9-]/g, '')}');
              `}
            </Script>
          </>
        )}
        <FirebaseClientProvider>
          <ThemeProvider>
            <ScrollProgress />
            {children}
            <FloatingContact whatsapp={whatsapp} />
            <Toaster />
            <FirebaseErrorListener />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
