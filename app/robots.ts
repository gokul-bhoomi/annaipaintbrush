import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Points crawlers at the generated sitemap, which the old robots.txt did not do
 * because there was no sitemap to point at.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  };
}
