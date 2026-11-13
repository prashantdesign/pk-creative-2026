import { ImageResponse } from 'next/og';
import { POSTS, getPost } from '@/lib/posts';
import { getCategory } from '@/content/categories';

export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'PK Creative guide';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  const title = post?.title || 'PK Creative';
  const category = post ? getCategory(post.category)?.name : '';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, color: 'white', background: '#0b0b12' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 34, fontWeight: 800 }}>
          <span>PK Creative</span>
          <span style={{ color: '#a58bff', fontSize: 28 }}>{category}</span>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 70 ? 54 : 64, fontWeight: 800, lineHeight: 1.12, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 28, color: '#b9b4d6' }}>pkcreative.in/blog</div>
      </div>
    ),
    size
  );
}
