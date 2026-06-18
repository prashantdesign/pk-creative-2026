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

  return {
    title: seoSettings.metaTitle || 'PK Creative | Creative Solutions For Modern Brands',
    description: seoSettings.metaDescription || 'Website Design, UI/UX, Branding and Social Media Management for modern brands.',
    keywords: seoSettings.keywords || 'design, branding, agency',
    openGraph: {
      images: seoSettings.ogImageUrl ? [seoSettings.ogImageUrl] : [],
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let gaTrackingId = '';
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    const snap = await getDoc(doc(db, 'pkcreative_siteContent', 'global'));
    if (snap.exists()) {
      gaTrackingId = snap.data()?.seoSettings?.gaTrackingId || '';
    }
  } catch (error) {}

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
