import { imageUrl } from '@/components/ResponsiveImage';
import type { Category, Product } from '@/data/catalogue';
import { site } from '@/lib/site';

/**
 * JSON-LD builders.
 *
 * The old site emitted no structured data at all. For a local manufacturer,
 * LocalBusiness plus Product markup is the difference between appearing as a
 * plain blue link and appearing with an address, hours and a phone number.
 *
 * Everything reads from lib/site.ts and data/catalogue.ts, so the markup cannot
 * drift away from what the pages actually say.
 */

const absolute = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absolute('/#business'),
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    email: site.email,
    telephone: site.phones.map((p) => p.e164),
    description:
      'Manufacturers and wholesalers of premium paint brushes, paint rollers, art brushes and putty knives in Coimbatore, supplying across India.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.locality,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.hours.days.map((d) => `https://schema.org/${d}`),
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    /**
     * `foundingDate` is deliberately omitted. It used to be set to 2016, which
     * is the start of the footer copyright range rather than the year the
     * business began, and publishing that as structured data would tell search
     * engines this is a ten year old company when the About copy says over
     * twenty years. Restore it once the real year is confirmed.
     */
  };
}

export function breadcrumbSchema(trail: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absolute(crumb.href) } : {}),
    })),
  };
}

export function productSchema(product: Product, category: Category) {
  const images = product.variants
    .map((v) => imageUrl(`products/${v.sourceImage}`, site.url))
    .filter((url): url is string => Boolean(url));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images,
    category: category.name,
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': absolute('/#business') },
    /**
     * No price is published: the business quotes wholesale rates on enquiry.
     * Declaring the offer without a price is honest and still tells search
     * engines the item is available, whereas inventing a figure would not be.
     */
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@id': absolute('/#business') },
      url: absolute(`/products/${category.slug}/${product.slug}/`),
    },
    ...(product.variants.length > 1
      ? {
          hasVariant: product.variants.map((v) => ({
            '@type': 'Product',
            name: `${product.name} ${v.size}`,
          })),
        }
      : {}),
  };
}
