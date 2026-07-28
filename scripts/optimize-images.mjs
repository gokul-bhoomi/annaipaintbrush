/**
 * Build-time responsive image pipeline.
 *
 * WHY THIS EXISTS
 * next/image normally optimizes on demand, but that needs a server and we
 * deploy static files to Firebase Hosting. So we do the same work ahead of
 * time: every source image is re-encoded to AVIF and WebP at several widths,
 * and a manifest records the real dimensions plus a tiny inline placeholder.
 *
 * WHAT IT FIXES
 * The old build shipped originals straight from src/media, 12MB total, with
 * 736x900 / ~300KB product photos rendered into ~250px cards. A single page of
 * nine products transferred roughly 2.7MB, which is why each card needed a
 * "Loading..Please Wait" placeholder underneath it.
 *
 * Output filenames are slugged, replacing URLs like
 * /static/media/ACRYLIC%20INTERIOR%209%20INCH.jpg.
 *
 * Idempotent: an entry is re-encoded only when the source's size or mtime
 * changes, so `npm run dev` doesn't pay for this on every start.
 */

import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src', 'media');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'data', 'image-manifest.json');

/**
 * Per-group width ladders, sized to how the image is actually displayed rather
 * than to the source dimensions. No point emitting a 1687px variant of a
 * product photo that never renders wider than ~740.
 */
const GROUPS = [
  { dir: 'products', widths: [320, 480, 736] },
  { dir: 'slides', widths: [640, 960, 1280, 1687] },
  { dir: 'card', widths: [128, 256] },
  { dir: 'contact', widths: [64, 128, 640, 1280, 2000] },
  { dir: '.', widths: [320, 640, 960, 1600] }, // parallax.jpg, person.png, annai_logo.png
];

const FORMATS = [
  { ext: 'avif', encode: (img) => img.avif({ quality: 52, effort: 4 }) },
  { ext: 'webp', encode: (img) => img.webp({ quality: 76, effort: 4 }) },
];

/**
 * Bump when the processing pipeline changes, so cached entries are invalidated
 * even though their source files haven't been touched.
 */
const PIPELINE_VERSION = 4;

/**
 * Sources kept in the repository but deliberately not published.
 *
 * `annai_logo.png` is the original rainbow wordmark, superseded by the vector
 * lockup in components/Logo.tsx. It is retained as the historical brand asset
 * but nothing renders it, so there is no reason to ship eight variants of it.
 *
 * A build-time colour correction used to live here that deepened its
 * near-fluorescent inks, which measured 1.21:1 against the page background, up
 * to the 3:1 legibility floor. That was always labelled a stopgap until artwork
 * drawn for a light background existed. It now does, so the correction is gone.
 */
const UNPUBLISHED = new Set(['annai_logo']);

/**
 * Neutralises the colour cast on the product photographs.
 *
 * They were shot on backdrop sheets that photograph with a strong and
 * inconsistent cast: corner samples run from #D6D8E6 (clearly blue-lavender)
 * through #D5D8D7 to #E6E6EC. On a warm page that reads as "phone snap on a
 * bedsheet", which is the visual language of a B2B marketplace listing.
 *
 * We measure the backdrop from the four corners and apply a per-channel gain
 * that maps it to a neutral grey of the SAME luminance. Because luminance is
 * preserved the gains stay within a few percent, so nothing clips: this removes
 * the cast without brightening or bleaching the product itself.
 *
 * Deliberately not a background cutout. Flood-fill segmentation was tried and
 * these JPEGs are compressed enough that it leaks into the cream bristles.
 */
