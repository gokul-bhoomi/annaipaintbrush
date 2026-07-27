/**
 * Shared painting engine.
 *
 * Used by both the wall visualizer on the homepage and the site-wide page
 * painter. Extracted so the stroke texture is defined once: a roller and a
 * brush should look the same wherever you drag them.
 */

export type Point = { x: number; y: number };

export const TOOLS = {
  roller: { label: 'Roller', width: 54, bristles: 0 },
  brush: { label: 'Brush', width: 26, bristles: 5 },
} as const;

export type ToolName = keyof typeof TOOLS;

/** Relative luminance, for deciding whether to put light or dark text on a fill. */
export function isDark(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(clean.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.4;
}

/**
 * Renders a whole stroke onto a layer, replacing whatever was there.
 *
 * The entire path is re-rendered rather than just the newest segment, because
 * drawing segment by segment means each new band paints over the previous
 * one's texture: a roller stroke ends up smooth with streaks visible only at
 * the very end. Callers keep the in-progress stroke on its own canvas and
 * flatten it down on release.
 *
 * Only the stroke's bounding box is cleared, so re-rendering stays cheap even
 * when the layer is as tall as an entire page.
 */
export function renderStroke(
  ctx: CanvasRenderingContext2D,
  path: Point[],
  tool: ToolName,
  color: string,
  scale = 1
): void {
  if (path.length === 0) return;

  const spec = TOOLS[tool];
  const width = spec.width * scale;

  // Clear only what this stroke could possibly touch.
  const pad = width + 6;
  const xs = path.map((p) => p.x);
  const ys = path.map((p) => p.y);
  ctx.clearRect(
    Math.min(...xs) - pad,
    Math.min(...ys) - pad,
    Math.max(...xs) - Math.min(...xs) + pad * 2,
    Math.max(...ys) - Math.min(...ys) + pad * 2
  );

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  /** Traces the path, shifted `offset` px perpendicular to the direction of travel. */
  const traceOffset = (offset: number) => {
    ctx.beginPath();
    for (let i = 0; i < path.length; i++) {
      const prev = path[Math.max(0, i - 1)];
      const next = path[Math.min(path.length - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const length = Math.hypot(dx, dy) || 1;
      const x = path[i].x + (-dy / length) * offset;
      const y = path[i].y + (dx / length) * offset;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  ctx.strokeStyle = color;

  if (spec.bristles > 0) {
    // Brush: bristle tracks only, no solid band, so the gaps between them stay
    // visible. That separation is what makes it read as a brush.
    for (let i = 0; i < spec.bristles; i++) {
      const t = (i / (spec.bristles - 1) - 0.5) * width;
      // Deterministic per-bristle variation. Math.random() here would make the
      // stroke shimmer, since the whole path is re-rendered every frame.
      const wobble = 0.55 + 0.45 * Math.abs(Math.cos(i * 2.4));
      ctx.globalAlpha = 0.55 + 0.4 * wobble;
      ctx.lineWidth = width * 0.3 * wobble;
      traceOffset(t);
    }
  } else {
    // Roller: solid band, then faint light streaks where the sleeve carries
    // less paint near its edges.
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = width;
    traceOffset(0);

    ctx.strokeStyle = '#ffffff';
    ctx.globalAlpha = 0.14;
    ctx.lineWidth = 2.5 * scale;
    traceOffset(-width * 0.3);
    traceOffset(width * 0.28);
    ctx.strokeStyle = color;
  }

  ctx.globalAlpha = 1;
}

/**
 * A CSS `cursor` value drawing the chosen tool, tinted with the chosen colour.
 *
 * Inlined as an SVG data URI. Kept at 44px because browsers refuse custom
 * cursors above 128px, and the hotspot is placed on the working end of the
 * tool (the bristle tip, or the middle of the roller sleeve) so paint appears
 * where the tool actually touches.
 */
export function cursorFor(tool: ToolName, color: string): string {
  const svg =
    tool === 'brush'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
           <rect x="18" y="2" width="8" height="16" rx="4" fill="#6B4A3A"/>
           <rect x="15" y="16" width="14" height="9" rx="1.5" fill="#C9A227"/>
           <path d="M14 25h16l-2 15H16z" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
         </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
           <rect x="6" y="3" width="30" height="13" rx="6" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
           <path d="M21 16v8h9v9" fill="none" stroke="#9A8B82" stroke-width="2.5" stroke-linecap="round"/>
           <rect x="26" y="32" width="8" height="10" rx="3" fill="#E8B33A"/>
         </svg>`;

  const encoded = encodeURIComponent(svg.replace(/\s+/g, ' ').trim());
  const hotspot = tool === 'brush' ? '22 40' : '21 10';
  return `url("data:image/svg+xml,${encoded}") ${hotspot}, crosshair`;
}

/** Wall shades that people actually paint with. */
export const PRESETS = [
  { name: 'Chalk White', hex: '#F2EFE9' },
  { name: 'Warm Sand', hex: '#E3D5C0' },
  { name: 'Clay', hex: '#C98B6B' },
  { name: 'Terracotta', hex: '#B4553A' },
  { name: 'Deep Ochre', hex: '#C08A2E' },
  { name: 'Sage', hex: '#9BAA8C' },
  { name: 'Forest', hex: '#3F5D48' },
  { name: 'Teal', hex: '#2E6E70' },
  { name: 'Denim', hex: '#41618A' },
  { name: 'Indigo', hex: '#2E3A5C' },
  { name: 'Plum', hex: '#6A4260' },
  { name: 'Charcoal', hex: '#3A3A3C' },
];
