import Link from 'next/link';

import ResponsiveImage from '@/components/ResponsiveImage';
import type { Product } from '@/data/catalogue';

/**
 * Product tile used on the products index and the category pages.
 *
 * Deliberately borderless, with the photograph running full bleed. Small
 * thumbnails inside framed cards were one of the things that made the earlier
 * design read as a marketplace listing rather than a manufacturer's own site.
 */
export default function ProductCard({
  product,
  categorySlug,
  priority = false,
}: {
  product: Product;
  categorySlug: string;
  priority?: boolean;
}) {
  const cover = product.variants[0];
  const sizeLabel =
    product.variants.length > 1
      ? `${product.variants.length} sizes`
      : product.variants[0].size;

  return (
    <Link href={`/products/${categorySlug}/${product.slug}/`} className="group block">
      <div className="aspect-4/5 overflow-hidden rounded-lg bg-surface-2">
        <ResponsiveImage
          src={`products/${cover.sourceImage}`}
          alt={`${product.name}, ${cover.size}`}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          priority={priority}
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.05rem] font-semibold transition-colors group-hover:text-brand-700">
          {product.name}
        </h3>
        <span className="shrink-0 text-xs tracking-wide text-ink-400">{sizeLabel}</span>
      </div>

      <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-500">{product.summary}</p>
    </Link>
  );
}
