import type { MetadataRoute } from 'next';

import { categories, products } from '@/data/catalogue';
import { site } from '@/lib/site';

/** Metadata routes compile to route handlers, which must be static to export. */
export const dynamic = 'force-static';

/**
 * Generated sitemap.
 *
 * The old deployment had none, and because every URL was rewritten to
 * index.html a request for /sitemap.xml answered 200 with the homepage.
 *
 * Built from the catalogue, so adding a product to data/catalogue.ts puts it in
 * the sitemap automatically rather than relying on someone remembering.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const lastModified = new Date();

  return [
    { url: url('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: url('/products/'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...categories.map((category) => ({
      url: url(`/products/${category.slug}/`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: url(`/products/${product.category}/${product.slug}/`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: url('/about/'), lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: url('/contact/'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
