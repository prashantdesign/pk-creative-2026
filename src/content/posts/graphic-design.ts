import type { RawPost } from './types';

export const GRAPHIC_DESIGN: RawPost[] = [
  {
    slug: 'how-to-brief-a-graphic-designer',
    title: 'How to Brief a Graphic Designer: A Template That Saves Revisions',
    description: 'Write a design brief that gets better first drafts: goals, audience, deliverables, references, sizes, deadlines and feedback rules.',
    keywords: ['graphic design brief', 'how to brief a designer', 'design brief template', 'working with graphic designers'],
    intro: 'Most disappointing design results begin with a thin brief. A clear one costs you thirty minutes and can save weeks of revisions and awkward conversations.',
    sections: [
      {
        heading: 'Explain the goal, not only the item',
        body: [
          'Instead of saying "I need a brochure", say "I need a brochure that helps our sales team win dealers in Rajasthan". The goal lets the designer make smart decisions about content, tone and layout that you did not think to specify.',
        ],
      },
      {
        heading: 'Describe the audience and context',
        body: [
          'Who will see this? Where? A poster read from three metres away needs different design from a brochure read at a desk. Mention age, language and what the person should think, feel or do afterwards.',
        ],
      },
      {
        heading: 'Include the practical details',
        body: ['A good brief answers these points.'],
        list: [
          'Deliverables and quantity: formats, sizes and pages.',
          'Content: final text, logo files, photos and price details.',
          'Brand guidelines, fonts and colours if you have them.',
          'Where it will be used: print, WhatsApp, Instagram, signboard.',
          'Deadline and any fixed event dates.',
          'Budget and number of revision rounds.',
        ],
      },
      {
        heading: 'Share references with reasons',
        body: [
          'Send two or three examples you like and two you dislike, explaining why: "I like the clean spacing" or "too busy for our premium audience". References describe taste faster than words, but the explanation prevents copying.',
        ],
      },
      {
        heading: 'Give feedback that helps',
        body: [
          'Collect comments from all decision-makers first, then send one consolidated message. Be specific about the problem rather than the solution: "The price is hard to see" instead of "Make it bigger". Approve in stages. For design support see our [graphic design service](/services/graphic-design) and our [logo process guide](/blog/logo-design-process-explained).',
        ],
      },
    ],
    faq: [
      { q: 'How many revisions are normal?', a: 'Two to three rounds is common. Clear briefs and consolidated feedback reduce the need for more.' },
      { q: 'Should I send my own sketch?', a: 'Yes. Even a rough drawing helps the designer understand your idea.' },
      { q: 'Who owns the final design?', a: 'Agree in writing. Normally you own the final files after full payment.' },
    ],
  },
  {
    slug: 'brochure-design-tips-that-convert',
    title: 'Brochure Design Tips: How to Make a Brochure People Keep',
    description: 'Design a brochure that sells: structure, folds, copy length, imagery, calls to action, paper choices and print checks for Indian businesses.',
    keywords: ['brochure design tips', 'company brochure design', 'trifold brochure layout', 'print marketing materials'],
    intro: 'Even in a digital world, a good brochure still works at exhibitions, client meetings and dealer visits. The best ones feel useful rather than promotional.',
    sections: [
      {
        heading: 'Plan the story before the layout',
        body: [
          'A brochure tells a short story: who you are, the problem you solve, how you do it, proof and what to do next. Write the outline panel by panel before designing. If the story is unclear, no layout will rescue it.',
        ],
      },
      {
        heading: 'Choose a format that fits the content',
        body: ['Common options and when to use them.'],
        list: [
          'Single sheet: simple offer or event flyer.',
          'Bi-fold: a short company profile.',
          'Tri-fold: services overview or menu-style content.',
          'Multi-page booklet: catalogues and detailed capability documents.',
        ],
      },
      {
        heading: 'Keep copy short and scannable',
        body: [
          'Use headings, short paragraphs and bullet points. Lead with benefits. Use real photos of your work or team rather than generic stock. Include your logo, contact details, website and a QR code that points to a specific page, not just the home page.',
        ],
      },
      {
        heading: 'Pay attention to paper and finish',
        body: [
          'Weight and texture communicate quality. Heavier art paper feels premium, while lighter paper suits mass distribution. Matte is easy to read and write on; gloss makes photographs vibrant. Ask the printer for samples before deciding.',
        ],
      },
      {
        heading: 'Prepare files correctly for print',
        body: [
          'Use CMYK colours, 300 dpi images, 3 mm bleed and keep important text inside safe margins. Convert fonts to outlines or embed them. Always request a proof. Our [graphic design team](/services/graphic-design) delivers print-ready files; also see [how to brief a designer](/blog/how-to-brief-a-graphic-designer) and [print file checklist](/blog/print-ready-files-checklist).',
        ],
      },
    ],
    faq: [
      { q: 'How many pages should a brochure have?', a: 'As many as needed and no more. Many effective brochures use four to eight pages or a tri-fold.' },
      { q: 'Should I include prices?', a: 'If prices are stable and competitive, yes. Otherwise include a starting price or a quote call to action.' },
      { q: 'Is a digital PDF enough?', a: 'A PDF is useful for sharing on WhatsApp and email, while printed copies help at meetings and events.' },
    ],
  },
  {
    slug: 'print-ready-files-checklist',
    title: 'Print-Ready Files Checklist: Bleed, CMYK, Resolution and Fonts',
    description: 'Avoid printing disasters. Use this checklist for bleed, safe margins, CMYK, resolution, fonts, black values and proofing before sending files.',
    keywords: ['print ready files', 'bleed and safe margin', 'CMYK vs RGB', 'file preparation for printing'],
    intro: 'Nothing hurts like receiving 5,000 flyers with the logo cut off or colours that look nothing like the screen. Most of these problems are preventable with a short checklist.',
    sections: [
      {
        heading: 'Bleed and safe margins',
        body: [
          'Bleed is extra artwork beyond the trim edge, usually 3 mm, so no white edges appear after cutting. Safe margin is the inner zone, usually 3 to 5 mm inside the trim, where important text and logos must stay. Without both, cutting variations can clip content.',
        ],
      },
      {
        heading: 'Colour mode',
        body: [
          'Screens use RGB light; printing uses CMYK inks. Bright RGB blues and greens often look duller in CMYK. Design in CMYK for print from the start and check logos with your printer. For brand colours that must match exactly, use Pantone spot colours if your budget allows.',
        ],
      },
      {
        heading: 'Resolution and image quality',
        body: ['Check images before placing them.'],
        list: [
          'Use 300 dpi at final print size for photographs.',
          'Never enlarge small web images; they print blurry.',
          'Use vector files for logos and icons.',
          'Avoid compression artefacts from screenshots.',
        ],
      },
      {
        heading: 'Fonts, black and details',
        body: [
          'Embed or outline fonts to prevent substitution. Use a rich black for large black areas and pure 100 percent K for small text to avoid misregistration. Check spelling, phone numbers and QR codes, because errors repeated on thousands of copies are costly.',
        ],
      },
      {
        heading: 'Proof before the run',
        body: [
          'Ask for a digital proof at minimum and a physical proof for large or colour-critical jobs. Approve in writing and keep the signed file. For help, see our [graphic design service](/services/graphic-design), and our guides on [brochure design](/blog/brochure-design-tips-that-convert) and [packaging](/blog/packaging-design-tips-small-brands).',
        ],
      },
    ],
    faq: [
      { q: 'Can I send a JPG to the printer?', a: 'High-resolution PDFs are preferable. JPGs may be accepted for simple jobs if resolution and colour are suitable.' },
      { q: 'Why do printed colours look different?', a: 'Screens emit light while print uses ink on paper, so colours shift. Use CMYK values and proofs.' },
      { q: 'What does 300 dpi mean?', a: 'Dots per inch. It is the standard resolution for sharp printed images.' },
    ],
  },
  {
    slug: 'social-media-post-design-best-practices',
    title: 'Social Media Post Design: Sizes, Layouts and Rules for Scroll-Stopping Creatives',
    description: 'Design social posts that stand out: current sizes, safe zones, text size, brand consistency, carousels and accessibility for Instagram and LinkedIn.',
    keywords: ['social media post design', 'Instagram post size', 'carousel design', 'social media creatives'],
    intro: 'A post gets about a second of attention. Good design earns that second by making the message instantly clear and the brand instantly recognisable.',
    sections: [
      {
        heading: 'Know the formats',
        body: [
          'Common formats include 4:5 portrait feed posts (1080 by 1350 pixels), square posts (1080 by 1080), vertical 9:16 for stories and reels (1080 by 1920) and landscape 1.91:1 for LinkedIn links. Platform dimensions change, so check current guidance, but portrait generally gives more screen space on phones.',
        ],
      },
      {
        heading: 'One idea per post',
        body: [
          'Decide the single message and design around it. A headline of five to eight words, one supporting visual and your logo is often enough. Crowding multiple offers in one image makes none of them land.',
        ],
      },
      {
        heading: 'Visual rules that help',
        body: ['Apply these simple guidelines.'],
        list: [
          'Use large, legible text, at least 36 to 40 pixels in a 1080-wide canvas.',
          'Maintain high contrast between text and background.',
          'Keep key content inside safe zones, away from edges and interface overlays.',
          'Use brand colours and fonts consistently.',
          'Leave space around elements.',
        ],
      },
      {
        heading: 'Make carousels work',
        body: [
          'The first slide should promise value, such as "5 mistakes to avoid on your website". Each slide should carry one point, continue the visual style and end with a call to action: save, share or message. Carousels earn saves when they contain genuinely useful information.',
        ],
      },
      {
        heading: 'Build a template system',
        body: [
          'Create five to seven reusable templates for tips, quotes, projects, offers and announcements. Templates speed production and protect consistency. See our [brand consistency guide](/blog/brand-consistency-across-website-social-print) and [Instagram content calendar](/blog/instagram-content-calendar-for-small-business), or have our [graphic design team](/services/graphic-design) create a template pack.',
        ],
      },
    ],
    faq: [
      { q: 'What size is best for Instagram posts?', a: 'Portrait 1080 by 1350 pixels usually performs well because it takes more screen space.' },
      { q: 'Should I add my logo to every post?', a: 'A small, consistent logo placement builds recognition without dominating the design.' },
      { q: 'Can I use Canva?', a: 'Yes, for templates and quick work. Start from your brand guidelines so results remain consistent.' },
    ],
  },
  {
    slug: 'logo-file-formats-explained',
    title: 'Logo File Formats Explained: SVG, PNG, PDF, AI and When to Use Each',
    description: 'Understand logo file formats and which to use for websites, print, social media and signage, so your brand looks sharp everywhere.',
    keywords: ['logo file formats', 'SVG vs PNG logo', 'vector vs raster', 'logo files for printing'],
    intro: 'A designer delivers a folder with a dozen logo files and no explanation. Knowing what each one is for avoids blurry signboards and slow websites.',
    sections: [
      {
        heading: 'Vector versus raster',
        body: [
          'Vector files are made of mathematical shapes and scale to any size without losing quality, from a pen to a billboard. Raster files are made of pixels and become blurry when enlarged. Logos should always be created as vector first, then exported as raster for specific uses.',
        ],
      },
      {
        heading: 'Common formats and their jobs',
        body: ['Keep each format for the right task.'],
        list: [
          '**SVG:** vector for websites; tiny, sharp and scalable.',
          '**PDF or AI or EPS:** vector masters for printers and designers.',
          '**PNG:** raster with transparent background for social profiles and documents.',
          '**JPG:** raster with solid background for photos; avoid for logos needing transparency.',
          '**WebP:** modern compressed raster for websites.',
        ],
      },
      {
        heading: 'Colour variations to request',
        body: [
          'Ask for full colour, black, white and single-colour versions, plus horizontal, stacked and icon-only layouts. These cover dark backgrounds, stamps, watermarks, small spaces and social avatars.',
        ],
      },
      {
        heading: 'Naming and organising',
        body: [
          'Use clear file names such as brand-logo-horizontal-colour.svg. Store the master files safely, and keep exports in labelled folders for web, print and social. Share the folder with vendors so nobody uses a screenshot from your website.',
        ],
      },
      {
        heading: 'Common mistakes',
        body: [
          'Do not stretch or recolour logos randomly, place them on busy backgrounds or save a low-resolution JPG as a master. If you do not have vector originals, a designer can redraw it. Our [branding service](/services/branding) delivers complete logo packs, and the [logo process article](/blog/logo-design-process-explained) explains the final deliverables.',
        ],
      },
    ],
    faq: [
      { q: 'Which format is best for a website logo?', a: 'SVG for sharpness and small size, with a PNG or WebP fallback if needed.' },
      { q: 'What is a vector file?', a: 'A graphic defined by shapes and paths that can scale infinitely without quality loss.' },
      { q: 'Why is my logo blurry on a banner?', a: 'You probably used a low-resolution raster file. Use the vector master instead.' },
    ],
  },
  {
    slug: 'infographic-design-for-business',
    title: 'Infographic Design for Business: Turn Complex Information into Clear Visuals',
    description: 'Create infographics that people share: choosing a topic, structuring data, visual hierarchy, colour use, accuracy and publishing for SEO.',
    keywords: ['infographic design', 'how to make an infographic', 'data visualisation for business', 'visual content marketing'],
    intro: 'An infographic condenses a process, comparison or set of figures into a single picture. When well done, it is easy to understand, easy to share and attractive to publishers who link to it.',
    sections: [
      {
        heading: 'Choose a topic worth visualising',
        body: [
          'Good topics involve steps, comparisons, timelines or numbers: a project process, a cost breakdown, a checklist. If the topic is a single sentence, a plain post will do. Ask whether the picture explains something faster than text.',
        ],
      },
      {
        heading: 'Structure the story',
        body: [
          'Give the infographic a headline, a clear reading order and a conclusion. Group related information into blocks, use numbers or arrows to guide flow and keep text brief. Remove anything that does not support the main message.',
        ],
      },
      {
        heading: 'Design for comprehension',
        body: ['A few principles make complex data friendly.'],
        list: [
          'Use size and colour to show importance.',
          'Choose the right chart for the data: bars for comparison, lines for change over time.',
          'Limit the palette to three or four colours.',
          'Use icons consistently in one style.',
          'Provide source credits for any statistics.',
        ],
      },
      {
        heading: 'Be accurate',
        body: [
          'Check every figure and cite sources. Do not invent or round numbers misleadingly. One mistake will damage credibility and can embarrass you if others share it.',
        ],
      },
      {
        heading: 'Publish for people and search',
        body: [
          'Place the infographic on a page with an explanatory introduction, text version of the key points, descriptive alt text and an embed option. This helps accessibility and search visibility. Promote it on social platforms and to relevant publishers; see [backlink basics](/blog/backlinks-for-small-business-websites). Need one designed? Contact our [graphic team](/services/graphic-design).',
        ],
      },
    ],
    faq: [
      { q: 'How long should an infographic be?', a: 'Long enough to tell the story, but ideally scannable in a minute. Break long ones into a series.' },
      { q: 'Do infographics help SEO?', a: 'They can attract links and shares when useful and accurate, especially with accompanying text.' },
      { q: 'What tools can I use?', a: 'Design tools such as Figma or Canva work well. Complex data may need a charting tool.' },
    ],
  },
  {
    slug: 'visiting-card-design-ideas',
    title: 'Visiting Card Design: Ideas, Sizes and Mistakes to Avoid',
    description: 'Design a visiting card that people keep: standard sizes in India, layout, QR codes, paper choices, finishes and what information to include.',
    keywords: ['visiting card design', 'business card size India', 'business card ideas', 'QR code business card'],
    intro: 'A visiting card is often the last physical object a potential client touches. It should be simple, readable and quietly impressive.',
    sections: [
      {
        heading: 'Standard sizes and orientation',
        body: [
          'The common Indian size is 3.5 by 2 inches (about 90 by 50 mm). Using a standard size ensures the card fits wallets and card holders. Horizontal layouts are the most familiar; vertical cards can feel distinctive but may be less convenient to store.',
        ],
      },
      {
        heading: 'What to include',
        body: ['Prioritise information clearly.'],
        list: [
          'Name and role in the largest text.',
          'Business name and logo.',
          'One main phone number and WhatsApp if used.',
          'Email and website.',
          'Address only if clients visit you.',
          'A QR code linking to a useful page or contact file.',
        ],
      },
      {
        heading: 'Keep it readable',
        body: [
          'Text under 7 or 8 points becomes hard to read in print. Use enough contrast and avoid crowded layouts. Leave generous margins and keep contact details aligned. Use the back side for services, a map or a clean brand pattern rather than cramming everything on one side.',
        ],
      },
      {
        heading: 'Paper, finish and cost',
        body: [
          'Thicker stock feels more substantial. Matte lamination looks refined, spot UV adds emphasis to a logo and textured paper adds character. Fancy finishes increase cost, so choose one that suits your brand and budget. Ask for a sample before ordering a large quantity.',
        ],
      },
      {
        heading: 'Make it work digitally',
        body: [
          'Link the QR code to a short page on your website that includes your services and a click-to-save contact. Track visits with a tagged link. Consistent design across card, website and social profiles strengthens your brand. See our [graphic design service](/services/graphic-design) and [brand consistency guide](/blog/brand-consistency-across-website-social-print).',
        ],
      },
    ],
    faq: [
      { q: 'How many cards should I print?', a: 'A first run of 250 to 500 is enough for most professionals. Update details before large reprints.' },
      { q: 'Should I use both sides?', a: 'Yes. Use one side for essential contact details and the other for brand or services.' },
      { q: 'Is a QR code necessary?', a: 'It is optional but convenient, especially if it links to your portfolio or WhatsApp.' },
    ],
  },
  {
    slug: 'presentation-design-for-pitch-decks',
    title: 'Presentation Design for Pitch Decks: Slides That Persuade',
    description: 'Create clear, persuasive presentations: story structure, slide layout, fonts, charts, imagery and delivery tips for sales and investor pitches.',
    keywords: ['presentation design', 'pitch deck design', 'PowerPoint design tips', 'sales presentation layout'],
    intro: 'Slides should support a spoken story, not replace it. The best decks are simple enough to follow at a glance and memorable enough to be forwarded after the meeting.',
    sections: [
      {
        heading: 'Begin with the story',
        body: [
          'Outline the narrative first: the problem, your solution, proof, how it works, pricing or terms and the next step. Each slide should answer one question. If you cannot state the point of a slide in one sentence, split or remove it.',
        ],
      },
      {
        heading: 'Design principles for slides',
        body: ['Keep every slide light.'],
        list: [
          'One message per slide with a clear headline.',
          'Minimum 24 point text; avoid dense paragraphs.',
          'Consistent layout, colours and fonts from your brand guide.',
          'High-quality images instead of clip art.',
          'Plenty of white space.',
        ],
      },
      {
        heading: 'Charts and numbers',
        body: [
          'Show one key figure per chart and highlight it. Remove gridlines and clutter. Label axes clearly and cite sources. When comparing options, use a simple table or bar chart rather than a complex diagram.',
        ],
      },
      {
        heading: 'Make it work when forwarded',
        body: [
          'Decision-makers often read decks without you present. Include enough text in notes or a brief summary slide so the deck stands alone. Export a compact PDF that opens quickly on mobile for WhatsApp sharing.',
        ],
      },
      {
        heading: 'Practise and refine',
        body: [
          'Run through the deck aloud, timing yourself, and cut slides that slow the story. Ask a colleague to watch with no briefing and note where they got confused. For a professionally designed deck, see our [graphic design services](/services/graphic-design) and our [brand style guide article](/blog/how-to-create-a-brand-style-guide).',
        ],
      },
    ],
    faq: [
      { q: 'How many slides should a pitch have?', a: 'Often 10 to 15, but fewer for short meetings. Focus on clarity over count.' },
      { q: 'Which software is best?', a: 'PowerPoint, Keynote and Google Slides all work. Choose what your audience can open easily.' },
      { q: 'Should I use animations?', a: 'Sparingly. Simple transitions are fine; heavy effects distract.' },
    ],
  },
  {
    slug: 'image-optimisation-for-websites-designers',
    title: 'Preparing Images for Websites: Sizes, Formats and Compression for Designers',
    description: 'Export web images correctly: choosing WebP or AVIF, resizing, compression targets, responsive sizes, alt text and naming for faster websites.',
    keywords: ['optimise images for web', 'WebP vs JPG', 'image compression', 'responsive images'],
    intro: 'Images are usually the heaviest part of a web page. Handled well, they look sharp and load fast. Handled badly, they ruin speed and search performance.',
    sections: [
      {
        heading: 'Resize before upload',
        body: [
          'A photo straight from a phone can be 4000 pixels wide and several megabytes, yet it is displayed at 800 pixels. Resize to the largest size it will actually appear, with allowance for high-density screens, usually about twice the display width at most.',
        ],
      },
      {
        heading: 'Choose the right format',
        body: ['Each format has a role.'],
        list: [
          '**WebP and AVIF:** modern formats with much smaller files at similar quality.',
          '**JPG:** good fallback for photographs.',
          '**PNG:** for images needing transparency or sharp edges.',
          '**SVG:** for logos, icons and simple illustrations.',
        ],
      },
      {
        heading: 'Compress sensibly',
        body: [
          'Aim for hero images under roughly 200 KB and standard content images under 100 KB where quality allows. Compare before and after at full size; reduce quality until you notice artefacts, then step back. Tools and build systems can automate this.',
        ],
      },
      {
        heading: 'Serve responsive images',
        body: [
          'Offer different sizes for different screens so phones do not download desktop-sized files. Use lazy loading for images below the fold, but not for the main hero image, which should load first. Specify width and height to prevent layout shifts.',
        ],
      },
      {
        heading: 'Name and describe them',
        body: [
          'Use descriptive file names like website-design-ahmedabad-project.webp and write meaningful alt text. These help accessibility and image search. Learn how images affect [Core Web Vitals](/blog/core-web-vitals-explained-for-business-owners) and [page speed](/blog/why-nextjs-websites-rank-faster), or have our [team](/services/website-design-ahmedabad) build an optimised site.',
        ],
      },
    ],
    faq: [
      { q: 'Is WebP supported everywhere?', a: 'Support is broad in modern browsers. AVIF is also widely supported, with fallbacks available when needed.' },
      { q: 'How big should a hero image be?', a: 'Typically 1600 to 2000 pixels wide for large screens, compressed to a few hundred kilobytes or less.' },
      { q: 'Should I lazy load every image?', a: 'No. Load above-the-fold images immediately and lazy load the rest.' },
    ],
  },
  {
    slug: 'working-with-a-designer-contracts-and-ownership',
    title: 'Working With a Designer: Contracts, Ownership and Fair Revisions',
    description: 'What to agree in writing with a designer or agency: scope, payment milestones, revisions, copyright, source files, credits and timelines.',
    keywords: ['designer contract', 'design copyright ownership India', 'design project scope', 'revisions policy'],
    intro: 'Most design disputes come from unclear expectations, not bad intentions. A short, friendly written agreement protects both sides and makes the work smoother.',
    sections: [
      {
        heading: 'Define the scope precisely',
        body: [
          'List what is included: deliverables, formats, number of concepts, number of revision rounds and the stages. State what is not included, such as printing, stock images, fonts or additional sizes. Precise scope avoids arguments when requests grow.',
        ],
      },
      {
        heading: 'Agree payment and timelines',
        body: ['A fair structure looks like this.'],
        list: [
          'A deposit to start, often 30 to 50 percent.',
          'Milestone payments tied to delivery stages.',
          'A final payment before source files are released.',
          'Timelines for both delivery and client feedback.',
          'What happens if either party delays.',
        ],
      },
      {
        heading: 'Revisions and feedback rules',
        body: [
          'Define a revision round as a consolidated set of comments from the client. Additional rounds can be charged at an agreed rate. This encourages thoughtful feedback and keeps the project moving.',
        ],
      },
      {
        heading: 'Ownership and usage rights',
        body: [
          'Clarify who owns the final work and when ownership transfers, normally on full payment. Check whether the designer may show the work in a portfolio. Confirm that fonts, stock images and other third-party elements are licensed for your intended use, especially commercial use and print runs.',
        ],
      },
      {
        heading: 'Source files and handover',
        body: [
          'Ask for editable source files and exports at the end. Request brand colours and font names. Keep copies in your own storage. For clear processes and transparent terms, [talk to PK Creative](/contact) about our [graphic design](/services/graphic-design) or [branding](/services/branding) work.',
        ],
      },
    ],
    faq: [
      { q: 'Do I need a lawyer for a design contract?', a: 'A simple written agreement is usually enough for small projects. Use legal advice for high-value or complex work.' },
      { q: 'Can a designer reuse my design for others?', a: 'Not unless the agreement allows it. Custom work should be unique to you.' },
      { q: 'What if I am unhappy with the result?', a: 'Refer to the brief and agreed revisions, give specific feedback and discuss options early.' },
    ],
  },
];
