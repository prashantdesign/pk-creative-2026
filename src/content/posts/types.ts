export type PostSection = { heading: string; body: string[]; list?: string[] };

/** What we write by hand for each article. Dates, read time and related links are derived. */
export type RawPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  sections: PostSection[];
  /** Short Q&A shown at the end of the article and emitted as FAQPage schema */
  faq?: { q: string; a: string }[];
};

export type Extra = { sections?: PostSection[]; faq?: { q: string; a: string }[] };

export type Post = RawPost & {
  date: string;
  readMinutes: number;
  related: { label: string; href: string }[];
};
