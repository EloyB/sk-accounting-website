import type { MetadataRoute } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'SK Accounting',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#034c22',
    lang: 'nl-BE',
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  }
}
