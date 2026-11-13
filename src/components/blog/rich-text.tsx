import React from 'react';
import Link from 'next/link';

/** Tiny inline renderer: [label](/path) links and **bold**. Keeps article data as plain strings. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return /^https?:/.test(href) ? (
            <a key={i} href={href} rel="noopener" className="font-medium text-primary underline underline-offset-4">{label}</a>
          ) : (
            <Link key={i} href={href} className="font-medium text-primary underline underline-offset-4">{label}</Link>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-foreground">{bold[1]}</strong>;
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

export const slugifyHeading = (h: string) =>
  h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
