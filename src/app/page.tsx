import { getInitialSiteContent } from '@/lib/server-utils';
import { faqJsonLd, HOME_FAQS, webPageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/json-ld';
import HomeClient from '@/components/public/home-client';

// Statically regenerated every 5 minutes: fast for visitors, always crawlable, still CMS-fresh
export const revalidate = 300;

export default async function Home() {
  const initialSiteContent = await getInitialSiteContent();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            name: initialSiteContent?.seoSettings?.metaTitle || 'PK Creative',
            description: initialSiteContent?.seoSettings?.metaDescription || 'Creative solutions for modern brands.',
            path: '/',
          }),
          faqJsonLd(HOME_FAQS),
        ]}
      />
      <HomeClient initialSiteContent={initialSiteContent} />
    </>
  );
}
