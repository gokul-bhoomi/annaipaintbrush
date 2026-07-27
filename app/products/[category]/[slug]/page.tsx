import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import Reveal from '@/components/Reveal';
import { getCategory, getProduct, products, productsInCategory } from '@/data/catalogue';
import { copy } from '@/lib/copy';
import { breadcrumbSchema, productSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

/** One page per product family: 18 in total, across the four categories. */
export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const sizes = product.variants.map((v) => v.size).join(', ');
  const title = `${product.name} | ${sizes}`;

  return {
    title,
    description: `${product.summary} Manufactured by ${site.name}, Coimbatore. Available in ${sizes}.`,
    keywords: product.keywords,
    alternates: { canonical: `/products/${product.category}/${product.slug}/` },
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description: product.summary,
      url: `/products/${product.category}/${product.slug}/`,
      type: 'website',
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  if (!category) notFound();

  const related = productsInCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const trail = [
    { label: copy.nav.home, href: '/' },
    { label: copy.products.title, href: '/products/' },
    { label: category.name, href: `/products/${category.slug}/` },
    { label: product.name },
  ];

  const enquiry = `Hello, I'd like to enquire about the ${product.name}.`;

  return (
    <>
      <JsonLd data={productSchema(product, category)} />
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Breadcrumbs trail={trail} />
      </div>

      <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery: every size variant is a real photograph, so the size
              selector doubles as the image switcher. */}
          <ProductGallery product={product} />

          <div className="lg:pt-4">
            <p className="font-display text-xs tracking-[0.24em] text-ink-400 uppercase">
              <Link href={`/products/${category.slug}/`} className="hover:text-brand-700">
                {category.name}
              </Link>
            </p>

            <h1 className="mt-5 font-display text-[length:var(--text-section)] leading-[1.1] font-semibold text-ink-900">
              {product.name}
            </h1>

            <p className="mt-5 text-lg leading-[1.7] text-ink-600">{product.summary}</p>

            <div className="mt-8 border-t border-line pt-8">
              <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
                {copy.products.sizesAvailable}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <li
                    key={variant.size}
                    className="rounded-full border border-line px-4 py-2 text-sm text-ink-700"
                  >
                    {variant.size}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-line pt-8">
              <p className="text-[1.0625rem] leading-[1.75] text-ink-600">{product.description}</p>
            </div>

            <div className="mt-10 rounded-xl bg-surface p-7">
              <p className="font-display text-lg font-semibold text-ink-900">
                {copy.products.priceOnRequest}
              </p>
              <p className="mt-2 text-[0.95rem] text-ink-500">
                Wholesale and retail enquiries both welcome.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl(enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink-900 px-6 py-3 text-[0.9rem] font-medium text-paper transition-colors hover:bg-ink-800"
                >
                  {copy.products.enquireProduct}
                </a>
                <a
                  href={`tel:${site.phones[0].e164}`}
                  className="rounded-full border border-ink-300 px-6 py-3 text-[0.9rem] font-medium text-ink-800 transition-colors hover:border-ink-900"
                >
                  {site.phones[0].display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="border-b border-line pb-6 font-display text-[1.6rem] font-semibold">
            {copy.products.relatedTitle}
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 50}>
                <ProductCard product={item} categorySlug={category.slug} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
