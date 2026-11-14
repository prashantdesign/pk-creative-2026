import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { getCategory } from '@/content/categories';
import type { BlogPost } from '@/lib/posts';

export default function PostCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const cat = getCategory(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ ['--i' as string]: Math.min(index, 8) }}
      className="card-rise hover-lift group flex flex-col gap-3 rounded-3xl border border-border bg-secondary/20 p-6 transition-colors hover:border-primary/40 sm:p-7"
    >
      <span className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-wide text-primary">{cat?.name}</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden />{post.readMinutes} min read</span>
      </span>
      <h2 className="font-headline text-lg font-bold leading-snug group-hover:text-primary sm:text-xl">{post.title}</h2>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
        Read guide <ArrowUpRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}
