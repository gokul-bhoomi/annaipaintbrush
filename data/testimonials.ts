/**
 * Customer testimonials, carried over from the old Testimonial.js.
 *
 * They previously all shared a single generic placeholder avatar
 * (media/person.png); the new design uses typographic initials instead, which
 * reads as a deliberate choice rather than as missing photographs.
 *
 * EDITING POLICY: clear grammatical errors are corrected, meaning is not
 * touched. Publishing "their product's price are very reasonable" makes the
 * business look careless rather than making the quote look authentic, and
 * lightly copy-editing a testimonial is normal practice. What is NOT corrected
 * is anything that would change what the customer actually said.
 *
 * Corrections made: subject-verb agreement in Murugan's and Selva's, tense in
 * Murugan's and Suresh's ("I am using ... for the past 4 years" to "I have
 * been using"), a possessive that should have been a plural in Suresh's, a
 * comma splice and a missing object in Antony's, and a duplicated word ("The
 * the quality") in Murugan's.
 *
 * ⚠ STALE CLAIMS, STILL OPEN: these were written around 2020 and two state a
 * duration, "the past 4 years" and "the past 3 years". Six years on those
 * numbers are wrong. Deliberately NOT fixed here, because unlike grammar the
 * number is a claim the customer made, and changing it would be putting words
 * in their mouth. Gokul to either refresh them with the customers or ask them
 * to drop the durations.
 */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Murugan',
    role: 'painter',
    quote:
      "The quality and durability of Annai Brush are excellent. I have been using Annai brand tools for the past 4 years and I'm very satisfied with them.",
  },
  {
    name: 'Suresh',
    role: 'shop owner',
    quote:
      'I have been a customer of Annai Brush for the past 3 years. Their delivery is really fast, and their prices are very reasonable too.',
  },
  {
    name: 'Antony',
    role: 'shop owner',
    quote:
      "Looking for the best quality at the best price? My first suggestion would be Annai Brush. Go for it, you won't regret it.",
  },
  {
    name: 'Selva',
    role: 'painter',
    quote:
      'The finish we get while painting walls with Annai Brush is silky smooth. Annai products give a rich feel to the wall we paint.',
  },
];
