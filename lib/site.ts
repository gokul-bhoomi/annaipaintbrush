/**
 * Single source of truth for business details.
 *
 * Used by the LocalBusiness / Organization JSON-LD, the footer, the contact
 * page and the WhatsApp deep links, so these facts can never drift apart
 * between pages the way they did when they were hardcoded per component.
 *
 * Every value here is carried over from the existing live site.
 */
export const site = {
  name: 'Annai Paint Brush',
  /**
   * The canonical origin, and the single value that decides it.
   *
   * Feeds `metadataBase` (so the canonical tag on all 28 pages), sitemap.xml,
   * the robots.txt host, every Open Graph URL, and `url` plus the product
   * image URLs in the JSON-LD.
   *
   * The Firebase project also answers on annai-paint-brush.web.app, and it
   * always will. Because every page carries a canonical pointing here, that
   * address defers to this one instead of competing with it for the same
   * content. No trailing slash: it is used as a `new URL()` base.
   */
  url: 'https://annaipaintbrush.in',

  /**
   * Start of the copyright range in the footer, NOT the year the business was
   * founded. It comes from the old site's `© 2016-2020` line.
   *
   * Named explicitly because it was previously called `founded`, which led to
   * it being rendered as "Coimbatore, since 2016" in the hero and emitted as
   * `foundingDate` in the LocalBusiness schema. Both were wrong: the About copy
   * says the business has been manufacturing for over twenty years.
   *
   * TODO(gokul): supply the real founding year and add a separate `founded`
   * field, then restore `foundingDate` in lib/seo.ts.
   */
  copyrightFrom: '2016',

  phones: [
    { display: '90 42 00 16 16', e164: '+919042001616' },
    { display: '79 04 14 11 87', e164: '+917904141187' },
  ],
  email: 'annaipaintbrush@gmail.com',

  /** Primary number for WhatsApp click-to-chat. */
  whatsapp: '+919042001616',

  address: {
    locality: 'P.N.Pudur',
    city: 'Coimbatore',
    region: 'Tamil Nadu',
    country: 'IN',
  },

  /** Mon–Sat 9AM–8PM, as stated on the current contact page. */
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '20:00',
  },

  analytics: { ga4: 'G-VNTB52XVYK' },

  social: {
    developer: 'https://www.linkedin.com/in/gokul-kumar-bhoomibalan-52aa86195/',
  },
} as const;

/** Builds a WhatsApp click-to-chat URL with a prefilled message. */
export function whatsappUrl(message?: string): string {
  const number = site.whatsapp.replace(/\D/g, '');
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
