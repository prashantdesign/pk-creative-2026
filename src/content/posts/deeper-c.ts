import type { PostSection } from './types';

/** Final depth pass: a practical example or next-steps section for guides that needed more substance. */
export const DEEPER_C: Record<string, PostSection> = {
  // branding
  'how-to-choose-a-business-name': {
    heading: 'A worked example of the shortlist process',
    body: [
      'Imagine a new interior design studio in Jaipur. The owner lists thirty names, then removes any that are hard to spell, copy a bigger studio or limit the business to one city. Eight remain. Five customers hear each name aloud and say what business they imagine; three names are clearly misunderstood and drop out.',
      'The remaining five go through the domain, social handle and trademark checks. Two are free everywhere, and one of them also looks good in a logo sketch. That is the winner. The process takes about a week and avoids years of living with an awkward name.',
    ],
  },
  'logo-design-process-explained': {
    heading: 'What a logo project should cost you in time',
    body: [
      'Plan for roughly three hours of your own time across a typical project: an hour for the brief conversation, an hour gathering references and content, and another hour in feedback sessions. Delays almost always come from late feedback, not from design work.',
      'To keep the project moving, decide in advance who makes the final decision and share the brief with them before kickoff. If several partners will vote, collect their opinions together before sending feedback so the designer receives one clear direction rather than conflicting comments.',
    ],
  },
  'brand-colour-psychology-for-business': {
    heading: 'An example palette for a service business',
    body: [
      'Suppose a consulting firm wants to feel calm and dependable but not corporate. It might choose a deep teal as the primary colour, a warm sand tone as the secondary, a near-black for text and a soft off-white for backgrounds, with a single bright accent for buttons.',
      'Each colour has a defined job, text passes contrast checks and the palette works in print. Writing this down in one page of your style guide means anyone creating a poster or a slide knows exactly which colours to use and where.',
    ],
  },
  'how-to-create-a-brand-style-guide': {
    heading: 'How to build your first guide in a weekend',
    body: [
      'On Saturday, collect your logo files, colours and fonts, and write a paragraph each for purpose, audience and voice. On Sunday, create the pages: logo rules, colour values, typography samples, three example posts and a template list. Export as a PDF and store it with your assets.',
      'Share it with your team on Monday and ask for feedback after two weeks. Updating it with real examples from daily work makes the guide useful rather than decorative, and it will keep improving as you use it.',
    ],
  },
  'brand-voice-and-tone-guide': {
    heading: 'Words to use and words to avoid',
    body: [
      'Create two short lists. The first has phrases that sound like you, such as "we will explain", "clear next steps" and "in plain words". The second has phrases you avoid, such as inflated claims, jargon and filler. Review them with your team and add new examples over time.',
      'These lists make editing faster. When a draft feels off, check it against the lists and fix the mismatches. Over time, the whole business begins to sound consistent without anyone having to police every message.',
    ],
  },
  'rebranding-when-and-how': {
    heading: 'A realistic rebrand timeline',
    body: [
      'A modest refresh typically takes six to ten weeks: two weeks for research and direction, three to four for design and refinement, and two to three for rolling out the website, social profiles, stationery and signage. Larger rebrands with name changes take longer because of legal and registration work.',
      'Build a launch plan with dates, owners and assets for each channel, and prepare a short explanation for customers. Rolling changes out in a planned sequence avoids the confusing period where half your materials look different from the other half.',
    ],
  },
  'brand-positioning-statement-examples': {
    heading: 'Two worked examples',
    body: [
      'A neighbourhood bakery might say: "For families who want fresh, preservative-free bread without a trip across the city, Sunrise Bakes is the local bakery that delivers warm loaves by 8 a.m., because we bake in small batches every night."',
      'A freelance designer might say: "For small clinics that need to look professional online, Meera Designs creates fast, simple websites and logos in two weeks, because every project follows a tested template adapted to your brand." Notice the audience, benefit and proof in each.',
    ],
  },
  'packaging-design-tips-small-brands': {
    heading: 'Checking your design against competitors',
    body: [
      'Buy three competing products and place your mock-up beside them on a shelf or table. Take a photo and view it as a thumbnail. Does yours stand out in a good way? Is the product type obvious? Can you read the brand name from a distance?',
      'Ask five people which they would pick and why. Their answers reveal whether your design is clear and appealing or merely different. Adjust hierarchy, colour or imagery based on what you learn before committing to a print run.',
    ],
  },
  'brand-consistency-across-website-social-print': {
    heading: 'A monthly fifteen-minute routine',
    body: [
      'Once a month, look at your last ten social posts, your website home page, your Google Business Profile and your most recent proposal. Note anything that departs from the guidelines and fix the easiest items immediately.',
      'Record what you changed in a shared note. Over a few months, you will see which areas drift most often and can add templates or training there. A small recurring habit keeps your brand sharp without a large project.',
    ],
  },

  // ecommerce
  'how-to-build-an-online-store-in-india': {
    heading: 'Budgeting your first store',
    body: [
      'Budget for the platform or build, domain and hosting, payment gateway fees, product photography, packaging, shipping materials, marketing and a small reserve for returns and fixes. New sellers often forget photography and marketing, even though they decide whether products sell.',
      'Start with a limited range, test marketing on a small scale and add products as you learn what customers want. A modest, well-executed launch usually outperforms a large catalogue that is difficult to manage.',
    ],
  },
  'choosing-a-payment-gateway-in-india': {
    heading: 'Questions to ask a gateway provider',
    body: [
      'Ask how fast disputes are handled, what documents are needed, what happens if a payment is successful at the bank but pending in your store, and how support is provided. Ask about downtime history and whether they offer test credentials.',
      'Also ask what happens if you want to switch providers later. Choosing a gateway with clear documentation and responsive support often matters more than a slightly lower fee, because payment problems cost you sales and trust.',
    ],
  },
  'product-page-design-tips-for-higher-sales': {
    heading: 'Mobile layout checklist for product pages',
    body: [
      'On a phone, show the main image first, then title, price, rating and a prominent buy button. Keep variant selectors easy to tap, and place delivery and return details close by. Use a sticky add-to-cart bar on long pages.',
      'Test with one hand on a mid-range device. If a customer must pinch, zoom or hunt for the button, simplify. Smooth mobile product pages are one of the most reliable ways to lift conversion for an online store.',
    ],
  },
  'ecommerce-seo-checklist': {
    heading: 'Setting priorities for a small store',
    body: [
      'Start with your best-selling categories. Make sure each has a clear title, a helpful introduction and well-written product pages, then fix technical issues such as duplicates and slow loading. Only then expand to long-tail products.',
      'Track impressions and clicks per category in Search Console and improve the pages that already have traction. Small stores win by being focused and thorough in a few areas rather than thin across many.',
    ],
  },
  'abandoned-cart-recovery-for-small-stores': {
    heading: 'Understanding why customers left',
    body: [
      'Add a one-question exit survey or an optional field in the cart asking "What stopped you today?" with options such as shipping cost, price, payment issue or just browsing. Even a few responses will point to the biggest fix.',
      'Combine the answers with analytics showing where users drop off. If most leave at the shipping step, review charges and delivery clarity. If they leave at payment, test your gateway across banks and devices.',
    ],
  },
  'when-does-a-business-need-a-custom-web-app': {
    heading: 'A small example of a worthwhile web app',
    body: [
      'A coaching institute used to track enquiries, fee payments and batch attendance in three spreadsheets. A simple web app with one login for staff, a student list, a fee tracker and automatic reminders replaced them and saved several hours each week.',
      'The first version had only four screens. Additional features were added after staff used it daily and requested changes. This kind of staged approach keeps costs controlled and ensures the software fits real habits.',
    ],
  },
  'progressive-web-apps-for-small-business': {
    heading: 'Deciding between a PWA and a native app',
    body: [
      'Ask whether customers will install an app at all, whether you need features unavailable in browsers and whether you can fund two platforms. For most small businesses the answers favour a PWA, at least at first.',
      'If you later need an app-store presence, much of the work, such as design, content and back end, can be reused. Starting with a PWA lets you validate demand before investing in a larger project.',
    ],
  },
  'booking-and-appointment-website-for-clinics-salons': {
    heading: 'A simple launch plan for booking',
    body: [
      'In week one, list services, durations and prices and define working hours. In week two, set up the booking tool or form, notifications and policies. In week three, test with staff and a few regular customers. In week four, launch and promote the link everywhere.',
      'Place the booking button on your website header, Google Business Profile, social bios and WhatsApp greeting. Review the first month of bookings to adjust slot lengths, buffers and reminders.',
    ],
  },
  'shipping-and-returns-policy-for-online-stores-india': {
    heading: 'Sample wording you can adapt',
    body: [
      'A shipping line might read: "Orders are dispatched within two working days. Delivery usually takes three to seven days depending on your pincode, and you will receive a tracking link by SMS and email." A returns line: "You can request a return within seven days of delivery if the item is unused and in its original packaging."',
      'Adjust these to your real operations and have them reviewed. Accurate, easy-to-read wording is better than elaborate legal language that nobody reads and you cannot always honour.',
    ],
  },
  'selling-on-marketplaces-vs-own-website-india': {
    heading: 'A simple milestone plan',
    body: [
      'Phase one: list best sellers on a marketplace and gather reviews and data on demand. Phase two: launch your website with the same products and a clear brand story. Phase three: drive repeat customers to your site with email, WhatsApp and loyalty offers.',
      'Review margins at each stage. When direct sales cover your costs and grow steadily, shift advertising spend toward your own store while keeping marketplaces for discovery.',
    ],
  },

  // graphic design
  'how-to-brief-a-graphic-designer': {
    heading: 'A ready-to-use brief outline',
    body: [
      'Use this outline: project name, goal, audience, key message, required text, deliverables and sizes, usage, references, brand assets, deadline, budget and decision-maker. Fill each in a sentence or two and attach files.',
      'A one-page brief like this takes less than an hour to write and gives designers what they need to start well. Keep a copy as a template so every new project begins with the same discipline.',
    ],
  },
  'brochure-design-tips-that-convert': {
    heading: 'An example brochure outline',
    body: [
      'Cover: logo, strong headline and an image of your best work. Inside left: the problem you solve and who you help. Inside centre: services with short descriptions. Inside right: process, proof and testimonials. Back: contact details, QR code and a clear call to action.',
      'Write the content in this order before designing. When the story flows logically, layout becomes easy, and your sales team will find the brochure genuinely helpful in conversations.',
    ],
  },
  'print-ready-files-checklist': {
    heading: 'A final pre-flight routine',
    body: [
      'Before exporting, zoom to 100 percent and read every line aloud. Verify numbers, names and dates. Check overprint, transparency and links to images. Export to PDF using the printer\'s preset and open the exported file, not the original, to confirm everything is intact.',
      'Keep the approved PDF and the printer\'s proof together. If something is wrong in the final print, these records clarify responsibility and help get a fair resolution.',
    ],
  },
  'social-media-post-design-best-practices': {
    heading: 'A template set to build this week',
    body: [
      'Create a tip template with a headline and number, a project template with a large image and caption area, a quote template, an announcement template and an offer template. Use your brand colours and fonts and keep logo placement identical across them.',
      'With these five templates, you can produce a month of posts in a few hours. Review performance quarterly and refresh the designs so they stay fresh while remaining recognisable.',
    ],
  },
  'logo-file-formats-explained': {
    heading: 'Which file to send to whom',
    body: [
      'Send a printer a vector PDF or AI file with CMYK values. Send a web developer the SVG and a PNG fallback. Send a partner or event organiser a transparent PNG with a white and black version. Send a newspaper whatever format they specify, usually EPS or high-resolution PNG.',
      'Keeping a short note on your shared folder describing these uses prevents confusion and avoids people grabbing the wrong file and degrading your brand quality.',
    ],
  },
  'infographic-design-for-business': {
    heading: 'A step-by-step production plan',
    body: [
      'Day one: define the question and audience, and gather verified data. Day two: outline the story and sketch the layout. Day three: design and review. Day four: polish, write alt text and prepare social versions. Day five: publish and promote.',
      'Treat feedback as a short review round with one person checking accuracy and another checking clarity. A concise process keeps quality high and prevents infographics from becoming drawn-out projects.',
    ],
  },
  'visiting-card-design-ideas': {
    heading: 'Design directions that suit different professions',
    body: [
      'A lawyer or consultant may prefer minimal typography on heavy stock. A photographer might use a full-bleed image on the back. A restaurant could add a small illustration and loyalty stamp area, and a designer may experiment with texture or die-cut shapes.',
      'Whichever style you choose, readability and accurate details come first. Memorable cards are those that feel like the business and make it easy to get in touch.',
    ],
  },
  'presentation-design-for-pitch-decks': {
    heading: 'A structure for a sales deck',
    body: [
      'Slide 1: title and promise. Slide 2: the customer\'s problem. Slide 3: your solution. Slides 4 to 6: how it works, with visuals. Slides 7 and 8: proof, such as results and testimonials. Slide 9: pricing options. Slide 10: next steps and contact.',
      'Keep each slide to one idea and use speaker notes for details. Practise the transitions so the story feels natural, and leave time for questions at the end.',
    ],
  },
  'image-optimisation-for-websites-designers': {
    heading: 'Setting size targets by image type',
    body: [
      'Use rough targets: hero images 150 to 250 KB, content images 60 to 120 KB, thumbnails 15 to 40 KB, icons as SVG under 5 KB. These are guidelines; compare quality visually and adapt.',
      'Document the targets in your design handoff so developers and content editors follow them. When everyone uses the same limits, new pages stay fast without extra effort.',
    ],
  },
  'working-with-a-designer-contracts-and-ownership': {
    heading: 'A short checklist before signing',
    body: [
      'Confirm the scope and deliverables, price and payment dates, revision limits, timeline, ownership transfer, source file delivery, confidentiality and how to end the agreement. Make sure both parties have signed or confirmed by email.',
      'Keep a record of approvals and file versions. A calm, documented process protects the relationship and gives you something to refer to if questions arise later.',
    ],
  },

  // growth
  'lead-generation-for-small-business-website': {
    heading: 'A first-month action list',
    body: [
      'Week one: add a clear primary button, shorten the contact form and add WhatsApp. Week two: place testimonials near the buttons and publish a pricing guide. Week three: set up tracking and a lead sheet. Week four: review enquiries, call back unresponsive leads and refine your message.',
      'Small, steady improvements to the path from visit to enquiry usually outperform expensive campaigns. Fix the leaks before pouring more traffic into the funnel.',
    ],
  },
  'google-analytics-4-setup-for-small-business': {
    heading: 'Reports to bookmark',
    body: [
      'Bookmark the acquisition overview, the landing page report and the key events report. Add a simple exploration comparing mobile and desktop conversion. Save them so a five-minute monthly review is easy.',
      'Share a summary with your team and decide on one improvement based on the data. Consistent review turns analytics from a dashboard into a decision tool.',
    ],
  },
  'email-marketing-for-small-business-india': {
    heading: 'A simple monthly newsletter template',
    body: [
      'Use a short subject, a friendly opening, one main story or tip with a link, one customer result, a small offer and a clear sign-off with your name. Keep it under 300 words and test on mobile.',
      'The same structure every month saves time and builds familiarity. Readers learn what to expect, and you build a reputation for useful, concise messages.',
    ],
  },
  'google-ads-vs-seo-which-first': {
    heading: 'How to run a low-risk ads test',
    body: [
      'Choose a few high-intent phrases, set a modest daily budget and send traffic to a focused landing page. Track enquiries for two to four weeks. If cost per enquiry is acceptable, continue; if not, adjust the page and phrases before increasing spend.',
      'Use the search terms report to learn how customers phrase their needs, and feed that language into your SEO content. Ads then become a research tool as well as a lead source.',
    ],
  },
  'conversion-rate-optimisation-basics': {
    heading: 'A one-page test log',
    body: [
      'Record each change: date, page, hypothesis, what you changed, the metric and the result after a fixed period. Note outside factors such as campaigns or festivals. Over time, the log reveals patterns that teach you what your audience values.',
      'Share the log with anyone who edits the site. A habit of documenting experiments prevents repeated mistakes and builds a stronger understanding of your customers.',
    ],
  },
  'google-search-console-guide-for-beginners': {
    heading: 'Common warnings and what they mean',
    body: [
      '"Page with redirect" means the address you submitted forwards elsewhere; list the final address instead. "Crawled - currently not indexed" suggests the page was seen but judged low value; improve it. "Duplicate without user-selected canonical" means Google chose another version; set canonicals clearly.',
      'Do not panic at every warning. Prioritise those affecting important pages, fix the cause and use validation. Many warnings clear naturally as your site grows and improves.',
    ],
  },
  'referral-and-word-of-mouth-marketing': {
    heading: 'A thirty-day referral kickstart',
    body: [
      'List your ten happiest customers. Send each a personal thank-you and a short, specific request for an introduction. Offer a modest reward. Follow up with partners and complementary businesses to propose mutual referrals.',
      'Track every response, thank everyone and ask for reviews at the same time. Even a few new introductions can bring high-quality customers and set up a habit that continues.',
    ],
  },
  'content-marketing-plan-for-service-businesses': {
    heading: 'A sample content calendar',
    body: [
      'Week one: cost guide. Week two: how-to-choose checklist. Week three: case study. Week four: FAQ roundup. Repeat with new topics each month, mixing in short videos and social posts that point back to each piece.',
      'Keep a spreadsheet with title, target phrase, status, publication date and results. A visible calendar keeps the plan achievable, and the results column shows which topics deserve more attention.',
    ],
  },
  'online-reputation-management-small-business': {
    heading: 'A monthly reputation check',
    body: [
      'Search your business name, owners\' names and main service plus city. Check the first two pages for outdated or inaccurate listings. Review your Google, directory and social ratings and note recurring themes in feedback.',
      'Update profiles, respond to pending reviews and plan one action to improve the weakest area. Staying on top of it monthly prevents small issues from becoming lasting problems.',
    ],
  },
  'digital-marketing-budget-for-small-business-india': {
    heading: 'An example budget for a growing service firm',
    body: [
      'Imagine a business with a small monthly marketing budget. After fixing the website and profile, it allocates the largest share to content and SEO, a smaller share to a controlled ads test, some to social creative and a reserve for new ideas. Each month it reviews cost per enquiry and shifts money toward the best performer.',
      'The exact numbers depend on your margins and goals, but the principle holds: fund foundations, test deliberately and move budget based on evidence rather than habit.',
    ],
  },

  // local SEO
  'how-to-get-more-google-reviews': {
    heading: 'Example messages you can adapt',
    body: [
      'A message to a recent client might read: "Hi Priya, thank you for working with us on your new website. If you are happy with the result, would you mind sharing a short review on Google? It really helps small businesses like ours. Here is the link."',
      'Keep it warm and brief, avoid asking for specific ratings and never pressure anyone. Genuine, relaxed requests lead to honest reviews that read naturally and carry weight with future customers.',
    ],
  },
  'nap-consistency-local-citations': {
    heading: 'An example audit table',
    body: [
      'Create a table with columns for platform, listed name, address, phone, website, status and date checked. List your top twenty places, including your website, Google, Bing, Apple Maps, social profiles and key directories. Highlight mismatches in red and fix them in order of importance.',
      'Revisit the table twice a year. It takes little time and prevents the slow build-up of inconsistent details that can undermine your local visibility.',
    ],
  },
  'local-landing-pages-multiple-cities': {
    heading: 'An example outline for a city page',
    body: [
      'Start with a heading naming the service and city, then a paragraph explaining who you help there. Add a section on typical local needs, followed by two or three projects or testimonials from that area. Include pricing guidance, process, local contact details and a short FAQ.',
      'Every section should say something specific to that city. If you struggle to write original content for a location, you may not need a dedicated page for it yet.',
    ],
  },
  'near-me-searches-how-to-rank': {
    heading: 'A thirty-minute near me audit',
    body: [
      'Search your main service from your location and from two nearby areas. Note your position and who ranks above you. Open their profiles and compare categories, number of reviews, photos and posts. Then open your own profile and list the differences.',
      'Choose three gaps to close this month, such as adding services, collecting more reviews and improving photos. Repeat the audit monthly and track movement in a simple sheet.',
    ],
  },
  'seo-for-service-businesses-in-rajasthan': {
    heading: 'Examples of sectors and their search opportunities',
    body: [
      'Hospitality businesses can target destination and event phrases; handicraft and textile sellers can target product and wholesale terms; educational institutes can focus on courses and admissions; professional services can focus on service plus city phrases.',
      'Each sector has its own search patterns and seasonality. Research your category with autocomplete, competitor pages and Search Console, then build pages that serve the most valuable searches first.',
    ],
  },
  'seo-for-ahmedabad-businesses': {
    heading: 'Examples of locally relevant content',
    body: [
      'Examples include a guide to compliance steps for a local industry, a checklist for opening a business in the city, a cost comparison of local options or a case study featuring a recognisable local client. Local relevance makes content more shareable among regional audiences.',
      'Share it with business associations, local groups and partners. A single well-targeted guide can earn mentions that general content never would.',
    ],
  },
  'local-seo-mistakes-small-businesses-make': {
    heading: 'A one-week repair plan',
    body: [
      'Day one: confirm your categories and business name on Google. Day two: update hours, services and description. Day three: upload real photos. Day four: audit directory listings. Day five: start collecting reviews. Day six: align website contact details. Day seven: set reminders for monthly checks.',
      'A systematic week of cleanup often yields noticeable improvements within a few weeks, and it sets up habits that protect your local presence going forward.',
    ],
  },

  // performance
  'core-web-vitals-explained-for-business-owners': {
    heading: 'Reading a PageSpeed report without jargon',
    body: [
      'At the top, look at whether real-user data passes the Core Web Vitals assessment. Then scroll to the opportunities and diagnostics, which list specific issues such as oversized images or unused JavaScript. Ignore the tiny items and fix the largest savings first.',
      'Share the report with your developer and ask what can be done in the next week. Having a short list of agreed actions turns a confusing report into a practical improvement plan.',
    ],
  },
  'how-to-speed-up-your-website': {
    heading: 'What to expect after each fix',
    body: [
      'Image optimisation often produces the largest immediate gain, particularly on mobile. Script removal improves interactivity, caching improves repeat visits and better hosting improves server response. Combined, these changes can transform the feel of a site.',
      'Track results with real-user data over a few weeks, as lab tests vary. Celebrate improvements but keep a list of next steps, since speed work is an ongoing habit rather than a single task.',
    ],
  },
  'third-party-scripts-and-website-speed': {
    heading: 'Checking the cost of a script before you add it',
    body: [
      'Before adding a tool, test a page with and without it. Note the difference in load time, total size and responsiveness. Ask whether the benefit justifies the cost and whether a lighter alternative exists.',
      'Record the decision in your script register. This simple gate stops the slow creep of marketing tools that leave your website heavy and your visitors frustrated.',
    ],
  },
  'website-hosting-for-indian-businesses': {
    heading: 'Signs it is time to change hosting',
    body: [
      'Frequent downtime, slow response times even for simple pages, poor support, surprise price increases and lack of backups are warning signs. If your traffic has outgrown a plan or you need features your provider cannot offer, it may be time to move.',
      'Plan the move carefully and compare at least three options. The right hosting should make your site faster, safer and easier to manage, not a constant source of worry.',
    ],
  },
  'lazy-loading-images-and-video-guide': {
    heading: 'A quick testing routine',
    body: [
      'Open the page with developer tools, throttle the network to a slow setting and scroll. Watch whether images appear before you reach them and whether layout jumps. Check the network panel to confirm that offscreen images load only when needed.',
      'Repeat on a real phone. If something looks blank for too long, load that image earlier or reduce its size. A short test after each design change keeps performance steady.',
    ],
  },
  'mobile-page-speed-on-slow-networks-india': {
    heading: 'An example performance budget in practice',
    body: [
      'A team sets limits: home page under 1.2 MB, hero image under 180 KB, scripts under 150 KB compressed and largest paint under 2.5 seconds on a throttled mobile test. Every new feature must fit within these limits or replace something existing.',
      'When a request would break the budget, the team simplifies the idea or removes something else. Constraints help creativity and keep the site fast as it grows.',
    ],
  },
  'fonts-and-website-speed-guide': {
    heading: 'Example font setup for a typical business site',
    body: [
      'A common setup uses one heading family in two weights and one body family in regular and medium. That is four files at most, delivered as WOFF2 with font-display swap and the heading font preloaded. Fallback fonts are chosen to match size and spacing.',
      'The result is a distinctive look with little cost. Test on a throttled connection to confirm that text appears immediately and that nothing jumps when fonts load.',
    ],
  },
  'website-caching-explained-simply': {
    heading: 'Choosing refresh times for your content',
    body: [
      'A pricing page that changes rarely can refresh hourly. A news or offers page might refresh every few minutes. Images and scripts with versioned names can be cached for a year. Admin and checkout pages should never be cached publicly.',
      'Write these rules down with your developer, so everyone knows how long a change takes to appear. Predictable behaviour avoids confusion when you update content.',
    ],
  },
  'website-security-basics-for-small-business': {
    heading: 'Training your team in five minutes',
    body: [
      'Teach staff to recognise phishing emails, avoid reusing passwords, lock their devices and report suspicious activity immediately. Show them how to use a password manager and two-step login.',
      'Most breaches involve people, not technology. A short, regular reminder costs almost nothing and removes one of the biggest risks to your website and business.',
    ],
  },

  // SEO
  'backlinks-for-small-business-websites': {
    heading: 'A simple ninety-day link plan',
    body: [
      'Month one: complete profiles on reputable directories and ask three clients for a mention. Month two: publish one resource that deserves links and share it with relevant people. Month three: pursue two guest articles or local partnerships and follow up on earlier outreach.',
      'Track new links in Search Console and note which activities produced results. Slow, relevant links accumulate into authority that is hard for competitors to copy.',
    ],
  },
  'how-to-write-seo-friendly-blog-posts': {
    heading: 'A pre-publish checklist',
    body: [
      'Confirm the title and description are unique and accurate, headings are logical, the main question is answered early, images have alt text and links work. Read the post on a phone and fix awkward paragraphs.',
      'After publishing, share it, inspect the URL in Search Console and add internal links from at least two older relevant pages. Mark a date to review performance in a month.',
    ],
  },
  'schema-markup-for-small-business': {
    heading: 'How to explain schema to your team',
    body: [
      'Describe it as a label for your content: just as a product on a shelf has a price tag and ingredients, your page has labels that tell search engines what it contains. The labels must match what is printed on the box.',
      'Keep a list of which pages use which types and who maintains them. Clear ownership prevents outdated or conflicting markup and helps new team members understand how your site communicates with search engines.',
    ],
  },
  'seo-mistakes-that-hurt-rankings': {
    heading: 'Fix-it order of operations',
    body: [
      'First fix anything that blocks indexing, then address duplicate or missing titles, then speed and mobile problems, and finally content depth and links. Working in this order ensures your later efforts are not wasted by foundational issues.',
      'Document each fix and revisit Search Console after two weeks. Steady, orderly improvement is more effective than scattered changes made without a plan.',
    ],
  },
  'how-to-measure-seo-results': {
    heading: 'Common reporting traps to avoid',
    body: [
      'Do not judge SEO by a single keyword position, compare weekends with weekdays or ignore seasonality. Avoid mixing brand and non-brand searches, since brand traffic can hide whether new customers are discovering you.',
      'Segment performance into branded and non-branded queries in Search Console, and look at non-branded growth as a sign of new discovery. Clear segmentation gives a more honest picture of progress.',
    ],
  },

  // social media
  'social-media-strategy-for-small-business-india': {
    heading: 'A ninety-day plan outline',
    body: [
      'Days one to thirty: set goals, optimise profiles and create templates. Days thirty-one to sixty: publish consistently, test formats and begin collecting audience feedback. Days sixty-one to ninety: double down on what worked, add a modest ad test and review outcomes.',
      'Treat the quarter as an experiment. Measure, learn and adjust. By the end you will have a clear picture of which platforms, formats and topics deserve continued investment.',
    ],
  },
  'instagram-content-calendar-for-small-business': {
    heading: 'Example week for a design studio',
    body: [
      'Monday: a quick design tip carousel. Tuesday: a story poll about brand colours. Wednesday: a project reveal reel. Thursday: a client testimonial graphic. Friday: a behind-the-scenes photo with a casual caption. Weekend: reply to comments and prepare next week\'s content.',
      'Adapt the pattern to your business and keep the formats consistent. A recognisable weekly rhythm encourages followers to return and makes your production process lighter.',
    ],
  },
  'instagram-reels-ideas-for-businesses': {
    heading: 'A script template for a thirty-second reel',
    body: [
      'Seconds zero to three: the hook, such as "Three mistakes that make your website slow". Seconds three to twenty-five: one clear point per five seconds with simple visuals and text. Seconds twenty-five to thirty: a call to action to save or message.',
      'Write the script in bullet points, film in order and trim ruthlessly. Using a template makes producing reels faster and keeps your messages focused and watchable.',
    ],
  },
  'linkedin-marketing-for-b2b-small-business': {
    heading: 'An example post structure',
    body: [
      'Start with a clear first line describing the lesson or problem. Add three to five short lines telling what happened and what you learned. Finish with a takeaway and an open question that invites comments.',
      'Avoid heavy self-promotion. When you share expertise generously, the right people notice and reach out, and your profile becomes a trusted resource for potential clients.',
    ],
  },
  'facebook-page-vs-instagram-which-to-prioritise': {
    heading: 'A thirty-day test to decide',
    body: [
      'Post similar content on both platforms for a month and track reach, engagement and enquiries from each. Note which audience responds more and which platform produces better leads, not just more likes.',
      'At month end, choose a primary platform, keep a lighter presence on the other and set a review date. Evidence from your own audience beats general advice.',
    ],
  },
  'whatsapp-business-marketing-guide': {
    heading: 'Organising leads with labels',
    body: [
      'Create labels such as New enquiry, Quote sent, Follow-up, Won and Lost. Apply them as conversations progress and review them daily. This turns a messy chat list into a simple pipeline and ensures that no promising lead is forgotten.',
      'Once a week, message people in the follow-up label with a helpful update rather than a push. Consistent, courteous follow-up wins more customers than constant promotion.',
    ],
  },
  'youtube-for-small-business-getting-started': {
    heading: 'Using video to support sales',
    body: [
      'Create short videos that answer objections, such as "How long will my project take?" or "What happens after I pay?". Send these links in WhatsApp conversations and embed them on service pages.',
      'Videos that salespeople actually use are among the most valuable content you can produce, because they shorten the sales process and set accurate expectations for new customers.',
    ],
  },
  'social-media-ads-budget-for-beginners': {
    heading: 'Setting up tracking before you launch',
    body: [
      'Install the Meta pixel or conversion tracking, define the events that matter, such as form submissions and WhatsApp clicks, and test that they register. Use tagged links so analytics can attribute visits to campaigns.',
      'Without tracking, you cannot tell which ads work. A twenty-minute setup before launch saves weeks of guesswork and helps the ad system optimise toward actual enquiries.',
    ],
  },
  'social-media-analytics-what-to-track': {
    heading: 'Turning insights into the next month\'s plan',
    body: [
      'List your top three posts and ask why they worked: topic, format, timing, hook. Write one hypothesis for each and plan new posts that test it. Also identify the weakest posts and decide whether to improve or drop that theme.',
      'Document the plan in your calendar. A cycle of review, hypothesis and test makes social media performance gradually improve rather than fluctuate randomly.',
    ],
  },
  'festival-marketing-ideas-for-indian-businesses': {
    heading: 'Example offers for service businesses',
    body: [
      'A design studio might offer a festive branding refresh package with a fixed price and limited slots. A clinic might provide a family health check bundle. A coaching institute might offer an early-enrolment benefit. Fixed dates and clear scope make offers credible.',
      'Back the offer with a landing page, a WhatsApp link and reminders. Limit slots honestly to protect delivery quality, since rushed work during busy periods can harm your reputation.',
    ],
  },

  // UI/UX
  'ui-vs-ux-difference-explained': {
    heading: 'Examples of UX problems and UI problems',
    body: [
      'A UX problem: customers cannot find your pricing because it is buried three clicks deep. A UI problem: the pricing page is found, but the text is tiny and low-contrast, so it is hard to read. Fixing the first requires restructuring; fixing the second requires visual adjustment.',
      'Learning to tell them apart makes feedback clearer. When you describe a problem, say what the user was trying to do and what happened, and let the designer decide whether it is a structure, content or visual issue.',
    ],
  },
  'website-navigation-best-practices': {
    heading: 'Examples of good menu structures',
    body: [
      'A service business might use Services, Work, About, Guides and Contact. A shop might use Shop, Collections, About, Support and Cart. A clinic might use Treatments, Doctors, Patient Info, Appointments and Contact.',
      'Each label is short and familiar. Dropdowns, when used, group related pages with clear headings. Test the labels with five customers and revise those that cause hesitation.',
    ],
  },
  'contact-form-design-tips': {
    heading: 'An example of a high-performing small form',
    body: [
      'Fields: Name, Mobile number, and "What do you need?" as a short text area. Button: "Get my free quote". Note beneath: "We reply within one business day. Your details are never shared." Next to the form, a WhatsApp button for those who prefer chat.',
      'This format asks for the minimum, reassures and offers an alternative. You can add optional fields later if you find you need them, always weighing the cost to completion rates.',
    ],
  },
  'call-to-action-button-examples': {
    heading: 'Micro-copy that supports the button',
    body: [
      'Place a short sentence near the button addressing likely doubts: "Free, no obligation", "Reply within a day" or "Typical projects start at ₹10,000". Add a small reassurance icon only if it communicates something real.',
      'Test variations over a few weeks. Often the surrounding text changes results more than the button label itself, because it addresses the specific hesitation the visitor feels.',
    ],
  },
  'website-accessibility-for-small-business': {
    heading: 'Example fixes with large impact',
    body: [
      'Increase text contrast on light grey captions, add descriptive alt text to key images, label every form field, make the focus outline visible and ensure the menu works with a keyboard. Each can be done in an hour or two.',
      'These changes help people with disabilities, older users and anyone using a phone in bright light. Accessibility improvements usually raise the quality of the whole site rather than only serving a small group.',
    ],
  },
  'user-research-for-small-business-websites': {
    heading: 'A sample five-person test plan',
    body: [
      'Recruit five people who match your customers. Give each three tasks: find pricing, understand what you do and contact you. Observe silently, note hesitation and ask what they expected at each step afterwards. Run all five sessions within a couple of days.',
      'List the issues, group similar ones and fix the top three. Test again with a few new people to confirm improvement. The whole cycle costs little but can transform a site\'s clarity.',
    ],
  },
  'landing-page-design-checklist': {
    heading: 'An example layout from top to bottom',
    body: [
      'Hero with headline, supporting line, button and a trust note. Next, three benefit blocks. Then a short process in three steps, followed by testimonials, pricing guidance, FAQs and a final call to action with the form. A slim footer with contact details and policies completes the page.',
      'Use the same colours and tone as your brand, keep images purposeful and remove anything that does not support the single action you want people to take.',
    ],
  },
  'typography-for-websites-font-pairing': {
    heading: 'A practical type scale',
    body: [
      'For mobile, you might use body 16 to 18 pixels, small text 14, H3 20, H2 24 to 28 and H1 32 to 40. On desktop, scale headings up by roughly 25 to 50 percent. Keep line height around 1.5 for paragraphs and tighter for large headings.',
      'Document the scale in your design system, so every page follows it. A consistent scale gives a calm, professional look and makes designing new pages faster.',
    ],
  },
  'whitespace-and-layout-principles': {
    heading: 'Before and after: a service section',
    body: [
      'Before: six service icons crammed in a row with tiny text, a long paragraph and two buttons. After: three services per row on desktop and one on mobile, each with a heading, one sentence and a link, with ample padding around.',
      'The second version holds the same information but is easier to scan and feels more confident. Clarity often comes from removing and spacing out, not adding.',
    ],
  },
  'microinteractions-and-animation-in-web-design': {
    heading: 'Examples of purposeful motion',
    body: [
      'A button that slightly depresses when pressed confirms interaction. A form field that gently highlights when focused shows where you are. A menu that slides in from the edge indicates where it will go when closed. A success tick appears briefly after submission.',
      'Each example is short, clear and tied to a user action. Motion that explains is welcome; motion that merely decorates is optional and should be minimal.',
    ],
  },
};
