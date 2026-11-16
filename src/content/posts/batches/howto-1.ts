import type { RawPost } from '../types';

export const HOWTO_1: RawPost[] = [
  {
    slug: 'how-to-verify-your-website-in-google-search-console',
    title: 'How to Verify Your Website in Google Search Console (Step by Step)',
    description: 'Add and verify your website in Google Search Console using a domain property or URL prefix, with DNS, HTML tag and file methods explained clearly.',
    keywords: ['verify website Google Search Console', 'add property Search Console', 'domain property vs URL prefix', 'Search Console DNS verification'],
    intro: 'Search Console is the only place where Google tells you directly how it sees your website. Verification proves that you own the site, and until you do it you cannot see indexing errors, search queries or submit a sitemap. The process takes about ten minutes.',
    sections: [
      {
        heading: 'Choose the right property type',
        body: [
          'When you add a site, Google offers two options. A domain property covers every version of your address: http and https, with and without www, and any subdomain. It is verified through a DNS record and is the most complete choice if you control your domain settings.',
          'A URL prefix property covers only the exact address you enter, for example https://pkcreative.in. It is easier to verify, because it allows an HTML tag or file, but it will miss traffic on other versions. If your domain redirects between www and non-www, a domain property avoids confusion.',
        ],
      },
      {
        heading: 'Verify a domain property with DNS',
        body: [
          'Choose "Domain", enter your domain without https and click Continue. Google shows a TXT record that begins with google-site-verification. Open the DNS settings where you manage your domain, which is usually your registrar or Vercel if you use their nameservers, and add a new TXT record for the root of the domain with that value.',
          'Save the record, return to Search Console and click Verify. DNS changes can take a few minutes, sometimes a few hours. If it fails the first time, wait and try again before assuming something is wrong.',
        ],
      },
      {
        heading: 'Verify a URL prefix property',
        body: ['Choose "URL prefix", enter the full address including https and, if used, www, then pick one of these methods.'],
        list: [
          '**HTML tag:** copy the meta tag and paste it into the head of your home page, or into your site\'s SEO settings if it provides a field for it.',
          '**HTML file:** download the file Google gives you and upload it to the root of your site.',
          '**Google Analytics or Tag Manager:** works if you already have either installed on the site with the same Google account.',
        ],
      },
      {
        heading: 'Confirm that the right property is selected',
        body: [
          'After verifying, check the property name at the top left. If you verified the apex address but your site actually serves from the www address, your data will appear under the wrong property. Match the property to the address that real visitors reach without a redirect.',
        ],
      },
      {
        heading: 'What to do straight after verification',
        body: [
          'Submit your sitemap, inspect your home page with the URL Inspection tool and add a second owner or a team member so access does not depend on one person. Then check back in a few days, since data takes time to appear. Our [Search Console guide for beginners](/blog/google-search-console-guide-for-beginners) explains each report, and our [SEO team](/services/seo) can help if you get stuck.',
        ],
      },
    ],
    faq: [
      { q: 'How long does Search Console verification take?', a: 'HTML tag and file methods work immediately. DNS verification usually takes a few minutes but can take up to a day.' },
      { q: 'Should I verify both www and non-www?', a: 'A domain property covers both. With URL prefix properties you would need to add each version separately.' },
      { q: 'Can I verify someone else\'s website?', a: 'Only if you control it or have been given access. Verification proves ownership, so you need access to the site or its DNS.' },
    ],
  },
  {
    slug: 'how-to-submit-a-sitemap-to-google',
    title: 'How to Submit a Sitemap to Google and Check That It Works',
    description: 'Submit your XML sitemap in Google Search Console, read the status messages and fix the common errors that stop pages from being discovered.',
    keywords: ['submit sitemap to Google', 'sitemap.xml Search Console', 'sitemap could not fetch', 'XML sitemap errors'],
    intro: 'A sitemap is a list of the pages you want Google to find. Submitting it does not guarantee indexing, but it helps Google discover pages faster, especially on a new site with few links pointing to it.',
    sections: [
      {
        heading: 'Find your sitemap address',
        body: [
          'Most modern websites publish a sitemap at /sitemap.xml. Open yourdomain.in/sitemap.xml in a browser. You should see a list of web addresses wrapped in XML tags. If you see an error page, the sitemap does not exist or is at a different address, which your developer or SEO settings will tell you.',
          'Check that every address in the file begins with the same host and protocol as your live site. If your site serves from https://www.example.in but the sitemap lists https://example.in, every entry is a redirect and Google will report "Page with redirect".',
        ],
      },
      {
        heading: 'Submit it in Search Console',
        body: [
          'Open Search Console, choose your property and click Sitemaps in the left menu. Enter the path, such as sitemap.xml, in the "Add a new sitemap" box and press Submit. Google reads it within minutes, and the status should show Success with the number of discovered pages.',
        ],
      },
      {
        heading: 'Understand the status messages',
        body: ['The status column tells you how Google reacted.'],
        list: [
          '**Success:** the file was read; check the discovered page count against what you expect.',
          '**Couldn\'t fetch:** Google could not load the file. Check that it opens publicly and is not blocked by robots.txt.',
          '**Has errors:** the file loaded but some entries are invalid. Open the report for details.',
          '**Pending:** Google has accepted it but has not processed it yet.',
        ],
      },
      {
        heading: 'Keep the sitemap clean',
        body: [
          'List only pages you want in search: live, canonical and returning a normal response. Leave out admin pages, thank-you pages, pages that redirect, and duplicates. A short accurate sitemap is better than a long one full of junk.',
        ],
      },
      {
        heading: 'Referencing it in robots.txt',
        body: [
          'Add a line such as Sitemap: https://yourdomain.in/sitemap.xml to your robots.txt, so any crawler can find it. Then check the Pages report in a week to see how many listed URLs are indexed. If many remain "Discovered - currently not indexed", read our guide on [fixing that status](/blog/discovered-currently-not-indexed-fix) or ask our [SEO team](/services/seo).',
        ],
      },
    ],
    faq: [
      { q: 'Do I need a sitemap for a small website?', a: 'Google can find a small, well-linked site without one, but a sitemap still speeds up discovery and gives you useful reporting.' },
      { q: 'How often should I resubmit?', a: 'You usually do not need to. Google rechecks sitemaps periodically. Resubmit after major structural changes if you wish.' },
      { q: 'Why are some sitemap pages not indexed?', a: 'Google decides what to index. Weak content, duplicates, redirects or low site authority can all keep pages out.' },
    ],
  },
  {
    slug: 'how-to-fix-page-with-redirect-in-search-console',
    title: 'How to Fix "Page With Redirect" in Google Search Console',
    description: 'Why Search Console shows Page with redirect, how to find the cause in www, https and trailing slash settings, and how to fix and validate it.',
    keywords: ['page with redirect Search Console', 'fix redirect indexing error', 'www vs non-www redirect', 'sitemap redirect error'],
    intro: 'Seeing "Page with redirect" under Why pages aren\'t indexed is common and usually harmless in itself: Google found an address that sends visitors somewhere else, so it indexes the destination instead. The problem appears when your own sitemap or links point to the redirecting address.',
    sections: [
      {
        heading: 'What the message means',
        body: [
          'Google requested a URL and received a redirect to a different URL, so it did not index the first one. That is correct behaviour for old addresses. It becomes a problem when the addresses you want to rank are themselves redirecting, because then your real pages are not being reported as indexed under the property you are viewing.',
        ],
      },
      {
        heading: 'Find the cause with a quick test',
        body: ['Open the affected URLs from the report and test them, either with a browser or a header checker.'],
        list: [
          'Does the http version redirect to https? That one is expected.',
          'Does the non-www address redirect to www, or the other way round? Your sitemap and canonicals must use the final address.',
          'Does an address with a trailing slash redirect to one without, or reverse?',
          'Does an old page redirect to a new one that you did not update in links?',
        ],
      },
      {
        heading: 'Fix the most common cause: host mismatch',
        body: [
          'In many Vercel projects the primary domain is www, so the apex address redirects there. If your sitemap and canonical tags use the apex address, every URL redirects. Fix it by making your configured site address match the primary domain in your hosting settings, and make sure the Search Console property uses the same host.',
        ],
      },
      {
        heading: 'Update links and the sitemap',
        body: [
          'List only final addresses in your sitemap. Update menus, footers and internal links to point directly to the final URLs. Canonical tags should also use the final address. Leave genuine old-URL redirects in place so visitors and links are not lost.',
        ],
      },
      {
        heading: 'Validate the fix',
        body: [
          'After correcting the cause and redeploying, open the issue in Search Console and click Validate Fix. Google rechecks the listed URLs over a few days to a couple of weeks. Do not expect instant change. If you want an expert to trace it, see our [technical SEO guide](/blog/technical-seo-basics-explained) or contact our [SEO team](/services/seo).',
        ],
      },
    ],
    faq: [
      { q: 'Is Page with redirect a penalty?', a: 'No. It is an informational status. It only matters if it affects URLs you want to rank.' },
      { q: 'Should I remove redirects?', a: 'No. Redirects from old addresses are useful. Just make sure your sitemap and canonicals point to the final address.' },
      { q: 'How long does validation take?', a: 'Often several days to two weeks, depending on how many URLs are affected.' },
    ],
  },
  {
    slug: 'how-to-add-a-favicon-to-your-website',
    title: 'How to Add a Favicon to Your Website So It Shows in Google Results',
    description: 'Create and add a favicon in the right sizes and formats, so your logo appears in browser tabs and next to your listing in Google search.',
    keywords: ['add favicon to website', 'favicon size for Google', 'favicon.ico vs SVG', 'site icon search results'],
    intro: 'A favicon is the small icon in a browser tab. Google also shows it beside your listing in mobile search results, so a clear one helps people recognise and trust your site at a glance.',
    sections: [
      {
        heading: 'What Google expects',
        body: [
          'Google asks for a square icon that is a multiple of 48 pixels, such as 48 by 48, 96 by 96 or 192 by 192, in a format like PNG, SVG or ICO. The icon file must be crawlable, meaning robots.txt must not block it, and it should look sensible at 16 pixels.',
          'Google also asks that the favicon represents the site consistently and does not contain inappropriate content. Changing it can take days or weeks to update in results.',
        ],
      },
      {
        heading: 'Design the icon properly',
        body: [
          'A full logo with small text rarely survives at tiny sizes. Use a simple mark: a monogram or a distinctive symbol on a solid or transparent background. Test it by shrinking it to 16 pixels and checking that it is still recognisable in both light and dark browser themes.',
        ],
      },
      {
        heading: 'Which files to provide',
        body: ['A small set of files covers every device.'],
        list: [
          'An SVG icon for modern browsers, which scales perfectly.',
          'A 192 by 192 PNG for Android and for Google.',
          'A 512 by 512 PNG for installable web apps.',
          'A 180 by 180 PNG for iPhone home screens (apple touch icon).',
          'Optionally a classic favicon.ico for old browsers.',
        ],
      },
      {
        heading: 'Add it to your site',
        body: [
          'In the head of every page, include link tags that point to your icon files, for example a link with rel="icon" and the file path. Frameworks such as Next.js can generate this automatically when you place an icon file in the app folder or declare icons in the page metadata.',
        ],
      },
      {
        heading: 'Check that it works',
        body: [
          'Open your site in a private window and look at the tab. Visit yourdomain.in/favicon.ico or your icon path directly to confirm it loads. In Search Console, inspect your home page to ensure Google can fetch it. If you need a clean icon set for your brand, our [branding team](/services/branding) can provide one with your logo files, and our guide to [logo file formats](/blog/logo-file-formats-explained) explains which versions to keep.',
        ],
      },
    ],
    faq: [
      { q: 'How long until my favicon appears in Google?', a: 'It can take several days to a few weeks after Google recrawls your home page.' },
      { q: 'Can I use my full logo as a favicon?', a: 'Only if it stays legible at very small sizes. A simplified mark usually works better.' },
      { q: 'Do I need favicon.ico?', a: 'It is not required for modern browsers, but some older tools still look for it, so including one is harmless.' },
    ],
  },
  {
    slug: 'how-to-set-up-business-email-on-your-own-domain',
    title: 'How to Set Up Business Email on Your Own Domain (and Keep It Out of Spam)',
    description: 'Create professional email addresses on your domain, add MX, SPF, DKIM and DMARC records, and make sure your messages reach the inbox.',
    keywords: ['business email setup', 'email on own domain', 'SPF DKIM DMARC', 'professional email India'],
    intro: 'An address like hello@yourbrand.in looks more trustworthy than a free webmail address, and it belongs to you rather than to a provider. Setting it up properly also protects your messages from landing in spam.',
    sections: [
      {
        heading: 'Choose an email provider',
        body: [
          'You need a service that hosts your mailboxes. Popular options include Google Workspace, Microsoft 365 and Zoho Mail, along with email included in some hosting plans. Compare price per mailbox, storage, spam filtering, mobile apps and support. For most small businesses, a hosted mail service is more reliable than email on a cheap web hosting plan.',
        ],
      },
      {
        heading: 'Point your domain to the mail service',
        body: [
          'Your provider will give you MX records. Add them in the DNS settings of your domain, removing any old MX records first. If your website is hosted elsewhere, this does not affect it; DNS records for email and for the website are separate. Allow time for changes to spread, which can take up to a few hours.',
        ],
      },
      {
        heading: 'Add authentication records',
        body: ['These records prove that your messages are genuine.'],
        list: [
          '**SPF:** lists the servers allowed to send mail for your domain.',
          '**DKIM:** adds a digital signature to your messages, using a key your provider supplies.',
          '**DMARC:** tells receiving servers what to do with messages that fail SPF or DKIM, and sends you reports.',
        ],
      },
      {
        heading: 'Create sensible addresses',
        body: [
          'Set up role addresses such as hello@, support@ and accounts@, as well as personal ones for staff. Role addresses can be shared by a team and survive staff changes. Avoid publishing a personal address on your website where spam bots can harvest it; a contact form or a role address is safer.',
        ],
      },
      {
        heading: 'Test deliverability',
        body: [
          'Send messages to a few different providers and check that they arrive in the inbox. Use a free mail tester to see whether SPF, DKIM and DMARC pass. Keep your signature professional and avoid sending large mass emails from a normal mailbox. See our [email marketing guide](/blog/email-marketing-for-small-business-india) for newsletters, or ask our [team](/contact) to set up your domain and website together.',
        ],
      },
    ],
    faq: [
      { q: 'Can I keep my website and email at different providers?', a: 'Yes. Website hosting and email are separate and use different DNS records.' },
      { q: 'What happens to my old emails if I change provider?', a: 'You can migrate mailboxes with your provider\'s import tools. Plan the switch and keep the old service until the move is complete.' },
      { q: 'Why do my emails go to spam?', a: 'Missing SPF, DKIM or DMARC records, a poor sending reputation or spammy content are common causes.' },
    ],
  },
  {
    slug: 'how-to-connect-a-custom-domain-to-vercel',
    title: 'How to Connect a Custom Domain to Vercel (Apex, www and Redirects)',
    description: 'Add your domain in Vercel, set the DNS records, choose the primary host and redirect the other one so SEO signals stay consistent.',
    keywords: ['connect domain to Vercel', 'Vercel custom domain', 'Vercel www redirect', 'apex domain DNS'],
    intro: 'Connecting a domain to Vercel is quick, but the choices you make about www and non-www affect SEO. Pick one primary host, redirect the other to it and make sure every setting in your project agrees.',
    sections: [
      {
        heading: 'Add the domain to your project',
        body: [
          'In your Vercel project, open Settings and then Domains. Enter your domain, such as pkcreative.in, and add it. Do the same for the www version. Vercel will show which DNS records are needed and whether the configuration is valid.',
        ],
      },
      {
        heading: 'Set the DNS records',
        body: [
          'At your registrar or DNS provider, add the records that Vercel displays. Typically an A record for the apex domain points to Vercel\'s address, and a CNAME record for www points to Vercel\'s DNS name. If you prefer, you can move your nameservers to Vercel and let it manage everything. Use the exact values shown in your dashboard, because they can change.',
        ],
      },
      {
        heading: 'Choose the primary host',
        body: ['Search engines should see one canonical address.'],
        list: [
          'Decide whether visitors see example.in or www.example.in.',
          'In Vercel Domains, set the other host to redirect to the primary.',
          'Use a permanent redirect so signals pass to the primary address.',
          'Avoid also adding a redirect in your application code, which can create a loop.',
        ],
      },
      {
        heading: 'Make your site settings agree',
        body: [
          'Set your configured base URL, which drives canonical tags, the sitemap and robots.txt, to the primary host exactly, including https and the www choice. If these disagree, every sitemap URL will redirect and Search Console will report "Page with redirect". Also match the property you use in Search Console.',
        ],
      },
      {
        heading: 'Verify and monitor',
        body: [
          'Test all four versions: http and https, with and without www. Each should end on the same https primary address in at most one redirect. After the change, resubmit your sitemap. Our guide on [fixing Page with redirect](/blog/how-to-fix-page-with-redirect-in-search-console) explains validation, and our [web team](/services/website-design-ahmedabad) can handle the hosting setup for you.',
        ],
      },
    ],
    faq: [
      { q: 'Should I use www or non-www?', a: 'Either is fine for SEO. Choose one and be consistent. Non-www is shorter, while www can offer some DNS flexibility.' },
      { q: 'Why does my site redirect in a loop?', a: 'Usually two redirects fighting each other, for example one in Vercel and another in code or at the registrar. Keep only one.' },
      { q: 'Does changing the primary domain hurt SEO?', a: 'Not if you use permanent redirects and update canonicals and sitemaps, though rankings may take time to settle.' },
    ],
  },
  {
    slug: 'how-to-set-up-301-redirects-without-losing-seo',
    title: 'How to Set Up 301 Redirects Without Losing SEO',
    description: 'Plan, write and test permanent 301 redirects when you change URLs, so visitors and search engines reach the new pages and ranking signals carry over.',
    keywords: ['301 redirect', 'permanent redirect SEO', 'redirect old URLs to new', 'redirect map'],
    intro: 'Whenever a page address changes, the old address needs to point to the new one. A 301 redirect is a permanent signal that tells browsers and search engines where the content now lives and that ranking signals should move with it.',
    sections: [
      {
        heading: 'When you need a redirect',
        body: [
          'Redirects are needed when you rename a page, change your URL structure, move to a new domain, merge two pages into one or remove a page that has a close replacement. If you delete a page with no replacement, a clear 404 or 410 response is more honest than redirecting to the home page.',
        ],
      },
      {
        heading: 'Build a redirect map first',
        body: ['A spreadsheet prevents mistakes.'],
        list: [
          'Column one: the old URL, exactly as it appears now.',
          'Column two: the new URL that best matches the content.',
          'Include pages that have traffic, backlinks or rankings first.',
          'Map one-to-one wherever possible rather than sending everything to the home page.',
        ],
      },
      {
        heading: 'Implement them in the right place',
        body: [
          'In Next.js you can declare permanent redirects in the project configuration. On other platforms you may use the hosting dashboard, server rules or a plugin. Use a permanent status code (301 or 308) rather than a temporary one, since temporary redirects do not tell search engines to transfer signals.',
        ],
      },
      {
        heading: 'Avoid common mistakes',
        body: [
          'Do not chain redirects, where A goes to B and B goes to C; each hop slows things and can lose value. Do not create loops. Do not redirect to irrelevant pages, which search engines may treat as soft 404 errors. Update internal links and the sitemap to the final URLs so that redirects serve only old external links.',
        ],
      },
      {
        heading: 'Test and monitor',
        body: [
          'After launch, test every row of your map with a status checker and confirm a single 301 to the correct page. Watch Search Console for new errors and compare traffic for the moved pages over the next month. Keep redirects in place for at least a year. For a larger move, follow our [redesign checklist](/blog/website-redesign-checklist) or ask our [team](/services/website-design-ahmedabad).',
        ],
      },
    ],
    faq: [
      { q: 'What is the difference between 301 and 302?', a: 'A 301 is permanent and passes ranking signals. A 302 is temporary and signals that the original address will return.' },
      { q: 'How long should I keep redirects?', a: 'At least a year, and indefinitely for pages with valuable backlinks.' },
      { q: 'Do redirects slow my site?', a: 'A single redirect adds a small delay. Avoid chains and update internal links to point directly to final URLs.' },
    ],
  },
  {
    slug: 'how-to-write-meta-titles-and-descriptions-that-get-clicks',
    title: 'How to Write Meta Titles and Descriptions That Get Clicks',
    description: 'Write title tags and meta descriptions with the right length, keyword placement and promise, with before-and-after examples for service pages.',
    keywords: ['meta title tips', 'meta description writing', 'title tag length', 'improve click through rate'],
    intro: 'Your title and description are the first thing people read in search results. Even if you rank well, a weak snippet loses clicks to a competitor with a clearer one, and writing them carefully costs almost nothing.',
    sections: [
      {
        heading: 'Understand what each does',
        body: [
          'The title tag is the clickable headline in the result and a strong signal of what the page is about. The meta description is the supporting text underneath. Google may rewrite either if it thinks another version matches the search better, but a well-written original is usually kept.',
        ],
      },
      {
        heading: 'Write the title',
        body: ['A good title is specific, accurate and compact.'],
        list: [
          'Keep it around 50 to 60 characters so it is not cut off.',
          'Put the main phrase near the beginning.',
          'Add a clear qualifier such as a city, price or audience.',
          'End with the brand name only if there is room.',
          'Make every title on the site unique.',
        ],
      },
      {
        heading: 'Write the description',
        body: [
          'Aim for roughly 140 to 160 characters. State what the page offers and why it is worth clicking, and include a gentle call to action when natural. Mention concrete details such as a starting price, a delivery time or a free quote. Avoid filling it with keywords; it is for people.',
        ],
      },
      {
        heading: 'A before-and-after example',
        body: [
          'Before: "Home - PK Creative". After: "Website Design in Ahmedabad from ₹10,000 | PK Creative". The second says what is offered, where and at what price in under sixty characters. The description might continue: "Fast, SEO-ready websites with an admin panel. Get a free quote within one business day."',
        ],
      },
      {
        heading: 'Review and improve with data',
        body: [
          'In Search Console, find pages with many impressions but a low click-through rate, and rewrite their titles and descriptions. Wait a few weeks and compare. Change one thing at a time so you learn what works. See our [on-page SEO checklist](/blog/on-page-seo-checklist) for the full set of page-level checks, and our [SEO services](/services/seo) if you want support.',
        ],
      },
    ],
    faq: [
      { q: 'Do meta descriptions affect rankings?', a: 'Not directly, but a good description increases clicks, which benefits traffic.' },
      { q: 'Why did Google change my title?', a: 'Google may rewrite titles that are too long, vague or not matched to the query. Clearer, shorter titles are rewritten less often.' },
      { q: 'Should every page have a different description?', a: 'Yes. Duplicated descriptions make pages harder to tell apart in results.' },
    ],
  },
  {
    slug: 'how-to-write-good-alt-text-for-images',
    title: 'How to Write Good Alt Text for Images (SEO and Accessibility)',
    description: 'Write helpful alt text for photos, logos, icons and charts so screen readers and Google image search understand your images.',
    keywords: ['alt text for images', 'image SEO', 'accessibility alt attribute', 'write alt text'],
    intro: 'Alt text is a short written description of an image. It lets people using screen readers know what is shown, it appears when an image fails to load and it helps search engines understand your pictures, which can bring visitors from image search.',
    sections: [
      {
        heading: 'Describe what matters, briefly',
        body: [
          'Good alt text says what the image shows in the context of the page, in a sentence or less. For a photo on a branding page, "Designer reviewing logo concepts on a laptop" is more useful than "image1" or "branding". Aim for about 5 to 15 words and avoid starting with "image of" because screen readers already announce it as an image.',
        ],
      },
      {
        heading: 'Match the type of image',
        body: ['Different images need different treatment.'],
        list: [
          '**Informative photos:** describe the subject and relevant detail.',
          '**Logos:** use the company name, for example "PK Creative logo".',
          '**Linked images:** describe where the link goes, such as "View our branding services".',
          '**Charts and infographics:** summarise the key finding and put detailed data in the page text.',
          '**Decorative images:** use empty alt text so screen readers skip them.',
        ],
      },
      {
        heading: 'Use keywords naturally',
        body: [
          'If your image shows a relevant product or service, a related keyword may fit naturally, for example "Interior designer\'s living room project in Jaipur". Do not stuff keywords or repeat the same phrase on every image. Writing for a person who cannot see the picture keeps it natural.',
        ],
      },
      {
        heading: 'Add file names and surrounding text',
        body: [
          'Search engines also read file names and nearby text. Use descriptive file names with hyphens, such as logo-design-process-sketches.webp, and place images near paragraphs that discuss the same topic. Together these give context that improves understanding.',
        ],
      },
      {
        heading: 'Audit your site',
        body: [
          'Run a free accessibility checker or the Lighthouse tool to find images without alt text, then fix the most important pages first. Make alt text a required step whenever someone uploads an image in your admin panel. Learn more in our [accessibility guide](/blog/website-accessibility-for-small-business) and [image optimisation guide](/blog/image-optimisation-for-websites-designers).',
        ],
      },
    ],
    faq: [
      { q: 'How long should alt text be?', a: 'Usually under about 125 characters. Be descriptive but concise.' },
      { q: 'Should every image have alt text?', a: 'Every image needs the attribute. Informative images need a description, and decorative ones should have it empty.' },
      { q: 'Does alt text help Google rankings?', a: 'It helps Google understand images and can support image search visibility, alongside accessibility benefits.' },
    ],
  },
  {
    slug: 'how-to-create-an-xml-sitemap-and-robots-txt',
    title: 'How to Create an XML Sitemap and robots.txt for Your Website',
    description: 'Create a correct sitemap.xml and robots.txt file, with examples, rules for admin areas and tips for Next.js and other website platforms.',
    keywords: ['create XML sitemap', 'robots.txt example', 'sitemap and robots.txt', 'Next.js sitemap'],
    intro: 'The sitemap lists the pages you want search engines to find, and robots.txt tells crawlers which areas to avoid. Both are small text files, and mistakes in either can quietly keep a site out of search.',
    sections: [
      {
        heading: 'What an XML sitemap looks like',
        body: [
          'A sitemap is an XML file containing a url entry for each page, with its address and optionally the last modification date. Search engines mostly use the address and date, while priority and change frequency are largely ignored. A sitemap can hold up to 50,000 URLs; larger sites use a sitemap index that points to several files.',
        ],
      },
      {
        heading: 'Generate it automatically',
        body: [
          'Writing the file by hand is error-prone. Most platforms generate it: WordPress has plugins, and Next.js can build it from a sitemap file in the app folder that returns your list of pages. Generating it from the same data that builds your pages ensures new pages appear automatically.',
        ],
      },
      {
        heading: 'Rules for what to include',
        body: ['Keep the sitemap accurate.'],
        list: [
          'Include only canonical, indexable pages that return a normal response.',
          'Use the exact final address style, with the same host and https.',
          'Exclude redirecting pages, admin areas and pages marked noindex.',
          'Update the last modified date only when content really changes.',
        ],
      },
      {
        heading: 'A sensible robots.txt',
        body: [
          'A typical file allows crawling of the whole site, blocks private areas such as the admin panel and points to the sitemap. For example: User-agent: *, Allow: /, Disallow: /admin/, followed by Sitemap: https://yourdomain.in/sitemap.xml. Be careful: a single line like Disallow: / blocks the entire site and is a classic launch mistake.',
        ],
      },
      {
        heading: 'Test both files',
        body: [
          'Open yourdomain.in/robots.txt and /sitemap.xml in a browser, then use Search Console to submit the sitemap and the URL Inspection tool to confirm pages are not blocked. Remember that robots.txt prevents crawling but is not a security tool. For deeper detail see our [technical SEO guide](/blog/technical-seo-basics-explained) and [how to submit a sitemap](/blog/how-to-submit-a-sitemap-to-google).',
        ],
      },
    ],
    faq: [
      { q: 'Does robots.txt hide pages from Google?', a: 'It blocks crawling, but a blocked page can still appear if linked elsewhere. Use noindex to keep pages out of results.' },
      { q: 'Do I need both files?', a: 'They are not mandatory, but together they help control crawling and speed up discovery.' },
      { q: 'Can a wrong robots.txt remove my site from Google?', a: 'A rule that blocks all crawling can prevent indexing. Always check it after launches.' },
    ],
  },
];
