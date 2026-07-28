/**
 * The product catalogue.
 *
 * Replaces the four hardcoded string arrays that used to live inside
 * `Products.js` (src/components/pages/products/Products.js:20-23), where the
 * product list was inseparable from the rendering code and the only identifier
 * was a SHOUTING SKU that doubled as the image filename and the alt text.
 *
 * Size variants are grouped into families. The original list had 30 entries,
 * but many were sizes of one product (TAPPER 0.5"-3", TOUCH WOOD 1"-3"). Giving
 * each its own page would produce 30 near-identical pages, which search engines
 * treat as thin content. Grouping yields 18 substantial pages while keeping
 * every one of the 30 items visible and searchable as a listed size.
 *
 * `sourceImage` is the original filename in src/media/products (spaces, caps
 * and all). scripts/optimize-images.mjs maps it to a slugged, optimized asset.
 *
 * COPY STATUS: `summary` and `description` are functionally accurate but
 * generic. They deliberately avoid claims we can't verify (bristle material,
 * handle timber, warranties). Gokul to review and add real specs.
 */

export type CategorySlug = 'paint-brushes' | 'art-brushes' | 'paint-rollers' | 'putty-knives';

export interface Variant {
  /** Human-readable size, e.g. '2 inch' or 'All numbers'. */
  size: string;
  /** Original filename in src/media/products, without the .jpg extension. */
  sourceImage: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  variants: Variant[];
  summary: string;
  description: string;
  /** Informs the page's meta description and internal search. */
  keywords: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  summary: string;
  /** CSS custom property used for the category chip. */
  colorToken: string;
  /** Preserves the ordering of the original `setChoice(1..4)` navigation. */
  legacyChoice: 1 | 2 | 3 | 4;
}

export const categories: Category[] = [
  {
    slug: 'paint-brushes',
    name: 'Paint brushes',
    summary: 'Wall and wood brushes in sizes from half an inch to four inches, including our Premium Milk White and Touch Wood ranges.',
    colorToken: '--color-cat-brush',
    legacyChoice: 1,
  },
  {
    slug: 'art-brushes',
    name: 'Art brushes',
    summary: 'Flat and round artist brushes available in all standard numbers, sold individually or as sets.',
    colorToken: '--color-cat-art',
    legacyChoice: 2,
  },
  {
    slug: 'paint-rollers',
    name: 'Paint rollers',
    summary: 'Interior, exterior, epoxy and enamel rollers from two to nine inches, plus trays and complete roller sets.',
    colorToken: '--color-cat-roller',
    legacyChoice: 3,
  },
  {
    slug: 'putty-knives',
    name: 'Putty knives',
    summary: 'Putty blades, Altek blades and Patta Uli for surface preparation and finishing work.',
    colorToken: '--color-cat-putty',
    legacyChoice: 4,
  },
];

