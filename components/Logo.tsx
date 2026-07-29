/**
 * The Annai logo lockup: crossed brush and roller, then the name with
 * "Brushes & Rollers" stacked beneath it.
 *
 * SIZE COMES FROM A HEIGHT, NOT A FONT-SIZE. The artwork is 3.74:1, so set
 * `h-14` on the caller and the width follows. This is the opposite of the
 * text-based wordmark this replaced, where the caller set `text-[1.15rem]`.
 *
 * WHY THE ARTWORK IS A PNG AND NOT WEBP
 * It is two colours: brand oxide and transparent. A palette PNG stores that in
 * 11.4KB at 520px wide, where WebP at the same size needs 59KB, because WebP's
 * lossy path spends its bits on the anti-aliased edges that a palette encodes
 * almost for free. AVIF was not worth a third encode for a 21KB asset.
 *
 * WHAT WAS DONE TO THE SOURCE
 * The supplied render was 2876x1472 with the artwork floating in a white
 * field, drawn in #783830. It is trimmed to its ink (2249x602), the white is
 * dropped to transparent, and the ink is retinted to the brand-800 token so
 * the logo matches the rest of the site rather than sitting a shade browner
 * than everything around it. Alpha is derived from pixel luminance and
 * normalised, so the stroke cores reach full opacity instead of the 71% that
 * raw luminance would have given.
 *
 * KNOWN TRADE-OFF, worth revisiting: the company name is pixels again. The
 * wordmark this replaced was live text, which meant it was selectable, said
 * "Annai Paint Brush" to a crawler, and stayed sharp at any size. The `alt`
 * below is now the only machine-readable copy of the name in the header. The
 * fix, if we want it, is to use only the brush-and-roller mark here and set
 * the name as text beside it, which would also cut the asset to a few KB.
 */
import { site } from '@/lib/site';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/logo-lockup-520.png"
      srcSet="/logo-lockup-520.png 520w, /logo-lockup-780.png 780w"
      sizes="(min-width: 1024px) 210px, 180px"
      /* Intrinsic ratio of the trimmed artwork, so the header reserves the
         right box before the image decodes and nothing shifts on load. */
      width={2249}
      height={602}
      alt={site.name}
      decoding="async"
      className={`block w-auto ${className}`}
    />
  );
}
