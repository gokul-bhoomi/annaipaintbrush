import type { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { copy } from '@/lib/copy';
import { breadcrumbSchema, organizationSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const trail = [{ label: copy.nav.home, href: '/' }, { label: copy.contact.title }];

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${site.name} in ${site.address.locality}, ${site.address.city}. Call ${site.phones[0].display} or ${site.phones[1].display}, email ${site.email}. Open Monday to Saturday, 9 AM to 8 PM.`,
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: `Contact Us | ${site.name}`,
    description: `Paint brush manufacturers in ${site.address.city}. Wholesale and retail enquiries welcome.`,
    url: '/contact/',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Breadcrumbs trail={trail} />
      </div>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8">
        <h1 className="max-w-2xl font-display text-[length:var(--text-hero)] leading-[1.05] font-semibold text-ink-900">
          {copy.contact.title}
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-[1.75] text-ink-500">{copy.contact.lead}</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Details. The old contact page rendered these as three fixed-width
              cards carrying stock clipart icons of a phone, an envelope and a
              map pin. */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
                {copy.contact.phone}
              </h2>
              <ul className="mt-4 space-y-2">
                {site.phones.map((phone) => (
                  <li key={phone.e164}>
                    <a
                      href={`tel:${phone.e164}`}
                      className="font-display text-2xl font-semibold text-ink-900 transition-colors hover:text-brand-700"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl("Hello, I'd like to enquire about Annai Paint Brush products.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-2.5 text-[0.9rem] font-medium text-white transition-opacity hover:opacity-90"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.449A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.334.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.364-8.452zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.892 6.993c-.003 5.451-4.437 9.886-9.885 9.886z" />
                </svg>
                {copy.common.whatsapp}
              </a>
            </div>

            <div>
              <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
                {copy.contact.email}
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block break-all text-[1.05rem] text-ink-700 transition-colors hover:text-brand-700"
              >
                {site.email}
              </a>
            </div>

            <div>
              <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
                {copy.contact.address}
              </h2>
              <address className="mt-3 text-[1.05rem] leading-relaxed text-ink-700 not-italic">
                {site.address.locality},
                <br />
                {site.address.city}, {site.address.region}
              </address>
            </div>

            <div>
              <h2 className="font-display text-xs tracking-[0.2em] text-ink-400 uppercase">
                {copy.contact.hours}
              </h2>
              <p className="mt-3 text-[1.05rem] text-ink-700">{copy.contact.hoursValue}</p>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-7 sm:p-10">
            <h2 className="font-display text-[1.6rem] font-semibold">{copy.contact.formTitle}</h2>
            <p className="mt-3 mb-8 text-[0.95rem] text-ink-500">
              Tell us what you need and we will come back to you with prices.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
