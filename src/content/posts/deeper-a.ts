import type { PostSection } from './types';

/** One added in-depth section per article (web design, SEO, local SEO, branding, UI/UX and the four original guides). */
export const DEEPER_A: Record<string, PostSection> = {
  'website-design-cost-in-india': {
    heading: 'Ways to get more value from a fixed budget',
    body: [
      'If your budget is tight, spend it on the pages that earn money. A strong home page, one clear page per main service and a simple contact page will do more than ten average pages. Postpone extras such as galleries, blogs and multilingual versions until the core is bringing enquiries.',
      'Prepare your content before the project starts. Time spent waiting for text and photos is paid time, so a client who sends the logo, service descriptions and good photos on day one usually saves money and gets a better result.',
    ],
    list: ['Write your service descriptions before kickoff', 'Gather photos of real work', 'Decide the single action you want visitors to take', 'Agree what is phase two'],
  },
  'how-to-choose-web-design-agency-ahmedabad': {
    heading: 'How to run a fair comparison between agencies',
    body: [
      'Send the same short brief to three agencies and ask for the same details in return: scope, timeline, price, what is not included and who will do the work. Comparing answers to identical questions is far more reliable than comparing slick proposals that each emphasise different things.',
      'Hold a short video call with each. Notice whether they ask about your customers and goals, whether they explain choices in plain language and whether they are comfortable saying no to ideas that will not help you. An agency that challenges you politely is usually one that cares about results.',
    ],
  },
  'local-seo-checklist-small-business-india': {
    heading: 'Local SEO on your website, not just on Maps',
    body: [
      'A Google Business Profile does the heavy lifting for map results, but your website supports it. Make sure the contact page shows your full address and phone number in text, not just in an image, with an embedded map and opening hours. Mention your city and service areas naturally in page titles and headings.',
      'Create one page per core service and, if you serve several cities, honest pages for each place with local examples. Add LocalBusiness structured data matching the details on your profile, so search engines see the same facts everywhere.',
    ],
  },
  'why-nextjs-websites-rank-faster': {
    heading: 'The limits of any framework',
    body: [
      'A fast framework removes technical obstacles, but it cannot replace relevance. If a page does not answer the question searchers ask, it will not rank however quickly it loads. Treat speed as the floor and content, trust and links as the ceiling.',
      'It also pays to keep the build lean. Large images, many third-party scripts and heavy animation can slow even the best foundation. Measure real-user performance after launch and keep removing anything that does not help visitors.',
    ],
  },

  // web design
  'how-many-pages-does-a-business-website-need': {
    heading: 'Using analytics to decide on new pages',
    body: [
      'After launch, let data guide your next pages. In Search Console, look for queries that already show your site on page two or three; each one is a hint that a dedicated, better page might rank. In analytics, look at which pages visitors read before they enquire and consider building more content around those topics.',
      'Also read your enquiry messages. When several people ask the same question, that answer deserves a visible place on the site. A single well-written page that removes a common doubt often increases enquiries more than a redesign.',
    ],
  },
  'website-redesign-checklist': {
    heading: 'Redesign decisions that protect your rankings',
    body: [
      'Resist the urge to rename every page. A URL that has earned links and traffic carries value, and changing it for cosmetic reasons costs you that value. If a new structure is truly better, map each old address to its closest new equivalent and keep the redirect live for at least a year.',
      'Keep your best-performing text where possible. If a service page ranks for a phrase, keep that phrase in the title and headline, and improve the page by adding clearer sections, examples and a stronger call to action rather than rewriting from scratch.',
    ],
  },
  'mobile-first-web-design-india': {
    heading: 'Designing the first screen on a phone',
    body: [
      'The first screen on mobile is prime space. It should show a headline stating what you do, one supporting sentence, a primary button and a hint of what lies below, such as the top of an image. Avoid stacking a large logo, a banner and a pop-up before any content appears.',
      'Think about the order of content on a single column. Customers should see the offer first, then proof, then details, then the form. If you find yourself pushing the main button far down the page, shorten the sections above it.',
    ],
  },
  'website-content-writing-guide': {
    heading: 'Editing your first draft',
    body: [
      'First drafts tend to be long and cautious. Cut introductions that clear their throat, replace abstract nouns with action verbs and look for sentences that could be about any business. If a sentence would fit a competitor\'s site unchanged, make it specific to you or delete it.',
      'Then check the numbers and promises. Every claim should be something you can support: delivery times you can meet, prices you will honour and results you can show. Honest, specific copy builds trust, and trust is what makes people fill in a form.',
    ],
  },
  'static-vs-dynamic-website': {
    heading: 'Questions to ask before choosing',
    body: [
      'Ask your developer how updates will work after launch. Who edits text? How are images replaced? How are enquiries stored? Can you export your data? Clear, simple answers matter more than technical terminology.',
      'Also ask about the cost of change. A static site may need a developer for every edit, which is cheap until you edit often. A dynamic site costs more at the start but puts routine updates in your hands. Choose the model that matches your update habits and keep room to grow.',
    ],
  },
  'website-design-mistakes-small-businesses-make': {
    heading: 'How to check for these mistakes this week',
    body: [
      'Give yourself an hour. Open your site on your phone and try to do what a customer would do: find a service, find a price signal, contact you. Time each step. Ask two people who do not know your business to do the same and watch silently.',
      'Write down every moment of confusion and sort them by how likely they are to lose an enquiry. Fix the top three before touching anything cosmetic. Small, targeted fixes made weekly beat one large redesign made once a few years.',
    ],
  },
  'how-long-does-it-take-to-build-a-website': {
    heading: 'What a good project schedule includes',
    body: [
      'A useful schedule names each stage, who is responsible and the date each deliverable is due, including your own tasks such as supplying content and giving feedback. It also lists the launch date and a buffer for fixes. If a proposal contains only a final date, ask for the stages in between.',
      'Agree how delays are handled. If feedback arrives late, the launch moves; if the developer is late, you should know what the agency will do about it. Transparent scheduling prevents most project frustrations.',
    ],
  },
  'website-maintenance-checklist': {
    heading: 'Who should be responsible for what',
    body: [
      'Decide in writing who handles each task: your team may update content and answer enquiries, while the developer handles updates, backups and security. Without an owner, maintenance silently falls to nobody.',
      'Consider a simple support arrangement with your developer, with a monthly or yearly fee covering updates and a few hours of changes. It is usually cheaper and calmer than emergency repairs, and it keeps your site secure and current.',
    ],
  },
  'domain-name-tips-for-indian-businesses': {
    heading: 'Protecting your domain after you buy it',
    body: [
      'Turn on auto-renew and keep a payment method that does not expire. Enable registrar lock to prevent unauthorised transfers and protect the account with a strong password and two-step verification. Use an email address you will always have access to for the registrant contact.',
      'Keep a note of where the domain is registered, where DNS is managed and who has access. A domain that lapses or is stuck with a former freelancer can take a website and email offline, so treat it as a valuable business asset.',
    ],
  },
  'cms-vs-custom-admin-panel-for-small-business': {
    heading: 'What a good admin panel should let you do',
    body: [
      'Whatever platform you choose, test the editing experience before you commit. You should be able to change text, replace images, add a project and read enquiries without help and without breaking the layout. A panel that needs a manual is probably too complicated.',
      'Also check practical safeguards: role-based access so staff only see what they need, a way to preview changes before publishing and backups you can rely on. These features matter more over three years than a long list of extras.',
    ],
  },

  // SEO
  'what-is-seo-beginners-guide-india': {
    heading: 'A simple first-month SEO plan',
    body: [
      'In week one, set up Google Search Console and analytics, and write down your top five services and the phrases customers use for them. In week two, give each service its own page with a clear title, heading and description of what you offer and who it is for.',
      'In week three, complete your Google Business Profile and ask three happy customers for reviews. In week four, publish one helpful guide answering a common question and link it to the relevant service page. Repeat the cycle monthly and review progress in Search Console.',
    ],
  },
  'keyword-research-for-small-business': {
    heading: 'Judging keyword difficulty without paid tools',
    body: [
      'Search your target phrase and look at the first page. If it is dominated by large directories, national brands and news sites, the phrase is hard. If you see small business sites and thin pages, you have a chance. Check whether the ranking pages truly match the intent, as mismatches are opportunities.',
      'Look at the strength of those pages as well: are they specific, up to date and well structured? If you can create a clearly better, more useful page for a defined audience, even a competitive phrase may be within reach over time.',
    ],
  },
  'on-page-seo-checklist': {
    heading: 'Auditing an existing page in twenty minutes',
    body: [
      'Open the page and read the title and description in a search preview. Ask whether they are accurate, unique and tempting. Then scan the headings: do they outline the content logically? Next, look for what is missing, such as price guidance, FAQs or examples, by comparing with the top three results.',
      'Finally, check the technical basics: mobile layout, speed, image sizes, internal links to and from the page and its presence in the sitemap. Make a short list of changes, implement them and note the date so you can compare performance later.',
    ],
  },
  'technical-seo-basics-explained': {
    heading: 'Crawl budget and why small sites should care a little',
    body: [
      'Google decides how many pages to fetch from your site and how often. For a new or small site, this allowance is modest. Wasting it on duplicate pages, redirect loops, parameters and low-value pages slows the discovery of the pages that matter.',
      'Keep your structure tidy: link to important pages prominently, avoid creating many thin pages and make sure your sitemap lists only canonical, working addresses. A clean site is easier for Google to understand and quicker to index.',
    ],
  },
  'discovered-currently-not-indexed-fix': {
    heading: 'Signals that raise a page\'s priority',
    body: [
      'Google prioritises pages that appear important and useful. Links from your home page and main navigation signal importance. External mentions, such as a profile link from a directory or a social post that draws real visits, add further signals. Fresh, specific content shows the page is worth fetching.',
      'Avoid creating pages just to fill the sitemap. If a page offers nothing distinct, merge it into a stronger page and redirect the old address. A smaller set of useful pages usually gets indexed faster than a large set of weak ones.',
    ],
  },
  'backlinks-for-small-business-websites': {
    heading: 'Outreach that people actually answer',
    body: [
      'Generic emails asking for a link are ignored. Instead, find a page that your resource genuinely improves, tell the owner specifically how and offer it without pressure. Short, personal and useful messages have a much better response than templates.',
      'Build relationships before asking. Comment thoughtfully, share their work and introduce yourself over time. Many valuable links come from people who already know and trust you, which is why consistent, honest work is the best link-building strategy.',
    ],
  },
  'how-to-write-seo-friendly-blog-posts': {
    heading: 'Structure that helps readers and search engines',
    body: [
      'Open with a short answer or summary so readers know they are in the right place. Use descriptive headings that could stand alone as a table of contents. Break up long sections with lists, examples or small tables, and end with a clear next step.',
      'Add internal links where they genuinely help, such as to a service page when you mention the service. Use descriptive anchor text instead of "click here". A well-structured article is easier to skim, share and understand, which supports both engagement and rankings.',
    ],
  },
  'schema-markup-for-small-business': {
    heading: 'A sensible order for adding schema',
    body: [
      'Begin with Organization or LocalBusiness and WebSite on every page, then add BreadcrumbList for navigation. Next add Service schema on service pages and Article or BlogPosting on guides. Add FAQPage only when a page has visible questions and answers.',
      'Keep the markup generated from the same data as the visible content so they never disagree. After each release, spot-check a few pages in the Rich Results Test and monitor warnings in Search Console. Small, accurate markup beats extensive but inaccurate markup.',
    ],
  },
  'seo-mistakes-that-hurt-rankings': {
    heading: 'Mistakes that look like progress',
    body: [
      'Some activities feel productive but achieve little: publishing many short posts without a plan, chasing vanity keywords, constantly tweaking titles or buying cheap link bundles. They consume time and can even create risks.',
      'Prefer fewer, deeper pages that answer important questions, supported by a clean technical base and a Google Business Profile. Review the data monthly, change one thing at a time and give each change a few weeks before judging it.',
    ],
  },
  'how-to-measure-seo-results': {
    heading: 'Connecting SEO to revenue',
    body: [
      'Ask every new customer how they found you and record the answer. Add the same question to your enquiry form. Compare with analytics to see how many leads started in organic search, and keep a simple sheet of enquiries, quotes and wins by source.',
      'Over a few months you can estimate the value of an organic enquiry and the revenue it brings. That figure helps you decide how much to invest in content and optimisation, and it makes SEO conversations with partners or management much clearer.',
    ],
  },

  // local SEO
  'google-business-profile-setup-guide': {
    heading: 'Using attributes, services and Q&A',
    body: [
      'Beyond the basics, add attributes that describe your business, such as online appointments, wheelchair access or languages spoken. These small details help searchers choose and can match filters in results. List each service with a short description so your profile mirrors what customers search for.',
      'Seed the questions and answers section with real frequently asked questions, such as pricing, timing and service area, and answer new questions promptly. This content appears directly in your listing and reduces uncertainty before the customer calls.',
    ],
  },
  'how-to-get-more-google-reviews': {
    heading: 'Building reviews into your normal workflow',
    body: [
      'Make asking for a review one of the last steps of delivering a job. Add it to your project checklist, your invoice template and your follow-up message. When it is part of the process, it happens consistently instead of when you remember.',
      'Review your reviews monthly: look for themes customers mention, such as speed or communication, and reflect them in your website copy. Real language from customers is often the most persuasive content you can use.',
    ],
  },
  'nap-consistency-local-citations': {
    heading: 'Dealing with duplicates and old listings',
    body: [
      'Search for your business name, old addresses and phone numbers in Google and find stray listings. For each duplicate, claim or request removal through the platform. Avoid creating new profiles to replace old ones, since that can multiply the problem.',
      'If you have moved, update the primary listings first, such as Google Business Profile and your website, then work through directories in order of visibility. Keep a spreadsheet showing each listing, the login used and the date you updated it.',
    ],
  },
  'local-landing-pages-multiple-cities': {
    heading: 'A checklist for each city page',
    body: [
      'Before publishing a city page, confirm that it has an original introduction, at least one local example, a relevant testimonial, local contact details and a clear call to action. Check that the title and heading are unique and that the page links to your main service page and to the contact page.',
      'After a month, review the page in Search Console for impressions and queries. If it attracts none, improve the content or merge it. Pages should earn their place by serving real customers rather than existing only to catch keywords.',
    ],
  },
  'near-me-searches-how-to-rank': {
    heading: 'Photos, posts and activity signals',
    body: [
      'Active profiles tend to perform better. Add new photos regularly, post offers or updates and respond to questions. Customers see freshness and trust it, and it signals to Google that your listing is maintained.',
      'Encourage customers to add photos with their reviews. Real, varied images of your premises and work give searchers a sense of what to expect and often increase clicks and calls compared with listings that only show a logo.',
    ],
  },
  'seo-for-service-businesses-in-rajasthan': {
    heading: 'Working with seasonal demand and regional events',
    body: [
      'Rajasthan\'s calendar includes tourism seasons, wedding months and regional festivals that change demand for services such as photography, design, printing and hospitality marketing. Plan content two or three months ahead so pages are indexed and ready when searches rise.',
      'After each season, review which queries, pages and profiles produced enquiries and update them with new photos and examples. A yearly cycle of preparation, promotion and review builds a compounding advantage over competitors who start only when demand arrives.',
    ],
  },
  'seo-for-ahmedabad-businesses': {
    heading: 'Standing out with proof and specifics',
    body: [
      'In a busy market, specifics win. Mention the neighbourhoods you serve, the sectors you know and the typical timelines and costs. Show named clients and photographs of real work. Specific pages are more useful to readers and are more likely to match the long phrases people type.',
      'Keep response speed high. Many local customers contact several businesses at once and choose the first helpful reply. A short, friendly answer within an hour, with clear next steps, can beat a more polished but slower competitor.',
    ],
  },
  'local-seo-mistakes-small-businesses-make': {
    heading: 'Setting up a simple monitoring routine',
    body: [
      'Check your profile once a week for unexpected edits, which can happen when users suggest changes. Review insights monthly and note calls, direction requests and website clicks. Record changes you make so you can connect them with shifts in performance.',
      'Search your main service and city from a phone every month and capture a screenshot. Over time, these snapshots show how competitors appear and whether your efforts are moving you into the local pack.',
    ],
  },

  // branding
  'what-is-branding-for-small-business': {
    heading: 'A one-hour brand audit you can do today',
    body: [
      'Gather your website, social profiles, visiting card, invoice, proposal template and signboard. Place them side by side and ask three questions: do they look like the same business, do they say the same thing and would a stranger understand what we do?',
      'Note every inconsistency in logos, colours, fonts and wording. Then rank the fixes by visibility. Usually the website, Google profile and social avatars come first. A brief audit often reveals that better consistency alone improves how professional your business appears.',
    ],
  },
  'how-to-choose-a-business-name': {
    heading: 'Naming mistakes to avoid',
    body: [
      'Avoid names that are hard to spell, too similar to a bigger competitor or tied to a single product you may outgrow. Be careful with trendy word fragments that will date quickly and with names that cannot be turned into a clean domain or social handle.',
      'Also avoid choosing by committee on gut feeling alone. Use your criteria, test with real customers and sleep on the final decision. A name you still like after two weeks of use is usually a good one.',
    ],
  },
  'logo-design-process-explained': {
    heading: 'How to judge a logo concept',
    body: [
      'Squint at the logo, shrink it to the size of a thumbnail and view it in black and white. A strong mark remains recognisable. Then place it on your website header, a social avatar, a visiting card and a signboard mock-up to see how it behaves in context.',
      'Ask whether it feels right for your customers rather than for you, and whether it is distinctive within your category. Resist designs that follow a passing trend; timeless simplicity tends to age better and cost less to reproduce.',
    ],
  },
  'brand-colour-psychology-for-business': {
    heading: 'Colour in practice across touchpoints',
    body: [
      'Decide where each colour appears: the primary colour for buttons and key headings, the secondary for backgrounds and highlights, and neutrals for text. Use the same system on your website, social posts and print so people link the colours with you.',
      'Check how colours behave in dark mode and on low-quality screens, and prepare a print version using CMYK or Pantone values. Test small samples of printed materials before approving a large run, since printed colour can differ noticeably from screens.',
    ],
  },
  'how-to-create-a-brand-style-guide': {
    heading: 'Examples of useful rules',
    body: [
      'Good rules are specific: "Keep clear space equal to the height of the P around the logo", "Headings use the brand font in sentence case", "Photos show real people at work, never staged handshakes". Rules like these can be followed without a designer in the room.',
      'Include a few do and do not examples with images, and a short list of words you use and avoid. When people can see the difference between on-brand and off-brand, they stop guessing and consistency improves quickly.',
    ],
  },
  'brand-voice-and-tone-guide': {
    heading: 'Examples of the same message in different tones',
    body: [
      'Take a delay announcement. In a confident, friendly voice: "Your order will reach you two days later than planned. We are sorry, and here is what we are doing to make it right." In a formal tone for a contract: "Delivery is revised to the new date stated below."',
      'The facts are the same, but tone adapts to the setting. Writing two or three of these examples for your own situations gives your team a practical reference, much better than abstract adjectives alone.',
    ],
  },
  'rebranding-when-and-how': {
    heading: 'Measuring whether a rebrand worked',
    body: [
      'Set measures before you start: brand search volume, direct visits, enquiry quality, social engagement and team feedback. After launch, compare over three to six months, allowing for seasonal factors. Ask customers what they think and watch for confusion.',
      'Be prepared to adjust details. Many rebrands need small refinements after real-world use, such as improving contrast or simplifying a layout. Treat the launch as the beginning of learning rather than the end of the project.',
    ],
  },
  'brand-positioning-statement-examples': {
    heading: 'Testing your positioning with customers',
    body: [
      'Read your statement aloud to five customers and ask them to repeat it in their own words. If their version differs from yours, the message is unclear or does not matter to them. Ask what they would compare you with and why they chose you.',
      'Use their answers to sharpen your wording. Customers often reveal the benefit that matters most, which may differ from what you assumed. Positioning is strongest when it reflects real reasons people choose you.',
    ],
  },
  'packaging-design-tips-small-brands': {
    heading: 'Budget-friendly packaging upgrades',
    body: [
      'You do not need custom boxes to create a memorable unboxing. Branded stickers, tissue paper, a printed thank-you card and consistent colours can transform plain packaging at low cost. Focus on one touch that customers will notice and photograph.',
      'As volumes grow, move to custom printed packs. Negotiate quantities and test with a small batch first. Packaging improvements pay back through repeat orders, reviews and social shares, especially when your design and branding feel consistent.',
    ],
  },
  'brand-consistency-across-website-social-print': {
    heading: 'A quick consistency checklist',
    body: [
      'Check that the logo is the same version everywhere, colours match brand values, fonts are consistent and the tone of voice sounds like one person. Confirm that your business name, address and phone are identical across your website, directories and social profiles.',
      'Finally, verify that your best content is easy to find: your top services, proof and contact details. Consistency is not only visual; it is also about telling the same story in the same way wherever people meet you.',
    ],
  },

  // UI/UX
  'ui-vs-ux-difference-explained': {
    heading: 'How the two roles work together on a real project',
    body: [
      'On a typical project, UX work comes first: understanding users, mapping the pages and sketching wireframes to settle structure. UI follows: applying colours, typography and polished components to the agreed structure. The two overlap as testing shows what needs to change.',
      'A good team shares a language and tests early. Changes to structure are cheap in a wireframe and expensive in finished code, which is why starting with experience decisions saves time and money overall.',
    ],
  },
  'website-navigation-best-practices': {
    heading: 'Testing your navigation with a simple tree test',
    body: [
      'Write down your site structure as a list, then ask five people where they would look to find specific things, such as pricing or a particular service. Count how often they choose the right place first.',
      'If many people choose wrongly, rename or regroup the menu items. This takes less than an hour and works before any design is done. It is a cheap way to catch confusing labels and missing pages early.',
    ],
  },
  'contact-form-design-tips': {
    heading: 'Writing form microcopy that reassures',
    body: [
      'Small bits of text can raise completion. Under the phone field, explain "Only used to reply to your enquiry". Next to the message field, add an example such as "Tell us about your business and what you need". Under the button, say how quickly you will respond.',
      'Keep wording friendly and specific, avoiding legal-sounding language. After submission, offer an alternative such as a WhatsApp link for urgent questions, so visitors who want faster contact can have it immediately.',
    ],
  },
  'call-to-action-button-examples': {
    heading: 'Examples for different types of business',
    body: [
      'A web agency might use "Get a free quote" or "See our work". A clinic might use "Book an appointment" or "Call now". A shop might use "Add to cart" or "Order on WhatsApp". A consultant might use "Book a 15-minute call".',
      'Each example names an action and implies a benefit. Choose the wording that matches how ready your visitor is. For first-time visitors, a lower-commitment action such as "See pricing" can work better than "Buy now".',
    ],
  },
  'website-accessibility-for-small-business': {
    heading: 'Accessibility checks to include in every release',
    body: [
      'Add a short accessibility check to your launch routine: test keyboard navigation, check heading order, verify colour contrast on new components, confirm images have alt text and try a screen reader on the key journey. Fix problems before publishing.',
      'Document the decisions so future updates keep the standard. Accessible practices cost little when they are part of the process and expensive when they must be retrofitted. They also improve overall quality for every visitor.',
    ],
  },
  'user-research-for-small-business-websites': {
    heading: 'Questions that reveal real needs',
    body: [
      'Ask open questions about the past, not hypotheticals: "Tell me about the last time you looked for a service like this", "What did you compare?" and "What nearly stopped you?" Stories are more reliable than opinions about what people might do.',
      'Avoid leading questions and resist explaining your site during tests. Silence is useful; the points where people struggle are exactly what you need to learn. Record what you hear in a shared note and look for patterns after each round.',
    ],
  },
  'landing-page-design-checklist': {
    heading: 'Typical landing page mistakes',
    body: [
      'Frequent mistakes include vague headlines, too many competing buttons, long forms, stock photos that do not show the product, slow loading and ignoring mobile layout. Another is sending all ad traffic to the home page instead of a focused page.',
      'Fix these by matching the ad message, simplifying the page and testing on a phone. A concise, relevant page that loads fast usually beats a long, beautiful page that makes visitors search for the action.',
    ],
  },
  'typography-for-websites-font-pairing': {
    heading: 'Examples of pairings and when they work',
    body: [
      'A geometric sans-serif heading with a neutral sans-serif body feels modern and clean, suitable for technology and creative services. A serif heading with a sans-serif body feels editorial and trustworthy, suiting consultants and publishers.',
      'Whichever you choose, test with real content, including long headings, numbers and your languages. Fonts look different with real text than with placeholder words, so judge the pairing in the actual layout.',
    ],
  },
  'whitespace-and-layout-principles': {
    heading: 'Spacing mistakes to look for',
    body: [
      'Typical issues include inconsistent gaps between sections, text touching container edges, cramped buttons and images placed without alignment to anything. Another is excessive space on mobile that pushes key content far down.',
      'Review each page by scrolling slowly and noticing where your eye stumbles. Where it does, adjust spacing so related items are closer together and unrelated groups are clearly separated.',
    ],
  },
  'microinteractions-and-animation-in-web-design': {
    heading: 'A short animation checklist before launch',
    body: [
      'Confirm that important content appears immediately and is not delayed by animation. Check that motion is smooth on a mid-range phone, that reduced motion preferences are respected and that nothing flashes rapidly. Remove any animation that you cannot explain a purpose for.',
      'Measure page speed with and without the effects. If an effect costs noticeable load time or responsiveness, simplify it. Purposeful, lightweight motion adds polish without sacrificing performance.',
    ],
  },
};
