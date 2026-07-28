/**
 * Site copy, kept in one place so wording can be changed without going
 * component hunting.
 *
 * This replaced a bilingual dictionary. Tamil was dropped, so there is no
 * locale machinery here and no `/[locale]/` route segment: pages live at `/`,
 * `/products`, `/contact`. If Tamil is ever wanted again, this file is the
 * seam to reintroduce it at.
 */
export const copy = {
  nav: {
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
  },
  home: {
    /**
     * The eyebrow above the h1 deliberately carries no year.
     *
     * It previously read "Coimbatore, since 2016", which came from the old
     * footer's `© 2016-2020` copyright line. That is when the website dates
     * from, not the business, and it contradicted the "over twenty years"
     * claim sitting directly underneath it.
     *
     * Madurai, not Coimbatore, because this line says "Made in" and the factory
     * is in Madurai district. Coimbatore is the business address. The two are
     * not in conflict but are easy to "correct" into each other by mistake, so
     * to be explicit: office in Coimbatore, factory in Madurai.
     *
     * Naming both here was tried and reverted. "Made in Madurai, supplied from
     * Coimbatore" reads as two cities wedged into one line for search engines,
     * because that is what it was. It buys nothing: Coimbatore already appears
     * in the page title, the meta description, the LocalBusiness address and
     * description, the footer and the whole contact page, which is where local
     * search is actually decided. An eyebrow paragraph adds no weight next to
     * those, so it is free to simply read well.
     */
    heroEyebrow: 'Made in Madurai, Tamil Nadu',
    /**
     * Contains a duration, so it needs revisiting as the years pass. It is
     * consistent with the About copy's "over twenty years" and no longer
     * clashes with a founding year, since the hero eyebrow above no longer
     * claims one.
     */
    heroTitle: "Twenty years in painters' hands",
    heroLead:
      'Paint brushes, rollers and painting tools, made in our own factory and supplied to painters and dealers across India.',
    heroCtaProducts: 'View the range',
    heroCtaContact: 'Talk to us',
    rangeTitle: 'The range',
    rangeLead: 'Four families of tools, made in our own factory and sold wholesale.',
    aboutTitle: 'Made in our own factory',
    whyTitle: 'Why painters stay with us',
    whyQuality: 'Built to last',
    whyQualityBody: 'Made to last a full working life on site, not just one job.',
    /**
     * Was "Fair trade prices". Dropped "trade" because Fairtrade is a
     * certification scheme, and we do not hold it. The claim was accidental
     * but it is exactly the sort of thing that is worth not making.
     */
    whyPrice: 'Fair prices',
    whyPriceBody: 'Wholesale rates that stay fair, without cutting the quality.',
    whyDelivery: 'Delivered fast',
    whyDeliveryBody: 'Quick delivery to your shop or your site, anywhere in India.',
    testimonialsTitle: 'From the people using them',
  },
  products: {
    title: 'Our products',
    lead: 'Paint brushes, art brushes, rollers and putty knives, manufactured in-house and supplied across India.',
    allCategories: 'All products',
    priceOnRequest: 'Call us for the best price',
    sizesAvailable: 'Sizes available',
    viewProduct: 'View details',
    enquireProduct: 'Enquire on WhatsApp',
    relatedTitle: 'More in this range',
  },
  contact: {
    title: 'Contact us',
    lead: 'Call, message or email us. We answer wholesale and retail enquiries alike.',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    hours: 'Working hours',
    hoursValue: 'Monday to Saturday, 9 AM to 8 PM',
    /**
     * There is no enquiry form. The old one posted to EmailJS from the browser,
     * which meant a public key in the bundle, a honeypot to keep bots off it,
     * and an inbox nobody watched. WhatsApp and a phone call are how the
     * business already takes orders, so the page sends people straight there.
     */
    enquiryTitle: 'Send us an enquiry',
    enquiryLead: 'Message us and we will come back to you with prices.',
    enquiryChecklistTitle: 'Tell us',
    enquiryChecklist: [
      'Which products and sizes you need',
      'How many you want',
      'The town we are delivering to',
    ],
    enquiryOrCall: 'Or call us on',
    /** Lowercase: this continues the sentence started by `enquiryOrCall`. */
    enquiryOrEmail: 'or email us at',
  },
  common: {
    whatsapp: 'WhatsApp us',
    callUs: 'Call us',
    skipToContent: 'Skip to content',
    notFoundTitle: 'We could not find that page',
    notFoundLead: 'The link may be out of date. The full range is still here.',
    notFoundCta: 'Browse products',
  },
} as const;
