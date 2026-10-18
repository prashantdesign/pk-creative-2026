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
