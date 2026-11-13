import type { RawPost } from './types';

export const UI_UX: RawPost[] = [
  {
    slug: 'ui-vs-ux-difference-explained',
    title: 'UI vs UX: The Difference Explained With Everyday Examples',
    description: 'UI and UX are not the same job. Learn the difference, how they work together and what each means for your website, app or product.',
    keywords: ['UI vs UX', 'difference between UI and UX', 'what is UX design', 'what is UI design'],
    intro: 'People use UI and UX as if they were one word, which leads to confused briefs and disappointed clients. They are connected, but they solve different problems.',
    sections: [
      {
        heading: 'A simple way to remember it',
        body: [
          'Think of a restaurant. UX is the whole experience: how easy it was to book, how fast you were seated, whether the menu made ordering simple and how you felt leaving. UI is what you see and touch: the menu design, the table setting, the lighting and the signage.',
          'A beautiful menu in a restaurant with a two-hour wait is great UI and poor UX. The reverse is also possible: smooth service in a drab room.',
        ],
      },
      {
        heading: 'What UX design covers',
        body: ['User experience design focuses on how a product works and whether it helps people reach their goals.'],
        list: [
          'Research: who the users are and what they need.',
          'Information architecture: how content is organised.',
          'User flows: the steps to complete a task.',
          'Wireframes and prototypes to test ideas early.',
          'Usability testing and improvement.',
        ],
      },
      {
        heading: 'What UI design covers',
        body: [
          'User interface design shapes the visible layer: layout, colour, typography, buttons, icons, spacing, imagery and motion. Good UI makes the structure clear and the product pleasant, and keeps everything consistent through a design system.',
        ],
      },
      {
        heading: 'Why you need both',
        body: [
          'UX without UI can feel plain and untrustworthy. UI without UX produces attractive screens that confuse people. On a website, UX decides that the pricing page exists and answers the right questions; UI decides how readable, trustworthy and appealing it looks.',
        ],
      },
      {
        heading: 'What to ask for when hiring',
        body: [
          'Ask whether the designer researches your users, creates wireframes and tests prototypes, or only produces finished screens. Check their portfolio for the thinking behind designs, not just visuals. Our [UI/UX design service](/services/ui-ux-design) covers both parts. Next, see [how to plan website navigation](/blog/website-navigation-best-practices).',
        ],
      },
    ],
    faq: [
      { q: 'Can one person do both UI and UX?', a: 'Yes, many designers do, especially on small projects. Larger products often split the roles.' },
      { q: 'Which matters more for conversions?', a: 'Both. UX removes friction and UI builds clarity and trust. Weakness in either hurts results.' },
      { q: 'Is UX only for apps?', a: 'No. Websites, forms, checkout flows and even printed materials all involve user experience.' },
    ],
  },
  {
    slug: 'website-navigation-best-practices',
    title: 'Website Navigation Best Practices: Menus Visitors Understand',
    description: 'Design clear website navigation: menu length, labels, mobile menus, dropdowns, footers, breadcrumbs and search to help users find what they need.',
    keywords: ['website navigation', 'menu design best practices', 'mobile navigation', 'information architecture'],
    intro: 'Navigation is the map of your website. When it is clear, people never think about it. When it is not, they leave without telling you why.',
    sections: [
      {
        heading: 'Keep the main menu short',
        body: [
          'Five to seven top-level items is a good limit. Each extra link dilutes the others and slows decisions. Group related pages under a single label and move rarely used items, such as policies, into the footer.',
        ],
      },
      {
        heading: 'Use labels people already know',
        body: [
          'Clever names confuse. "Services", "Work", "About" and "Contact" are universal for a reason. If you use a custom label such as "Our Craft", visitors have to guess what is behind it. Use plain words, and let the page content show your personality.',
        ],
      },
      {
        heading: 'Make mobile menus effortless',
        body: ['Most visitors will use the mobile version, so design it carefully.'],
        list: [
          'Large tap targets with comfortable spacing.',
          'The call button or WhatsApp link reachable without opening the menu.',
          'Clear open and close controls.',
          'No deep nesting; two levels at most.',
        ],
      },
      {
        heading: 'Show people where they are',
        body: [
          'Highlight the current page in the menu and use breadcrumbs on deeper pages, such as Home / Services / Branding. This helps orientation and also gives search engines context about your structure.',
        ],
      },
      {
        heading: 'Support search and the footer',
        body: [
          'For larger sites, add a search box. Use the footer as a second navigation layer with main services, contact details and key guides; it is also valuable for internal linking and SEO. Test navigation by asking someone unfamiliar with your site to find a price, a service page and your phone number, and watch where they hesitate. See also our [mobile-first design guide](/blog/mobile-first-web-design-india) and [UI/UX service](/services/ui-ux-design).',
        ],
      },
    ],
    faq: [
      { q: 'Should the logo link to the home page?', a: 'Yes. Users expect clicking the logo to return to the home page.' },
      { q: 'Are mega menus good?', a: 'They suit large catalogues but overwhelm small sites. Use only if you have many categories.' },
      { q: 'Should the contact link be a button?', a: 'A highlighted contact or quote button in the header often improves conversions.' },
    ],
  },
  {
    slug: 'contact-form-design-tips',
    title: 'Contact Form Design: 9 Tips to Get More Enquiries',
    description: 'Improve your website contact form with simple design and copy changes: fewer fields, clear labels, error handling, spam protection and follow-up.',
    keywords: ['contact form design', 'increase form submissions', 'enquiry form best practices', 'lead form UX'],
    intro: 'The contact form is where your website earns its money. A few small changes to length, wording and feedback can noticeably improve how many visitors finish it.',
    sections: [
      {
        heading: 'Ask for less',
        body: [
          'Every extra field lowers completion. Start with name, phone or email and a message. Add optional fields, such as budget or service type, only if you will use the answers. If you need details, collect them in the follow-up conversation.',
        ],
      },
      {
        heading: 'Write labels and buttons that help',
        body: [
          'Put clear labels above fields rather than relying only on placeholder text that disappears. Replace a generic "Submit" with specific words such as "Get my free quote". Add a line of reassurance underneath: "We reply within one business day. No spam."',
        ],
      },
      {
        heading: 'Make it effortless on mobile',
        body: ['Small details matter on phones.'],
        list: [
          'Use the right input types so the correct keyboard appears.',
          'Make fields tall and spaced for thumbs.',
          'Enable autofill attributes for name, email and phone.',
          'Keep the button visible above the keyboard.',
        ],
      },
      {
        heading: 'Handle errors kindly',
        body: [
          'Validate as people type or on submit, and show messages beside the problem field: "Please enter a 10-digit mobile number". Never clear the form after an error. After success, show a thank-you message that says what happens next and when.',
        ],
      },
      {
        heading: 'Protect against spam without annoying people',
        body: [
          'Use invisible methods such as honeypot fields and server-side checks before resorting to puzzles. And ensure enquiries actually reach you: send a copy to email, store them in your admin panel and test monthly. Our [website maintenance checklist](/blog/website-maintenance-checklist) includes this test. See also [lead generation basics](/blog/lead-generation-for-small-business-website).',
        ],
      },
    ],
    faq: [
      { q: 'How many fields is ideal?', a: 'Three to five works for most service businesses. Fewer fields usually means more submissions.' },
      { q: 'Should I add WhatsApp next to the form?', a: 'Yes. Many Indian customers prefer WhatsApp, so offering both increases enquiries.' },
      { q: 'Do I need a CAPTCHA?', a: 'Not always. Start with honeypots and rate limits and add CAPTCHA only if spam persists.' },
    ],
  },
  {
    slug: 'call-to-action-button-examples',
    title: 'Call-to-Action Buttons: Wording, Colour and Placement That Work',
    description: 'How to design call-to-action buttons that people click: clear wording, contrast, size, position on the page and examples for service businesses.',
    keywords: ['call to action button', 'CTA examples', 'button design', 'increase click through rate'],
    intro: 'A call-to-action, or CTA, tells visitors what to do next. Pages without a clear next step quietly lose interested customers.',
    sections: [
      {
        heading: 'Use words that promise an outcome',
        body: [
          'Weak buttons say "Submit" or "Click here". Strong ones say what the visitor gets: "Get a free quote", "See pricing", "Book a 15-minute call". Use first-person phrasing like "Get my quote" if you want to test; it often feels more personal.',
        ],
      },
      {
        heading: 'Make the primary action obvious',
        body: ['Each screen should have one main action.'],
        list: [
          'Use your strongest brand colour for the primary button.',
          'Style secondary actions as outlined or text links.',
          'Keep contrast high enough to read comfortably.',
          'Give the button generous padding and spacing.',
        ],
      },
      {
        heading: 'Place it where decisions happen',
        body: [
          'Show a CTA in the first screen, after the section explaining benefits, after proof such as testimonials and at the bottom. On mobile, a sticky call or WhatsApp button keeps the action reachable while scrolling, as long as it does not cover content.',
        ],
      },
      {
        heading: 'Reduce anxiety around the click',
        body: [
          'Add small notes close to the button: "No obligation", "Reply within a day" or "Starting from ₹10,000". Addressing the doubt right where it appears can increase clicks without changing anything else.',
        ],
      },
      {
        heading: 'Test one change at a time',
        body: [
          'Change the text or position, then compare enquiries over a few weeks. Avoid testing many things simultaneously. See also [contact form design](/blog/contact-form-design-tips) and our [website design service](/services/website-design-ahmedabad).',
        ],
      },
    ],
    faq: [
      { q: 'What colour should a CTA button be?', a: 'One that contrasts with the background and is used only for primary actions. Contrast matters more than a specific hue.' },
      { q: 'How many CTAs per page?', a: 'Repeat the same primary action several times, but avoid competing different actions.' },
      { q: 'Should the CTA be above the fold?', a: 'Yes, include one visible without scrolling and repeat it down the page.' },
    ],
  },
  {
    slug: 'website-accessibility-for-small-business',
    title: 'Website Accessibility for Small Businesses: Practical Basics That Help Everyone',
    description: 'Make your website usable by more people: colour contrast, alt text, keyboard navigation, headings and forms, with a simple self-check.',
    keywords: ['website accessibility', 'WCAG basics', 'accessible web design', 'alt text and contrast'],
    intro: 'Accessibility means people with different abilities can use your site: those with low vision, hearing loss, motor difficulty or temporary limits like a broken arm or bright sunlight. It also tends to improve usability and SEO for everyone.',
    sections: [
      {
        heading: 'Why it matters beyond compliance',
        body: [
          'A meaningful portion of any audience has some form of disability, and many more face situational limits, like using a phone outdoors. Making your site accessible widens your potential customers and signals care.',
        ],
      },
      {
        heading: 'Colour and text',
        body: [
          'Ensure text has adequate contrast against backgrounds, use at least 16 pixel body text and avoid conveying meaning by colour alone. Let users zoom without breaking the layout and avoid very light grey text on white.',
        ],
      },
      {
        heading: 'Structure and keyboard use',
        body: ['Many assistive technologies rely on clean structure.'],
        list: [
          'Use real headings in order: one H1, then H2, H3.',
          'Make all interactive elements reachable by keyboard with a visible focus outline.',
          'Add a "skip to content" link for keyboard users.',
          'Label form fields properly rather than relying on placeholders.',
        ],
      },
      {
        heading: 'Images, video and motion',
        body: [
          'Write short, meaningful alt text for informative images and leave decorative ones empty. Provide captions for video. Respect the system "reduce motion" setting by limiting large animations, which also helps people prone to dizziness.',
        ],
      },
      {
        heading: 'A five-minute self-check',
        body: [
          'Try navigating your site using only the Tab key. Zoom the page to 200 percent. Run a free checker such as Lighthouse and review the accessibility section. Fix the most basic issues first. Accessible design also supports [mobile usability](/blog/mobile-first-web-design-india). Ask our [UI/UX team](/services/ui-ux-design) for a review.',
        ],
      },
    ],
    faq: [
      { q: 'Is accessibility legally required in India?', a: 'Requirements vary by sector and are evolving. Accessible design is good practice regardless and reduces risk.' },
      { q: 'Does accessibility help SEO?', a: 'Many practices overlap, such as clear headings, alt text and fast pages.' },
      { q: 'Do I need an accessibility overlay plugin?', a: 'Overlays rarely fix real issues. Build accessibility into the design and code instead.' },
    ],
  },
  {
    slug: 'user-research-for-small-business-websites',
    title: 'User Research on a Small Budget: Learn What Your Visitors Need',
    description: 'Low-cost ways to understand your website visitors: interviews, five-person usability tests, analytics, heatmaps and customer questions.',
    keywords: ['user research small business', 'usability testing', 'customer interviews', 'website feedback'],
    intro: 'You do not need a research lab to improve a website. A few conversations and simple tests will reveal problems that months of guessing never will.',
    sections: [
      {
        heading: 'Talk to five customers',
        body: [
          'Interview recent customers for fifteen minutes each. Ask how they found you, what nearly stopped them from enquiring, what they compared and what they wished the site explained. Listen for their words; those phrases belong in your headings.',
        ],
      },
      {
        heading: 'Run a quick usability test',
        body: [
          'Give five people a realistic task, such as "find out how much a logo costs and request a quote", and watch silently as they try. Note where they hesitate or click wrongly. A handful of testers typically uncovers most major issues.',
        ],
      },
      {
        heading: 'Use the data you already have',
        body: ['Your analytics tell part of the story.'],
        list: [
          'Which pages do people leave most often?',
          'Which search terms bring visitors in Search Console?',
          'Where do mobile and desktop behaviours differ?',
          'What do customers ask on WhatsApp repeatedly?',
        ],
      },
      {
        heading: 'Add light-touch tools',
        body: [
          'Free or low-cost heatmap and recording tools show where people click and scroll. A one-question survey on the thank-you page, such as "What almost stopped you from contacting us?", gathers honest answers with little effort.',
        ],
      },
      {
        heading: 'Turn findings into changes',
        body: [
          'List problems, rank them by frequency and impact and fix the top three first. Re-test to confirm. Research works best as a habit rather than a project. Pair it with [clear content](/blog/website-content-writing-guide) and ask our [UX team](/services/ui-ux-design) if you want help running sessions.',
        ],
      },
    ],
    faq: [
      { q: 'How many users do I need to test?', a: 'Five participants often reveal the main usability issues. Repeat with new users after changes.' },
      { q: 'Can I do research without customers?', a: 'Test with people who match your audience. Friends and family can reveal obvious issues but not real buying concerns.' },
      { q: 'What if feedback conflicts?', a: 'Look for patterns across many users and prioritise issues that block conversions.' },
    ],
  },
  {
    slug: 'landing-page-design-checklist',
    title: 'Landing Page Design Checklist: 14 Elements of a Page That Converts',
    description: 'Build a landing page for ads or campaigns with this checklist: headline, proof, offer, form, speed, mobile layout and tracking.',
    keywords: ['landing page design', 'landing page checklist', 'conversion rate optimization', 'ad landing page'],
    intro: 'A landing page has one job: persuade a specific visitor to take one specific action. The tighter it is focused, the better it performs.',
    sections: [
      {
        heading: 'Match the message to the source',
        body: [
          'The headline should echo the ad or link that brought the visitor. If an ad promises "Website from ₹10,000", the page should say it in the first line. A mismatch causes instant doubt and bounces.',
        ],
      },
      {
        heading: 'The core elements',
        body: ['Include these building blocks in a logical order.'],
        list: [
          'Headline that states the outcome and audience.',
          'Supporting line with the main benefit.',
          'A single primary call to action, repeated.',
          'Three to five benefits with short explanations.',
          'Social proof: reviews, client logos, results.',
          'A short how-it-works section.',
          'Price or starting price where possible.',
          'FAQs that remove objections.',
        ],
      },
      {
        heading: 'Remove distractions',
        body: [
          'Landing pages usually perform better without the full site menu. Offer only the main action and perhaps a phone number. Every extra link is an exit.',
        ],
      },
      {
        heading: 'Make it fast and mobile-ready',
        body: [
          'Paid traffic is expensive, so slow pages waste money. Compress images, avoid heavy video and test on real phones. Keep the form short and show the button without scrolling too far. See our [speed guide](/blog/core-web-vitals-explained-for-business-owners).',
        ],
      },
      {
        heading: 'Measure and improve',
        body: [
          'Track form submissions, calls and WhatsApp clicks. Review weekly, change one element at a time and give tests enough time to collect meaningful data. Learn more in our [lead generation guide](/blog/lead-generation-for-small-business-website), or have us build one through our [website design service](/services/website-design-ahmedabad).',
        ],
      },
    ],
    faq: [
      { q: 'Should a landing page have a menu?', a: 'Usually not. Fewer exits help visitors focus on the main action.' },
      { q: 'How long should a landing page be?', a: 'As long as needed to answer doubts. Higher-priced or complex offers need more detail.' },
      { q: 'Can I use the home page as a landing page?', a: 'It is better to build separate pages for each campaign so the message matches.' },
    ],
  },
  {
    slug: 'typography-for-websites-font-pairing',
    title: 'Website Typography: Choosing and Pairing Fonts That Read Well',
    description: 'Practical typography for websites: choosing fonts, pairing headings with body text, sizes, line spacing, performance and licensing.',
    keywords: ['website typography', 'font pairing', 'best fonts for websites', 'readable web design'],
    intro: 'Most of a website is text, so typography is a large part of the design. Good type makes reading effortless; poor type makes even great content feel hard.',
    sections: [
      {
        heading: 'Limit yourself to two fonts',
        body: [
          'One font for headings and one for body text is enough for nearly any brand. A bold, characterful heading font paired with a clean, highly readable body font is a classic approach. If in doubt, use one family in several weights.',
        ],
      },
      {
        heading: 'Choose readability first',
        body: ['Settings that help readers.'],
        list: [
          'Body text of at least 16 pixels on mobile.',
          'Line height around 1.5 for paragraphs.',
          'Line length of roughly 50 to 75 characters.',
          'Enough contrast between text and background.',
          'Left-aligned text for long paragraphs.',
        ],
      },
      {
        heading: 'Create a clear hierarchy',
        body: [
          'Use size, weight and spacing to show importance: large H1, medium H2, small H3 and body text. Avoid using many sizes without reason. Hierarchy lets visitors scan the page and find what they need.',
        ],
      },
      {
        heading: 'Care about performance and scripts',
        body: [
          'Web fonts add download weight. Load only the weights you use, serve modern WOFF2 files, preload critical fonts and use font-display settings so text appears immediately. Self-hosting or using a well-optimised loader avoids layout jumps. See our [Core Web Vitals article](/blog/core-web-vitals-explained-for-business-owners).',
        ],
      },
      {
        heading: 'Check licensing and language support',
        body: [
          'Confirm the font licence allows web and commercial use. If you need Hindi or Gujarati text, choose fonts with proper Devanagari or Gujarati support that match your Latin font in weight and size. Consistent type is part of your [brand style guide](/blog/how-to-create-a-brand-style-guide).',
        ],
      },
    ],
    faq: [
      { q: 'Are Google Fonts free for commercial use?', a: 'Most are open source and free for commercial use, but check each font\'s licence.' },
      { q: 'Serif or sans-serif for websites?', a: 'Both work. Sans-serif is common for screens; serif can add warmth in headings or editorial content.' },
      { q: 'How many font weights should I load?', a: 'Only those you use, typically two to four, to keep pages fast.' },
    ],
  },
  {
    slug: 'whitespace-and-layout-principles',
    title: 'Whitespace and Layout: Why Less Clutter Sells More',
    description: 'How spacing, alignment and grid layouts make websites feel premium and clear, with practical rules for padding, sections and mobile layouts.',
    keywords: ['whitespace in web design', 'website layout principles', 'grid layout design', 'clean web design'],
    intro: 'Empty space is not wasted space. It gives content room to breathe, guides attention and makes a business look confident. Crowded layouts feel cheaper and tire the eye.',
    sections: [
      {
        heading: 'What whitespace does',
        body: [
          'Whitespace separates ideas, so visitors can see where one section ends and the next begins. It increases comprehension, draws the eye to key items like buttons and conveys quality. Luxury brands use generous space for exactly this reason.',
        ],
      },
      {
        heading: 'Use a consistent spacing system',
        body: [
          'Pick a base unit, such as 8 pixels, and use multiples for padding and margins. Consistent rhythm looks designed even when the design is simple. Give sections generous vertical padding and keep the space inside related elements smaller than the space between groups.',
        ],
      },
      {
        heading: 'Align to a grid',
        body: ['A grid keeps elements orderly.'],
        list: [
          'Use a 12-column grid on desktop and a single column on mobile.',
          'Align text, images and buttons to shared edges.',
          'Keep a maximum content width for readable lines.',
          'Be consistent with card sizes and image ratios.',
        ],
      },
      {
        heading: 'Do not fill every gap',
        body: [
          'Clients often ask to "use the empty space". Resist adding badges, banners and extra text just because room exists. Each addition competes with the main message. Prioritise one idea per section.',
        ],
      },
      {
        heading: 'Test on small screens',
        body: [
          'Space that looks right on a large monitor may be too tight or too wasteful on a phone. Reduce padding proportionally, stack elements and ensure tap targets stay comfortable. For a complete approach, read our [mobile-first guide](/blog/mobile-first-web-design-india) and [typography tips](/blog/typography-for-websites-font-pairing), or work with our [UI/UX designers](/services/ui-ux-design).',
        ],
      },
    ],
    faq: [
      { q: 'Does whitespace make a site longer?', a: 'Slightly, but readers scroll easily when sections are clear. Clarity is worth the extra length.' },
      { q: 'Is whitespace always white?', a: 'No. It is simply empty space, whatever the background colour.' },
      { q: 'How much whitespace is too much?', a: 'When elements feel disconnected or visitors must scroll a lot for little content. Balance spacing with content density.' },
    ],
  },
  {
    slug: 'microinteractions-and-animation-in-web-design',
    title: 'Animation in Web Design: What Helps Users and What Slows Them Down',
    description: 'Learn when animation improves a website, how to keep it fast and accessible, and the effects to avoid, with practical timing guidelines.',
    keywords: ['web animation best practices', 'microinteractions', 'website animations performance', 'reduced motion'],
    intro: 'Animation can explain, guide and delight, or it can delay content and annoy visitors. The difference is purpose: motion should help someone understand or act, not just show off.',
    sections: [
      {
        heading: 'Good reasons to animate',
        body: ['Useful motion usually serves one of these purposes.'],
        list: [
          'Feedback: a button press, a form success tick.',
          'Orientation: a menu sliding in so the user understands where it came from.',
          'Attention: gently highlighting a new element.',
          'Continuity: smooth transitions between states.',
        ],
      },
      {
        heading: 'Keep it quick and subtle',
        body: [
          'Most interface animations feel best between 150 and 400 milliseconds. Longer animations make the site feel slow. Large movements, parallax and auto-playing effects distract from content and can cause discomfort.',
        ],
      },
      {
        heading: 'Never hide important content behind motion',
        body: [
          'If your headline or main image fades in over two seconds, you have delayed the most important content and hurt loading metrics such as Largest Contentful Paint. Show primary content immediately and reserve animation for secondary elements lower on the page.',
        ],
      },
      {
        heading: 'Respect user preferences',
        body: [
          'Some people set their device to reduce motion because animation causes nausea or distraction. Honour that preference by turning off large movements. It is a simple step that makes your site kinder. This is also part of [accessibility](/blog/website-accessibility-for-small-business).',
        ],
      },
      {
        heading: 'Use efficient techniques',
        body: [
          'Animate transform and opacity, which browsers handle smoothly, rather than layout properties such as width or top. Avoid heavy libraries and video backgrounds where a small CSS effect would do. Test on a mid-range phone, not just your own laptop. See our [performance guides](/blog/core-web-vitals-explained-for-business-owners) or let our [UI/UX team](/services/ui-ux-design) design purposeful motion.',
        ],
      },
    ],
    faq: [
      { q: 'Does animation hurt SEO?', a: 'Not directly, but heavy animation can slow pages and hurt Core Web Vitals, which affects experience and potentially rankings.' },
      { q: 'Are loading animations a good idea?', a: 'Use them only when real loading takes time, and keep them light. Long intro animations frustrate returning visitors.' },
      { q: 'What is a microinteraction?', a: 'A small, single-purpose response, like a heart icon animating when you like a post.' },
    ],
  },
];
