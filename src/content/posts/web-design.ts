import type { RawPost } from './types';

export const WEB_DESIGN: RawPost[] = [
  {
    slug: 'how-many-pages-does-a-business-website-need',
    title: 'How Many Pages Does a Business Website Really Need?',
    description: 'A practical guide to choosing the right number of pages for a small business website, with a sensible page list and what to skip at launch.',
    keywords: ['how many pages for a website', 'business website pages', 'website structure for small business'],
    intro: 'Owners often ask whether a website needs five pages or fifty. The honest answer is that it needs exactly as many as your customers need to decide to contact you, and not one more at launch.',
    sections: [
      {
        heading: 'Start from the questions customers ask',
        body: [
          'Write down the last ten questions customers asked you on the phone or on WhatsApp. Each recurring question deserves a clear answer on the site, and some of those answers deserve their own page. If people always ask what you charge, where you are located and how long delivery takes, those topics must be easy to find.',
          'This approach keeps you away from filler pages. A page that exists only because a competitor has one rarely earns traffic or enquiries.',
        ],
      },
      {
        heading: 'The core pages almost every business needs',
        body: ['For a typical service business, a launch-ready site fits in six to eight pages.'],
        list: [
          'Home: who you help and the one action you want visitors to take.',
          'Services: either one overview page or one page per major service.',
          'About: the people behind the business, with real names and photos.',
          'Work or portfolio: proof that you have done this before.',
          'Contact: form, phone, WhatsApp, address and map.',
          'Pricing or a "how we price" page if cost is a common objection.',
        ],
      },
      {
        heading: 'When a service deserves its own page',
        body: [
          'Search engines match a page to a query. If you offer branding, UI/UX and social media management on one crowded page, that page is mediocre for all three searches. Give each service that people actually search for a dedicated page with its own title, headings, examples and enquiry button.',
          'You can see this approach on our own site: [UI/UX design](/services/ui-ux-design), [branding](/services/branding) and [SEO](/services/seo) each have a separate page because each one is a separate buying decision.',
        ],
      },
      {
        heading: 'Pages to postpone until after launch',
        body: [
          'Blogs, case studies, careers and long FAQ sections are useful, but they do not need to delay launch. A site with six strong pages published this week beats a site with twenty weak pages published in three months. Add content once you can see which questions visitors keep asking.',
        ],
      },
      {
        heading: 'A simple rule for adding more pages',
        body: [
          'Add a page when you can name the person who will read it, the search or question that brings them there, and the action they should take afterwards. If you cannot answer all three, the page is probably decoration.',
          'Planning a new site and unsure of the structure? Our team can map your pages before any design starts. See our [website design in Ahmedabad](/services/website-design-ahmedabad) service or [ask for a quote](/contact).',
        ],
      },
    ],
  },
  {
    slug: 'website-redesign-checklist',
    title: 'Website Redesign Checklist: 12 Things to Do Before You Launch',
    description: 'Redesigning without losing your Google rankings? Follow this 12-point checklist covering redirects, content, speed and tracking before launch.',
    keywords: ['website redesign checklist', 'redesign without losing SEO', 'website relaunch checklist'],
    intro: 'A redesign can lift your enquiries, or quietly wipe out years of search visibility. The difference is almost always preparation. Use this checklist before you switch the new site on.',
    sections: [
      {
        heading: 'Know what is working today',
        body: [
          'Before changing anything, export your top pages by traffic from Google Search Console and note which ones bring enquiries. These are the pages you must protect. Take screenshots of current rankings for your main keywords so you can compare after launch.',
        ],
      },
      {
        heading: 'Keep or redirect every important URL',
        body: [
          'If a page address changes, the old one must send visitors and search engines to the new one with a permanent (301) redirect. Missing redirects are the most common reason traffic drops after a relaunch. Make a spreadsheet with two columns, old URL and new URL, and test every row.',
        ],
        list: ['Keep URLs the same where possible', 'Redirect changed URLs one-to-one, not all to the home page', 'Remove redirect chains of more than one hop'],
      },
      {
        heading: 'Carry content across, then improve it',
        body: [
          'Pages that rank have content Google likes. Do not delete paragraphs that answer real questions just because the new design has less room. If you rewrite, keep the topics and headings that match what people search for, and make the answers clearer rather than shorter for the sake of it.',
        ],
      },
      {
        heading: 'Check the technical basics',
        body: ['Run through this list on a staging copy before launch:'],
        list: [
          'Each page has a unique title and meta description.',
          'Only one H1 per page and a logical heading order.',
          'Images have alt text and are compressed.',
          'Canonical tags point to the right address.',
          'The staging site is blocked from search engines, and that block is removed on launch day.',
          'The XML sitemap lists only live, indexable pages.',
        ],
      },
      {
        heading: 'Test speed and mobile on real devices',
        body: [
          'A prettier site that loads slower will often rank lower. Test the new pages with PageSpeed Insights on mobile and open them on an ordinary Android phone over mobile data. Our guide to [Core Web Vitals](/blog/core-web-vitals-explained-for-business-owners) explains the numbers.',
        ],
      },
      {
        heading: 'Launch, then watch closely',
        body: [
          'Launch on a quiet day, submit the new sitemap in Search Console and check that analytics and your contact form still work. For the next four weeks, watch crawl errors, indexing and enquiry volume. Small fixes in week one prevent big losses by week four.',
          'If you want a redesign handled with SEO protection built in, talk to us about our [website design service](/services/website-design-ahmedabad).',
        ],
      },
    ],
  },
  {
    slug: 'mobile-first-web-design-india',
    title: 'Mobile-First Web Design: Why It Matters for Indian Audiences',
    description: 'Most Indian visitors browse on phones. Learn what mobile-first design really means and how to check that your site works well on small screens.',
    keywords: ['mobile first web design', 'mobile friendly website India', 'responsive website design'],
    intro: 'For many Indian businesses, the majority of website visitors arrive on a phone, often on a mid-range Android device and an uneven connection. Designing for that visitor first is not a trend, it is common sense.',
    sections: [
      {
        heading: 'What mobile-first actually means',
        body: [
          'Mobile-first means the small-screen version is designed first and the desktop layout is built up from it. It forces decisions about what matters most. If a section does not fit on a phone without becoming cramped, it probably needs rethinking on desktop too.',
          'It is different from simply making a desktop site shrink. A shrunk site keeps tiny tap targets, long paragraphs and heavy images that suit nobody on a phone.',
        ],
      },
      {
        heading: 'Design for thumbs, not cursors',
        body: ['Fingers are less precise than mouse pointers. Keep interactive elements generous.'],
        list: [
          'Buttons and links at least 44 pixels tall with space around them.',
          'The main call to action reachable without scrolling back to the top.',
          'Click-to-call and WhatsApp buttons that open the app directly.',
          'Forms with the right keyboard (numeric for phone numbers, email keyboard for email).',
        ],
      },
      {
        heading: 'Keep text readable',
        body: [
          'Body text should be at least 16 pixels with comfortable line spacing. Avoid long unbroken paragraphs; three or four lines per paragraph reads well on a narrow screen. Check contrast too, because phone screens are used outdoors where low-contrast grey text disappears.',
        ],
      },
      {
        heading: 'Respect slow connections',
        body: [
          'Large hero videos and uncompressed photos are the main reasons mobile pages feel slow. Use modern formats such as WebP or AVIF, load images lazily below the fold and avoid autoplaying video on small screens. Our article on [website speed](/blog/why-nextjs-websites-rank-faster) covers the technical side.',
        ],
      },
      {
        heading: 'How to test your own site',
        body: [
          'Open your site on a real phone, not just a resized desktop window. Try to complete your main task: find a price, call you, fill the form. If it takes more than a few taps or any pinch-zooming, fix that first.',
          'Google also indexes the mobile version of your pages first, so mobile quality directly affects search. If you want a site built this way from day one, see our [website design](/services/website-design-ahmedabad) work.',
        ],
      },
    ],
  },
  {
    slug: 'website-content-writing-guide',
    title: 'Website Content Writing: How to Write Pages That Convert',
    description: 'A plain guide to writing website copy that explains your offer clearly, builds trust and turns readers into enquiries, with simple examples.',
    keywords: ['website content writing', 'website copywriting tips', 'how to write website copy'],
    intro: 'Design gets attention, but words close the sale. Most weak websites do not have a design problem, they have a clarity problem: a visitor cannot tell within a few seconds what you do and why they should trust you.',
    sections: [
      {
        heading: 'Say what you do in one sentence',
        body: [
          'The top of your home page should answer three questions: what do you offer, who is it for and what happens next. "We help local clinics get more patient bookings with a fast website and Google Business setup" is clear. "Creative solutions for tomorrow" is not.',
        ],
      },
      {
        heading: 'Write for one reader',
        body: [
          'Picture a specific customer, a shop owner in Jaipur or a startup founder in Ahmedabad, and write to them directly using "you". Generic copy aimed at everyone ends up persuading nobody. It also helps SEO, because specific language matches how real people search.',
        ],
      },
      {
        heading: 'Lead with benefits, back with proof',
        body: ['Features tell what you do; benefits tell what the customer gets. Pair each claim with something verifiable.'],
        list: [
          'Replace "modern design" with "a layout built around your top three enquiries".',
          'Show named clients, real numbers and photos of your actual work.',
          'Add short testimonials near the buttons where doubt appears.',
          'State your prices or a starting price if you can; it filters out poor-fit leads.',
        ],
      },
      {
        heading: 'Structure pages so they can be skimmed',
        body: [
          'Most visitors scan before they read. Use clear headings that carry meaning, short paragraphs and lists for steps or comparisons. A heading like "How the 7-day process works" is more useful than "Our approach". The same structure helps search engines understand the page.',
        ],
      },
      {
        heading: 'Finish every page with one clear action',
        body: [
          'Tell the reader exactly what to do: "Get a free quote", "Call us on WhatsApp", "Book a 15-minute call". One main action per page beats five competing ones. Then read the page aloud; anything that sounds unnatural when spoken should be rewritten.',
          'If writing is the bottleneck, our team can shape your copy alongside the design as part of a [website project](/services/website-design-ahmedabad).',
        ],
      },
    ],
  },
  {
    slug: 'static-vs-dynamic-website',
    title: 'Static vs Dynamic Website: Which One Does Your Business Need?',
    description: 'Understand the real difference between static and dynamic websites, their costs and speed, and how to choose the right one for your business.',
    keywords: ['static vs dynamic website', 'dynamic website with admin panel', 'static website meaning'],
    intro: 'These two terms confuse many first-time buyers, and some sellers use the confusion to oversell. Here is what they actually mean and how to pick without paying for features you will not use.',
    sections: [
      {
        heading: 'What a static website is',
        body: [
          'A static website is a set of ready-made pages. To change a sentence or a photo, a developer edits the files and republishes. Static sites are very fast, cheap to host and hard to hack because there is nothing to log into.',
        ],
      },
      {
        heading: 'What a dynamic website is',
        body: [
          'A dynamic website pulls content from a database, usually managed through an admin panel. You log in, change text or upload images, and the live site updates without a developer. Contact forms that save enquiries, galleries, blogs and booking systems all rely on dynamic features.',
          'Note that "dynamic" does not mean "has animations". Animation is a design choice; dynamic refers to how content is managed.',
        ],
      },
      {
        heading: 'How to choose',
        body: ['Think about how often your content changes and who will change it.'],
        list: [
          'Choose static if you rarely update content, such as a simple brochure or a one-page event site.',
          'Choose dynamic if you add projects, prices, offers or posts regularly and want to do it yourself.',
          'Choose dynamic with an admin panel if several people edit content or you want to collect and view leads in one place.',
        ],
      },
      {
        heading: 'Modern sites blend both',
        body: [
          'Today the line is blurry. A framework such as Next.js can pre-build pages for speed, then refresh them from a database every few minutes. You get the speed of a static site with the editing comfort of a dynamic one. We use this approach for most client work; the post on [why Next.js sites rank faster](/blog/why-nextjs-websites-rank-faster) explains the benefit.',
        ],
      },
      {
        heading: 'What it means for cost',
        body: [
          'Static sites cost less to build and almost nothing to host. Dynamic sites cost more upfront because the admin panel needs building and testing. Our starter packages begin at ₹10,000 and include an admin panel, so you do not have to compromise. Read the full [cost breakdown](/blog/website-design-cost-in-india) to see what each tier includes.',
        ],
      },
    ],
  },
  {
    slug: 'website-design-mistakes-small-businesses-make',
    title: '10 Website Design Mistakes Small Businesses Make (and How to Fix Them)',
    description: 'The ten most common website design mistakes that cost small businesses enquiries, from slow pages to hidden contact details, with simple fixes.',
    keywords: ['website design mistakes', 'common web design errors', 'why my website gets no enquiries'],
    intro: 'If your site gets visitors but few enquiries, the cause is usually one of a small set of repeated mistakes. None of them needs a complete rebuild to fix.',
    sections: [
      {
        heading: 'Mistakes about clarity',
        body: ['Visitors decide in seconds whether they are in the right place.'],
        list: [
          'An unclear headline that never states what you sell.',
          'Stock photos of smiling strangers instead of your real work and team.',
          'No price signal at all, which makes people assume you are expensive.',
        ],
      },
      {
        heading: 'Mistakes about navigation',
        body: [
          'Menus with ten or more items overwhelm people. Keep the top menu to five or six links, and make the contact option visible on every page. Another common problem is a "Services" page that lists everything in one block; people cannot tell which service fits them.',
        ],
      },
      {
        heading: 'Mistakes about speed and mobile',
        body: [
          'Full-width photographs straight from a camera can weigh several megabytes. On a phone that means a blank screen for many seconds, and visitors leave. Compress images, avoid heavy sliders and test on a real phone. We cover this in detail in our [mobile-first design guide](/blog/mobile-first-web-design-india).',
        ],
      },
      {
        heading: 'Mistakes about trust',
        body: [
          'No address, no phone number, no reviews and no names make a business look temporary. Add a real address, link your Google Business Profile, show testimonials with names and mention how long you have operated. Visible trust signals reduce hesitation more than any design flourish.',
        ],
      },
      {
        heading: 'Mistakes about conversion',
        body: [
          'Long forms asking for ten details turn people away; ask for name, phone and a short message. Place the main button above the fold and repeat it after each major section. After the form is submitted, show a thank-you message that says when you will reply.',
        ],
      },
      {
        heading: 'Mistakes about search visibility',
        body: [
          'Many small sites have one title for every page, missing descriptions and no sitemap. These are easy to correct, and our [SEO checklist](/blog/local-seo-checklist-small-business-india) shows how. If you would rather have professionals audit the site, [contact us](/contact) for a short review.',
        ],
      },
    ],
  },
  {
    slug: 'how-long-does-it-take-to-build-a-website',
    title: 'How Long Does It Take to Build a Website? A Realistic Timeline',
    description: 'Realistic timelines for building a business website in India, from a 7-day starter site to multi-week web apps, and what causes delays.',
    keywords: ['how long to build a website', 'website development timeline', 'website delivery time India'],
    intro: 'A reliable timeline is one of the most useful things to get from a developer before you sign. Here is what typical projects take and where the time really goes.',
    sections: [
      {
        heading: 'Typical timelines by project type',
        body: ['These ranges assume the content and decisions arrive on time.'],
        list: [
          'Landing page or small business site: 7 to 10 working days.',
          'Business site with an admin panel and several service pages: 2 to 3 weeks.',
          'Catalogue, booking or multi-language site: 3 to 5 weeks.',
          'E-commerce store or custom web app: 4 to 8 weeks or more.',
        ],
      },
      {
        heading: 'The stages that make up a project',
        body: [
          'Every project moves through the same stages: brief and planning, page structure, visual design, development, content entry, testing and launch. Design and development often overlap, but content is the stage that most often stalls the whole project.',
        ],
      },
      {
        heading: 'Why projects run late',
        body: [
          'The biggest cause is slow feedback. A project that waits five days for each approval takes weeks longer than the same project with same-day replies. The second cause is content: logos, photos and text arriving piece by piece. The third is scope growth, where "one more page" is added several times.',
        ],
      },
      {
        heading: 'How to speed things up',
        body: ['A little preparation saves days.'],
        list: [
          'Collect your logo, photos, text and service list before kickoff.',
          'Nominate one person who can give final approval.',
          'Agree the page list in writing and treat additions as a second phase.',
          'Reply to review requests within a day.',
        ],
      },
      {
        heading: 'Be careful of unrealistically fast promises',
        body: [
          'A site delivered in 24 hours is almost always a template with your logo placed on it. That can be fine for a basic need, but it is not a custom design. Ask what exactly is included at the promised speed.',
          'Our starter websites are delivered in around seven working days when content is ready. See the [website design cost guide](/blog/website-design-cost-in-india) or [request a timeline](/contact) for your project.',
        ],
      },
    ],
  },
  {
    slug: 'website-maintenance-checklist',
    title: 'Website Maintenance Checklist: What to Check Every Month',
    description: 'A simple monthly and yearly website maintenance checklist covering backups, updates, security, speed, forms and SEO so nothing breaks quietly.',
    keywords: ['website maintenance checklist', 'website maintenance tasks', 'monthly website check'],
    intro: 'A website is not finished at launch. Forms stop working, certificates expire and pages slowly fall out of date. A short monthly routine catches problems before customers do.',
    sections: [
      {
        heading: 'Monthly: the ten-minute test',
        body: ['Pick one day each month and walk through the site as a customer would.'],
        list: [
          'Submit the contact form and confirm the email arrives.',
          'Click the phone and WhatsApp buttons on your phone.',
          'Open the five most important pages and look for broken images or layout glitches.',
          'Check that the site loads over HTTPS without warnings.',
        ],
      },
      {
        heading: 'Monthly: look at the numbers',
        body: [
          'Open Google Analytics and Search Console. Look for a sudden fall in visits, new crawl errors or pages that lost impressions. Compare against the previous month rather than the previous week, since traffic naturally fluctuates.',
        ],
      },
      {
        heading: 'Quarterly: content and links',
        body: [
          'Update outdated prices, team names and offers. Test outgoing links, because external pages move or disappear. Add one or two new pieces of content or projects; a site that shows recent activity feels more trustworthy and gives search engines a reason to return.',
        ],
      },
      {
        heading: 'Yearly: renewals and reviews',
        body: [
          'Note your domain renewal and hosting dates in a calendar with a reminder a month ahead. Losing a domain through a missed renewal is entirely avoidable and painful. Review the design with fresh eyes; if your offer has changed, the site probably needs to change too.',
        ],
      },
      {
        heading: 'Security and backups',
        body: [
          'Keep software up to date, use strong unique passwords and enable two-step login where available. Make sure backups exist, are stored away from the server and have actually been tested. If you would like these tasks handled for you, ask us about ongoing support with your next [website project](/services/website-design-ahmedabad).',
        ],
      },
    ],
  },
  {
    slug: 'domain-name-tips-for-indian-businesses',
    title: 'How to Choose a Domain Name for Your Indian Business',
    description: 'Choosing between .in, .com and .co.in? Learn how to pick a short, memorable domain name that helps branding and avoids legal trouble.',
    keywords: ['choose domain name India', '.in vs .com', 'business domain name tips'],
    intro: 'Your domain name is the address customers type, say aloud and print on cards. It is worth ten minutes of careful thought, because changing it later is disruptive and costly.',
    sections: [
      {
        heading: 'Keep it short, clear and easy to say',
        body: [
          'A good test is the phone test: say the address to a friend and ask them to type it. If they need to ask about spelling, hyphens or numbers, simplify it. Aim for two words at most and avoid unusual spellings that people will mistype.',
        ],
      },
      {
        heading: '.in, .com or .co.in?',
        body: [
          'A .com is the default in many people\'s minds, but .in is widely trusted in India and signals that you serve Indian customers. If your business name is available with both, register both and point one to the other. For an Indian local business, .in is a perfectly good primary choice and often more affordable.',
        ],
      },
      {
        heading: 'Should it include keywords?',
        body: [
          'A keyword-rich name such as "ahmedabadwebdesign" may sound helpful, but it is hard to brand and looks generic. Search engines no longer give exact-match domains much of a boost. Choose a brand name that you can own, and put your keywords in your page titles and headings instead.',
        ],
      },
      {
        heading: 'Check trademarks and social handles',
        body: ['Before paying, check three things:'],
        list: [
          'No registered trademark in your category uses the same name.',
          'The same handle is free on Instagram, LinkedIn and YouTube.',
          'The name does not accidentally read as something awkward when words run together.',
        ],
      },
      {
        heading: 'Own your domain',
        body: [
          'Register the domain in your own name or your company\'s name, with your own email as the contact. Some agencies register on your behalf under their account and make later transfers difficult. Ask who the registrant is and keep the login details yourself.',
          'We always register client domains under the client\'s ownership. If you are starting from scratch, [talk to us](/contact) before you buy.',
        ],
      },
    ],
  },
  {
    slug: 'cms-vs-custom-admin-panel-for-small-business',
    title: 'WordPress vs Custom Admin Panel: What Suits a Small Business Site?',
    description: 'Compare WordPress with a custom admin panel for speed, security, cost and ease of editing, so you can choose the right foundation for your website.',
    keywords: ['WordPress vs custom website', 'custom admin panel website', 'best CMS for small business India'],
    intro: 'WordPress powers a huge share of the web, yet it is not automatically the best choice for every small business. The right answer depends on how you will use the site over the next three years.',
    sections: [
      {
        heading: 'The case for WordPress',
        body: [
          'WordPress has thousands of plugins, a large pool of developers and familiar editing screens. If you need a blog, a simple shop or a feature that a plugin already provides, it can be a quick and inexpensive way to get there.',
        ],
      },
      {
        heading: 'Where WordPress struggles',
        body: [
          'Every plugin adds code, update chores and potential security holes. Sites with many plugins tend to become slow, and neglected installations are a frequent target for attackers. You may find yourself paying for repairs and speed fixes that a leaner build would not need.',
        ],
      },
      {
        heading: 'The case for a custom admin panel',
        body: [
          'A custom panel contains only the screens you need: edit text, upload projects, read enquiries. There is nothing extra to update or exploit, and pages can be built to load very quickly. Staff also find it easier because the interface only shows what matters to your business.',
        ],
      },
      {
        heading: 'How to decide',
        body: ['Ask yourself these questions.'],
        list: [
          'Do I need a feature that already exists as a mature plugin? WordPress may save money.',
          'Is speed and a clean design a priority? A custom build usually wins.',
          'Will non-technical staff edit the site? Either works if the editing screens are simple.',
          'Who will maintain it in two years? Make sure that person exists.',
        ],
      },
      {
        heading: 'Our approach',
        body: [
          'At PK Creative we build most business sites with a custom admin panel on a modern framework, which is how we keep starter prices at ₹10,000 while including editing tools. For specific needs, we will say plainly if another platform fits better. See our [website design service](/services/website-design-ahmedabad) or compare options in the [static vs dynamic guide](/blog/static-vs-dynamic-website).',
        ],
      },
    ],
  },
];
