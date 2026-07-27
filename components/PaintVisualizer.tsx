'use client';

import { HexColorPicker } from 'react-colorful';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Paint the wall, with a roller or a brush.
 *
 * Replaces the old "Play With colours!" panel, which used react-color's
 * SketchPicker to recolour the About section's own background and text. That
 * let visitors make the page unreadable and demonstrated nothing about the
 * products.
 *
 * Here you pick a shade and drag to paint, and the stroke is rendered with the
 * texture of the tool you chose. For a brush manufacturer that is the point:
 * the roller lays a wide even band, the brush lays a narrower one with visible
 * bristle lines.
 *
 * LAYERING
 *   1. an SVG of the bare wall            (base)
 *   2. a <canvas> where the paint goes    (middle)
 *   3. an SVG of window, skirting, floor and furniture  (foreground)
 * Painting therefore lands on the wall and never on top of the window, which
 * is also how masking works on a real job.
 *
 * The room is drawn rather than photographed: there is no usable room
 * photography in the project (media/slides/3 has marketing copy burnt into the
 * pixels, media/parallax.jpg is a stock shot of houses in Ireland), and a drawn
 * scene recolours cleanly at any shade.
 *
 * react-color was dropped: unmaintained, and no React 19 support.
 * react-colorful is ~2.8KB and does support it.
 */

