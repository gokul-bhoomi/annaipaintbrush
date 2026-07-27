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
     */
    heroEyebrow: 'Made in Coimbatore, Tamil Nadu',
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
    aboutTitle: 'Made in our own factory, not bought in',
    whyTitle: 'Why painters stay with us',
    whyQuality: 'Built to last',
    whyQualityBody: 'Made to last a full working life on site, not just one job.',
    whyPrice: 'Fair trade prices',
    whyPriceBody: 'Wholesale prices that stay fair, without cutting the quality.',
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
    formTitle: 'Send us an enquiry',
    name: 'Name',
    emailField: 'Email',
    mobile: 'Mobile number',
    message: 'Your message',
    submit: 'Send enquiry',
    sending: 'Sending',
    success: 'Thank you. Your enquiry has reached us and we will be in touch shortly.',
    error: 'Something went wrong. Please call us instead, or try again.',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid 10-digit mobile number',
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
