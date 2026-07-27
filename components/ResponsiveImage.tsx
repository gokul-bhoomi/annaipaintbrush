import manifest from '@/data/image-manifest.json';

type ManifestEntry = {
  base: string;
  width: number;
  height: number;
  widths: number[];
  placeholder: string;
};

const images = manifest as Record<string, ManifestEntry>;

interface ResponsiveImageProps {
  /**
   * Manifest key: the original filename without extension, prefixed by its
   * folder. e.g. `products/ANNAI TOUCH WOOD 2 INCH` or `slides/1`.
   */
  src: string;
  /**
   * Real alt text. Required, and deliberately not defaulted: the old site used
   * the raw SHOUTING SKU as alt text on every product image.
   */
  alt: string;
  /** `sizes` attribute, tell the browser the rendered width so it picks well. */
  sizes?: string;
  className?: string;
  /**
   * Set on the LCP image only (the hero). Adds fetchPriority=high and disables
   * lazy loading; everything else stays lazy.
   */
  priority?: boolean;
  /** Render the blurred placeholder underneath while the image decodes. */
  placeholder?: boolean;
}

/**
 * Serves the build-time optimized variants produced by
 * scripts/optimize-images.mjs, as AVIF with a WebP fallback.
 *
 * Uses <picture> rather than next/image because static export can't run
 * next/image's optimizer, see the note in next.config.ts. Width and height
 * are always emitted so the browser reserves space and the page doesn't shift
 * as images arrive.
 */
export default function ResponsiveImage({
  src,
  alt,
  sizes = '100vw',
  className,
  priority = false,
  placeholder = true,
}: ResponsiveImageProps) {
  const entry = images[src];

  if (!entry) {
    // Fails loudly in dev, silently omits in prod, rather than shipping a
    // broken <img> with a guessed path.
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `ResponsiveImage: no manifest entry for "${src}". Run \`npm run images\` or check the key against data/image-manifest.json.`
      );
    }
    return null;
  }

  const srcSet = (ext: 'avif' | 'webp') =>
    entry.widths.map((w) => `${entry.base}-${w}.${ext} ${w}w`).join(', ');

  const largest = entry.widths[entry.widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${entry.base}-${largest}.webp`}
        alt={alt}
        width={entry.width}
        height={entry.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        // eslint-disable-next-line @next/next/no-img-element
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        style={
          placeholder
            ? {
                backgroundImage: `url("${entry.placeholder}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      />
    </picture>
  );
}

/** Looks up intrinsic dimensions: useful for JSON-LD image fields. */
export function imageMeta(src: string): ManifestEntry | undefined {
  return images[src];
}

/** Absolute URL of the largest variant, for Open Graph / structured data. */
export function imageUrl(src: string, origin: string): string | undefined {
  const entry = images[src];
  if (!entry) return undefined;
  const largest = entry.widths[entry.widths.length - 1];
  return `${origin}${entry.base}-${largest}.webp`;
}
