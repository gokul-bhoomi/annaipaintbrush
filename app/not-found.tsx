import Link from 'next/link';

import { categories } from '@/data/catalogue';
import { copy } from '@/lib/copy';

/**
 * Real 404 page.
 *
 * The old deployment rewrote every unmatched URL to index.html and answered
 * 200, so /sitemap.xml and any typo returned the homepage and looked like a
 * live page to a crawler. With a static export each route is a real file and
 * Firebase serves this for anything else (see the cleanUrls / no-catch-all
 * rewrite setup in firebase.json).
 */
export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-2xl flex-col justify-center px-5 py-24 sm:px-8">
      <p className="font-display text-xs tracking-[0.24em] text-ink-400 uppercase">Error 404</p>

      <h1 className="mt-6 font-display text-[length:var(--text-section)] leading-[1.1] font-semibold text-ink-900">
        {copy.common.notFoundTitle}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-ink-500">{copy.common.notFoundLead}</p>

      <div className="mt-9">
        <Link
          href="/products/"
          className="rounded-full bg-ink-900 px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-ink-800"
        >
          {copy.common.notFoundCta}
        </Link>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-8 text-sm">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/products/${category.slug}/`}
              className="text-ink-500 transition-colors hover:text-brand-700"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
