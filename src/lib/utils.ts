import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertGoogleDriveLink(url: string): string {
  if (url && url.includes('drive.google.com/file/d/')) {
    const parts = url.split('/d/');
    if (parts.length > 1) {
      const fileId = parts[1].split('/')[0];
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    }
  }
  return url;
}
