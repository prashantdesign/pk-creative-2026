import type { RawPost } from './types';

export const PERFORMANCE: RawPost[] = [
  {
    slug: 'core-web-vitals-explained-for-business-owners',
    title: 'Core Web Vitals Explained for Business Owners (LCP, INP and CLS)',
    description: 'What Core Web Vitals are, what good scores look like, how to measure them and the simple fixes that improve speed and user experience.',
    keywords: ['Core Web Vitals', 'LCP INP CLS', 'Google page experience', 'website speed test'],
    intro: 'Core Web Vitals are Google\'s way of measuring whether a page feels fast and stable. You do not need to be technical to understand them, and improving them tends to improve conversions as well as search performance.',
    sections: [
      {
        heading: 'The three measurements in plain language',
        body: ['Each one measures a moment your visitor feels.'],
        list: [
          '**Largest Contentful Paint (LCP):** how long until the main content, usually a hero image or headline, appears. Aim for 2.5 seconds or less.',
          '**Interaction to Next Paint (INP):** how quickly the page responds when someone taps or clicks. Aim for 200 milliseconds or less.',
          '**Cumulative Layout Shift (CLS):** how much the layout jumps while loading. Aim for 0.1 or less.',
        ],
      },
      {
        heading: 'Why they matter',
        body: [
          'Slow or jumpy pages make visitors leave, especially on phones. Google uses page experience signals as part of ranking, although content relevance remains more important. Treat vitals as a quality baseline: they will not rescue a poor page, but they can keep a good page from being held back.',
        ],
      },
      {
        heading: 'How to measure',
        body: [
          'Use PageSpeed Insights, which shows real-user data from Chrome where available and lab data from a test. The Core Web Vitals report in Search Console groups your pages as good, needs improvement or poor. Test on mobile, since that is where scores are usually lowest.',
        ],
      },
      {
        heading: 'Common fixes for each metric',
        body: ['Start with the biggest wins.'],
        list: [
          'LCP: compress and properly size the hero image, preload it, use a fast host and avoid slow animations on main content.',
          'INP: reduce heavy JavaScript, remove unused scripts and avoid long tasks on interaction.',
          'CLS: set width and height on images and embeds, reserve space for banners and avoid inserting content above existing content.',
        ],
      },
      {
        heading: 'A realistic approach',
        body: [
          'Fix the worst page template first, usually the home page, then re-test. Avoid chasing a perfect 100 score; focus on passing thresholds for real users. See our posts on [image optimisation](/blog/image-optimisation-for-websites-designers) and [why Next.js sites load fast](/blog/why-nextjs-websites-rank-faster), or ask our [team](/services/website-design-ahmedabad) for a speed audit.',
        ],
      },
    ],
    faq: [
      { q: 'What is a good PageSpeed score?', a: 'Scores of 90 and above are excellent, but passing Core Web Vitals thresholds for real users matters more than the number.' },
      { q: 'Do Core Web Vitals affect rankings?', a: 'They are a ranking signal, but content relevance and quality remain more influential.' },
      { q: 'Why is mobile slower than desktop?', a: 'Phones have slower processors and connections, so heavy pages perform worse there.' },
    ],
  },
  {
    slug: 'how-to-speed-up-your-website',
    title: 'How to Speed Up Your Website: 15 Fixes in Order of Impact',
    description: 'A prioritised list of website speed fixes: images, hosting, caching, scripts, fonts and third-party tools, so you improve load time quickly.',
    keywords: ['speed up website', 'improve website loading time', 'website performance tips', 'slow website fix'],
    intro: 'Website speed advice is often a long list of technical tasks with no order. Here are the fixes that usually matter most, arranged so you start with the biggest gains.',
    sections: [
      {
        heading: 'Fix images first',
        body: [
          'Large images are the most common cause of slow pages. Resize them to the display size, convert to WebP or AVIF, compress and lazy load those below the fold. Do not lazy load the hero image, which should be prioritised.',
        ],
      },
      {
        heading: 'Reduce what you load',
        body: ['Every script, plugin and font adds weight.'],
        list: [
          'Remove unused plugins, widgets and tracking scripts.',
          'Load fonts sparingly: two families, only needed weights.',
          'Defer non-critical JavaScript until after the page loads.',
          'Avoid auto-playing background video on mobile.',
        ],
      },
      {
        heading: 'Use good hosting and a CDN',
        body: [
          'A slow server delays everything. Choose hosting with servers near your audience, and use a content delivery network so files are served from a nearby location. For Indian audiences, providers with Mumbai or Indian edge locations help.',
        ],
      },
      {
        heading: 'Enable caching and compression',
        body: [
          'Browser caching lets repeat visitors reuse files. Server compression (Gzip or Brotli) shrinks text files dramatically. Pre-rendered pages avoid generating each page on every request. These changes are usually quick for a developer.',
        ],
      },
      {
        heading: 'Measure, change, re-measure',
        body: [
          'Test before changes, then change one item and re-test, so you know what worked. Use PageSpeed Insights and real devices. Keep a log. For deeper reading see [Core Web Vitals explained](/blog/core-web-vitals-explained-for-business-owners) and [why third-party scripts slow sites](/blog/third-party-scripts-and-website-speed). Our [website design](/services/website-design-ahmedabad) builds speed in from the start.',
        ],
      },
    ],
    faq: [
      { q: 'How fast should a website load?', a: 'Aim for the main content to appear within about two to three seconds on a typical mobile connection.' },
      { q: 'Does hosting really matter?', a: 'Yes. Slow or overloaded servers delay every request regardless of how well the site is built.' },
      { q: 'Will speed improve my rankings?', a: 'It can help as one of many signals, and it clearly improves user experience and conversions.' },
    ],
  },
  {
    slug: 'third-party-scripts-and-website-speed',
    title: 'Third-Party Scripts and Website Speed: Analytics, Chat Widgets and Pixels',
    description: 'How analytics, chat widgets, ad pixels and embeds slow your website, and practical ways to load them later or remove them altogether.',
    keywords: ['third-party scripts', 'Google Tag Manager performance', 'chat widget slow website', 'reduce JavaScript'],
    intro: 'Your own code is often light. It is the add-ons that pile up: analytics, chat tools, heatmaps, ad pixels, social feeds and font loaders. Each one is small, but together they can double load time.',
    sections: [
      {
        heading: 'Why third-party scripts are costly',
        body: [
          'Each script requires a separate network request, may load more scripts of its own and runs code on the visitor\'s phone. You also do not control their size or changes. A chat widget that adds 300 KB and heavy processing hurts the very visitors it intends to serve.',
        ],
      },
      {
        heading: 'Audit what you really use',
        body: ['Open the page in a testing tool and list every external request.'],
        list: [
          'Which scripts have a clear business purpose?',
          'Which tools did a former agency or marketer add and nobody uses?',
          'Are duplicates installed, such as two analytics tools?',
          'Do any block rendering or run on every page unnecessarily?',
        ],
      },
      {
        heading: 'Load later',
        body: [
          'Delay non-essential scripts until the page is interactive or the user scrolls. Analytics can load after the main content, and chat widgets can load when the visitor interacts or after a few seconds. Use async or defer attributes and modern script loading strategies.',
        ],
      },
      {
        heading: 'Replace heavy embeds with light ones',
        body: [
          'Instead of embedding a full video player, show a thumbnail that loads the player on click. Use a static map image linking to Google Maps instead of an interactive embed on every page. Link to social profiles instead of embedding live feeds.',
        ],
      },
      {
        heading: 'Keep a script register',
        body: [
          'Maintain a list of every external script, why it exists and who owns it. Review it quarterly. If speed matters to you, treat each new tool as a cost. For broader fixes see [how to speed up your website](/blog/how-to-speed-up-your-website) and our [website design service](/services/website-design-ahmedabad).',
        ],
      },
    ],
    faq: [
      { q: 'Is Google Analytics bad for speed?', a: 'It is relatively light, especially when loaded after the main content. Problems arise when many tools stack up.' },
      { q: 'Does Tag Manager slow my site?', a: 'It adds a request, and the tags inside can add more. Keep containers tidy and remove unused tags.' },
      { q: 'Can I remove all tracking?', a: 'You can reduce to essentials. Keep the tools that inform decisions and drop the rest.' },
    ],
  },
  {
    slug: 'website-hosting-for-indian-businesses',
    title: 'Website Hosting for Indian Businesses: Shared, VPS, Cloud and Edge Explained',
    description: 'Compare hosting types for websites in India: shared, VPS, cloud and modern edge platforms, with costs, speed and how to choose.',
    keywords: ['website hosting India', 'shared vs VPS hosting', 'best hosting for small business website', 'CDN hosting'],
    intro: 'Hosting is where your website lives. The right choice depends on your traffic, your technology and how much maintenance you want to handle yourself.',
    sections: [
      {
        heading: 'Shared hosting',
        body: [
          'Many sites share one server. It is the cheapest option and fine for small brochure sites with low traffic. The downside is variable speed, because neighbours can use up resources, and limited control over configuration.',
        ],
      },
      {
        heading: 'VPS and dedicated servers',
        body: [
          'A virtual private server gives you reserved resources and more control, and suits busier sites or custom applications. It also requires someone to manage security updates and backups. Dedicated servers suit large-scale needs and are rarely necessary for small businesses.',
        ],
      },
      {
        heading: 'Cloud and managed platforms',
        body: ['Modern platforms host sites on distributed infrastructure.'],
        list: [
          'Automatic scaling for traffic spikes.',
          'Global content delivery with nearby edge locations.',
          'Built-in HTTPS and easy deployments.',
          'Pay-as-you-grow pricing, often free for small sites.',
        ],
      },
      {
        heading: 'What to check when choosing',
        body: [
          'Ask about uptime guarantees, backups, support hours, location of servers, renewal prices and whether you can export your site. Cheap first-year offers often have much higher renewal rates. Check that you control the account and own the login details.',
        ],
      },
      {
        heading: 'Matching hosting to your site',
        body: [
          'A static or pre-rendered site on a modern platform is quick and cheap to host. A heavy WordPress site with many plugins needs better hosting to stay fast. Discuss hosting with your developer early; our [website design projects](/services/website-design-ahmedabad) include hosting advice, and the [speed guide](/blog/how-to-speed-up-your-website) shows what else affects performance.',
        ],
      },
    ],
    faq: [
      { q: 'How much does hosting cost per year?', a: 'It ranges from a few hundred rupees for basic shared plans to several thousand for managed or cloud setups. Always compare renewal prices.' },
      { q: 'Should hosting be in India?', a: 'Servers or edge locations near your audience reduce latency, but a good global CDN can also serve Indian visitors well.' },
      { q: 'Who should own the hosting account?', a: 'You should, with your developer given access as needed.' },
    ],
  },
  {
    slug: 'lazy-loading-images-and-video-guide',
    title: 'Lazy Loading Images and Video: When It Helps and When It Hurts',
    description: 'Understand lazy loading: how it speeds up pages, which images should not be lazy loaded, video embeds and avoiding layout shifts.',
    keywords: ['lazy loading images', 'defer offscreen images', 'lazy load video', 'LCP image priority'],
    intro: 'Lazy loading means waiting to download images and videos until they are about to appear on screen. Used correctly, it makes pages feel lighter. Used carelessly, it delays the most important content.',
    sections: [
      {
        heading: 'How lazy loading works',
        body: [
          'Browsers now support a simple attribute that tells them to load an image only when the visitor scrolls near it. This saves data and speeds up initial load because the page does not fetch dozens of images the visitor may never see.',
        ],
      },
      {
        heading: 'Do not lazy load the main image',
        body: [
          'The hero image or main banner is usually the Largest Contentful Paint element. Lazy loading it delays the metric and slows the perceived start. Mark it as high priority and load it immediately; use lazy loading for everything below the fold.',
        ],
      },
      {
        heading: 'Prevent layout jumps',
        body: ['Reserve space so the page does not shift when images load.'],
        list: [
          'Always set width and height or an aspect ratio.',
          'Use placeholders or background colours for slow images.',
          'Avoid loading large images above content that has already rendered.',
        ],
      },
      {
        heading: 'Videos and embeds',
        body: [
          'Embedded videos load a lot of code. Use a thumbnail with a play button that loads the player on click. For background videos, use short compressed loops and consider skipping them on mobile.',
        ],
      },
      {
        heading: 'Test with real conditions',
        body: [
          'Scroll quickly on a mid-range phone with a throttled connection to see whether images appear in time. Check Core Web Vitals after changes. Combine lazy loading with good [image formats and sizes](/blog/image-optimisation-for-websites-designers) and the guidance in [Core Web Vitals explained](/blog/core-web-vitals-explained-for-business-owners).',
        ],
      },
    ],
    faq: [
      { q: 'Does lazy loading hurt SEO?', a: 'Not when implemented with standard browser support, as search engines can discover the images. Avoid hiding content behind interactions only.' },
      { q: 'Should every image be lazy loaded?', a: 'No. Load important above-the-fold images immediately.' },
      { q: 'What about background images in CSS?', a: 'They need different techniques, so use real image elements for important content where possible.' },
    ],
  },
  {
    slug: 'mobile-page-speed-on-slow-networks-india',
    title: 'Mobile Page Speed on Slow Networks: Designing for Real Indian Conditions',
    description: 'Test and design for mid-range Android phones and patchy 4G: budgets for page weight, JavaScript, fonts and offline-friendly techniques.',
    keywords: ['mobile page speed India', 'website on slow network', 'performance budget', 'lightweight website'],
    intro: 'A site that feels instant on a fast laptop with fibre can crawl on a budget phone in a crowded area. Designing for real conditions is one of the most valuable things you can do for conversion.',
    sections: [
      {
        heading: 'Test on realistic devices',
        body: [
          'Use a mid-range Android phone and throttled network settings in browser developer tools to simulate slower connections. Real-user data in PageSpeed Insights and Search Console shows how actual visitors experience your site, which is more honest than your own device.',
        ],
      },
      {
        heading: 'Set a performance budget',
        body: ['A budget is a limit you do not exceed.'],
        list: [
          'Total page weight under roughly 1 to 1.5 MB for key pages.',
          'Hero image under about 200 KB.',
          'JavaScript as small as practical, with unused code removed.',
          'No more than two font families and a few weights.',
        ],
      },
      {
        heading: 'Reduce JavaScript work',
        body: [
          'Phones with modest processors struggle to run large scripts. Remove unnecessary libraries, split code so only what a page needs is loaded and avoid animations that run constantly. Prefer server-rendered or pre-rendered content so text appears before scripts finish.',
        ],
      },
      {
        heading: 'Use caching and offline support wisely',
        body: [
          'A service worker can cache core files so repeat visits load instantly, even on poor connections. Combine this with long-lived caching for static assets and short refresh intervals for content that changes.',
        ],
      },
      {
        heading: 'Make essential actions available early',
        body: [
          'Even when the page is still loading, a visitor should be able to read the headline and tap call or WhatsApp. Prioritise critical content and defer decorative features. Our [mobile-first design guide](/blog/mobile-first-web-design-india) and [speed fixes](/blog/how-to-speed-up-your-website) go deeper, and our [team](/services/website-design-ahmedabad) can test your site on real devices.',
        ],
      },
    ],
    faq: [
      { q: 'What is a performance budget?', a: 'A set of limits for page weight, requests or timing that the team agrees not to exceed.' },
      { q: 'Do I need a separate lite site?', a: 'Usually not. A lightweight responsive site serves all users well.' },
      { q: 'Does 5G make this unnecessary?', a: 'No. Coverage and congestion vary, and many users still have limited data and older phones.' },
    ],
  },
  {
    slug: 'fonts-and-website-speed-guide',
    title: 'Web Fonts and Website Speed: How to Keep Beautiful Type Fast',
    description: 'Optimise web fonts for speed: fewer weights, WOFF2, preloading, font-display, subsetting, system font stacks and avoiding layout shift.',
    keywords: ['web font optimization', 'font-display swap', 'WOFF2 fonts', 'Google Fonts performance'],
    intro: 'Fonts give your site its personality, but they are also downloaded files. Four or five unnecessary weights can add hundreds of kilobytes and cause text to flash or jump.',
    sections: [
      {
        heading: 'Use fewer fonts and weights',
        body: [
          'Every weight and style is a separate file. Choose one family for headings and one for body, and load only the weights you actually use, often regular, medium and bold. Removing unused italics and extra weights is an easy win.',
        ],
      },
      {
        heading: 'Use modern formats and subsets',
        body: [
          'WOFF2 is the compressed format supported by all modern browsers. Subsetting means including only the characters you need, such as Latin, which shrinks files. If you need Hindi or Gujarati, load those scripts only on pages that use them.',
        ],
      },
      {
        heading: 'Control how text appears while fonts load',
        body: ['Choose a loading behaviour that never hides text.'],
        list: [
          'Use font-display: swap or optional so text shows immediately.',
          'Pick a fallback font with similar metrics to avoid layout shift.',
          'Preload only the most important font files.',
          'Self-host or use an optimised loader to cut extra connections.',
        ],
      },
      {
        heading: 'Consider system fonts',
        body: [
          'System font stacks load instantly because nothing is downloaded. They suit dashboards, documents and utility pages. Many brands combine a distinctive heading font with a system or lightweight body font for a good balance.',
        ],
      },
      {
        heading: 'Check the result',
        body: [
          'Run a speed test and look for font files in the network list. Check that text does not flicker or jump. Compare before and after. For typography design choices see [website typography](/blog/typography-for-websites-font-pairing), and for overall improvement see [how to speed up your website](/blog/how-to-speed-up-your-website).',
        ],
      },
    ],
    faq: [
      { q: 'Are Google Fonts slow?', a: 'They are efficient when configured well, but extra weights and external connections add cost. Self-hosting can help.' },
      { q: 'What is FOIT?', a: 'Flash of invisible text, where text is hidden until the font loads. Use font-display swap to avoid it.' },
      { q: 'How many fonts is too many?', a: 'More than two families usually adds weight without value.' },
    ],
  },
  {
    slug: 'website-caching-explained-simply',
    title: 'Website Caching Explained Simply: Browser, Server and CDN Cache',
    description: 'What caching is, how browser, server and CDN caches work together, and how to keep pages fast while still updating content quickly.',
    keywords: ['website caching', 'browser cache', 'CDN cache', 'cache control headers'],
    intro: 'Caching means keeping a ready-made copy so work does not have to be repeated. It is the main reason well-built websites feel instant on a second visit.',
    sections: [
      {
        heading: 'Browser cache',
        body: [
          'When a visitor loads your logo, stylesheet or fonts, the browser can store them locally. On the next page or visit, it reuses them instead of downloading again. Long cache times for files that rarely change, such as versioned images and scripts, speed up repeat visits dramatically.',
        ],
      },
      {
        heading: 'Server and page cache',
        body: [
          'Instead of building a page from the database on every request, the server can store the finished HTML and send it immediately. Pre-rendering pages at build time or refreshing them every few minutes provides this benefit and keeps servers calm during traffic spikes.',
        ],
      },
      {
        heading: 'CDN cache',
        body: ['A content delivery network keeps copies in many locations.'],
        list: [
          'Visitors are served from a location close to them.',
          'Your origin server handles fewer requests.',
          'Sites survive sudden traffic better.',
          'Security features such as DDoS protection are often included.',
        ],
      },
      {
        heading: 'The freshness challenge',
        body: [
          'The risk of caching is showing outdated content. Use short refresh intervals for content you edit often and long lifetimes for static files that change names when updated. Many modern setups refresh pages in the background every few minutes, so edits appear without a redeploy.',
        ],
      },
      {
        heading: 'What to do when you update',
        body: [
          'If a change does not appear, clear the relevant caches in the order: page cache, CDN, then browser. Ask your developer how updates propagate. Our [website projects](/services/website-design-ahmedabad) use pre-rendering with timed refresh, and the [speed fixes guide](/blog/how-to-speed-up-your-website) covers more.',
        ],
      },
    ],
    faq: [
      { q: 'Why do I not see my changes?', a: 'You may be viewing a cached copy. Refresh hard, clear caches or wait for the refresh interval.' },
      { q: 'Is caching safe for forms and logins?', a: 'Dynamic and private pages should bypass shared caches, while public pages can be cached.' },
      { q: 'Does caching help SEO?', a: 'Faster responses help crawling and user experience, which supports SEO indirectly.' },
    ],
  },
  {
    slug: 'website-security-basics-for-small-business',
    title: 'Website Security Basics for Small Businesses: Protect Your Site and Rankings',
    description: 'Practical website security: HTTPS, strong logins, updates, backups, form protection and what to do if your site is hacked.',
    keywords: ['website security', 'HTTPS SSL', 'protect website from hackers', 'website backup'],
    intro: 'A hacked site can show spam, redirect visitors and disappear from Google. Most attacks target easy weaknesses, so a few habits remove most of the risk.',
    sections: [
      {
        heading: 'Use HTTPS everywhere',
        body: [
          'HTTPS encrypts data between the visitor and your site. Browsers flag sites without it as not secure, and it is a baseline for trust and a light ranking signal. Make sure all pages redirect to the https version and that certificates renew automatically.',
        ],
      },
      {
        heading: 'Strong access control',
        body: ['Most breaches begin with weak logins.'],
        list: [
          'Use long unique passwords stored in a password manager.',
          'Turn on two-step verification for hosting, domain and admin accounts.',
          'Give team members only the access they need.',
          'Remove accounts of former staff or agencies.',
        ],
      },
      {
        heading: 'Keep software updated',
        body: [
          'Outdated plugins, themes and frameworks are the top reason sites are compromised. Apply updates promptly and remove software you do not use. Leaner sites with fewer components have a smaller attack surface.',
        ],
      },
      {
        heading: 'Back up and protect forms',
        body: [
          'Keep regular automated backups stored off the server, and test restoring. Protect forms against spam and injection by validating input on the server, limiting submission rates and using security headers. Do not store sensitive data you do not need.',
        ],
      },
      {
        heading: 'If your site is hacked',
        body: [
          'Take it offline or enable maintenance mode if possible, change all passwords, restore a clean backup and find how the attacker got in. Check Search Console for security warnings and request a review once fixed. See our [maintenance checklist](/blog/website-maintenance-checklist) and ask our [team](/contact) about secure builds.',
        ],
      },
    ],
    faq: [
      { q: 'Do small websites get hacked?', a: 'Yes. Attacks are often automated and target any vulnerable site regardless of size.' },
      { q: 'Is a free SSL certificate enough?', a: 'Yes, for most business sites. Free certificates provide the same encryption.' },
      { q: 'How often should I back up?', a: 'Daily for active sites, weekly for static ones, with copies stored away from the server.' },
    ],
  },
];