async function neutralizeCast(sourcePath) {
  const { data, info } = await sharp(sourcePath)
    .resize({ width: 80 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: W, height: H, channels: C } = info;
  const at = (x, y) => {
    const i = (y * W + x) * C;
    return [data[i], data[i + 1], data[i + 2]];
  };

  const corners = [at(1, 1), at(W - 2, 1), at(1, H - 2), at(W - 2, H - 2)];
  const ref = [0, 1, 2].map((k) => corners.reduce((a, c) => a + c[k], 0) / corners.length);

  // Only correct a light, low-saturation backdrop. A dark or vivid corner means
  // the product itself reaches the frame edge, and correcting would shift it.
  const mean = (ref[0] + ref[1] + ref[2]) / 3;
  const spread = Math.max(...ref) - Math.min(...ref);
  if (mean < 150 || spread > 40) return null;

  return ref.map((channel) => Math.min(1.15, Math.max(0.85, mean / channel)));
}

/** Mirrors the slug style used for product URLs. */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(MANIFEST, 'utf8'));
  } catch {
    return {};
  }
}

/** Cheap change-detection token; avoids re-encoding unchanged sources. */
function fingerprint(stats) {
  return createHash('sha1')
    .update(`${stats.size}:${stats.mtimeMs}:v${PIPELINE_VERSION}`)
    .digest('hex')
    .slice(0, 16);
}

async function collect() {
  const jobs = [];
  for (const group of GROUPS) {
    const dir = path.join(SRC, group.dir);
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;
      if (UNPUBLISHED.has(entry.name.replace(/\.[a-z0-9]+$/i, ''))) continue;
      jobs.push({
        /** Manifest key: the original name, so catalogue.ts can look up by sourceImage. */
        key: group.dir === '.' ? entry.name.replace(/\.[a-z0-9]+$/i, '') : `${group.dir}/${entry.name.replace(/\.[a-z0-9]+$/i, '')}`,
        source: path.join(dir, entry.name),
        outDir: group.dir === '.' ? OUT : path.join(OUT, group.dir),
        urlDir: group.dir === '.' ? '/images' : `/images/${group.dir}`,
        slug: slugify(entry.name),
        widths: group.widths,
      });
    }
  }
  return jobs;
}

async function process(job, cached) {
  const stats = await stat(job.source);
  const fp = fingerprint(stats);

  if (cached?.fingerprint === fp) return { entry: cached, skipped: true };

  await mkdir(job.outDir, { recursive: true });

  const image = sharp(job.source, { failOn: 'none' });
  const meta = await image.metadata();
  const intrinsicWidth = meta.width ?? Math.max(...job.widths);
  const intrinsicHeight = meta.height ?? 0;

  // Never upscale: drop ladder rungs wider than the source.
  const widths = job.widths.filter((w) => w <= intrinsicWidth);
  if (widths.length === 0) widths.push(intrinsicWidth);

  // Only the product photographs have the backdrop-sheet problem.
  const gains = job.key.startsWith('products/') ? await neutralizeCast(job.source) : null;

  /**
   * Content hash in the filename, so Firebase can serve /images/** with
   * `immutable` for a year (see firebase.json). Without it, replacing a product
   * photo would leave returning visitors on the cached old one until the header
   * expired. Changing the source changes the hash, which changes the URL.
   */
  const hash = fp.slice(0, 8);

  // Drop this image's previous variants, so old hashes don't pile up.
  const existing = await readdir(job.outDir).catch(() => []);
  await Promise.all(
    existing
      .filter((name) => new RegExp(`^${job.slug}-[0-9a-f]{8}-\\d+\\.(avif|webp)$`).test(name))
      .map((name) => rm(path.join(job.outDir, name), { force: true }))
  );

  let bytes = 0;
  for (const width of widths) {
    for (const format of FORMATS) {
      let resized = sharp(job.source, { failOn: 'none' }).resize({
        width,
        withoutEnlargement: true,
      });
      if (gains) resized = resized.linear(gains, [0, 0, 0]);
      const buffer = await format.encode(resized).toBuffer();
      await writeFile(
        path.join(job.outDir, `${job.slug}-${hash}-${width}.${format.ext}`),
        buffer
      );
      bytes += buffer.length;
    }
  }

  /**
   * 24px inline WebP used as a blurred placeholder, so a card reserves its
   * space and shows something immediately instead of "Loading..Please Wait".
   */
  const lqip = await sharp(job.source, { failOn: 'none' })
    .resize({ width: 24 })
    .webp({ quality: 40 })
    .toBuffer();

  return {
    entry: {
      fingerprint: fp,
      base: `${job.urlDir}/${job.slug}-${hash}`,
      width: intrinsicWidth,
      height: intrinsicHeight,
      widths,
      placeholder: `data:image/webp;base64,${lqip.toString('base64')}`,
      sourceBytes: stats.size,
      outputBytes: bytes,
    },
    skipped: false,
  };
}

