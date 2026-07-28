import type { Metadata } from 'next';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import ResponsiveImage from '@/components/ResponsiveImage';
import { totalVariantCount } from '@/data/catalogue';
import { copy } from '@/lib/copy';
import { breadcrumbSchema, organizationSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const trail = [{ label: copy.nav.home, href: '/' }, { label: copy.nav.about }];

export const metadata: Metadata = {
  title: 'About Us',
  description: `${site.name} has manufactured paint brushes, rollers and painting tools for over twenty years, from a factory in Madurai district and a base in ${site.address.city}.`,
  alternates: { canonical: '/about/' },
  openGraph: {
    title: `About Us | ${site.name}`,
    description: 'Over twenty years of manufacturing paint brushes and tools in Tamil Nadu.',
    url: '/about/',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Breadcrumbs trail={trail} />
      </div>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8">
        <h1 className="max-w-3xl font-display text-[length:var(--text-hero)] leading-[1.05] font-semibold text-ink-900">
          {copy.home.aboutTitle}
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-ink-600">
            <p className="text-xl leading-[1.7] text-ink-800">
              We are manufacturers and wholesalers of paint brushes, rollers and painting tools,
              based in {site.address.locality}, {site.address.city}.
            </p>
            <p>
              Our factory in Madurai district runs on the skill of a workforce that has been with us
              for years. We make the tools ourselves rather than buying them in and putting a label
              on them, which is what lets us hold the quality steady from one batch to the next.
            </p>
            <p>
              That has earned the trust of painters across Tamil Nadu over twenty years, and we now
              supply orders throughout India, to hardware shops, dealers and contractors as well as
              to painters buying for themselves.
            </p>
            <p>
              The range runs to {totalVariantCount} products and sizes: Milk White wall brushes,
              Touch Wood brushes for timber, Tapper brushes across six widths, interior, exterior,
              epoxy and enamel rollers, putty and Altek blades, Patta Uli, and art brushes in round
              and flat.
            </p>
            <p>
              We quote prices on enquiry rather than publishing them, because what we can do on a
              price depends on the size of the order.{' '}
              <Link
                href="/contact/"
                className="text-ink-900 underline decoration-line underline-offset-4 transition-colors hover:decoration-brand-600"
              >
                Get in touch
              </Link>{' '}
              and we will come back to you.
            </p>
          </div>

          <Reveal delay={80}>
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  src: 'products/ANNAI PREMIUM MILK WHITE 4 INCH',
                  alt: 'Annai Premium Milk White four inch wall brush with a green handle and brass ferrule',
                  className: '',
                },
                {
                  src: 'products/SET BRUSH',
                  alt: 'A set of Annai art brushes fanned out, with long pale wooden handles',
                  className: 'mt-12',
                },
                {
                  src: 'products/ACRYLIC INTERIOR 9 INCH',
                  alt: 'Annai nine inch acrylic interior roller with a yellow handle',
                  className: '',
                },
                {
                  src: 'products/PUTTY BLADE 2 INCH TO 12 INCH',
                  alt: 'Annai putty blade, used for filling and levelling a wall',
                  className: 'mt-12',
                },
              ].map((image) => (
                <div
                  key={image.src}
                  className={`aspect-3/4 overflow-hidden rounded-lg bg-surface-2 ${image.className}`}
                >
                  <ResponsiveImage
                    src={image.src}
                    alt={image.alt}
                    sizes="(max-width: 1024px) 45vw, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
