import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PK Creative Admin',
    short_name: 'PK Admin',
    description: 'PK Creative Admin Panel',
    start_url: '/pk-admin',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/admin-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/admin-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
