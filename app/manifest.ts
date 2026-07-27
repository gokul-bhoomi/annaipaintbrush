import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

/**
 * Web app manifest, generated rather than hand-maintained.
 *
 * The old public/manifest.json was the untouched Create React App default:
 * short_name "React App", name "Create React App Sample", a black theme colour
 * and a single 64px favicon as its only icon.
 */

/**
 * Metadata files compile to route handlers, and `output: 'export'` requires
 * every route handler to declare itself static. Same applies to sitemap.ts and
 * robots.ts in the SEO phase.
 */
export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.tagline}`,
    short_name: site.name,
    description:
      'Manufacturers and wholesalers of premium paint brushes, paint rollers, art brushes and putty knives in Coimbatore.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcfb',
    theme_color: '#c6401d',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
