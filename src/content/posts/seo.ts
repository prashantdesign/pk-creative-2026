import type { RawPost } from './types';

export const SEO: RawPost[] = [
  {
    slug: 'what-is-seo-beginners-guide-india',
    title: 'What Is SEO? A Beginner\'s Guide for Indian Business Owners',
    description: 'SEO explained without jargon: how Google ranks pages, the three parts of SEO, how long it takes and what a small Indian business should do first.',
    keywords: ['what is SEO', 'SEO for beginners India', 'search engine optimization basics', 'how Google ranks websites'],
    intro: 'SEO, short for search engine optimisation, is the work of helping the right people find your website on Google. It is not a trick or a one-time setup; it is a set of habits that make your site useful, fast and trustworthy.',
    sections: [
      {
        heading: 'How Google decides what to show',
        body: [
          'When someone searches, Google looks through the pages it has stored and picks the ones most likely to answer that search well. It considers what the page says, how it is structured, how fast it loads, whether it works on phones and whether other trustworthy sites link to it.',
          'Nobody outside Google knows every signal, but the broad direction is stable: pages that genuinely help people tend to rank.',
        ],
      },
      {
        heading: 'The three parts of SEO',
        body: ['It helps to split the work into three areas.'],
        list: [
          '**Technical SEO:** the site loads fast, works on mobile, is secure and can be crawled.',
          '**On-page SEO:** each page has a clear topic, a good title, useful headings and helpful content.',
          '**Off-page SEO:** other reputable websites, directories and profiles mention and link to you.',
        ],
      },
      {
        heading: 'Keywords: matching how people really search',
        body: [
          'A keyword is simply the phrase someone types. "Website designer in Ahmedabad" and "how much does a website cost" are keywords with very different intent: the first person is ready to hire, the second is still learning. Good SEO covers both kinds with the right page for each.',
        ],
      },
      {
        heading: 'How long does SEO take?',
        body: [
          'New pages often need several weeks to be indexed and a few months to settle into stable positions, depending on competition. Local and low-competition searches move faster than national ones. Be wary of anyone promising first-page rankings in a week.',
        ],
      },
      {
        heading: 'Where a small business should begin',
        body: [
          'Start with a fast mobile-friendly site, unique titles and descriptions, a Google Business Profile and one page per service. Then add helpful content that answers customer questions. Our [local SEO checklist](/blog/local-seo-checklist-small-business-india) gives the first steps, and our [SEO service](/services/seo) covers the ongoing work.',
        ],
      },
    ],
  },
  {
    slug: 'keyword-research-for-small-business',
    title: 'Keyword Research for Small Businesses: A Step-by-Step Method',
    description: 'Learn how to find keywords your customers actually search, using free tools and simple judgement, then match each keyword to the right page.',
    keywords: ['keyword research', 'keyword research for small business', 'free keyword research tools', 'search intent'],
    intro: 'Keyword research tells you what words your customers use, which is often different from the words you use. Doing it properly stops you writing pages nobody searches for.',
    sections: [
      {
        heading: 'Step 1: list your services in customer language',
        body: [
          'Write each service and product as a customer would describe it. A customer rarely searches "brand identity architecture"; they search "logo design for startup". Ask recent clients how they found you and what they typed.',
        ],
      },
      {
        heading: 'Step 2: expand with free sources',
        body: ['You do not need a paid tool to begin.'],
        list: [
          'Type a keyword into Google and note the autocomplete suggestions.',
          'Read the "People also ask" box and the related searches at the bottom of results.',
          'Check Google Search Console for queries that already show your site.',
          'Browse competitor pages and note the headings they use.',
        ],
      },
      {
        heading: 'Step 3: understand search intent',
        body: [
          'Every query has a purpose: to learn, to compare, to buy or to find a place. Look at what currently ranks. If the top results are all guides, a sales page will struggle; if they are all service pages, a blog post will struggle. Match the format that Google already rewards.',
        ],
      },
      {
        heading: 'Step 4: choose realistic targets',
        body: [
          'A new site rarely beats national giants for broad phrases. Aim at specific, lower-competition phrases first, such as "website design for clinics in Ahmedabad" rather than "website design". These convert better too, because the visitor knows what they want.',
        ],
      },
      {
        heading: 'Step 5: map keywords to pages',
        body: [
          'Give each important keyword one page. Two pages chasing the same phrase compete against each other. Keep a simple sheet with columns for keyword, intent, target page and status. Revisit it every quarter. For a done-for-you version, see our [SEO services](/services/seo).',
        ],
      },
    ],
  },
  {
    slug: 'on-page-seo-checklist',
    title: 'On-Page SEO Checklist: 15 Things to Fix on Every Page',
    description: 'A practical on-page SEO checklist covering titles, headings, content, images, links and schema so every page you publish is ready to rank.',
    keywords: ['on-page SEO checklist', 'on page optimization', 'title tag best practices', 'meta description tips'],
    intro: 'On-page SEO is the part you fully control. Run each new or existing page through this list and you will avoid most common ranking problems.',
    sections: [
      {
        heading: 'Title and description',
        body: ['The title tag and meta description are your listing in search results.'],
        list: [
          'Keep the title around 50 to 60 characters with the main phrase near the start.',
          'Write a unique title for every page; never reuse one site-wide.',
          'Write a description of about 150 characters that promises a clear benefit.',
        ],
      },
      {
        heading: 'Headings and structure',
        body: [
          'Use one H1 that states the page topic, then H2s for main sections and H3s for details. Headings are signposts for readers and search engines. Do not use them only for styling.',
        ],
      },
      {
        heading: 'Content quality',
        body: [
          'Answer the searcher\'s question early, then go deeper. Cover related points people usually want, use plain words and add original detail such as your own prices, photos or process. Pages that merely repeat what everyone else says give Google no reason to prefer you.',
        ],
      },
      {
        heading: 'Images and media',
        body: [
          'Give each meaningful image a descriptive file name and alt text that describes what is shown. Compress images and use modern formats so pages load fast. Alt text also helps visitors using screen readers.',
        ],
      },
      {
        heading: 'Links and URLs',
        body: [
          'Link to related pages on your own site using descriptive anchor text, such as "[UI/UX design service](/services/ui-ux-design)" instead of "click here". Keep URLs short and readable, with words rather than numbers. Link out to a trustworthy source when it genuinely helps the reader.',
        ],
      },
      {
        heading: 'Structured data and final checks',
        body: [
          'Add structured data (JSON-LD) that suits the page, such as Organization, Service, FAQ or Article. Finally, check the page on a phone, confirm it has a canonical tag and make sure it appears in your sitemap. Our [technical SEO guide](/blog/technical-seo-basics-explained) covers those parts.',
        ],
      },
    ],
  },
  {
    slug: 'technical-seo-basics-explained',
    title: 'Technical SEO Basics: Crawling, Indexing and Speed Explained',
    description: 'Technical SEO made simple: how Google crawls and indexes your site, and the fixes for sitemaps, robots.txt, redirects, canonicals and mobile issues.',
    keywords: ['technical SEO', 'crawling and indexing', 'robots.txt sitemap', 'canonical tag explained'],
    intro: 'Technical SEO is the plumbing. If Google cannot reach or understand a page, no amount of good writing will help it rank. The good news is that most issues are simple to find and fix.',
    sections: [
      {
        heading: 'Crawling and indexing in plain words',
        body: [
          'Google first crawls pages, meaning a robot follows links to fetch them. Then it decides whether to index them, meaning store them so they can appear in results. A page can be crawled but not indexed if Google judges it duplicate, thin or low value.',
        ],
      },
      {
        heading: 'Sitemap and robots.txt',
        body: [
          'An XML sitemap lists the pages you want indexed, helping Google find new content. The robots.txt file tells crawlers which areas to avoid, such as admin screens. Keep the sitemap clean: only live pages that return a normal response, using the same address style (https and one consistent host) as your canonical tags.',
        ],
      },
      {
        heading: 'Redirects and canonical tags',
        body: [
          'A redirect sends visitors from an old address to a new one. If your sitemap lists addresses that redirect, Search Console reports "page with redirect" and those URLs are not indexed. A canonical tag tells Google which version of a page is the main one when several addresses show the same content.',
        ],
        list: ['Pick one host (with or without www) and stick to it', 'Always use https', 'Avoid redirect chains', 'Point canonicals at the final address'],
      },
      {
        heading: 'Mobile and speed',
        body: [
          'Google uses the mobile version of your site for ranking. Make sure content is identical on mobile and desktop and that pages load quickly. See our guide to [Core Web Vitals](/blog/core-web-vitals-explained-for-business-owners).',
        ],
      },
      {
        heading: 'Use Search Console as your dashboard',
        body: [
          'Google Search Console is free and shows indexing status, errors, queries and speed data. Check the Pages report monthly. "Discovered - currently not indexed" usually means Google knows the page exists but has not prioritised it; strong internal links and useful content help. Need help? Our [SEO team](/services/seo) can audit it.',
        ],
      },
    ],
  },
  {
    slug: 'discovered-currently-not-indexed-fix',
    title: 'Discovered – Currently Not Indexed: Why It Happens and How to Fix It',
    description: 'Seeing "Discovered - currently not indexed" in Search Console? Learn the real causes on new sites and the practical steps that get pages indexed.',
    keywords: ['discovered currently not indexed', 'page not indexed Google', 'Search Console indexing problems', 'how to get pages indexed'],
    intro: 'This status worries many site owners, yet it is common on newer websites. It means Google has seen the address, usually through your sitemap, but has chosen not to crawl it yet.',
    sections: [
      {
        heading: 'What the status actually means',
        body: [
          'Google has a limited amount of attention for each site. For a new or low-authority domain it often postpones crawling pages it is unsure about. The status is a queue, not a penalty, but leaving it untouched can keep pages in the queue for months.',
        ],
      },
      {
        heading: 'Common causes',
        body: ['These are the usual reasons we find.'],
        list: [
          'Very few internal links, so the page looks unimportant.',
          'Thin or near-duplicate content across several pages.',
          'A slow or unreliable server that discourages crawling.',
          'The domain is new and has few external mentions.',
          'Sitemap addresses that redirect or differ from the canonical version.',
        ],
      },
      {
        heading: 'Fixes that help',
        body: [
          'Link to each important page from your home page, menus, footer and related articles. Make every page clearly different and genuinely useful, with its own topic. Confirm the sitemap uses the exact final addresses. Then request indexing for your most important pages through URL Inspection, a few per day rather than all at once.',
        ],
      },
      {
        heading: 'Build a reason for Google to come back',
        body: [
          'Publish real content on a steady rhythm. Create a Google Business Profile, add your site to relevant directories and share articles on social channels so real people visit. Over weeks, crawl frequency usually improves as the site shows signs of life.',
        ],
      },
      {
        heading: 'What not to do',
        body: [
          'Do not submit the same URL repeatedly, buy mass backlinks or publish hundreds of near-identical pages. These tactics can slow indexing further. For a methodical audit, see our [technical SEO guide](/blog/technical-seo-basics-explained) or [book an SEO review](/services/seo).',
        ],
      },
    ],
  },
  {
    slug: 'backlinks-for-small-business-websites',
    title: 'Backlinks for Small Business Websites: Safe Ways to Earn Them',
    description: 'What backlinks are, why they matter for ranking and ten safe, practical ways small Indian businesses can earn quality links without spam.',
    keywords: ['backlinks for small business', 'how to get backlinks', 'link building India', 'off-page SEO'],
    intro: 'A backlink is a link from another website to yours. Search engines treat quality links as recommendations, so earning them can lift rankings, but the wrong methods can hurt you.',
    sections: [
      {
        heading: 'Quality beats quantity',
        body: [
          'One link from a respected local publication or industry body is worth more than hundreds from random directories. Look for sites that are relevant to your field, have real audiences and would plausibly mention you.',
        ],
      },
      {
        heading: 'Safe ways to earn links',
        body: ['Start with the opportunities closest to home.'],
        list: [
          'Claim profiles on genuine business directories and your Google Business Profile.',
          'Ask clients and partners to link from their websites where it makes sense.',
          'Offer a useful quote or tip to journalists and bloggers in your sector.',
          'Sponsor or take part in local events that list participants online.',
          'Publish original data, templates or checklists that others cite.',
          'Write guest articles for relevant industry sites.',
        ],
      },
      {
        heading: 'Create something worth linking to',
        body: [
          'People link to resources: calculators, price guides, clear explanations. A page that answers a common question better than anyone else naturally attracts links over time. Our post on [website design cost](/blog/website-design-cost-in-india) is an example of a resource page built for that purpose.',
        ],
      },
      {
        heading: 'What to avoid',
        body: [
          'Paid link packages, link farms and automated comment spam violate Google\'s guidelines and can lead to lost rankings. If an offer promises hundreds of links for a few thousand rupees, walk away.',
        ],
      },
      {
        heading: 'Track and be patient',
        body: [
          'Use Search Console\'s Links report to see who links to you. Link building is slow, but each genuine link compounds. If you want it handled ethically, ask about our [SEO services](/services/seo).',
        ],
      },
    ],
  },
  {
    slug: 'how-to-write-seo-friendly-blog-posts',
    title: 'How to Write SEO-Friendly Blog Posts That People Actually Read',
    description: 'A step-by-step method for writing blog posts that rank: choosing topics, outlining, writing clearly, formatting and updating content over time.',
    keywords: ['SEO friendly blog post', 'how to write a blog post for SEO', 'blog content strategy', 'content writing for ranking'],
    intro: 'A good blog post helps a specific person solve a specific problem, and is organised so search engines can tell. Here is a repeatable process.',
    sections: [
      {
        heading: 'Pick a topic from real questions',
        body: [
          'Use customer emails, WhatsApp chats and Search Console queries to find recurring questions. Choose one question per post. A focused article titled "How much does a logo cost in India" will outperform a vague "All about logos".',
        ],
      },
      {
        heading: 'Outline before writing',
        body: [
          'List the points a reader needs, in the order they need them. Check the top results for the topic and note what they miss; that gap is your angle. Each section should become an H2 with a clear, descriptive heading.',
        ],
      },
      {
        heading: 'Write for clarity',
        body: ['Simple writing ranks and converts better.'],
        list: [
          'Answer the main question in the first few lines.',
          'Use short paragraphs and everyday words.',
          'Give examples, prices and numbers from your own experience.',
          'Add a short list or table when comparing options.',
        ],
      },
      {
        heading: 'Optimise without stuffing',
        body: [
          'Place the main phrase in the title, the first paragraph and one or two headings, then write naturally. Add internal links to related posts and service pages, and an image with useful alt text. Write a meta description that makes people want to click.',
        ],
      },
      {
        heading: 'Publish, then maintain',
        body: [
          'Share the post, check indexing, and revisit it every six months to update figures and add missing sections. Freshly updated, accurate articles tend to hold their positions longer. Want a content plan for your business? See our [SEO service](/services/seo).',
        ],
      },
    ],
  },
  {
    slug: 'schema-markup-for-small-business',
    title: 'Schema Markup for Small Business Websites: What to Add and Why',
    description: 'Schema markup explained simply: which structured data types small businesses should add, how it helps search results and how to test it.',
    keywords: ['schema markup', 'structured data for small business', 'JSON-LD', 'rich results'],
    intro: 'Schema markup is hidden code that tells search engines precisely what a page is about: a business, a service, an article or a list of questions. It does not guarantee rankings, but it removes guesswork.',
    sections: [
      {
        heading: 'Why structured data matters',
        body: [
          'Search engines are good at reading text but they appreciate certainty. Structured data states facts directly: your business name, address, services, prices and reviews. It can make you eligible for richer search listings and helps AI-powered search tools represent your business accurately.',
        ],
      },
      {
        heading: 'Types most small businesses should use',
        body: ['You do not need dozens. These cover most needs.'],
        list: [
          '**LocalBusiness or ProfessionalService:** name, address, phone, opening hours and area served.',
          '**WebSite and Organization:** logo, social profiles and site name.',
          '**Service:** what you offer and where.',
          '**FAQPage:** questions and answers that appear visibly on the page.',
          '**Article or BlogPosting:** for guides and news.',
          '**BreadcrumbList:** the page trail shown in results.',
        ],
      },
      {
        heading: 'Rules to follow',
        body: [
          'Mark up only what visitors can actually see on the page, keep details consistent with your Google Business Profile and never invent reviews or ratings. Misleading markup can lead to a manual action.',
        ],
      },
      {
        heading: 'How to add and test it',
        body: [
          'JSON-LD is the recommended format and is placed in the page code. Modern frameworks make it easy to generate from your content automatically; we build this into every site. After adding it, test the page in Google\'s Rich Results Test and watch the Enhancements reports in Search Console.',
        ],
      },
      {
        heading: 'Keep it accurate over time',
        body: [
          'If your phone number, address or prices change, update the markup too. Outdated structured data is worse than none. See how this fits with your other [on-page SEO](/blog/on-page-seo-checklist) work, or [ask us to set it up](/services/seo).',
        ],
      },
    ],
  },
  {
    slug: 'seo-mistakes-that-hurt-rankings',
    title: '12 SEO Mistakes That Quietly Hurt Your Rankings',
    description: 'Avoid the SEO mistakes small businesses repeat: duplicate titles, thin pages, blocked crawling, slow mobile pages, keyword stuffing and more.',
    keywords: ['SEO mistakes', 'why is my site not ranking', 'common SEO errors', 'SEO audit'],
    intro: 'If your site is not ranking despite effort, one of these twelve mistakes is a likely cause. Each is fixable, often in an afternoon.',
    sections: [
      {
        heading: 'Technical mistakes',
        body: ['These stop Google from seeing or trusting your pages.'],
        list: [
          'Leaving "noindex" or a robots block on after a staging launch.',
          'A sitemap that lists redirecting or broken addresses.',
          'Mixing www and non-www or http and https versions.',
          'Slow mobile loading caused by oversized images.',
        ],
      },
      {
        heading: 'Content mistakes',
        body: ['These stop Google from preferring your pages.'],
        list: [
          'Identical or missing titles and descriptions across the site.',
          'Very short pages with little original information.',
          'Several pages targeting the exact same keyword.',
          'Copying text from suppliers or competitors.',
          'Stuffing keywords unnaturally into sentences.',
        ],
      },
      {
        heading: 'Local and trust mistakes',
        body: [
          'Inconsistent business name, address or phone number across directories confuses search engines. Missing Google Business Profile, ignored reviews and no visible contact details reduce trust. See our [local SEO checklist](/blog/local-seo-checklist-small-business-india).',
        ],
      },
      {
        heading: 'Measurement mistakes',
        body: [
          'Many owners never open Search Console, so errors persist for months. Others chase rankings for vanity phrases instead of tracking enquiries. Decide on two or three business goals, such as calls and form submissions, and measure those.',
        ],
      },
      {
        heading: 'How to audit yourself',
        body: [
          'Work through the list above and fix the technical items first, because they affect every page. Then improve content on pages closest to ranking. If you prefer an expert review, our [SEO team](/services/seo) offers audits with a clear action list.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-measure-seo-results',
    title: 'How to Measure SEO Results: The Metrics That Actually Matter',
    description: 'Learn which SEO metrics to track, how to use Search Console and Analytics, and how to connect rankings to calls, enquiries and revenue.',
    keywords: ['measure SEO results', 'SEO KPIs', 'Google Search Console metrics', 'SEO reporting for small business'],
    intro: 'SEO reports full of charts can hide whether anything useful happened. Track a handful of metrics that connect to business outcomes and ignore the rest.',
    sections: [
      {
        heading: 'Start with business outcomes',
        body: [
          'The point of SEO is enquiries, not traffic. Track form submissions, phone calls, WhatsApp clicks and direction requests. Set these up as goals in Google Analytics so you can see which pages and sources produce them.',
        ],
      },
      {
        heading: 'Search Console metrics',
        body: ['Search Console shows how you appear in Google before anyone visits.'],
        list: [
          '**Impressions:** how often your pages were shown.',
          '**Clicks:** how often people chose them.',
          '**Click-through rate:** clicks divided by impressions; improve it with better titles.',
          '**Average position:** useful as a trend, not as an exact rank.',
          '**Indexed pages:** how many of your pages Google has stored.',
        ],
      },
      {
        heading: 'Analytics metrics',
        body: [
          'Look at organic sessions, engagement and conversions by landing page. A page with many visits and no conversions needs a clearer call to action; a page with few visits but strong conversions deserves more links and promotion.',
        ],
      },
      {
        heading: 'Compare over meaningful periods',
        body: [
          'Rankings move daily. Compare month with month, or the same month last year, to avoid reacting to noise. Seasonal demand, such as festival periods, can shift numbers for reasons unrelated to SEO.',
        ],
      },
      {
        heading: 'Turn data into a monthly routine',
        body: [
          'Once a month, note the top five growing pages, the top five declining pages and any new indexing errors. Decide on three actions and do them. That small loop beats any complicated dashboard. If you want help, see our [SEO services](/services/seo) or read about [fixing indexing problems](/blog/discovered-currently-not-indexed-fix).',
        ],
      },
    ],
  },
];
