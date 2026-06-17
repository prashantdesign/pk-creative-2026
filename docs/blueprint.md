# **App Name**: PK Design Studio

## Core Features:

- Dynamic Hero Section: Admin-editable hero title, subtitle, and CTA button to highlight key offerings and drive conversions. Section visibility is also admin controlled.
- Interactive About Section: Display skills, expertise, and experience. Admin control to edit biography text, stats, and toolsets.
- Portfolio Gallery with Categories: Create an elegant portfolio display based on category, with project cards and links. Provide a project title, image previews, short descriptions and category tags to each project.
- Contact Form: Enable potential clients to send professional inquiries. Messages saved to Firestore, can view from Admin Panel.
- Hidden Admin Dashboard: Require authentication to view the admin dashboard which contains full website controls via unique URL hash, auto-logout and protected routes for extra security.
- Project Description Generator: An AI powered tool generates project descriptions by using the title, category and tools.
- Real-time Content Synchronization: Real-time synchronization powered by Firebase to instantly update all portfolio contents with no extra steps.
- Detailed Project Modal: Displays carousels of images for each project and admin options for reordering.

## Style Guidelines:

- Primary color: Soft purple (#A89CC8) to convey creativity and sophistication, reflecting the graphic design focus.
- Background color: Light gray (#F0F2F5) providing a minimalist backdrop that allows the portfolio pieces to stand out.
- Accent color: Deep blue (#3B5998) adds a professional and trustworthy touch, complementary to the purple primary.
- Font: 'Inter' (sans-serif) for a clean, clear, and modern aesthetic.
- Clear hierarchy: Hero headlines stand out in bold, extra-large sizing; section titles are presented in semi-bold; and body text is rendered in regular weight with a muted gray tone for effortless reading.
- Crisp, minimalist icons that complement the professional aesthetic and highlight key skills.
- Mobile-first, minimalist layout with a clean grid alignment, large spacing, and generous whitespace.
- Subtle scroll-reveal animations (fade-in, slide-up), smooth hover effects, and button micro-interactions using CSS + IntersectionObserver.