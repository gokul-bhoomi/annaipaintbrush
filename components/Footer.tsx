import Link from 'next/link';

import { categories } from '@/data/catalogue';
import { copy } from '@/lib/copy';
import { site } from '@/lib/site';

/**
 * Replaces the old single-line footer, which held a copyright and an absolutely
 * positioned developer credit. Real footers carry internal links, which helps
 * visitors and crawlers reach every category page from anywhere on the site.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-base font-semibold text-ink-900">{site.name}</p>
            <p className="mt-1 text-sm text-brand-700">{site.tagline}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-500">
              Manufacturers of paint brushes, rollers and painting tools in {site.address.city},
              supplying across India.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
              {copy.products.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}/`}
                    className="text-sm text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
              {copy.contact.title}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {site.phones.map((phone) => (
                <li key={phone.e164}>
                  <a
                    href={`tel:${phone.e164}`}
                    className="text-ink-600 transition-colors hover:text-brand-700"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-ink-600 transition-colors hover:text-brand-700"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-ink-500">
                {site.address.locality}, {site.address.city}
              </li>
              <li className="text-ink-500">{copy.contact.hoursValue}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 text-sm text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightFrom}
            {'–'}
            {year} {site.name}
          </p>
          <a
            href={site.social.developer}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink-600"
          >
            Built by Gokul Kumar
          </a>
        </div>
      </div>
    </footer>
  );
}
