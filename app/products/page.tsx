import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { categories, productsInCategory } from '@/data/catalogue';
import { copy } from '@/lib/copy';
import { breadcrumbSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const trail = [{ label: copy.nav.home, href: '/' }, { label: copy.products.title }];

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Paint brushes, art brushes, paint rollers and putty knives manufactured by Annai Paint Brush in Coimbatore. Wholesale supply across India.',
  alternates: { canonical: '/products/' },
  openGraph: {
    title: `Our Products | ${site.name}`,
    description:
      'Paint brushes, art brushes, paint rollers and putty knives manufactured in Coimbatore.',
    url: '/products/',
    type: 'website',
  },
};

/**
 * Products index.
 *
 * The old site kept all 30 items behind a single `/ourproducts` URL, with the
 * category chosen by React context state. Nothing below that URL was reachable
 * or indexable. Here every category and every product family has its own page.
 */
export default function ProductsIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Breadcrumbs trail={trail} />
      </div>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:px-8">
        <h1 className="max-w-2xl font-display text-[length:var(--text-hero)] leading-[1.05] font-semibold text-ink-900">
          {copy.products.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-[1.75] text-ink-500">{copy.products.lead}</p>
        <p className="mt-7 text-sm text-ink-400">{copy.products.priceOnRequest}</p>
      </section>

      {categories.map((category) => {
        const items = productsInCategory(category.slug);

        return (
          <section key={category.slug} className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-6">
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="h-6 w-1 rounded-full"
                    style={{ backgroundColor: `var(${category.colorToken})` }}
                  />
                  <h2 className="font-display text-[1.6rem] font-semibold">
                    <Link
                      href={`/products/${category.slug}/`}
                      className="transition-colors hover:text-brand-700"
                    >
                      {category.name}
                    </Link>
                  </h2>
                </div>
                <p className="max-w-md text-[0.925rem] leading-relaxed text-ink-500">
                  {category.summary}
                </p>
              </div>
            </Reveal>

            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product, i) => (
                <Reveal as="li" key={product.slug} delay={i * 50}>
                  <ProductCard
                    product={product}
                    categorySlug={category.slug}
                    priority={category.legacyChoice === 1 && i < 4}
                  />
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