/**
 * Favicon, PWA and Apple touch icons, rasterised from the square logo mark.
 *
 * These used to letterbox the 1960x433 wordmark onto a square canvas, so the
 * artwork sat in a thin strip across the middle of an otherwise empty tile and
 * read as blank at 192px on a home screen. src/media/logo-icon.svg is drawn for
 * a square instead, so the mark fills it.
 */
async function buildIcons() {
  const outDir = path.join(ROOT, 'public');
  const source = path.join(SRC, 'logo-icon.svg');
  const sizes = [192, 512];

  /**
   * Gate on the artefacts existing, not on whether photos were re-encoded -
   * otherwise a fully cached run silently skips icon generation. The stamp
   * carries PIPELINE_VERSION too, because the icons depend on the source
   * artwork and not on whether any photo changed.
   */
  const stampPath = path.join(outDir, '.icons-version');
  const stamp = `v${PIPELINE_VERSION}`;
  const expected = [...sizes.map((s) => `icon-${s}.png`), 'apple-icon.png', 'favicon.svg'];
  const present = await Promise.all(
    expected.map((name) =>
      stat(path.join(outDir, name)).then(
        () => true,
        () => false
      )
    )
  );
  const current = await readFile(stampPath, 'utf8').catch(() => null);
  if (present.every(Boolean) && current === stamp) return;

  // Full bleed: the tile is the icon, so there is no letterboxing to do.
  for (const size of sizes) {
    await sharp(source, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(outDir, `icon-${size}.png`));
  }

  /**
   * Apple touch icons are conventionally 180px and must be opaque: iOS applies
   * its own corner radius, and a transparent corner renders black. Flattening
   * onto the tile colour fills the rounded corners so the mask has square,
   * opaque artwork to cut from.
   */
  await sharp(source, { density: 384 })
    .resize(180, 180)
    .flatten({ background: '#7a2414' })
    .png()
    .toFile(path.join(outDir, 'apple-icon.png'));

  /**
   * An SVG favicon stays sharp at every tab size and on every display, which a
   * fixed 16px bitmap cannot. app/layout.tsx lists the PNG after it for the
   * browsers that do not take SVG.
   */
  await copyFile(source, path.join(outDir, 'favicon.svg'));

  await writeFile(stampPath, stamp);
  console.log(`icons: ${expected.length} written to public/`);
}

async function main() {
  const cache = await loadManifest();
  const jobs = await collect();
  const manifest = {};

  let processed = 0;
  let skipped = 0;
  let sourceTotal = 0;
  let outputTotal = 0;

  for (const job of jobs) {
    const { entry, skipped: wasSkipped } = await process(job, cache[job.key]);
    manifest[job.key] = entry;
    if (wasSkipped) skipped++;
    else processed++;
    sourceTotal += entry.sourceBytes ?? 0;
    // Largest single variant, i.e. the worst case a browser would fetch.
    outputTotal += entry.outputBytes ?? 0;
  }

  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)}MB`;
  console.log(
    `images: ${processed} processed, ${skipped} cached · ` +
      `${jobs.length} sources ${mb(sourceTotal)} → ${mb(outputTotal)} across all variants`
  );

  await buildIcons();
}

main().catch((error) => {
  console.error('image optimization failed:', error);
  process.exit(1);
});
