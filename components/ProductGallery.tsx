'use client';

import { useState } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import type { Product } from '@/data/catalogue';

/**
 * Product gallery with a size selector.
 *
 * Every size variant has its own photograph, so choosing a size also changes
 * the image. That replaces the old lightbox, which opened a full-size JPEG in a
 * Materialize modal driven by a global `M.AutoInit()` and had no keyboard
 * handling at all.
 *
 * Single-size products render just the image, with no redundant selector.
 */
export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const variant = product.variants[active];

  return (
    <div>
      <div className="aspect-4/5 overflow-hidden rounded-xl bg-surface-2">
        <ResponsiveImage
          /* Keyed so React swaps the element rather than mutating src, which
             avoids briefly showing the previous photo at the new size. */
          key={variant.sourceImage}
          src={`products/${variant.sourceImage}`}
          alt={`${product.name}, ${variant.size}`}
          sizes="(max-width: 1024px) 92vw, 520px"
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {product.variants.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6">
          {product.variants.map((v, i) => (
            <button
              key={v.sourceImage}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${product.name}, ${v.size}`}
              aria-current={i === active}
              className={`aspect-square overflow-hidden rounded-lg bg-surface-2 transition-all ${
                i === active
                  ? 'ring-2 ring-ink-900 ring-offset-2 ring-offset-paper'
                  : 'opacity-65 hover:opacity-100'
              }`}
            >
              <ResponsiveImage
                src={`products/${v.sourceImage}`}
                alt=""
                sizes="90px"
                className="h-full w-full object-cover"
                placeholder={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
