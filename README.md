# PK Creative (pkcreative.in)

Premium agency website + admin panel built with Next.js 15 (App Router), Tailwind, Framer Motion and Firebase (Firestore/Auth).

## Local development

```bash
npm install --legacy-peer-deps
cp .env.example .env.local   # fill in the values
npm run dev                   # http://localhost:9002
```

## Deploying to Vercel (pkcreative.in)

1. Import the repo in Vercel (framework: Next.js is auto-detected, `vercel.json` sets the install command).
2. Add every variable from `.env.example` under **Project → Settings → Environment Variables** (Production + Preview).
   `NEXT_PUBLIC_BASE_URL` must be `https://pkcreative.in`.
3. **Domains**: add `pkcreative.in` (primary) and `www.pkcreative.in`. Choose which host is primary under Vercel Domains (the site declares `https://pkcreative.in` as canonical, so make the apex primary and let Vercel redirect www to it). Do not add a second redirect in code, it can cause a loop.
4. Deploy. Public pages are statically generated and refresh from Firestore every 5 minutes (ISR), so admin edits go live without a redeploy.

### Instagram scheduler (optional)
`/api/cron/instagram` checks for due posts. It requires `Authorization: Bearer $CRON_SECRET`.
Vercel Cron on the Hobby plan only supports daily schedules; on Pro add to `vercel.json`:

```json
"crons": [{ "path": "/api/cron/instagram", "schedule": "*/15 * * * *" }]
```

## SEO checklist after first deploy

1. Admin → **SEO & Analytics**: click *Apply Professional SEO*, fill business phone/address, paste the Google Search Console verification code, add the GA4 ID, save.
2. In [Google Search Console](https://search.google.com/search-console) add the `https://pkcreative.in` property and submit `https://pkcreative.in/sitemap.xml`; use *URL Inspection → Request indexing* on the home page and each service page.
3. Add the same property in [Bing Webmaster Tools](https://www.bing.com/webmasters).
4. Create / claim a Google Business Profile for the Ahmedabad address and link it from the SEO page's "Other profile links".
5. Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

## What is built in

- Per-page metadata, canonical URLs, Open Graph/Twitter cards and a generated brand share image (`/opengraph-image`).
- JSON-LD: LocalBusiness/ProfessionalService, WebSite, WebPage, Service, FAQPage, BreadcrumbList.
- `sitemap.xml`, `robots.txt`, web app manifest, security headers, long-term caching for static assets, `www` → apex redirect.
- Dedicated service landing pages (Ahmedabad, Rajasthan, UI/UX, Branding, Graphic Design, Social Media, SEO) with internal linking.
- Cloudinary delivery optimisation (`f_auto,q_auto`), AVIF/WebP via `next/image`.
- Admin: dashboard with live stats and SEO health score, SEO editor with SERP preview and checklist, grouped navigation with unread badge.
