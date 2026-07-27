/**
 * Customer testimonials, carried over from the old Testimonial.js.
 *
 * Quotes are kept verbatim apart from one duplicated word ("The the quality")
 * in Murugan's. They previously all shared a single generic placeholder avatar
 * (media/person.png); the new design uses typographic initials instead, which
 * reads as a deliberate choice rather than as missing photographs.
 *
 * ⚠ STALE CLAIMS: these were written around 2020 and two of them state a
 * duration, "the past 4 years" and "the past 3 years". Six years on, those
 * numbers are wrong. Left untouched because they are quotations and not ours to
 * silently revise. Gokul to either refresh them with the customers or drop the
 * durations.
 */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Murugan',
    role: 'Painter',
    quote: "The quality and durability of Annai Brush is excellent. I am using Annai brand tools for the past 4 years and I'm very satisfied with it.",
  },
  {
    name: 'Suresh',
    role: 'Shop Owner',
    quote: "I'm a customer of Annai Brush for the past 3 years. Their delivery is really fast. Also their product's price are very reasonable.",
  },
  {
    name: 'Antony',
    role: 'Shop Owner',
    quote: "Looking for best quality at the same time best price? My first suggestion would be Annai Brush. Go for it you won't regret.",
  },
  {
    name: 'Selva',
    role: 'Painter',
    quote: 'The finish we get while painting walls with Annai Brush is silky smooth. Annai products gives a rich feel to the wall we paint.',
  },
];
