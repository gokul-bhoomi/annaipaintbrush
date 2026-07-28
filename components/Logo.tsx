/**
 * The Annai logo lockup.
 *
 * THE IDEA
 * The A is the mark. It stands in for the first letter of the name, so the
 * symbol and the wordmark are the same object rather than two things sitting
 * next to each other. Its legs are roller passes; its crossbar is a brush
 * stroke that rises from the lower left, runs clear of the letter and splits
 * into bristle marks where the paint runs out.
 *
 * WHY IT IS MARKUP AND NOT AN IMAGE FILE
 * The old logo was a 1960x433 PNG, so the company name was pixels: unselectable,
 * unreadable to a screen reader without alt text, impossible to recolour, and
 * soft on any display it was not drawn for. Here it is vector at every size and
 * costs no image request.
 *
 * GEOMETRY IS COPIED VERBATIM FROM THE APPROVED DESIGN. The path data,
 * transforms, font sizes and letter-spacing are not to be "tidied": the design
 * positions the wordmark against the mark by hand, and the viewBox values below
 * were measured from the rendered artwork with Archivo loaded. Changing a font
 * size without re-measuring the viewBox will crop or float the lockup.
 *
 * The same paths are duplicated in src/media/logo-icon.svg, which the icon
 * pipeline rasterises into the favicon and app icons. Change one, change both.
 */

/** Deep oxide for the letterforms, vermilion for the brush stroke. */
const OXIDE = '#7a2414';
const VERMILION = '#c6401d';

/** The A, drawn as one path with an even-odd counter. */
const A_PATH = 'M34 10L48 10L78 90L4 90ZM39 28L20 90L56 90Z';

/** The crossbar: a brush stroke that splits into bristle marks at its tip. */
const STROKE_PATH =
  'M12.5 67.3C40 58.6 68 51 95 44.3L89 54.7C66 62.4 30 74.6 7.4 80.8ZM93.2 47.4Q84 51 76 55Q86 49.5 92.3 49ZM91.3 50.7Q85 53.5 79 56.5Q86 52 90.3 52.4Z';

function Mark({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d={A_PATH} fillRule="evenodd" fill={OXIDE} />
      <path d={STROKE_PATH} fillRule="evenodd" fill={VERMILION} />
    </g>
  );
}

interface LogoProps {
  /**
   * `compact` drops the descriptor line and is what the header uses. This is
   * the designer's own rule: below roughly 56px the descriptor is unreadable,
   * so it is removed rather than shrunk.
   *
   * `inline` sets the descriptor to the right of the wordmark on one baseline,
   * so the whole thing reads as a single line.
   *
   * `full` stacks the descriptor under the wordmark, as originally designed.
   */
  variant?: 'compact' | 'inline' | 'full';
  className?: string;
}

export default function Logo({ variant = 'compact', className = '' }: LogoProps) {
  if (variant === 'inline') {
    /**
     * One line: mark, wordmark, then the descriptor on the same baseline.
     *
     * The descriptor is set at 14 against the wordmark's 48 and sits 14 units
     * clear of it. Baseline aligned rather than centred, because the A
     * overshoots the cap height and centring it makes the descriptor look like
     * it is sliding downhill.
     *
     * This variant reads the descriptor far better than the stacked one, and
     * the reason is the viewBox height. Stacked, the lockup is 69 units tall
     * for a 10-unit descriptor, so at a 40px header the descriptor lands at
     * 5.8px. Inline, the lockup is only 45 units tall because the wordmark
     * alone sets the height, so a 14-unit descriptor lands at 12.4px.
     *
     * The cost is width: 415.8 units against the compact variant's 173.4, so
     * it needs roughly 370px at header size. That fits a desktop header beside
     * the nav and does not fit a 375px phone, which is why Header renders this
     * only from `sm` up and falls back to `compact` below.
     */
    return (
      <svg
        viewBox="0 28 415.80 45"
        aria-hidden="true"
        className={`font-logo block w-auto ${className}`}
      >
        <Mark transform="translate(-2.25,22.375) scale(0.5625)" />
        <text x="53" y="73" fontWeight="700" fontSize="48" letterSpacing="-0.3" fill={OXIDE}>
          NNAI
        </text>
        <text x="187.37" y="73" fontWeight="600" fontSize="14" letterSpacing="1.5" fill={OXIDE}>
          PAINT BRUSHES &amp; ROLLERS
        </text>
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <svg
        viewBox="0 28 173.37 45"
        aria-hidden="true"
        className={`font-logo block w-auto ${className}`}
      >
        <Mark transform="translate(-2.25,22.375) scale(0.5625)" />
        <text x="53" y="73" fontWeight="700" fontSize="48" letterSpacing="-0.3" fill={OXIDE}>
          NNAI
        </text>
      </svg>
    );
  }

  /**
   * The descriptor reads "PAINT BRUSHES & ROLLERS" rather than the design's
   * "BRUSHES & ROLLERS", so the mark still carries the business name used in
   * the page titles, the LocalBusiness schema and the footer.
   *
   * That is four characters longer, which at the original 12px/2.2 tracking
   * ran 216.9 wide against a 158.3 wordmark and pushed the lockup from 2.42:1
   * to 3.16:1, leaving the descriptor visibly overhanging. Retuned to 10px/1.0,
   * measured at 161.6 wide, which restores the designed balance at 2.36:1.
   */
  return (
    <svg viewBox="0 15 162.56 69" aria-hidden="true" className={`font-logo block w-auto ${className}`}>
      <Mark transform="translate(-2.05,9.875) scale(0.5125)" />
      <text x="48" y="56" fontWeight="700" fontSize="44" letterSpacing="-0.3" fill={OXIDE}>
        NNAI
      </text>
      <text x="1" y="84" fontWeight="600" fontSize="10" letterSpacing="1" fill={OXIDE}>
        PAINT BRUSHES &amp; ROLLERS
      </text>
    </svg>
  );
}
