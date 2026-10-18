/**
 * Adds Cloudinary delivery transforms (auto format -> AVIF/WebP, auto quality, max width) to
 * Cloudinary URLs so the browser downloads a fraction of the original bytes.
 * Non-Cloudinary URLs (and URLs that already carry transforms) are returned untouched.
 */
export function optimizeImageUrl(url: string | undefined | null, width = 900): string {
  url = normalizeImageUrl(url, width);
  if (!url) return '';
  const marker = '/image/upload/';
  if (!url.includes('res.cloudinary.com') || !url.includes(marker)) return url;
  const [head, tail] = url.split(marker);
  if (/^(?:[a-z]{1,3}_[^/,]+,?)+\//.test(tail)) return url; // already transformed
  return `${head}${marker}f_auto,q_auto,c_limit,w_${width}/${tail}`;
}

/**
 * Turns pasted Google Drive share links (drive.google.com/file/d/ID/view, open?id=ID, uc?id=ID ...)
 * into a direct image URL the browser can render. The file must be shared as "Anyone with the link".
 * Any other URL is returned unchanged.
 */
export function normalizeImageUrl(url: string | undefined | null, width = 1600): string {
  if (!url) return '';
  const u = url.trim();
  if (!/^https?:\/\/(drive|docs)\.google\.com\//i.test(u)) return u;
  const id = u.match(/\/d\/([\w-]{10,})/)?.[1] || u.match(/[?&]id=([\w-]{10,})/)?.[1];
  return id ? `https://lh3.googleusercontent.com/d/${id}=w${width}` : u;
}

const OPTIMIZER_WIDTHS = [16, 32, 48, 64, 96, 128, 256, 360, 384, 512, 640, 768, 800, 1024, 1280, 1536, 1920]; // must match next.config.ts images sizes

/**
 * For plain <img> tags. Google Drive images are fetched through the site's own image optimizer
 * (/_next/image) so they are resized, converted to AVIF/WebP and cached on the CDN instead of being
 * pulled at full size from Google on every visit. Other URLs behave like optimizeImageUrl.
 * (Do not use with next/image: it already optimizes remote images itself.)
 */
export function imgSrc(url: string | undefined | null, width = 900): string {
  const normalized = normalizeImageUrl(url, 1600);
  if (!normalized.startsWith('https://lh3.googleusercontent.com/')) return optimizeImageUrl(url, width);
  const w = OPTIMIZER_WIDTHS.find((x) => x >= width) ?? 1920;
  return `/_next/image?url=${encodeURIComponent(normalized)}&w=${w}&q=75`;
}