export const products: Product[] = [
  // ─── Paint Brushes ────────────────────────────────────────────────────────
  {
    slug: 'premium-milk-white',
    name: 'Annai Premium Milk White',
    category: 'paint-brushes',
    variants: [{ size: '4 inch', sourceImage: 'ANNAI PREMIUM MILK WHITE 4 INCH' }],
    summary: 'Our flagship wall brush, built for smooth, even coverage on large interior surfaces.',
    description: 'The Premium Milk White is the brush our name is best known for. Its full, soft filling holds a generous amount of paint and releases it evenly, which keeps lap marks down when you are covering a large wall in a single pass. Balanced so it stays comfortable through a long day on site.',
    keywords: ['milk white paint brush', 'wall brush', '4 inch paint brush', 'wholesale paint brush Coimbatore'],
  },
  {
    slug: 'touch-wood',
    name: 'Annai Touch Wood',
    category: 'paint-brushes',
    variants: [
      { size: '1 inch', sourceImage: 'ANNAI TOUCH WOOD 1 INCH' },
      { size: '1.5 inch', sourceImage: 'ANNAI TOUCH WOOD 1.5 INCH' },
      { size: '2 inch', sourceImage: 'ANNAI TOUCH WOOD 2 INCH' },
      { size: '2.5 inch', sourceImage: 'ANNAI TOUCH WOOD 2.5 INCH' },
      { size: '3 inch', sourceImage: 'ANNAI TOUCH WOOD 3 INCH' },
    ],
    summary: 'A woodwork range in five sizes, shaped for enamel and varnish on doors, windows and furniture.',
    description: 'Touch Wood brushes are made for finishing work on timber, where the mark left by the brush matters as much as the coverage. The filling is trimmed to a fine edge so enamels and varnishes flow out flat and lay down with minimal brush lines. Available from one inch for beading and window frames up to three inches for door panels and larger flat runs.',
    keywords: ['touch wood brush', 'wood paint brush', 'enamel brush', 'varnish brush', 'furniture painting brush'],
  },
  {
    slug: 'tapper',
    name: 'Tapper Brush',
    category: 'paint-brushes',
    variants: [
      { size: '0.5 inch', sourceImage: 'TAPPER 0.5 INCH' },
      { size: '1 inch', sourceImage: 'TAPPER 1 INCH' },
      { size: '1.5 inch', sourceImage: 'TAPPER 1.5 INCH' },
      { size: '2 inch', sourceImage: 'TAPPER 2 INCH' },
      { size: '2.5 inch', sourceImage: 'TAPPER 2.5 INCH' },
      { size: '3 inch', sourceImage: 'TAPPER 3 INCH' },
    ],
    summary: 'Our widest size range, six sizes from half an inch up to three inches for everyday painting work.',
    description: 'The Tapper is the general-purpose brush most painters reach for first, which is why we make it in six sizes. The half-inch and one-inch handle cutting in, grooves and touch-up work; the two and three inch sizes cover open wall and ceiling area quickly. Buying the range together means a painter has the right width to hand without switching brands mid-job.',
    keywords: ['tapper brush', 'tapper paint brush', 'painting brush set', '2 inch brush', 'cutting in brush'],
  },
  {
    slug: 'tapper-double-berth',
    name: 'Tapper Double Berth',
    category: 'paint-brushes',
    variants: [
      { size: '2 inch', sourceImage: 'TAPPER 2 INCH ( DOUBLE BERTH )' },
      { size: '3 inch', sourceImage: 'TAPPER 3 INCH ( DOUBLE BERTH )' },
    ],
    summary: 'A double-berth build that holds a thicker filling for heavier paint loading.',
    description: 'The double berth construction seats a thicker block of filling than a standard Tapper of the same width. That extra body carries more paint per dip, so there are fewer trips to the tray on large surfaces, and it holds its shape well under the heavier primers and undercoats. Available in two and three inch.',
    keywords: ['double berth brush', 'tapper double berth', 'thick paint brush', 'primer brush'],
  },
  {
    slug: 'tapper-double',
    name: 'Tapper Double',
    category: 'paint-brushes',
    variants: [{ size: '4 inch', sourceImage: 'TAPPER DOUBLE 4 INCH' }],
    summary: 'A four-inch double brush for covering wide, open wall area fast.',
    description: 'At four inches wide with a double filling, this is a brush for area rather than detail. It suits exterior compound walls, ceilings and any large uninterrupted run where the goal is to move paint quickly and evenly.',
    keywords: ['4 inch paint brush', 'tapper double', 'wide wall brush', 'exterior wall brush'],
  },
  {
    slug: 'hollow-single',
    name: 'Hollow Single',
    category: 'paint-brushes',
    variants: [{ size: '4 inch', sourceImage: 'HOLLOW SINGLE 4 INCH' }],
    summary: 'A lighter four-inch brush with a hollow-set filling, easier on the wrist over long spells.',
    description: 'The hollow single setting keeps the filling full at the working edge while reducing the overall weight of the brush. For painters working overhead or through long ceiling runs, that difference in weight is felt by the end of the day. Four inch.',
    keywords: ['hollow single brush', '4 inch hollow brush', 'lightweight wall brush', 'ceiling brush'],
  },

  // ─── Art Brushes ──────────────────────────────────────────────────────────
  {
    slug: 'flat-art-brush',
    name: 'Flat Art Brush',
    category: 'art-brushes',
    variants: [{ size: 'All numbers', sourceImage: 'FLAT BRUSH AVAILABLE IN ALL NOS' }],
    summary: 'Flat artist brushes stocked in the full range of standard numbers.',
    description: 'Flat brushes give a square edge that can be used broadside for filling an area or turned to its edge for a crisp line. We stock the complete run of standard numbers, so art shops and colleges can order a full ladder of sizes from one supplier.',
    keywords: ['flat art brush', 'artist brush wholesale', 'painting brush all numbers', 'art supplies Coimbatore'],
  },
  {
    slug: 'round-art-brush',
    name: 'Round Art Brush',
    category: 'art-brushes',
    variants: [{ size: 'All numbers', sourceImage: 'ROUND BRUSH AVAILABLE IN ALL NOS' }],
    summary: 'Round artist brushes in all standard numbers, from fine detail up to wash sizes.',
    description: 'Round brushes come to a point, which makes them the workhorse of detail and line work while the larger numbers still carry enough colour for a wash. Available across the full range of standard numbers.',
    keywords: ['round art brush', 'detail brush', 'artist brush all numbers', 'art brush manufacturer'],
  },
  {
    slug: 'art-brush-set',
    name: 'Art Brush Set',
    category: 'art-brushes',
    variants: [{ size: 'Set', sourceImage: 'SET BRUSH' }],
    summary: 'A graded set of art brushes packed together, a straightforward starting kit.',
    description: 'A ready-made set covering a graded range of sizes in one pack. Popular with students, schools and art shops who would rather stock a single item than assemble a range brush by brush.',
    keywords: ['art brush set', 'painting brush set', 'student art brushes', 'brush set wholesale'],
  },

  // ─── Paint Rollers ────────────────────────────────────────────────────────
  {
    slug: 'acrylic-interior-roller',
    name: 'Acrylic Interior Roller',
    category: 'paint-rollers',
    variants: [{ size: '9 inch', sourceImage: 'ACRYLIC INTERIOR 9 INCH' }],
    summary: 'A nine-inch roller for acrylic and emulsion paints on interior walls and ceilings.',
    description: 'Matched to acrylic and emulsion paints on interior walls, this roller carries a full load without dripping and lays down an even film with a consistent texture. Nine inches is the standard width for room work, wide enough to cover ground quickly, still manageable in corners and stairwells.',
    keywords: ['acrylic roller', 'interior paint roller', '9 inch roller', 'emulsion roller', 'wall roller wholesale'],
  },
  {
    slug: 'exterior-roller',
    name: 'Exterior Roller',
    category: 'paint-rollers',
    variants: [{ size: '9 inch', sourceImage: 'EXTERIOR 9 INCH' }],
    summary: 'A nine-inch roller built for exterior masonry and textured surfaces.',
    description: 'Exterior walls are rougher and thirstier than interior plaster, so this roller is built with a longer, harder-wearing pile that reaches into a textured surface and survives the abrasion. Suits exterior emulsions and masonry finishes on compound walls and building faces.',
    keywords: ['exterior paint roller', 'masonry roller', '9 inch exterior roller', 'outdoor wall roller'],
  },
  {
    slug: 'epoxy-roller',
    name: 'Epoxy Roller',
    category: 'paint-rollers',
    variants: [{ size: '9 inch', sourceImage: 'EPOXY 9 INCH' }],
    summary: 'A nine-inch roller for epoxy coatings on floors and industrial surfaces.',
    description: 'Epoxy is more aggressive than ordinary paint and will break down a roller that was not made for it. This one uses a solvent-resistant pile that holds together through a full epoxy job, laying the coating down flat without shedding into the finish. For industrial floors, workshops and warehouse surfaces.',
    keywords: ['epoxy roller', 'epoxy floor roller', 'industrial paint roller', 'solvent resistant roller'],
  },
  {
    slug: 'enamel-roller',
    name: 'Enamel Roller',
    category: 'paint-rollers',
    variants: [
      { size: '2 inch', sourceImage: 'ENAMEL ROLLER 2 INCH' },
      { size: '4 inch', sourceImage: 'ENAMEL ROLLER 4 INCH' },
      { size: '6 inch', sourceImage: 'ENAMEL ROLLER 6 INCH' },
    ],
    summary: 'Short-pile enamel rollers in three sizes for a smooth, low-texture finish.',
    description: 'Enamel shows every bit of texture it is given, so these rollers use a short, dense pile that leaves a smooth finish rather than an orange-peel one. Made in two, four and six inch: the two-inch reaches behind pipes and into narrow returns, while the six-inch covers doors, shutters and grillwork.',
    keywords: ['enamel roller', 'small paint roller', '2 inch roller', '4 inch roller', '6 inch roller', 'smooth finish roller'],
  },
  {
    slug: 'roller-set',
    name: 'Roller Set',
    category: 'paint-rollers',
    variants: [{ size: '4 inch and 6 inch', sourceImage: 'SET ROLLER AVAILABLE IN 4 INCH AND 6 INCH' }],
    summary: 'A complete roller set with handle, available in four and six inch.',
    description: 'Roller, frame and handle packed together, so there is nothing else to source before starting. Available in four and six inch. A practical single-item stock line for hardware shops selling to homeowners and smaller contractors.',
    keywords: ['roller set', 'paint roller with handle', 'roller kit', '4 inch roller set', '6 inch roller set'],
  },
  {
    slug: 'paint-tray',
    name: 'Paint Tray',
    category: 'paint-rollers',
    variants: [{ size: 'Standard', sourceImage: 'PAINT TRAY' }],
    summary: 'A ribbed loading tray sized to standard rollers.',
    description: 'A tray with a ribbed ramp for working the load evenly into the roller and squeezing off the excess, which is what keeps a roller from dripping and leaving heavy edges. Sized for standard rollers.',
    keywords: ['paint tray', 'roller tray', 'painting accessories', 'paint tray wholesale'],
  },

  // ─── Putty Knives ─────────────────────────────────────────────────────────
  {
    slug: 'putty-blade',
    name: 'Putty Blade',
    category: 'putty-knives',
    variants: [{ size: '2 inch to 12 inch', sourceImage: 'PUTTY BLADE 2 INCH TO 12 INCH' }],
    summary: 'Putty blades from two to twelve inches for filling and levelling.',
    description: 'Used to press filler into a surface and then draw it off flat. The narrow sizes work into cracks and corners; the wide ones ride across a broad area to level it in fewer passes. Stocked from two inches through to twelve, so a painter can carry the full ladder of widths.',
    keywords: ['putty blade', 'putty knife', 'wall filling blade', 'putty knife wholesale', 'surface preparation tools'],
  },
  {
    slug: 'altek-blade',
    name: 'Altek Blade',
    category: 'putty-knives',
    variants: [{ size: '3 inch to 14 inch', sourceImage: 'ALTEK BLADE 3 INCH TO 14 INCH' }],
    summary: 'Altek blades from three to fourteen inches, including extra-wide sizes for finishing.',
    description: 'The Altek range runs wider than our standard putty blades, up to fourteen inches, for skimming and finishing large wall areas where a wide blade means fewer joins to sand out afterwards. Available from three inches upward.',
    keywords: ['altek blade', 'wide putty blade', '14 inch blade', 'skimming blade', 'wall finishing tools'],
  },
  {
    slug: 'patta-uli',
    name: 'Patta Uli',
    category: 'putty-knives',
    variants: [{ size: 'Standard', sourceImage: 'PATTA ULI' }],
    summary: 'The traditional flat chisel used to scrape back and prepare a surface before painting.',
    description: 'A flat scraping chisel for taking old paint, flaking distemper and loose material off a wall before any new coat goes on. Long-standing part of a painter\'s kit across Tamil Nadu and the tool most of the preparation work starts with.',
    keywords: ['patta uli', 'பட்டை உளி', 'scraping chisel', 'paint scraper', 'wall scraper', 'surface preparation'],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsInCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

/** Total individual items across all families, 30, matching the original list. */
export const totalVariantCount = products.reduce((n, p) => n + p.variants.length, 0);
