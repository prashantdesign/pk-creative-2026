import type { Extra } from './types';

/** Extra depth for early articles: one added section and a short FAQ each. FAQ answers are plain text (used in schema). */
export const EXTRAS: Record<string, Extra> = {
  'website-design-cost-in-india': {
    sections: [
      {
        heading: 'How to compare quotes properly',
        body: [
          'Put every quote into the same table with the same rows: number of pages, custom design or template, admin panel, mobile design, SEO setup, content help, revisions, hosting and support period. Blank cells are where cost surprises hide later.',
          'Then ask each agency for two live websites they built and open them on your phone. A portfolio tells you more about the final quality than the price ever will. Also ask who owns the source code and domain once you have paid in full.',
        ],
        list: ['Same page count in every quote', 'Same inclusions in every quote', 'Delivery date in writing', 'Number of revision rounds', 'What happens if you want changes after launch'],
      },
    ],
    faq: [
      { q: 'Is a ₹10,000 website really enough for a small business?', a: 'Yes for most service businesses that need a professional online presence: a custom layout, mobile design, contact form, admin panel and SEO basics. It is not enough for online payments, booking engines or large catalogues, which are quoted separately.' },
      { q: 'Do I pay yearly for a website after launch?', a: 'You usually pay for the domain name and hosting every year. Costs vary by provider, so ask for the exact renewal amounts and dates before you sign.' },
      { q: 'Can I add pages later?', a: 'Yes. A well-built site can grow. Agree upfront how new pages are priced so that expansion is predictable.' },
    ],
  },
  'how-to-choose-web-design-agency-ahmedabad': {
    sections: [
      {
        heading: 'Red flags during the first conversation',
        body: [
          'Notice how an agency behaves before you pay. A good team asks about your customers, goals and budget before quoting. A weak one sends a price within five minutes and a list of features copied for everyone.',
          'Be cautious if they cannot show past work you can click through, refuse to name the technology they use, push you to decide today or avoid discussing ownership of the files and domain.',
        ],
        list: ['Guaranteed number one Google ranking', 'No written scope or timeline', 'Unusually low price with vague inclusions', 'Reluctance to give client references'],
      },
    ],
    faq: [
      { q: 'Should I pick a freelancer or an agency in Ahmedabad?', a: 'A freelancer can suit a small, simple project and often costs less. An agency adds design, development and SEO under one roof and keeps working if one person is unavailable. Choose by the quality of past work and clear communication, not by label.' },
      { q: 'Does the agency need to be in my city?', a: 'Not necessarily. Many projects are handled online. A local team can still be helpful for meetings, photography and local search knowledge.' },
      { q: 'How can I check an agency\'s work quality?', a: 'Open their live client websites on your phone, check how fast they load and ask the clients if they were happy with delivery and support.' },
    ],
  },
  'local-seo-checklist-small-business-india': {
    sections: [
      {
        heading: 'A weekly local SEO routine',
        body: [
          'Local SEO is not a one-time setup. Spend thirty minutes each week keeping signals fresh: answer new reviews, add a photo or post to your Google Business Profile, check that opening hours are right and look at which search terms brought people to your listing.',
          'Once a month, search for your own business name and your main service plus your city from a phone in private mode. Note where you appear, who is above you and what their listing does better. This small habit tells you what to improve next.',
        ],
      },
    ],
    faq: [
      { q: 'How long does local SEO take to show results?', a: 'Many businesses see movement in local results within four to twelve weeks of a complete profile, steady reviews and a well-optimised website. Competitive categories take longer.' },
      { q: 'Do I need a website for local SEO?', a: 'A Google Business Profile can appear without a website, but a fast, clear website with service pages and consistent contact details strengthens rankings and converts more searchers into customers.' },
      { q: 'Are reviews a ranking factor?', a: 'Yes, review quantity, quality and recency are commonly considered important for local pack visibility, and they strongly influence whether people choose you.' },
    ],
  },
  'why-nextjs-websites-rank-faster': {
    sections: [
      {
        heading: 'What this means for your business',
        body: [
          'Framework choice matters less than outcomes. What you want is pages that appear almost instantly, work on a weak phone and can be edited without trouble. Pre-built pages served from a global network give fast first loads, and incremental refresh keeps content current without redeploying.',
          'Speed also helps behaviour: faster pages lose fewer visitors before they read anything, which gives search engines better engagement signals indirectly. It is one factor among many, but one you control.',
        ],
      },
    ],
    faq: [
      { q: 'Does using Next.js guarantee better rankings?', a: 'No technology guarantees rankings. Next.js makes it easier to deliver fast, crawlable pages, but content quality, links and relevance still decide positions.' },
      { q: 'Can I edit a Next.js website myself?', a: 'Yes, when it is connected to an admin panel or a content system. Our sites include an admin panel so you can update text and images without code.' },
      { q: 'Is Next.js more expensive than WordPress?', a: 'Not necessarily. A focused custom build can match the price of a heavily customised WordPress site and usually has lower maintenance and speed costs.' },
    ],
  },

  // ---------- Website design ----------
  'how-many-pages-does-a-business-website-need': {
    sections: [
      {
        heading: 'Example page plans by business type',
        body: [
          'A clinic might use Home, Treatments, Doctors, Patient Reviews, Appointments and Contact. A manufacturer might use Home, Products, Capabilities, Certifications, Clients and Enquiry. A freelance designer might need only Home, Work, Services, About and Contact.',
          'Notice that each plan mirrors the decision journey of a particular customer rather than a generic template. Sketch yours on paper as boxes with arrows before opening any design tool; it often reveals pages you can merge.',
        ],
      },
    ],
    faq: [
      { q: 'Is a one-page website enough?', a: 'For a very simple offer or an event it can work, but one page limits how many search phrases you can target. Most service businesses benefit from separate pages per service.' },
      { q: 'Does more pages mean better SEO?', a: 'Only when each page is useful and distinct. Many thin pages can hurt more than help.' },
      { q: 'Should I include a blog at launch?', a: 'It is optional. Launch the core pages first, then add guides based on real customer questions.' },
    ],
  },
  'website-redesign-checklist': {
    sections: [
      {
        heading: 'What to do if traffic drops after launch',
        body: [
          'A small dip in the first two weeks is normal while Google reprocesses your pages. A steep, lasting drop usually has a specific cause: missing redirects, accidentally blocked pages or changed titles on top-performing pages.',
          'Start by comparing your old and new URLs, then check Search Console for new errors and for pages marked noindex. Restore the original titles and headings on your best pages if they were changed, and resubmit the sitemap. Most recoveries come from fixing these basics rather than starting again.',
        ],
      },
    ],
    faq: [
      { q: 'How long until rankings settle after a redesign?', a: 'Often two to six weeks, longer for large sites. Correct redirects and similar content shorten the period.' },
      { q: 'Should I redesign and change content at the same time?', a: 'Changing everything at once makes problems hard to trace. If rankings matter, keep key content stable first and improve it in stages.' },
      { q: 'Do I need to tell Google about the new site?', a: 'Submit your updated sitemap in Search Console and inspect your main URLs. Google will discover the rest by crawling.' },
    ],
  },
  'mobile-first-web-design-india': {
    sections: [
      {
        heading: 'A quick mobile audit you can do in five minutes',
        body: [
          'Borrow a mid-range Android phone and open your site on mobile data rather than office Wi-Fi. Time how long until you can read the headline. Try to tap the menu, scroll to the form and fill it with one thumb. Rotate the screen once to be sure nothing breaks.',
          'Write down every moment of friction. Common findings are an overlapping sticky bar, text that is too small, pop-ups that cannot be closed easily and buttons placed too close together. Fixing these small items often improves enquiries immediately.',
        ],
      },
    ],
    faq: [
      { q: 'Is responsive design the same as mobile-first?', a: 'Responsive means the layout adapts to screen size. Mobile-first means the small-screen experience is planned first, which usually results in a simpler, faster site.' },
      { q: 'Do I need a separate mobile app?', a: 'Rarely. A fast mobile website serves most businesses. Consider an app only when you need features such as push notifications or offline use.' },
      { q: 'Does mobile design affect SEO?', a: 'Yes. Google primarily uses the mobile version of a page to index and rank it.' },
    ],
  },
  'website-content-writing-guide': {
    sections: [
      {
        heading: 'A simple structure for a service page',
        body: [
          'A reliable pattern is: a headline naming the service and the audience, two sentences explaining the outcome, a short list of what is included, a process in three or four steps, proof such as a project or review, pricing guidance and a final enquiry prompt.',
          'This sequence mirrors the questions a buyer asks in order: is this for me, what will I get, how does it work, can I trust you, what does it cost and what do I do next.',
        ],
      },
    ],
    faq: [
      { q: 'How long should a service page be?', a: 'Long enough to answer the buyer\'s questions, often 400 to 800 words. Clarity matters more than length.' },
      { q: 'Should I write my own website copy?', a: 'You know your customers best, so start with your own notes and have an editor or designer polish structure and tone.' },
      { q: 'Do I need different copy for each city?', a: 'Only if the pages offer something genuinely different. Copying a page and swapping the city name offers little value to readers or search engines.' },
    ],
  },
  'static-vs-dynamic-website': {
    sections: [
      {
        heading: 'Examples to make it concrete',
        body: [
          'A wedding invitation page used for two months is a perfect static site. A coaching institute that posts new batches, results and fee changes every week benefits from a dynamic site with an admin panel, because every update would otherwise need a developer.',
          'A restaurant that changes menus seasonally sits in between: the pages can be pre-built for speed while the menu items are edited through a simple panel. Think about your editing habits and let those drive the decision.',
        ],
      },
    ],
    faq: [
      { q: 'Is a dynamic website slower?', a: 'Not if it is built well. Pages can be cached or pre-rendered so they load as quickly as static ones.' },
      { q: 'Can I convert a static site to dynamic later?', a: 'Yes, but it is usually cheaper to plan the admin panel from the start if you expect to edit often.' },
      { q: 'Which is more secure?', a: 'Static sites have less to attack. Dynamic sites are safe when they are kept updated, use strong logins and limit what the admin area can do.' },
    ],
  },
  'website-design-mistakes-small-businesses-make': {
    sections: [
      {
        heading: 'Fix them in this order',
        body: [
          'Not every fix has equal impact. Start with anything that blocks contact: a form that fails, a missing phone number or a button that is hard to see. Next fix clarity, rewriting the first screen so a stranger understands the offer. Then fix speed, then trust signals, and only after that polish visual details.',
          'Treat the list like a funnel. A stunning layout will not rescue a page where visitors cannot find how to call you.',
        ],
      },
    ],
    faq: [
      { q: 'How do I know why visitors leave?', a: 'Use analytics to find pages with high exit rates, watch a few screen recordings if available and test the site yourself on a phone.' },
      { q: 'Should I redesign or just fix the issues?', a: 'If the structure is sound, targeted fixes are faster and cheaper. Redesign when the foundation, such as speed or navigation, is the problem.' },
      { q: 'Are pop-ups always bad?', a: 'Not always, but intrusive ones on mobile frustrate users and can be penalised by search engines. Use them sparingly and make them easy to close.' },
    ],
  },
  'how-long-does-it-take-to-build-a-website': {
    sections: [
      {
        heading: 'A sample seven-day schedule',
        body: [
          'A tight starter project might run like this: day one for the brief and content collection, days two and three for the home page design, day four for inner pages, days five and six for development and the admin panel, and day seven for testing and launch. It works only when feedback is quick.',
          'If your calendar is crowded, tell the team early and agree on longer review windows. A realistic two-week plan you meet is better than a one-week plan you miss.',
        ],
      },
    ],
    faq: [
      { q: 'Why do some agencies take months?', a: 'Large scope, many approval layers and slow content delivery stretch timelines. Smaller focused projects finish much faster.' },
      { q: 'Can a website be built in two days?', a: 'Only a very simple template-based page. Custom design and testing take longer.' },
      { q: 'Does going live mean the project is finished?', a: 'Launch is the start. Plan for fixes in the first weeks and ongoing updates afterwards.' },
    ],
  },
  'website-maintenance-checklist': {
    sections: [
      {
        heading: 'What to do when something breaks',
        body: [
          'Keep a short emergency note: who built the site, where it is hosted, how to reach support and where backups live. When the site goes down, check whether the domain has expired, then whether the hosting dashboard shows an outage, then whether a recent change caused the problem.',
          'Roll back the last change if you can. If the site was hacked, change all passwords, restore a clean backup and ask your developer to find how the attacker got in. Document what happened so it does not repeat.',
        ],
      },
    ],
    faq: [
      { q: 'How often should I back up my website?', a: 'Daily if content changes often, weekly if it rarely does. Keep copies in a separate location and test restoring occasionally.' },
      { q: 'Do I need a maintenance contract?', a: 'Not always, but if nobody on your team is technical, a small monthly or yearly support plan is cheaper than emergency repairs.' },
      { q: 'What happens if my SSL certificate expires?', a: 'Browsers show a security warning and visitors leave. Most modern hosts renew certificates automatically; verify that yours does.' },
    ],
  },
  'domain-name-tips-for-indian-businesses': {
    sections: [
      {
        heading: 'Email on your own domain',
        body: [
          'Once you own a domain, use it for email as well. An address such as hello@yourbrand.in looks more established than a free webmail address and protects you if you change providers. Set up the basic email authentication records (SPF, DKIM and DMARC) so your messages are not sent to spam.',
        ],
      },
    ],
    faq: [
      { q: 'How much does a .in domain cost?', a: 'Prices vary by registrar and year, often a few hundred rupees per year. Compare renewal prices as well as the first-year offer.' },
      { q: 'Can I change my domain later?', a: 'Yes, with correct 301 redirects, but it is disruptive. Choose carefully the first time.' },
      { q: 'Should I buy several domain variations?', a: 'Register the main one and obvious misspellings only if they protect your brand, then redirect them to the main site.' },
    ],
  },
  'cms-vs-custom-admin-panel-for-small-business': {
    sections: [
      {
        heading: 'Total cost over three years',
        body: [
          'Compare cost over three years, not at launch. For a plugin-heavy site include premium plugin licences, update labour, speed optimisation and occasional security cleanup. For a custom panel include the build, hosting and any change requests.',
          'Sometimes the cheapest launch is the most expensive path. Ask both options to be quoted with the same three-year assumptions, and choose the one whose costs you can predict.',
        ],
      },
    ],
    faq: [
      { q: 'Is WordPress bad for SEO?', a: 'No. It can be well optimised. Problems come from heavy themes, many plugins and poor hosting.' },
      { q: 'Can I move from WordPress to a custom site?', a: 'Yes. Content and URLs can be migrated and redirected so rankings are protected.' },
      { q: 'Who owns a custom admin panel?', a: 'Agree this in writing. We hand over the project files and credentials to clients on completion.' },
    ],
  },

  // ---------- SEO ----------
  'what-is-seo-beginners-guide-india': {
    sections: [
      {
        heading: 'SEO and paid ads: how they differ',
        body: [
          'Paid ads show your business immediately and stop the moment you stop paying. SEO takes longer but builds an asset that keeps working. Many businesses use ads to learn which phrases convert while SEO grows underneath.',
          'Neither is better in every case. A seasonal business with a short selling window may lean on ads; a service business with steady year-round demand tends to gain more from SEO.',
        ],
      },
    ],
    faq: [
      { q: 'Can I do SEO myself?', a: 'Yes, the basics are learnable: clear pages, good titles, a Google Business Profile and helpful content. Specialists help with technical issues and competitive markets.' },
      { q: 'Is SEO a one-time job?', a: 'No. Search results and competitors change, so ongoing improvement is needed.' },
      { q: 'Do I need to pay Google to rank?', a: 'No. Organic results cannot be bought. Ads appear separately and are marked as sponsored.' },
    ],
  },
  'keyword-research-for-small-business': {
    sections: [
      {
        heading: 'Local modifiers and long-tail phrases',
        body: [
          'Add the city, area or industry to your phrases: "logo designer in Jaipur", "website for coaching institute", "branding for restaurants". Longer phrases attract fewer searches but much clearer intent, which is perfect for a small business that needs relevant leads rather than raw traffic.',
          'Write down questions too. "How much does a restaurant website cost" is a keyword and also the title of a helpful article that can lead to your service page.',
        ],
      },
    ],
    faq: [
      { q: 'Do I need paid keyword tools?', a: 'Not to start. Autocomplete, related searches and Search Console give a solid picture for small sites.' },
      { q: 'How many keywords per page?', a: 'Focus on one main topic per page with a handful of closely related phrases that arise naturally.' },
      { q: 'How often should I redo keyword research?', a: 'Review quarterly and whenever you launch a new service.' },
    ],
  },
  'on-page-seo-checklist': {
    sections: [
      {
        heading: 'A worked example',
        body: [
          'Take a service page for logo design. The title might read "Logo Design for Startups in Ahmedabad | PK Creative". The H1 states the service and the audience. The first paragraph explains the outcome, the H2s cover process, pricing and samples, and an FAQ answers common questions. Images are named descriptively and linked internally to the branding guide.',
          'Notice that nothing here is a trick. Everything simply makes the page easier to understand for people and crawlers.',
        ],
      },
    ],
    faq: [
      { q: 'How long should a meta description be?', a: 'About 150 to 160 characters. Google may rewrite it, but a clear description still improves click-through.' },
      { q: 'Can I use the same title on multiple pages?', a: 'Avoid it. Duplicate titles make it hard for search engines and users to tell pages apart.' },
      { q: 'Does word count affect rankings?', a: 'Not directly. Pages should be as long as needed to answer the question well.' },
    ],
  },
  'technical-seo-basics-explained': {
    sections: [
      {
        heading: 'A monthly technical check',
        body: [
          'Once a month open Search Console and review four things: indexing status, crawl errors, mobile usability and Core Web Vitals. Then crawl your own site with a free crawler to catch broken links, missing titles and redirect chains.',
          'Keep a log of changes you make to the site. When something shifts in the data, you will be able to connect it to an update.',
        ],
      },
    ],
    faq: [
      { q: 'Does my site need an XML sitemap?', a: 'Yes, it helps search engines discover pages, especially on newer sites.' },
      { q: 'What is a canonical tag?', a: 'It tells search engines which address is the preferred version when several URLs show similar content.' },
      { q: 'Should the admin area be indexed?', a: 'No. Block it in robots.txt and add noindex so it never appears in search.' },
    ],
  },
  'discovered-currently-not-indexed-fix': {
    sections: [
      {
        heading: 'A two-week action plan',
        body: [
          'In week one, fix the foundations: ensure every sitemap address returns a normal page without redirecting, add internal links from the home page and footer, and improve the thinnest pages. In week two, request indexing for the five most valuable URLs, share them on your social profiles and add them to relevant directories.',
          'Then wait and watch. Check the Pages report weekly instead of daily. Expect gradual change, with pages moving from "discovered" to "crawled" and then to "indexed".',
        ],
      },
    ],
    faq: [
      { q: 'Is "Discovered - currently not indexed" a penalty?', a: 'No. It means Google knows the page but has not crawled it yet. It is common on new sites.' },
      { q: 'How long does indexing take?', a: 'From a few days to several weeks. New or low-authority domains wait longer.' },
      { q: 'Should I delete pages that are not indexed?', a: 'Not automatically. Improve or merge weak pages first, and remove only those with no value.' },
    ],
  },
  'backlinks-for-small-business-websites': {
    sections: [
      {
        heading: 'Local link ideas for Gujarat and Rajasthan businesses',
        body: [
          'Local chambers of commerce, trade associations, college placement cells, event organisers and city blogs often publish member or partner lists. Sponsoring a local sports event or a community programme can earn a mention and builds goodwill at the same time.',
          'Suppliers and clients are another source. A short case study on a client\'s website, with a link back, is both useful content and a genuine endorsement.',
        ],
      },
    ],
    faq: [
      { q: 'Are directory links worth it?', a: 'A few reputable, relevant directories help citations and discovery. Mass low-quality directories do not.' },
      { q: 'What are nofollow links?', a: 'They are links marked so search engines may not pass ranking credit. They can still bring visitors and mentions.' },
      { q: 'How many backlinks do I need?', a: 'There is no fixed number. Aim for steady, relevant links rather than a target count.' },
    ],
  },
  'how-to-write-seo-friendly-blog-posts': {
    sections: [
      {
        heading: 'An editing pass that improves any draft',
        body: [
          'After writing, read the post aloud and cut every sentence that does not help the reader act. Replace vague claims with specific examples. Check that each heading would make sense on its own in a list. Confirm every promise in the title is fulfilled in the text.',
          'Finally, add two or three internal links to relevant pages and make sure the post ends with a clear next step, such as reading a related guide or requesting a quote.',
        ],
      },
    ],
    faq: [
      { q: 'How long should a blog post be?', a: 'Long enough to answer the question thoroughly. Many helpful posts fall between 600 and 1,500 words.' },
      { q: 'How often should I publish?', a: 'A steady rhythm you can maintain, such as two posts a month, beats bursts followed by silence.' },
      { q: 'Can I republish old posts?', a: 'Update them with new information instead of duplicating them; refreshed content often performs well.' },
    ],
  },
  'schema-markup-for-small-business': {
    sections: [
      {
        heading: 'Common mistakes with structured data',
        body: [
          'Typical errors include marking up content that is not on the page, using the wrong type, leaving required fields empty and adding fake review stars. Search engines have become good at spotting these and may ignore or penalise the markup.',
          'Another frequent issue is duplicated markup from both a plugin and the theme. Test the final page rather than assuming it is correct.',
        ],
      },
    ],
    faq: [
      { q: 'Does schema improve rankings directly?', a: 'Not as a direct ranking factor, but it helps search engines understand pages and can enable richer results.' },
      { q: 'Which format should I use?', a: 'JSON-LD is the format recommended by Google and is easiest to maintain.' },
      { q: 'Can I add FAQ schema to any page?', a: 'Only if the questions and answers are visible to users on that page.' },
    ],
  },
  'seo-mistakes-that-hurt-rankings': {
    sections: [
      {
        heading: 'A thirty-minute self-audit',
        body: [
          'Search "site:yourdomain.in" in Google to see how many pages are indexed. Open each main page and check the title, heading and description. Test two pages in PageSpeed Insights on mobile. Open Search Console and read any warnings. Finally view your Google Business Profile and confirm details match your site.',
          'Write down every issue and sort by impact: anything stopping indexing first, then speed, then content improvements.',
        ],
      },
    ],
    faq: [
      { q: 'Why is my new site not on Google?', a: 'New sites take time to be discovered and indexed. Submit a sitemap, add internal links and publish useful pages.' },
      { q: 'Can too many keywords hurt me?', a: 'Yes. Keyword stuffing reads badly and can be treated as spam.' },
      { q: 'Should I fix everything at once?', a: 'Prioritise technical and indexing issues first, then content, then promotion.' },
    ],
  },
  'how-to-measure-seo-results': {
    sections: [
      {
        heading: 'A one-page monthly report template',
        body: [
          'Use the same five lines every month: organic visits, enquiries from organic visits, top three growing pages, top three declining pages and actions planned. Add one sentence of commentary on what changed and why you think it did.',
          'A short consistent report is easier to act on than a long one nobody reads, and it makes a useful record when you review a year of progress.',
        ],
      },
    ],
    faq: [
      { q: 'What is a good click-through rate?', a: 'It varies widely by position and query. Compare pages against your own averages and improve the lowest ones.' },
      { q: 'Are rankings the most important metric?', a: 'No. Enquiries and revenue matter most. Rankings are a leading indicator.' },
      { q: 'Do I need Google Analytics and Search Console?', a: 'Both are free and complementary: Search Console shows search visibility, Analytics shows behaviour on your site.' },
    ],
  },
};
