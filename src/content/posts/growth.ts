import type { RawPost } from './types';

export const GROWTH: RawPost[] = [
  {
    slug: 'lead-generation-for-small-business-website',
    title: 'Lead Generation for Small Business Websites: A Simple System That Works',
    description: 'Turn website visitors into enquiries: offers, forms, WhatsApp, follow-up routines and tracking for small Indian businesses.',
    keywords: ['lead generation', 'small business lead generation', 'website enquiries', 'convert visitors to leads'],
    intro: 'Traffic alone does not pay the bills. A lead generation system makes sure the visitors you already have can easily become conversations, and that you follow up before they cool off.',
    sections: [
      {
        heading: 'Make one clear offer',
        body: [
          'Visitors hesitate when they are not sure what you want from them. Offer one next step that carries little risk: a free quote, a quick call, a short audit or a sample. Name it clearly and repeat it consistently across your pages.',
        ],
      },
      {
        heading: 'Give people several ways to reach you',
        body: ['Different customers prefer different channels.'],
        list: [
          'A short enquiry form with three or four fields.',
          'Click-to-call for mobile visitors.',
          'A WhatsApp button with a pre-filled message.',
          'A visible email address for formal enquiries.',
        ],
      },
      {
        heading: 'Add proof where doubts appear',
        body: [
          'Place testimonials, client logos or results near the call to action. Mention your response time and a guarantee if you can honour it. Small trust cues reduce hesitation more than extra features.',
        ],
      },
      {
        heading: 'Respond fast and follow up',
        body: [
          'Enquiries that get a reply within an hour convert far better than those answered the next day. Set notifications for new leads and prepare short reply templates. Follow up two or three times over a week, politely, with something useful each time.',
        ],
      },
      {
        heading: 'Track where leads come from',
        body: [
          'Record the source of each enquiry: search, social, referral or ads. Use analytics goals and tagged links. Double down on the sources that bring serious customers. See our guides on [contact forms](/blog/contact-form-design-tips) and [landing pages](/blog/landing-page-design-checklist), or ask our [SEO team](/services/seo) to set up tracking.',
        ],
      },
    ],
    faq: [
      { q: 'How many enquiries should a website get?', a: 'It depends on traffic and conversion rate. Many service sites convert one to five percent of visitors.' },
      { q: 'Should I gate content behind forms?', a: 'For small businesses, simple enquiry offers usually work better than long gated downloads.' },
      { q: 'What is a lead magnet?', a: 'A free resource, like a checklist or audit, offered in exchange for contact details.' },
    ],
  },
  {
    slug: 'google-analytics-4-setup-for-small-business',
    title: 'Google Analytics 4 Setup for Small Business: Events and Goals That Matter',
    description: 'Set up GA4 properly: create a property, install tracking, mark key events as conversions, link Search Console and read your first reports.',
    keywords: ['Google Analytics 4 setup', 'GA4 conversions', 'track form submissions', 'link Search Console GA4'],
    intro: 'Analytics tells you what happens after someone arrives. A basic but correct GA4 setup shows which channels bring enquiries and which pages need help.',
    sections: [
      {
        heading: 'Create the property and install tracking',
        body: [
          'Create a GA4 property for your website and add the measurement ID to your site. Many modern frameworks have a simple way to include it, loading after the page content so it does not slow pages. Verify with the Realtime report by opening your site in another tab.',
        ],
      },
      {
        heading: 'Decide what counts as success',
        body: ['Choose the actions that represent business value.'],
        list: [
          'Contact form submissions.',
          'Clicks on call buttons and WhatsApp links.',
          'Clicks on email links.',
          'Visits to a thank-you or pricing page.',
        ],
      },
      {
        heading: 'Mark events as key events',
        body: [
          'GA4 records many interactions as events. Mark the important ones as key events (conversions) so reports highlight them. For forms, trigger an event on successful submission rather than on the button click, otherwise failed submissions are counted as enquiries.',
        ],
      },
      {
        heading: 'Connect Search Console',
        body: [
          'Link GA4 with Search Console to see queries and landing pages alongside behaviour data. Then you can learn which searches lead to enquiries, not just visits. It takes a couple of minutes under property settings.',
        ],
      },
      {
        heading: 'Read three reports monthly',
        body: [
          'Look at acquisition (where visitors come from), landing pages (where they start) and key events by source. Ignore the rest until you need them. Pair analytics with the [SEO metrics guide](/blog/how-to-measure-seo-results) and let our [team](/services/seo) install tracking correctly. Respect privacy by informing visitors of tracking in a policy.',
        ],
      },
    ],
    faq: [
      { q: 'Is GA4 free?', a: 'Yes, the standard version is free and suitable for most small businesses.' },
      { q: 'Do I need a cookie banner?', a: 'Requirements depend on your audience and laws that apply. Include a clear privacy policy and take advice for regulated markets.' },
      { q: 'Why do my numbers differ from Search Console?', a: 'They measure different things: Search Console counts search clicks, GA4 counts sessions on your site.' },
    ],
  },
  {
    slug: 'email-marketing-for-small-business-india',
    title: 'Email Marketing for Small Businesses in India: Start with a Small, Useful List',
    description: 'Build an email list and send messages people value: sign-up offers, welcome emails, newsletter ideas, deliverability and measuring results.',
    keywords: ['email marketing India', 'email newsletter small business', 'build email list', 'email deliverability'],
    intro: 'Email remains one of the most reliable ways to reach people who already know you. Unlike social platforms, your list belongs to you and is not at the mercy of an algorithm.',
    sections: [
      {
        heading: 'Build the list with permission',
        body: [
          'Collect addresses with a clear promise: what people will receive and how often. Offer something useful, such as a checklist or occasional tips. Never buy lists; they damage your sender reputation and may breach privacy expectations.',
        ],
      },
      {
        heading: 'Send a welcome email',
        body: [
          'The first message is read most. Thank the subscriber, deliver what you promised, introduce your business in a few lines and invite them to reply. A short sequence of three to five emails over two weeks can explain your services and share proof.',
        ],
      },
      {
        heading: 'Ideas for regular emails',
        body: ['Keep content helpful rather than purely promotional.'],
        list: [
          'A tip or short guide linked to a blog post.',
          'A recent project with the story behind it.',
          'Answers to customer questions.',
          'Seasonal offers with clear dates.',
          'Behind-the-scenes updates.',
        ],
      },
      {
        heading: 'Protect deliverability',
        body: [
          'Send from your own domain, set up SPF, DKIM and DMARC records, keep your list clean and make unsubscribing easy. Avoid spammy phrases and excessive images. Consistent sending rhythm helps inbox providers trust you.',
        ],
      },
      {
        heading: 'Measure and improve',
        body: [
          'Track open rates, clicks and replies, but focus on enquiries and sales traced to email. Test subject lines and send times gradually. Use the list to promote your best [guides](/blog) and offers, and connect it with your [lead generation](/blog/lead-generation-for-small-business-website) routine. Ask our [team](/contact) for help with setup.',
        ],
      },
    ],
    faq: [
      { q: 'How often should I email?', a: 'Once or twice a month is a safe start for small businesses. Increase only if you have valuable content.' },
      { q: 'Which email tool should I use?', a: 'Choose a reputable service with a free or low-cost plan that supports unsubscribe handling and authentication.' },
      { q: 'Is email better than WhatsApp?', a: 'They serve different purposes. Email suits longer updates and formal communication, WhatsApp suits quick conversations.' },
    ],
  },
  {
    slug: 'google-ads-vs-seo-which-first',
    title: 'Google Ads vs SEO: Which Should a New Business Start With?',
    description: 'Compare Google Ads and SEO on cost, speed, control and long-term value, and see how to combine them for a new or growing business.',
    keywords: ['Google Ads vs SEO', 'paid search vs organic', 'PPC for small business', 'should I do SEO or ads'],
    intro: 'Both channels reach people searching for what you offer. They differ in how quickly they start, how they are paid and what happens when you stop.',
    sections: [
      {
        heading: 'Speed and control',
        body: [
          'Ads can bring visitors the day you launch and let you control budget, location and timing. SEO takes weeks or months to build momentum but then keeps delivering without paying per click.',
        ],
      },
      {
        heading: 'Cost over time',
        body: [
          'Ads cost money for every click, and prices rise in competitive categories. SEO costs effort and often agency fees upfront, but the cost per visitor typically falls as pages mature. Stopping ads stops traffic immediately; ranking pages continue to earn visitors.',
        ],
      },
      {
        heading: 'When to start with ads',
        body: ['Ads suit specific situations.'],
        list: [
          'You need leads quickly, such as a new launch.',
          'You are testing which offers and phrases convert.',
          'Your business is seasonal with a short selling window.',
          'Your website is new and has no authority yet.',
        ],
      },
      {
        heading: 'When to start with SEO',
        body: [
          'SEO suits steady, long-term demand and businesses with higher customer value. It builds an asset, supports trust (many users prefer organic results) and gives lower cost per lead over time. Local services often benefit greatly from a strong Google Business Profile.',
        ],
      },
      {
        heading: 'Combine them intelligently',
        body: [
          'Use ads to learn which phrases and landing pages convert, then invest in SEO for those. Ensure your site is fast and your landing pages clear before spending on either. Review the budget quarterly. Learn more about our [SEO service](/services/seo), or read about [landing pages](/blog/landing-page-design-checklist) and [measuring results](/blog/how-to-measure-seo-results).',
        ],
      },
    ],
    faq: [
      { q: 'How much do Google Ads cost?', a: 'It varies by industry and competition. You set a daily budget and pay per click, so start small and measure.' },
      { q: 'Can I do both together?', a: 'Yes. Many businesses use ads for speed and SEO for long-term growth.' },
      { q: 'Which has better ROI?', a: 'SEO often has a better long-term return, while ads can be profitable immediately if conversion is strong.' },
    ],
  },
  {
    slug: 'conversion-rate-optimisation-basics',
    title: 'Conversion Rate Optimisation Basics: Get More Enquiries From the Traffic You Have',
    description: 'A beginner\'s guide to CRO: measuring conversion rate, finding friction, running simple tests and prioritising changes for service websites.',
    keywords: ['conversion rate optimization', 'CRO basics', 'increase website conversions', 'A/B testing small business'],
    intro: 'Conversion rate is the share of visitors who take the action you want. Improving it is often cheaper than buying more traffic, because you make better use of every visit.',
    sections: [
      {
        heading: 'Measure your starting point',
        body: [
          'Divide enquiries by visits for a period. If 1,000 visitors produce 15 enquiries, your rate is 1.5 percent. Measure separately for mobile and desktop, and for different traffic sources, because averages hide problems.',
        ],
      },
      {
        heading: 'Find the friction',
        body: ['Look for the places visitors hesitate or leave.'],
        list: [
          'Pages with high exit rates in analytics.',
          'Forms with many abandonments.',
          'Slow pages on mobile.',
          'Unclear headlines or buttons.',
          'Missing answers to price, timing or process questions.',
        ],
      },
      {
        heading: 'Prioritise changes',
        body: [
          'List ideas and score each for expected impact, confidence and effort. Start with fast, high-impact changes such as rewriting the headline, shortening the form or adding testimonials near the button. Avoid redesigning everything at once.',
        ],
      },
      {
        heading: 'Test carefully',
        body: [
          'A/B testing compares two versions. It needs enough traffic to be reliable, which many small sites lack. In that case, make a change, wait a few weeks and compare against the previous period, noting any seasonal differences.',
        ],
      },
      {
        heading: 'Keep improving',
        body: [
          'CRO is a habit: review, change, measure. Small gains compound. Combine it with strong [website content](/blog/website-content-writing-guide) and [clear calls to action](/blog/call-to-action-button-examples). Our [UI/UX team](/services/ui-ux-design) can audit your site for conversion barriers.',
        ],
      },
    ],
    faq: [
      { q: 'What is a good conversion rate?', a: 'It varies widely. Many service websites see roughly one to five percent, so compare against your own history.' },
      { q: 'How long should a test run?', a: 'Long enough to gather meaningful data and cover weekly patterns, usually at least two to four weeks.' },
      { q: 'Should I fix traffic or conversion first?', a: 'If conversion is very low, fix it first so extra traffic is not wasted.' },
    ],
  },
  {
    slug: 'google-search-console-guide-for-beginners',
    title: 'Google Search Console for Beginners: Set Up, Read Reports and Fix Issues',
    description: 'A beginner-friendly guide to Search Console: verification, sitemaps, performance report, indexing, URL inspection and monthly checks.',
    keywords: ['Google Search Console', 'Search Console setup', 'submit sitemap', 'URL Inspection tool'],
    intro: 'Search Console is Google\'s free dashboard showing how your site appears in search and whether Google can read it. It is the single most useful SEO tool for small businesses.',
    sections: [
      {
        heading: 'Add and verify your site',
        body: [
          'Add your website as a property, preferably as a domain property if you control DNS, which covers all versions of the address. Verify by DNS record or an HTML tag. Use the https version consistently with your canonical tags.',
        ],
      },
      {
        heading: 'Submit your sitemap',
        body: [
          'Under Sitemaps, submit the address of your XML sitemap, such as /sitemap.xml. This helps Google discover pages. Make sure every listed address returns a normal page and not a redirect; otherwise you will see "Page with redirect" in the indexing report.',
        ],
      },
      {
        heading: 'Understand the main reports',
        body: ['Four areas cover most needs.'],
        list: [
          '**Performance:** queries, pages, clicks, impressions and positions.',
          '**Pages (indexing):** which pages are indexed and why others are not.',
          '**Experience:** Core Web Vitals and mobile usability.',
          '**Links:** who links to you and your internal link structure.',
        ],
      },
      {
        heading: 'Use URL Inspection',
        body: [
          'Paste a page address to see whether it is indexed, how Google sees it and any problems. After publishing or improving an important page, request indexing. Do this for a few key pages at a time rather than flooding requests.',
        ],
      },
      {
        heading: 'Monthly routine',
        body: [
          'Check performance trends, new indexing issues, enhancements and security messages. Note queries with many impressions but few clicks and improve those page titles. For indexing questions read our guide on [discovered but not indexed pages](/blog/discovered-currently-not-indexed-fix) and consider our [SEO service](/services/seo).',
        ],
      },
    ],
    faq: [
      { q: 'Is Search Console free?', a: 'Yes, it is a free Google service.' },
      { q: 'How long until data appears?', a: 'Performance data typically starts within a few days of verification.' },
      { q: 'Do I need Bing Webmaster Tools too?', a: 'It is worth adding. You can import settings from Search Console easily.' },
    ],
  },
  {
    slug: 'referral-and-word-of-mouth-marketing',
    title: 'Referral and Word-of-Mouth Marketing: Turning Customers into Your Sales Team',
    description: 'Systematise referrals for a small business: when to ask, simple incentives, partner programmes and how to make your work easy to recommend.',
    keywords: ['referral marketing', 'word of mouth marketing', 'customer referral programme', 'partner marketing'],
    intro: 'Referrals are often a small business\'s best leads: warm, trusting and cheap. They rarely happen by accident, though; they need a system.',
    sections: [
      {
        heading: 'Be worth recommending',
        body: [
          'People recommend businesses that make them look good. Deliver on time, communicate clearly and fix problems quickly. A referral is a small reputational risk for the person giving it, so give them confidence.',
        ],
      },
      {
        heading: 'Ask at the right moment',
        body: [
          'The best time is right after a clear win: delivery, a result or a compliment. Say something simple: "If you know anyone who could use this, we would be happy to help them too." Make it easy by giving them a short message to forward or a link.',
        ],
      },
      {
        heading: 'Simple incentives',
        body: ['Rewards can be modest and sincere.'],
        list: [
          'A discount on the next project for each successful referral.',
          'A free small add-on or service.',
          'A thank-you gift handled personally.',
          'A formal commission for regular partners.',
        ],
      },
      {
        heading: 'Build partner relationships',
        body: [
          'Complementary businesses, such as photographers, printers, accountants and consultants, meet your future customers. Agree to refer each other, share case studies and keep partners updated. Mutual referrals build steady pipelines.',
        ],
      },
      {
        heading: 'Make referrals visible online',
        body: [
          'Collect reviews and testimonials, show them on your website and Google profile and track how new customers heard about you. See [how to get more Google reviews](/blog/how-to-get-more-google-reviews) and add a referral note to your [contact page](/contact).',
        ],
      },
    ],
    faq: [
      { q: 'Should I pay for referrals?', a: 'Small thank-you rewards are fine. Check any legal or industry rules that apply.' },
      { q: 'How do I track referrals?', a: 'Add a "How did you hear about us?" field to your form and note it in each enquiry.' },
      { q: 'What if clients forget to refer?', a: 'Remind them gently and share useful updates periodically so you stay on their mind.' },
    ],
  },
  {
    slug: 'content-marketing-plan-for-service-businesses',
    title: 'Content Marketing Plan for Service Businesses: A 90-Day Roadmap',
    description: 'Plan content that attracts customers: topics, formats, calendar, distribution and measurement across three months for a small service business.',
    keywords: ['content marketing plan', 'content strategy small business', '90 day content plan', 'blog topics for service business'],
    intro: 'Content marketing means helping potential customers with information before they are ready to buy, so that you are the business they remember. A simple 90-day plan makes it manageable.',
    sections: [
      {
        heading: 'Month one: foundations',
        body: [
          'Collect the twenty questions customers ask most. Group them into themes: cost, process, comparison, problems. Choose three core pages to improve, usually your main service pages, and write or refresh them so they answer the questions clearly.',
        ],
      },
      {
        heading: 'Month two: publish helpful guides',
        body: ['Create a handful of focused pieces.'],
        list: [
          'One cost or pricing explainer.',
          'One comparison or "how to choose" guide.',
          'One checklist customers can use.',
          'One case study from a real project.',
        ],
      },
      {
        heading: 'Month three: distribute and connect',
        body: [
          'Share each piece on your social channels, in email and by direct message to people who asked the question. Add internal links between guides and service pages so readers move toward enquiries. Turn guides into short videos or carousels.',
        ],
      },
      {
        heading: 'Keep quality high',
        body: [
          'Write from experience: real numbers, examples and photos. Avoid padding. Search engines and readers both reward original information. Update pieces every six months so facts remain accurate.',
        ],
      },
      {
        heading: 'Measure and iterate',
        body: [
          'At day 90, review which pieces earned traffic, enquiries and links. Double down on those themes. Our guide on [SEO-friendly blog posts](/blog/how-to-write-seo-friendly-blog-posts) shows how to write each article, and our [SEO service](/services/seo) can manage a content plan with you.',
        ],
      },
    ],
    faq: [
      { q: 'How often should I publish?', a: 'Two to four quality pieces a month is realistic for most small teams.' },
      { q: 'Do I need a blog?', a: 'A blog is one format. You can also publish guides, videos or case studies. Choose what you can sustain.' },
      { q: 'How long until content brings results?', a: 'Often three to six months, depending on competition and consistency.' },
    ],
  },
  {
    slug: 'online-reputation-management-small-business',
    title: 'Online Reputation Management for Small Businesses: A Practical Playbook',
    description: 'Monitor and improve your online reputation: reviews, search results for your name, social mentions, responding to criticism and building positive proof.',
    keywords: ['online reputation management', 'manage Google reviews', 'brand reputation', 'respond to negative reviews'],
    intro: 'Before contacting you, many customers search your name. What they find in those first results shapes whether they call. Reputation management is simply paying attention and responding well.',
    sections: [
      {
        heading: 'Know what people see',
        body: [
          'Search for your business name in a private window, on mobile and desktop. Note what appears: your website, Google Business Profile, reviews, social profiles, directories and any news. Set up alerts for your brand name so you hear about new mentions.',
        ],
      },
      {
        heading: 'Own your first page',
        body: ['Control as much of the first page as you can with accurate, active profiles.'],
        list: [
          'A clear website with your business name in the title.',
          'A complete Google Business Profile.',
          'Active social profiles with consistent branding.',
          'Reputable directory listings.',
          'Helpful content or press mentions.',
        ],
      },
      {
        heading: 'Respond to criticism calmly',
        body: [
          'Reply publicly within a day or two. Thank the person, acknowledge the issue, state what you will do and invite them to continue privately. Never argue or reveal private details. Readers judge you by how you handle problems.',
        ],
      },
      {
        heading: 'Generate steady positive proof',
        body: [
          'Ask satisfied customers for reviews, share testimonials with permission and publish case studies. A consistent flow of positive feedback naturally pushes occasional negative reviews into perspective.',
        ],
      },
      {
        heading: 'Handle false or abusive content properly',
        body: [
          'Flag reviews that violate platform policies, such as fake or abusive ones, and keep evidence. Avoid threats or paying for removal services that promise miracles. Consult a professional for serious defamation. For best practice see [getting Google reviews](/blog/how-to-get-more-google-reviews) and [local SEO mistakes](/blog/local-seo-mistakes-small-businesses-make).',
        ],
      },
    ],
    faq: [
      { q: 'Can I remove a bad review?', a: 'Only if it violates platform policies. Otherwise respond professionally.' },
      { q: 'How often should I check reviews?', a: 'At least weekly, with notifications turned on for new reviews.' },
      { q: 'Does reputation affect SEO?', a: 'Reviews and brand mentions influence local rankings and click behaviour.' },
    ],
  },
  {
    slug: 'digital-marketing-budget-for-small-business-india',
    title: 'Digital Marketing Budget for Small Businesses in India: How to Allocate It',
    description: 'How much to spend on digital marketing and where: website, SEO, content, social, ads and tools, with example splits for different stages.',
    keywords: ['digital marketing budget India', 'marketing budget small business', 'how much to spend on marketing', 'marketing ROI'],
    intro: 'There is no universal budget, but there is a sensible way to decide. Start from business goals, allocate across a few channels and review results regularly.',
    sections: [
      {
        heading: 'Start with goals and margins',
        body: [
          'Work out how many new customers you need, what each is worth over time and how much you can afford to spend to win one. A customer worth ₹30,000 in profit justifies far more acquisition cost than one worth ₹1,500. Many small businesses reserve a modest share of revenue for marketing and adjust based on growth targets.',
        ],
      },
      {
        heading: 'Fix the foundation first',
        body: [
          'A fast, clear website, Google Business Profile and basic tracking come before ads. Spending on traffic that lands on a weak site wastes money. Fund these essentials first, then add growth channels.',
        ],
      },
      {
        heading: 'A starting allocation',
        body: ['Rough proportions for a service business after the foundation exists.'],
        list: [
          'About 40 percent on SEO and content for long-term growth.',
          'About 25 percent on paid ads to test and capture demand.',
          'About 20 percent on social media and creative.',
          'About 15 percent on tools, tracking and experiments.',
        ],
      },
      {
        heading: 'Test small, scale what works',
        body: [
          'Give each channel a limited trial with a clear success measure such as cost per qualified enquiry. Cut underperformers after a fair test and increase investment in channels that bring customers at an acceptable cost.',
        ],
      },
      {
        heading: 'Review quarterly',
        body: [
          'Revisit goals, results and budget every quarter. Markets and costs change. Consider which tasks to keep in-house and which to outsource. See [Google Ads vs SEO](/blog/google-ads-vs-seo-which-first) and our [SEO services](/services/seo) for options at different budgets.',
        ],
      },
    ],
    faq: [
      { q: 'What percentage of revenue should I spend on marketing?', a: 'It varies by industry and growth stage. Many small businesses spend a single-digit to low double-digit percentage of revenue.' },
      { q: 'Should I hire an agency or a freelancer?', a: 'An agency offers a team of skills, while a freelancer can be cost-effective for focused tasks. Choose on results and fit.' },
      { q: 'How do I know marketing is working?', a: 'Track enquiries, customers and revenue by source, not only traffic or likes.' },
    ],
  },
];
