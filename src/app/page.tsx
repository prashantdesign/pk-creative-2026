import { getInitialSiteContent } from '@/lib/server-utils';
import { faqJsonLd, HOME_FAQS, webPageJsonLd } from '@/lib/seo';
import JsonLd from '@/components/json-ld';
import HomeClient from '@/components/public/home-client';
import LatestGuides from '@/components/public/latest-guides';
import { POSTS } from '@/lib/posts';
import { getCategory } from '@/content/categories';

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
      <HomeClient
        initialSiteContent={initialSiteContent}
        guides={<LatestGuides guides={POSTS.slice(0, 6).map((p) => ({ slug: p.slug, title: p.title, category: getCategory(p.category)?.name || '' }))} />}
      />
    </>
  );
}
