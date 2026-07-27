import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { categories, getCategory, productsInCategory, type CategorySlug } from '@/data/catalogue';
import { copy } from '@/lib/copy';
import { breadcrumbSchema } from '@/lib/seo';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const title = `${category.name} Manufacturers in Coimbatore`;

  return {
    title,
    description: `${category.summary} Manufactured by ${site.name} in Coimbatore and supplied wholesale across India.`,
    alternates: { canonical: `/products/${category.slug}/` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: category.summary,
      url: `/products/${category.slug}/`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsInCategory(category.slug as CategorySlug);

  const trail = [
    { label: copy.nav.home, href: '/' },
    { label: copy.products.title, href: '/products/' },
    { label: category.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Breadcrumbs trail={trail} />
      </div>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-4 sm:px-8">
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="h-7 w-1 rounded-full"
            style={{ backgroundColor: `var(${category.colorToken})` }}
          />
          <p className="font-display text-xs tracking-[0.24em] text-ink-400 uppercase">
            {copy.products.title}
          </p>
        </div>

        <h1 className="mt-6 max-w-2xl font-display text-[length:var(--text-hero)] leading-[1.05] font-semibold text-ink-900">
          {category.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-[1.75] text-ink-500">{category.summary}</p>
        <p className="mt-7 text-sm text-ink-400">{copy.products.priceOnRequest}</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 50}>
              <ProductCard product={product} categorySlug={category.slug} priority={i < 3} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
