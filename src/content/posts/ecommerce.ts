import type { RawPost } from './types';

export const ECOMMERCE: RawPost[] = [
  {
    slug: 'how-to-build-an-online-store-in-india',
    title: 'How to Build an Online Store in India: Platform, Payments and Launch Plan',
    description: 'Step-by-step plan for launching an online store in India: choosing a platform, payment gateways, shipping, GST, product pages and launch checks.',
    keywords: ['build online store India', 'ecommerce website India', 'start online business India', 'ecommerce platform comparison'],
    intro: 'Selling online is easier than ever, but launching without a plan leads to abandoned carts and refund headaches. Here is a sequence that keeps the project simple and safe.',
    sections: [
      {
        heading: 'Decide what and how you will sell',
        body: [
          'List your products, variants, prices and stock levels. Decide whether you will ship nationwide or locally and whether you need cash on delivery. Starting with fewer, well-photographed products usually works better than uploading hundreds with weak descriptions.',
        ],
      },
      {
        heading: 'Choose a platform',
        body: ['Compare options by your needs and budget.'],
        list: [
          'Hosted store builders: fast to launch, monthly fees, limited customisation.',
          'Open-source platforms: flexible, require hosting and maintenance.',
          'Custom-built stores: tailored to your workflow, higher upfront cost.',
          'Marketplaces: quick start but you compete directly with others and pay commissions.',
        ],
      },
      {
        heading: 'Set up payments and compliance',
        body: [
          'Choose a reputable payment gateway supporting UPI, cards and net banking. Understand GST registration requirements for your turnover and product type, display prices clearly with taxes and publish required policies: privacy, terms, shipping and returns. Consult an accountant for specifics.',
        ],
      },
      {
        heading: 'Plan shipping and returns',
        body: [
          'Compare courier aggregators for rates, pincode coverage and COD handling. Pack safely, share tracking updates and set a clear returns policy. Delivery experience affects reviews and repeat purchases as much as the product itself.',
        ],
      },
      {
        heading: 'Test thoroughly, then launch',
        body: [
          'Place real test orders on mobile, try each payment method, check emails and invoices and confirm taxes. Make sure product pages are fast and indexable. For store design and SEO support, see our [website design service](/services/website-design-ahmedabad), and read [product page tips](/blog/product-page-design-tips-for-higher-sales) and [payment gateways](/blog/choosing-a-payment-gateway-in-india).',
        ],
      },
    ],
    faq: [
      { q: 'How much does an online store cost in India?', a: 'It ranges from low monthly fees on hosted builders to larger one-time budgets for custom builds. Compare total costs over several years.' },
      { q: 'Do I need GST to sell online?', a: 'Registration depends on turnover, state and product category, and marketplace sellers have specific rules. Confirm with a tax professional.' },
      { q: 'Can I start with WhatsApp ordering?', a: 'Yes, a catalogue with WhatsApp checkout is a low-cost way to validate demand before building a full store.' },
    ],
  },
  {
    slug: 'choosing-a-payment-gateway-in-india',
    title: 'Choosing a Payment Gateway in India: Fees, UPI, Settlement and Security',
    description: 'Compare payment gateways for Indian websites: transaction fees, UPI and card support, settlement time, KYC, refunds and integration effort.',
    keywords: ['payment gateway India', 'UPI payment website', 'online payment integration', 'Razorpay vs PayU'],
    intro: 'The payment gateway sits at the moment of truth: the customer is ready to buy. A poor choice leads to failed payments, delayed settlements and support headaches.',
    sections: [
      {
        heading: 'What a gateway does',
        body: [
          'A payment gateway securely collects customer payment details, communicates with banks and returns a success or failure to your website. It also manages refunds and provides reports. Indian customers expect UPI, cards, net banking and wallets.',
        ],
      },
      {
        heading: 'Compare these factors',
        body: ['Request details in writing from each provider.'],
        list: [
          'Transaction fees for UPI, cards and international payments.',
          'Settlement time, such as T+2, and options for faster payouts.',
          'Setup fees, annual charges and minimum volumes.',
          'KYC and documentation needed for your business type.',
          'Refund handling and chargeback support.',
          'Plugin or API quality for your platform.',
        ],
      },
      {
        heading: 'Focus on conversion at checkout',
        body: [
          'Offer popular methods, show them clearly and keep the flow short on mobile. UPI intent flows and saved cards reduce friction. Monitor payment failure rates, and test regularly on different banks and phones.',
        ],
      },
      {
        heading: 'Security and compliance',
        body: [
          'Reputable gateways handle sensitive card data so it does not touch your server, reducing your compliance burden. Never store card numbers yourself. Use HTTPS, keep your store software updated and verify payment confirmation on the server side before marking an order paid.',
        ],
      },
      {
        heading: 'Plan for reconciliation',
        body: [
          'Match gateway settlements with orders and keep reports for accounting. Set up webhooks for reliable status updates. For integration support see our [web app and store work](/services/website-design-ahmedabad), and start with the [online store guide](/blog/how-to-build-an-online-store-in-india).',
        ],
      },
    ],
    faq: [
      { q: 'Are payment gateway fees negotiable?', a: 'For higher volumes, yes. Ask about custom pricing once you have consistent sales.' },
      { q: 'Do I need a current account?', a: 'Many gateways require a business bank account, though requirements vary by provider and business type.' },
      { q: 'How long does onboarding take?', a: 'Often a few days to a couple of weeks depending on documents and verification.' },
    ],
  },
  {
    slug: 'product-page-design-tips-for-higher-sales',
    title: 'Product Page Design Tips for Higher Sales: Photos, Copy, Trust and Speed',
    description: 'Improve ecommerce product pages: image quality, descriptions, price display, reviews, shipping info, FAQs, mobile layout and structured data.',
    keywords: ['product page design', 'ecommerce conversion tips', 'product description writing', 'product schema'],
    intro: 'Product pages do the selling in an online store. Customers cannot touch your product, so the page must replace the experience with clear images, honest details and visible trust.',
    sections: [
      {
        heading: 'Photography that sells',
        body: [
          'Use several sharp images from different angles, a photo showing scale or use, and a close-up of texture or details. Consistent backgrounds and lighting look professional. Compress images so pages stay fast on mobile.',
        ],
      },
      {
        heading: 'Descriptions that answer questions',
        body: ['Go beyond the manufacturer text.'],
        list: [
          'Lead with the main benefit in plain language.',
          'List materials, dimensions, weight and care instructions.',
          'Explain who the product suits and who it does not.',
          'Add a short FAQ for common concerns.',
          'Use original wording instead of copied supplier text.',
        ],
      },
      {
        heading: 'Show price, delivery and returns clearly',
        body: [
          'Hidden shipping costs are the top reason for abandoned carts. Show the total cost early, delivery time estimates and the return policy near the buy button. Offer pincode checks if delivery varies.',
        ],
      },
      {
        heading: 'Reviews and social proof',
        body: [
          'Display genuine customer reviews with photos where possible. Respond to critical feedback. Add trust badges for secure payments only if they are real. A handful of detailed reviews is more persuasive than many vague ones.',
        ],
      },
      {
        heading: 'Technical details for search',
        body: [
          'Use a unique title and description for each product, descriptive URLs and Product structured data with price, availability and ratings that match the visible page. Make sure variants do not create duplicate pages. See our [schema markup guide](/blog/schema-markup-for-small-business) and [on-page SEO checklist](/blog/on-page-seo-checklist).',
        ],
      },
    ],
    faq: [
      { q: 'How many photos should a product have?', a: 'Four to eight, covering angles, details and context, depending on the product.' },
      { q: 'Should I show stock levels?', a: 'Yes, if accurate. Low-stock messages can help decisions but must be genuine.' },
      { q: 'Is video useful on product pages?', a: 'Short demonstration videos can raise confidence, especially for products that need explanation.' },
    ],
  },
  {
    slug: 'ecommerce-seo-checklist',
    title: 'Ecommerce SEO Checklist: Category Pages, Products, Filters and Duplicates',
    description: 'SEO for online stores: category structure, product URLs, faceted navigation, canonical tags, pagination, internal links and speed.',
    keywords: ['ecommerce SEO', 'category page SEO', 'faceted navigation SEO', 'online store ranking'],
    intro: 'Online stores generate many pages, which makes them both powerful and risky for SEO. Good structure helps the right pages rank; poor structure creates thousands of near-duplicates.',
    sections: [
      {
        heading: 'Plan a clean structure',
        body: [
          'Keep the hierarchy shallow: home, category, subcategory, product. Each important item should be reachable within three clicks. Use descriptive category names that match how customers search, and give category pages real introductory text and helpful buying advice.',
        ],
      },
      {
        heading: 'Handle product pages carefully',
        body: ['Make each product page unique and clear.'],
        list: [
          'Write original titles, descriptions and specifications.',
          'Use a stable, readable URL.',
          'Add structured data for price and availability.',
          'Link to related products and the parent category.',
          'Handle out-of-stock items without deleting the page abruptly.',
        ],
      },
      {
        heading: 'Control filters and duplicates',
        body: [
          'Filters such as colour, size and price can create endless URL combinations. Use canonical tags and noindex rules so that only valuable combinations are indexed, such as "red running shoes", while others consolidate to the main category.',
        ],
      },
      {
        heading: 'Pagination and internal links',
        body: [
          'Ensure paginated pages are crawlable through normal links and that important products are not hidden many pages deep. Add links from guides and blog posts to relevant categories to pass visibility.',
        ],
      },
      {
        heading: 'Speed and mobile',
        body: [
          'Shoppers abandon slow stores quickly. Optimise images, limit scripts and test checkout on mobile. See the [speed fixes](/blog/how-to-speed-up-your-website) and [store launch guide](/blog/how-to-build-an-online-store-in-india). Our [SEO team](/services/seo) can audit your store.',
        ],
      },
    ],
    faq: [
      { q: 'Should I index filter pages?', a: 'Only those with real search demand and unique value. Others should canonicalise to the main category.' },
      { q: 'What about out-of-stock products?', a: 'Keep the page if the product returns, show alternatives and mark availability correctly. Redirect permanently discontinued items to relevant pages.' },
      { q: 'Do category pages need text?', a: 'A short helpful introduction and buying tips improve relevance and conversion.' },
    ],
  },
  {
    slug: 'abandoned-cart-recovery-for-small-stores',
    title: 'Abandoned Cart Recovery for Small Stores: Reasons and Fixes',
    description: 'Why shoppers leave without buying and how to win them back: shipping costs, checkout friction, reminders by email and WhatsApp.',
    keywords: ['abandoned cart', 'cart recovery', 'reduce cart abandonment', 'checkout optimisation'],
    intro: 'Most people who add items to a cart do not complete the purchase. Reducing the reasons they leave is usually more profitable than driving more traffic.',
    sections: [
      {
        heading: 'Why shoppers abandon',
        body: ['Common reasons are consistent across stores.'],
        list: [
          'Unexpected shipping costs or taxes at the end.',
          'Forced account creation.',
          'Long or confusing checkout forms.',
          'Limited payment options or failed payments.',
          'Concerns about security or returns.',
          'Slow pages, especially on mobile.',
        ],
      },
      {
        heading: 'Fix the checkout first',
        body: [
          'Offer guest checkout, ask for the minimum details, support UPI and cash on delivery where suitable, and show the total cost early. Use address autofill and clear error messages. Test the entire flow on a mid-range phone regularly.',
        ],
      },
      {
        heading: 'Build confidence',
        body: [
          'Show delivery estimates, a straightforward return policy and accurate contact details. Display genuine reviews near the buy button. Reassurance at the moment of hesitation can recover many sales.',
        ],
      },
      {
        heading: 'Send helpful reminders',
        body: [
          'If you have permission, send a reminder within a few hours and another a day later by email or WhatsApp. Keep them useful: list the items, answer common questions and offer help. Use a small incentive sparingly so customers do not wait for discounts.',
        ],
      },
      {
        heading: 'Measure and test',
        body: [
          'Track cart-to-purchase rate and where drop-offs occur in the funnel. Change one element at a time. For related ideas see [conversion rate optimisation](/blog/conversion-rate-optimisation-basics) and [WhatsApp marketing](/blog/whatsapp-business-marketing-guide), or talk to our [team](/contact) about checkout improvements.',
        ],
      },
    ],
    faq: [
      { q: 'What is a normal cart abandonment rate?', a: 'Many stores see a majority of carts abandoned, so even small improvements matter.' },
      { q: 'Should I offer discounts in reminders?', a: 'Use them carefully. Start with helpful reminders and test incentives later.' },
      { q: 'Does cash on delivery reduce abandonment?', a: 'It often does in India, though returns and failed deliveries need management.' },
    ],
  },
  {
    slug: 'when-does-a-business-need-a-custom-web-app',
    title: 'When Does a Business Need a Custom Web App Instead of a Website?',
    description: 'Understand the difference between a website and a web application, signs you need a custom portal or dashboard, costs and how to start small.',
    keywords: ['custom web application', 'web app vs website', 'client portal development', 'business dashboard development'],
    intro: 'A website mostly presents information. A web app lets users do things: log in, manage data, book, pay, track or collaborate. Knowing the difference prevents overbuilding and underbuilding.',
    sections: [
      {
        heading: 'Signs you may need a web app',
        body: ['Consider a custom application when you recognise these needs.'],
        list: [
          'Staff or customers need to log in to see personal information.',
          'You manage orders, bookings or inventory in spreadsheets.',
          'Repetitive manual work could be automated.',
          'Several systems need to share data.',
          'Off-the-shelf software forces awkward workarounds.',
        ],
      },
      {
        heading: 'Examples that work well',
        body: [
          'Client portals where customers track projects and download files, booking systems for clinics and salons, internal dashboards for sales and operations, quotation and invoice generators and learning platforms for coaching institutes. Each replaces repeated manual tasks with a simple screen.',
        ],
      },
      {
        heading: 'When off-the-shelf is better',
        body: [
          'If a mature tool already solves your problem at a reasonable price, use it. Custom software makes sense when your process is unique, when integration is needed or when licence costs outgrow a one-time build. Be honest about maintenance, because applications need ongoing support.',
        ],
      },
      {
        heading: 'Start with a minimum version',
        body: [
          'Define the one workflow that causes the most pain and build only that first. Release to a small group, collect feedback and expand. This reduces cost and risk compared with building everything at once.',
        ],
      },
      {
        heading: 'Questions to ask a developer',
        body: [
          'Who owns the code and data? How is it hosted and backed up? What does support cost? How are updates handled? Ask for a clear scope and phased price. Learn about our approach to [dynamic sites](/blog/static-vs-dynamic-website) and [contact us](/contact) to discuss your workflow.',
        ],
      },
    ],
    faq: [
      { q: 'How much does a custom web app cost?', a: 'It depends on features and complexity. A focused first version costs far less than a full system, so start small.' },
      { q: 'How long does it take to build?', a: 'Simple internal tools can take a few weeks; larger systems take months.' },
      { q: 'Can a web app work on mobile?', a: 'Yes. A responsive web app works in the mobile browser and can be installed as a progressive web app.' },
    ],
  },
  {
    slug: 'progressive-web-apps-for-small-business',
    title: 'Progressive Web Apps for Small Business: Is an App-Like Website Worth It?',
    description: 'What a progressive web app is, benefits like offline use and home screen install, limitations and when a PWA beats a native app for small businesses.',
    keywords: ['progressive web app', 'PWA for business', 'PWA vs native app', 'installable website'],
    intro: 'A progressive web app, or PWA, is a website that can behave like an app: installable on the home screen, fast on repeat visits and partly usable offline. For many small businesses, it covers the useful parts of an app without app store costs.',
    sections: [
      {
        heading: 'What makes a PWA',
        body: [
          'It combines a normal website with a web app manifest, which describes the name and icon for installation, and a service worker, a script that caches files and handles offline behaviour. Users can add it to their home screen and open it full screen.',
        ],
      },
      {
        heading: 'Benefits for small businesses',
        body: ['The advantages are practical.'],
        list: [
          'One codebase for all devices, so lower build and upkeep costs.',
          'No app store approval or fees.',
          'Fast repeat loading through caching.',
          'Works on poor connections for cached pages.',
          'Easy updates, since users always get the latest version.',
        ],
      },
      {
        heading: 'Limitations to know',
        body: [
          'Some device features and push notification behaviours differ by platform, and discoverability in app stores is limited. If you need deep hardware access or heavy games, a native app may be better. Check what your audience actually uses before committing.',
        ],
      },
      {
        heading: 'Good use cases',
        body: [
          'Admin dashboards used on phones, catalogue and ordering sites, booking tools, event pages and field-staff tools all benefit. The admin panel of a business website can itself be installed on a phone for quick updates, saving the need for a custom app.',
        ],
      },
      {
        heading: 'Do it without hurting speed',
        body: [
          'Cache wisely, keep the service worker simple and test updates so users do not get stuck on old versions. Combine with solid [mobile design](/blog/mobile-first-web-design-india) and [caching](/blog/website-caching-explained-simply). Our [team](/services/website-design-ahmedabad) can build installable, offline-friendly sites.',
        ],
      },
    ],
    faq: [
      { q: 'Is a PWA the same as a mobile app?', a: 'It feels similar but runs through the browser and is not downloaded from an app store, though it can be installed.' },
      { q: 'Does a PWA help SEO?', a: 'It is still a website, so it can be indexed. Speed and usability benefits help indirectly.' },
      { q: 'Does it work on iPhone?', a: 'Yes, with some feature differences. Test on the devices your audience uses.' },
    ],
  },
  {
    slug: 'booking-and-appointment-website-for-clinics-salons',
    title: 'Booking and Appointment Websites for Clinics, Salons and Coaches',
    description: 'Plan an online booking system for local service businesses: features, calendar sync, reminders, no-show reduction and SEO for service pages.',
    keywords: ['online appointment booking website', 'clinic website booking', 'salon booking system', 'booking form India'],
    intro: 'For appointment-based businesses, every phone call you miss is a customer who may book elsewhere. Online booking captures them any time of day and frees your staff from repetitive calls.',
    sections: [
      {
        heading: 'Features that matter',
        body: ['Start with the essentials.'],
        list: [
          'Service selection with duration and price.',
          'Availability calendar that blocks booked times.',
          'Confirmation by SMS, email or WhatsApp.',
          'Easy rescheduling and cancellation.',
          'An admin view to manage bookings and staff schedules.',
        ],
      },
      {
        heading: 'Reduce no-shows',
        body: [
          'Send reminders a day before and a few hours before the appointment. Make rescheduling simple, and consider a small deposit for high-value slots. Clear cancellation policies set expectations without sounding harsh.',
        ],
      },
      {
        heading: 'Offer alternatives to full automation',
        body: [
          'A simple request form or WhatsApp booking button can work for smaller teams. Automate gradually as volume grows. Whatever the method, reply quickly and confirm details in writing.',
        ],
      },
      {
        heading: 'Make service pages work for SEO',
        body: [
          'Create a page for each major treatment or service with clear descriptions, prices or ranges, FAQs and a booking button. Add LocalBusiness schema, your Google Business Profile link and reviews. Local searchers often choose the provider whose page answers their questions clearly. See our [local SEO checklist](/blog/local-seo-checklist-small-business-india).',
        ],
      },
      {
        heading: 'Protect privacy',
        body: [
          'Health and personal data need care: collect only what you need, store it securely, use HTTPS and limit who can see it. Explain how data is used in your privacy policy. For a booking-ready site see our [website design service](/services/website-design-ahmedabad) or [get in touch](/contact).',
        ],
      },
    ],
    faq: [
      { q: 'Do I need a booking system for a small clinic?', a: 'Not always, but it saves time and captures after-hours bookings. Start simple and expand.' },
      { q: 'Can bookings sync with Google Calendar?', a: 'Many systems support this, which helps avoid double bookings.' },
      { q: 'How do I handle payments?', a: 'Use a trusted payment gateway for deposits or full payments and issue receipts automatically.' },
    ],
  },
  {
    slug: 'shipping-and-returns-policy-for-online-stores-india',
    title: 'Shipping and Returns Policies for Indian Online Stores: What to Write',
    description: 'Write clear shipping and returns policies that build trust: delivery times, charges, COD, exchanges, refunds, damaged goods and where to display them.',
    keywords: ['shipping policy India', 'returns policy ecommerce', 'refund policy template', 'COD policy'],
    intro: 'Shoppers read your shipping and returns policy before they trust you with money. A clear policy reduces support questions and makes buying feel safe.',
    sections: [
      {
        heading: 'Shipping policy essentials',
        body: ['Spell out the key details in plain language.'],
        list: [
          'Dispatch time after an order is placed.',
          'Delivery estimates by region or pincode.',
          'Shipping charges and any free-shipping threshold.',
          'Courier partners and tracking information.',
          'Cash on delivery availability and fees.',
          'What happens in case of delays or failed delivery.',
        ],
      },
      {
        heading: 'Returns and exchanges',
        body: [
          'State the return window, product condition required, who pays return shipping and how refunds are issued, including timelines and methods. Explain exceptions, such as customised or hygiene items. Fair, simple rules convert better than strict ones.',
        ],
      },
      {
        heading: 'Damaged or wrong items',
        body: [
          'Explain how customers can report problems, with photos and within a stated time. Respond quickly with a replacement or refund. How you handle problems often decides whether a customer buys again and what they write in reviews.',
        ],
      },
      {
        heading: 'Where to display them',
        body: [
          'Link policies from the footer, product pages, cart and checkout. A short summary near the buy button reduces hesitation. Use consistent wording across pages and your marketplace listings.',
        ],
      },
      {
        heading: 'Keep them accurate and legal',
        body: [
          'Align policies with consumer protection requirements and your actual operations. Review them when carriers, prices or rules change, and have a professional check the wording if needed. For the complete store setup see [how to build an online store in India](/blog/how-to-build-an-online-store-in-india) and [reduce abandoned carts](/blog/abandoned-cart-recovery-for-small-stores).',
        ],
      },
    ],
    faq: [
      { q: 'Is a return policy mandatory?', a: 'Policies that explain returns, refunds and delivery are expected by customers and often required by gateways and marketplaces.' },
      { q: 'How long should a return window be?', a: 'Seven to thirty days is common, depending on the product type.' },
      { q: 'Should shipping be free?', a: 'Free shipping above a threshold can lift order values, if margins allow.' },
    ],
  },
  {
    slug: 'selling-on-marketplaces-vs-own-website-india',
    title: 'Selling on Marketplaces vs Your Own Website in India: Pros, Cons and a Hybrid Plan',
    description: 'Compare marketplaces and your own online store: fees, control, customer data, branding and a hybrid approach for growing sellers.',
    keywords: ['marketplace vs own website', 'sell online India', 'D2C website', 'Amazon Flipkart alternative'],
    intro: 'Marketplaces bring ready-made traffic; your own website brings control and loyalty. Most successful sellers eventually use both, for different reasons.',
    sections: [
      {
        heading: 'What marketplaces offer',
        body: [
          'They give instant visibility, built-in trust, payments and logistics. The trade-offs are commissions, strict rules, price competition and limited access to customer information. You depend on their policies and algorithms.',
        ],
      },
      {
        heading: 'What your own website offers',
        body: ['Owning the storefront has long-term advantages.'],
        list: [
          'Full control of branding, pricing and customer experience.',
          'Direct relationships and customer data for repeat sales.',
          'Higher margins without marketplace commissions.',
          'Freedom to run bundles, subscriptions and content.',
          'Search visibility for your brand name.',
        ],
      },
      {
        heading: 'The challenge of your own site',
        body: [
          'You must generate traffic, handle payments and logistics and build trust. This takes marketing effort through SEO, social media, ads and email. Without it, a store can sit empty.',
        ],
      },
      {
        heading: 'A hybrid approach',
        body: [
          'Use marketplaces to reach new buyers and validate products, then bring loyal customers to your own site through packaging inserts, newsletters and brand search. Keep branding and pricing consistent. Make sure your site has strong product pages and reviews.',
        ],
      },
      {
        heading: 'Decide by stage',
        body: [
          'Early on, a marketplace can test demand cheaply. Once you have proven products, invest in your own website and brand. See [how to build an online store](/blog/how-to-build-an-online-store-in-india) and [product page tips](/blog/product-page-design-tips-for-higher-sales), and discuss options with our [team](/services/website-design-ahmedabad).',
        ],
      },
    ],
    faq: [
      { q: 'Can I sell on both at the same time?', a: 'Yes, but manage inventory carefully and follow each marketplace\'s pricing rules.' },
      { q: 'Is it worth having my own website if I sell on marketplaces?', a: 'Yes, for brand credibility, customer relationships and higher margins over time.' },
      { q: 'How do I drive traffic to my own store?', a: 'Combine SEO, social media, email, ads and referrals, starting with the channels your customers already use.' },
    ],
  },
];
