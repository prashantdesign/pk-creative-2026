import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { FirebaseClientProvider } from '@/firebase';
import { FirebaseErrorListener } from '@/components/firebase-error-listener';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });

export async function generateMetadata(): Promise<Metadata> {
  let seoSettings: any = {};
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    const snap = await getDoc(doc(db, 'pkcreative_siteContent', 'global'));
    if (snap.exists()) {
      seoSettings = snap.data()?.seoSettings || {};
    }
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pkcreative.in';

  return {
    metadataBase: new URL(baseUrl),
    title: seoSettings.metaTitle || 'PK Creative | Creative Solutions For Modern Brands',
    description: seoSettings.metaDescription || 'Website Design, UI/UX, Branding and Social Media Management for modern brands.',
    keywords: seoSettings.keywords || 'design, branding, agency, website development, ui ux, social media marketing',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: seoSettings.metaTitle || 'PK Creative | Creative Solutions For Modern Brands',
      description: seoSettings.metaDescription || 'Website Design, UI/UX, Branding and Social Media Management for modern brands.',
      url: baseUrl,
      siteName: 'PK Creative',
      type: 'website',
      images: seoSettings.ogImageUrl ? [seoSettings.ogImageUrl] : [
        {
          url: '/favicon.ico',
          width: 800,
          height: 600,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoSettings.metaTitle || 'PK Creative | Creative Solutions For Modern Brands',
      description: seoSettings.metaDescription || 'Website Design, UI/UX, Branding and Social Media Management for modern brands.',
      images: seoSettings.ogImageUrl ? [seoSettings.ogImageUrl] : [],
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
  let gaTrackingId = '';
  let theme = 'dark';
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    const snap = await getDoc(doc(db, 'pkcreative_siteContent', 'global'));
    if (snap.exists()) {
      gaTrackingId = snap.data()?.seoSettings?.gaTrackingId || '';
      theme = snap.data()?.theme || 'dark';
    }
  } catch (error) {}

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PK Creative",
    "image": "https://pkcreative.in/favicon.ico",
    "url": "https://pkcreative.in",
    "description": "Website Design, UI/UX, Branding and Social Media Management for modern brands.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${theme}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        {gaTrackingId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}');
              `}
            </Script>
          </>
        )}
        <FirebaseClientProvider>
          <ThemeProvider>
            {children}
            <Toaster />
            <FirebaseErrorListener />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
