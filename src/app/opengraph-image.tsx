import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'PK Creative | Website Design, Branding & SEO Agency in India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: 'white',
          background: 'linear-gradient(135deg, #0b0b12 0%, #1a0f3d 55%, #612af5 130%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          PK<span style={{ color: '#9b7bff' }}>.</span>Creative
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, maxWidth: 980 }}>
            Creative solutions for modern brands.
          </div>
          <div style={{ fontSize: 34, color: '#c9c3e6' }}>
            Website Design • UI/UX • Branding • SEO • Social Media
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30, color: '#c9c3e6' }}>
          <span>pkcreative.in</span>
          <span style={{ color: '#9b7bff', fontWeight: 700 }}>Websites from ₹10,000</span>
        </div>
      </div>
    ),
    size
  );
}