const PRESETS = [
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

/** Canvas coordinate space. Matches the wall area of the SVG viewBox. */
const W = 800;
const H = 430;

const TOOLS = {
  roller: { label: 'Roller', width: 54, bristles: 0 },
  brush: { label: 'Brush', width: 26, bristles: 5 },
} as const;

type ToolName = keyof typeof TOOLS;

function isDark(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(clean.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.4;
}

type Point = { x: number; y: number };

export default function PaintVisualizer() {
  /**
   * Two stacked canvases.
   *
   * `canvasRef` holds committed paint. `strokeRef` sits on top and holds only
   * the stroke in progress, cleared and re-rendered in full on every move, then
   * flattened down on release.
   *
   * The reason is texture. Drawing segment by segment straight onto one canvas
   * means each new band paints over the previous segment's streaks, so a roller
   * stroke ended up smooth with texture visible only at the very last segment.
   * Re-rendering the whole stroke each frame keeps the streaks continuous.
   */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokeRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const strokeCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const points = useRef<Point[]>([]);
  const painting = useRef(false);

  const [color, setColor] = useState(PRESETS[5].hex);
  const [tool, setTool] = useState<ToolName>('roller');
  const [custom, setCustom] = useState(false);
  const [hasPaint, setHasPaint] = useState(false);

  const dark = isDark(color);

  // Backing stores at device resolution, so strokes aren't soft.
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    for (const [element, store] of [
      [canvasRef.current, ctxRef],
      [strokeRef.current, strokeCtxRef],
    ] as const) {
      if (!element) continue;
      element.width = W * dpr;
      element.height = H * dpr;
      const ctx = element.getContext('2d');
      if (!ctx) continue;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      store.current = ctx;
    }
  }, []);

  /** Maps a pointer event onto canvas coordinates. */
  const toCanvas = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * W,
      y: ((event.clientY - rect.top) / rect.height) * H,
    };
  };

  /**
   * Renders the whole in-progress stroke onto the overlay layer.
   *
   * A path offset perpendicular to the direction of travel, so texture lines
   * run along the stroke rather than across it.
   *
   * The roller lays a solid band with a couple of faint light streaks where the
   * sleeve carries less paint. The brush is built the opposite way: no solid
   * band at all, just overlapping bristle tracks of varying width and opacity,
   * which is what actually makes a brush stroke look like one.
   */
  const renderStroke = useCallback(
    (path: Point[]) => {
      const ctx = strokeCtxRef.current;
      if (!ctx || path.length === 0) return;

      ctx.clearRect(0, 0, W, H);
      const spec = TOOLS[tool];

      /** Traces the path, shifted `offset` px perpendicular to travel. */
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
        // Brush: bristle tracks only, so gaps between them stay visible.
        for (let i = 0; i < spec.bristles; i++) {
          const t = (i / (spec.bristles - 1) - 0.5) * spec.width;
          // Deterministic per-bristle variation, so it doesn't shimmer between
          // frames the way Math.random() would.
          const wobble = 0.55 + 0.45 * Math.abs(Math.cos(i * 2.4));
          ctx.globalAlpha = 0.55 + 0.4 * wobble;
          ctx.lineWidth = spec.width * 0.3 * wobble;
          traceOffset(t);
        }
      } else {
        // Roller: solid band.
        ctx.globalAlpha = 0.95;
        ctx.lineWidth = spec.width;
        traceOffset(0);

        // Light streaks near the edges of the sleeve.
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 0.14;
        ctx.lineWidth = 2.5;
        traceOffset(-spec.width * 0.3);
        traceOffset(spec.width * 0.28);
        ctx.strokeStyle = color;
      }

      ctx.globalAlpha = 1;
    },
    [color, tool]
  );

  /** Flattens the finished stroke onto the committed layer. */
  const commitStroke = useCallback(() => {
    const ctx = ctxRef.current;
    const strokeCanvas = strokeRef.current;
    const strokeCtx = strokeCtxRef.current;
    if (!ctx || !strokeCanvas || !strokeCtx) return;

    ctx.globalAlpha = 1;
    ctx.drawImage(strokeCanvas, 0, 0, W, H);
    strokeCtx.clearRect(0, 0, W, H);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    // Some synthetic and non-active pointers reject capture; painting should
    // still work if it fails.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* not fatal */
    }
    painting.current = true;
    const point = toCanvas(event);
    // Duplicated so a tap with no movement still leaves a mark.
    points.current = [point, { x: point.x + 0.01, y: point.y }];
    renderStroke(points.current);
    setHasPaint(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!painting.current) return;
    const point = toCanvas(event);
    const previous = points.current[points.current.length - 1];
    // Skip sub-pixel jitter, which would bloat the path for no visual gain.
    if (previous && Math.hypot(point.x - previous.x, point.y - previous.y) < 2) return;
    points.current.push(point);
    renderStroke(points.current);
  };

  const endStroke = () => {
    if (!painting.current) return;
    painting.current = false;
    commitStroke();
    points.current = [];
  };

  const fillWall = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
    setHasPaint(true);
  };

  const clearWall = () => {
    ctxRef.current?.clearRect(0, 0, W, H);
    strokeCtxRef.current?.clearRect(0, 0, W, H);
    setHasPaint(false);
  };

  const activePreset = PRESETS.find((p) => p.hex.toLowerCase() === color.toLowerCase());

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <div>
        <div className="relative overflow-hidden rounded-xl shadow-[var(--shadow-card)]">
          {/* 1. Bare wall */}
          <svg viewBox={`0 0 ${W} 520`} className="block h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id="pv-light" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#fff" stopOpacity="0" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.06" />
              </linearGradient>
              <linearGradient id="pv-floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C89A6A" />
                <stop offset="100%" stopColor="#A87C4F" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width={W} height={H} fill="#E8E4DE" />
          </svg>

          {/* 2a. Committed paint. Covers the wall only, not the whole scene. */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full"
            style={{ aspectRatio: `${W} / ${H}` }}
          />

          {/* 2b. Stroke in progress, and the pointer surface.
                  `touch-none` stops a drag here from scrolling the page. It is
                  scoped to this element, so the rest of the page scrolls
                  normally on touch. */}
          <canvas
            ref={strokeRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endStroke}
            onPointerLeave={endStroke}
            onPointerCancel={endStroke}
            aria-label={
              hasPaint
                ? `Room wall, painted in ${activePreset?.name ?? color}`
                : 'Room wall, unpainted. Drag across it to paint, or use the Fill wall button.'
            }
            role="img"
            className="absolute inset-x-0 top-0 h-auto w-full cursor-crosshair touch-none"
            style={{ aspectRatio: `${W} / ${H}` }}
          />

          {/* 3. Window, skirting, floor and furniture, over the paint. */}
          <svg
            viewBox={`0 0 ${W} 520`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <rect x="0" y="0" width={W} height={H} fill="url(#pv-light)" />

            <g>
              <rect x="510" y="70" width="210" height="210" rx="4" fill="#FFFFFF" />
              <rect x="522" y="82" width="186" height="186" fill="#CFE3EF" />
              <line x1="615" y1="82" x2="615" y2="268" stroke="#FFFFFF" strokeWidth="9" />
              <line x1="522" y1="175" x2="708" y2="175" stroke="#FFFFFF" strokeWidth="9" />
            </g>

            <rect x="150" y="110" width="120" height="150" rx="3" fill="#FFFFFF" />
            <rect x="162" y="122" width="96" height="126" fill="#E8E2D8" />

            <rect x="0" y="404" width={W} height="26" fill="#FFFFFF" />
            <rect x="0" y="430" width={W} height="90" fill="url(#pv-floor)" />

            <g>
              <rect x="90" y="300" width="280" height="86" rx="14" fill="#4A3F3A" />
              <rect x="104" y="286" width="252" height="46" rx="12" fill="#5C4F48" />
              <rect x="112" y="386" width="18" height="18" fill="#8B6A4A" />
              <rect x="330" y="386" width="18" height="18" fill="#8B6A4A" />
            </g>

            <g>
              <path d="M430 386 l14 -70 h-28 z" fill="#B5764B" />
              <circle cx="430" cy="300" r="30" fill="#4E7A4A" />
              <circle cx="408" cy="316" r="20" fill="#3F6A3C" />
              <circle cx="452" cy="318" r="18" fill="#5A8A52" />
            </g>
          </svg>
        </div>

        <p className="mt-4 text-sm text-ink-400">
          Drag across the wall to paint. The roller lays a wide band, the brush leaves bristle
          lines.
        </p>
      </div>

      <div>
        <div
          className="flex items-center justify-between gap-4 rounded-xl px-5 py-4"
          style={{ backgroundColor: color, transition: 'background-color 250ms ease' }}
        >
          <span
            className="font-display text-[0.95rem] font-semibold"
            style={{ color: dark ? '#FFFFFF' : '#16110F' }}
          >
            {activePreset?.name ?? 'Custom'}
          </span>
          <span
            className="text-sm uppercase"
            style={{ color: dark ? 'rgba(255,255,255,0.75)' : 'rgba(22,17,15,0.6)' }}
          >
            {color}
          </span>
        </div>

        {/* Tool picker */}
        <div
          role="radiogroup"
          aria-label="Painting tool"
          className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-surface-2 p-1"
        >
          {(Object.keys(TOOLS) as ToolName[]).map((name) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={tool === name}
              onClick={() => setTool(name)}
              className={`rounded-full py-2.5 text-[0.9rem] font-medium transition-colors ${
                tool === name ? 'bg-paper text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-800'
              }`}
            >
              {TOOLS[name].label}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid grid-cols-6 gap-2.5">
          {PRESETS.map((preset) => {
            const selected = preset.hex.toLowerCase() === color.toLowerCase();
            return (
              <li key={preset.hex}>
                <button
                  type="button"
                  onClick={() => {
                    setColor(preset.hex);
                    setCustom(false);
                  }}
                  title={preset.name}
                  aria-label={preset.name}
                  aria-pressed={selected}
                  className={`aspect-square w-full rounded-lg transition-all ${
                    selected
                      ? 'ring-2 ring-ink-900 ring-offset-2 ring-offset-paper'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                />
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {/* Dragging is impossible with a keyboard, so these are the
              non-pointer route to the same result. */}
          <button
            type="button"
            onClick={fillWall}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-[0.9rem] font-medium text-paper transition-colors hover:bg-ink-800"
          >
            Fill wall
          </button>
          <button
            type="button"
            onClick={clearWall}
            disabled={!hasPaint}
            className="rounded-full border border-ink-300 px-5 py-2.5 text-[0.9rem] font-medium text-ink-800 transition-colors hover:border-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start again
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCustom((v) => !v)}
          aria-expanded={custom}
          className="mt-6 text-[0.9rem] font-medium text-ink-700 underline decoration-line underline-offset-8 transition-colors hover:decoration-brand-600"
        >
          {custom ? 'Hide custom colour' : 'Pick a custom colour'}
        </button>

        {custom && (
          <div className="mt-5 [&_.react-colorful]:w-full">
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
      </div>
    </div>
  );
}
