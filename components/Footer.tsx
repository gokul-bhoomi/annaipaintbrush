import Link from 'next/link';

import Logo from '@/components/Logo';
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
            {/*
              Full lockup here, and 76px specifically.
              The descriptor is 10 units inside a 69-unit viewBox, so it scales
              with the lockup: at 48px it renders at 7px and at 40px at 5.8px,
              both unreadable. 76px puts it at 11px. This is the smallest the
              full lockup can be and still earn its second line, which is also
              why the header uses the compact variant instead.
            */}
            <Logo variant="full" className="h-[76px]" />
            <p className="mt-4 text-sm text-brand-700">{site.tagline}</p>
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
          <p className="flex items-center gap-1.5">
            Made with
            <span role="img" aria-label="love">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-brand-600"
                aria-hidden="true"
              >
                <path d="M12 21s-7.5-4.7-9.5-9A5.3 5.3 0 0 1 12 6.6 5.3 5.3 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z" />
              </svg>
            </span>
            by
            <a
              href={site.social.developer}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-600 underline decoration-line underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-600"
            >
              Gokul
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
