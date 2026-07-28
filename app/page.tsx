import type { Metadata } from 'next';
import Link from 'next/link';

import HeroShowcase from '@/components/HeroShowcase';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import ResponsiveImage from '@/components/ResponsiveImage';
import { categories, products } from '@/data/catalogue';
import { testimonials } from '@/data/testimonials';
import { copy } from '@/lib/copy';
import { organizationSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

/**
 * Homepage.
 *
 * DESIGN NOTE
 * An earlier version read as a B2B marketplace listing rather than a
 * manufacturer's own site. The specific tells, all removed here:
 *   - a stats badge row (20+ / 30 / Pan-India) under the hero
 *   - per-category item counts ("6 PRODUCTS")
 *   - small product thumbnails inside bordered white cards
 *   - bright orange as the dominant action colour
 *
 * The replacement leans on space, a larger and quieter type scale, full-bleed
 * product imagery, and ink as the primary action colour with vermilion kept
 * back as an accent. The product photographs were shot on grey backdrop sheets,
 * which is itself a marketplace signal, so they are shown full-bleed and edge
 * to edge rather than floated inside framed cards.
 */

const ENQUIRY = "Hello, I'd like to enquire about Annai Paint Brush products.";

/**
 * Every other page sets its own canonical; this one was inheriting the root
 * layout's metadata, which has none, so the homepage shipped without one.
 *
 * That is the worst page to miss. The Firebase project answers on both
 * annaipaintbrush.in and annai-paint-brush.web.app, and the homepage is the
 * one most likely to be linked and crawled at both addresses. Without a
 * canonical, search engines pick a winner themselves and can split the ranking
 * signals between two copies of the same site.
 *
 * Title and description are inherited from the root layout on purpose: they
 * are already written for the homepage.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: `${site.name} | Paint Brush Manufacturers in Coimbatore`,
    description:
      'Paint brush manufacturers in Coimbatore, with our own factory in Madurai. Wholesale brushes, rollers, art brushes and putty knives, supplied across India.',
    url: '/',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      {/* LocalBusiness markup, so the address, hours and phone numbers can
          surface directly in search results. */}
      <JsonLd data={organizationSchema()} />

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,var(--color-brand-50),transparent_55%)]"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:pt-24 lg:pb-28">
          <div>
            <p className="font-display text-xs tracking-[0.28em] text-brand-700 uppercase">
              {copy.home.heroEyebrow}
            </p>

            {/* The site's only h1. The old build had no h1 on any page: the
                homepage headline was an h4 and the wordmark was pixels. */}
            <h1 className="mt-7 font-display text-[length:var(--text-hero)] leading-[1.02] font-semibold text-ink-900">
              {copy.home.heroTitle}
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-[1.75] text-ink-500">
              {copy.home.heroLead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4">
              <Link
                href="/products/"
                className="rounded-full bg-ink-900 px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-ink-800"
              >
                {copy.home.heroCtaProducts}
              </Link>
              <a
                href={whatsappUrl(ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 text-[0.95rem] font-medium text-ink-700 underline decoration-line underline-offset-8 transition-colors hover:decoration-brand-600"
              >
                {copy.home.heroCtaContact}
              </a>
            </div>
          </div>

          <HeroShowcase />
        </div>
      </section>

      {/* ─── The range ─────────────────────────────────────────────────────── */}
      <section id="products" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <h2 className="font-display text-[length:var(--text-section)] font-semibold">
              {copy.home.rangeTitle}
            </h2>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-500">
              {copy.home.rangeLead}
            </p>
          </div>
        </Reveal>

        {/* Full-bleed imagery, no borders and no item counts. */}
        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const cover = products.find((p) => p.category === category.slug)?.variants[0];

            return (
              <Reveal as="li" key={category.slug} delay={i * 70}>
                <Link href={`/products/${category.slug}/`} className="group block">
                  <div className="aspect-4/5 overflow-hidden rounded-lg bg-surface-2">
                    {cover && (
                      <ResponsiveImage
                        src={`products/${cover.sourceImage}`}
                        alt={category.name}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  <h3 className="mt-6 font-display text-lg font-semibold transition-colors group-hover:text-brand-700">
                    {category.name}
                  </h3>
                  <p className="mt-2.5 text-[0.925rem] leading-relaxed text-ink-500">
                    {category.summary}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ─── About ─────────────────────────────────────────────────────────── */}
      <section id="about" className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
          <Reveal>
            <h2 className="max-w-md font-display text-[length:var(--text-section)] leading-[1.15] font-semibold">
              {copy.home.aboutTitle}
            </h2>

            {/* Same facts as the old About block, split into readable
                paragraphs. It used to be one 90-word run of justified 1.5em
                text on a #ff3d00 background, with a colour picker that let
                visitors change that background to anything at all. */}
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.75] text-ink-600">
              <p>
                We make our brushes and tools ourselves. Our factory in Madurai district runs on
                the skill of a workforce that has been with us for years, and we do not compromise
                on the quality of what leaves it.
              </p>
              <p>
                That has earned the trust of painters across Tamil Nadu over twenty years, and we
                now supply orders throughout India.
              </p>
              <p>
                The range covers Milk White wall brushes, paint rollers, Touch Wood brushes for
                timber, putty blades, Patta Uli and art brushes in round and flat.
              </p>
            </div>
          </Reveal>

          {/* Was media/parallax.jpg, a stock photograph of terraced houses in
              Ireland, which had nothing to do with the business. */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  src: 'products/ANNAI TOUCH WOOD 2 INCH',
                  alt: 'Annai Touch Wood two inch brush with a deep red handle and brass ferrule',
                  className: '',
                },
                {
                  src: 'products/PATTA ULI',
                  alt: 'Patta Uli flat scraping chisel, used to prepare a wall before painting',
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
                    sizes="(max-width: 1024px) 45vw, 260px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Why painters stay ─────────────────────────────────────────────── */}
      {/* A dark band, for contrast and to break the run of pale sections. The
          three points used to be cards carrying generic stock icons; numerals
          carry them without adding more clipart. */}
      <section id="why-us" className="bg-ink-900 text-paper">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <Reveal>
            <h2 className="max-w-lg font-display text-[length:var(--text-section)] leading-[1.15] font-semibold text-paper">
              {copy.home.whyTitle}
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-10">
            {[
              { title: copy.home.whyQuality, body: copy.home.whyQualityBody },
              { title: copy.home.whyPrice, body: copy.home.whyPriceBody },
              { title: copy.home.whyDelivery, body: copy.home.whyDeliveryBody },
            ].map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 90}>
                <span className="font-display text-sm tracking-widest text-brand-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-paper">{item.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-[1.7] text-paper/60">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────────── */}
      <section id="testimonials" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <h2 className="max-w-lg font-display text-[length:var(--text-section)] font-semibold">
            {copy.home.testimonialsTitle}
          </h2>
        </Reveal>

        {/* Quiet pull quotes separated by rules, replacing both the old
            auto-rotating carousel and the bordered cards that followed it.
            Four short quotes fit on screen at once, so rotating them only hid
            three quarters of the social proof behind a timer. */}
        <ul className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Reveal as="li" key={testimonial.name} delay={i * 60}>
              <figure className="border-t border-line pt-8">
                <blockquote className="font-display text-lg leading-[1.6] text-ink-800">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm text-ink-400">
                  <span className="font-medium text-ink-700">{testimonial.name}</span>
                  {', '}
                  {testimonial.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ─── Closing ───────────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
              <div>
                <h2 className="max-w-md font-display text-[length:var(--text-section)] leading-[1.15] font-semibold">
                  {copy.products.priceOnRequest}
                </h2>
                <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-500">
                  {copy.contact.lead}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${site.phones[0].e164}`}
                  className="rounded-full bg-ink-900 px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-ink-800"
                >
                  {site.phones[0].display}
                </a>
                <Link
                  href="/contact/"
                  className="rounded-full border border-ink-300 px-7 py-3.5 text-[0.95rem] font-medium text-ink-800 transition-colors hover:border-ink-900"
                >
                  {copy.contact.title}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
