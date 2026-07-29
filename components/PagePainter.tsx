'use client';

import { HexColorPicker } from 'react-colorful';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cursorFor, PRESETS, renderStroke, TOOLS, type Point, type ToolName } from '@/lib/paint';

/**
 * Lets visitors paint on the site itself.
 *
 * Pick a roller or a brush, the cursor becomes that tool, and you can paint
 * anywhere on the page. For a brush manufacturer it is the most direct
 * demonstration there is: the product is the thing you are handed to play with.
 *
 * HOW IT SITS OVER THE PAGE
 * The canvas spans the whole document rather than the viewport, so paint stays
 * stuck to the content it was applied to instead of sliding around as you
 * scroll. While painting is off, the overlay is `pointer-events: none` and the
 * site behaves completely normally.
 *
 * DEVICE PIXEL RATIO
 * Deliberately rendered at 1x, unlike the wall visualizer. A full page can be
 * 5000px tall, and at 2x that is a canvas of roughly 115MB. 1x keeps it near
 * 29MB, and slightly softer strokes are a fair trade for not exhausting memory
 * on a mid-range phone.
 *
 * GETTING OUT
 * Escape exits, and the toolbar's Done button is always on screen. That matters
 * because while painting is active the overlay swallows clicks, so there has to
 * be an obvious way back that does not rely on hitting a link.
 */

const STROKE_SCALE = 0.85;

export default function PagePainter() {
  const paintRef = useRef<HTMLCanvasElement>(null);
  const strokeRef = useRef<HTMLCanvasElement>(null);
  const paintCtx = useRef<CanvasRenderingContext2D | null>(null);
  const strokeCtx = useRef<CanvasRenderingContext2D | null>(null);
  const points = useRef<Point[]>([]);
  const painting = useRef(false);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [tool, setTool] = useState<ToolName>('brush');
  const [color, setColor] = useState(PRESETS[3].hex);
  const [custom, setCustom] = useState(false);
  const [hasPaint, setHasPaint] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  /**
   * Matches the canvases to the full document, preserving anything painted.
   *
   * Width prefers `document.documentElement.clientWidth` because it excludes
   * the vertical scrollbar. `window.innerWidth` includes it, which made the
   * overlay 15px wider than the content on any desktop with classic
   * scrollbars and put a horizontal scrollbar on every page.
   *
   * It falls back to `innerWidth` because clientWidth has been observed
   * reading 0 here, which would collapse the overlay entirely. Every value is
   * guarded below, so a bad measurement leaves the previous size in place
   * rather than wiping what has been painted.
   */
  const resize = useCallback(() => {
    const width =
      document.documentElement.clientWidth || window.innerWidth || document.body.clientWidth;
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
    if (width < 1 || height < 1) return;
    setSize((current) =>
      current.w === width && current.h === height ? current : { w: width, h: height }
    );
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    // Sections reveal on scroll, which changes the document height.
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [resize]);

  // Re-acquire contexts whenever the canvas is resized, since changing width or
  // height wipes a canvas. Existing paint is copied back over.
  useEffect(() => {
    const paint = paintRef.current;
    const stroke = strokeRef.current;
    if (!paint || !stroke || size.w === 0) return;

    const previous =
      hasPaint && paint.width > 0
        ? paint.getContext('2d')?.getImageData(0, 0, paint.width, paint.height)
        : null;

    for (const canvas of [paint, stroke]) {
      canvas.width = size.w;
      canvas.height = size.h;
    }

    paintCtx.current = paint.getContext('2d');
    strokeCtx.current = stroke.getContext('2d');

    if (previous) paintCtx.current?.putImageData(previous, 0, 0);
    // hasPaint is intentionally not a dependency: including it would wipe the
    // canvas on the very first stroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  // Escape always gets you out.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active]);

  const toDocument = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!active) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* some pointers reject capture; painting still works */
    }
    painting.current = true;
    const point = toDocument(event);
    // Duplicated so a tap with no movement still leaves a mark.
    points.current = [point, { x: point.x + 0.01, y: point.y }];
    if (strokeCtx.current) {
      renderStroke(strokeCtx.current, points.current, tool, color, STROKE_SCALE);
    }
    setHasPaint(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!painting.current || !strokeCtx.current) return;
    const point = toDocument(event);
    const previous = points.current[points.current.length - 1];
    if (previous && Math.hypot(point.x - previous.x, point.y - previous.y) < 2) return;
    points.current.push(point);
    renderStroke(strokeCtx.current, points.current, tool, color, STROKE_SCALE);
  };

  const endStroke = () => {
    if (!painting.current) return;
    painting.current = false;
    const stroke = strokeRef.current;
    if (paintCtx.current && stroke && strokeCtx.current) {
      paintCtx.current.drawImage(stroke, 0, 0);
      strokeCtx.current.clearRect(0, 0, size.w, size.h);
    }
    points.current = [];
  };

  const clearAll = () => {
    paintCtx.current?.clearRect(0, 0, size.w, size.h);
    strokeCtx.current?.clearRect(0, 0, size.w, size.h);
    setHasPaint(false);
  };

  const cursor = cursorFor(tool, color);

  return (
    <>
      {/* Paint layers. Decorative, so hidden from assistive tech entirely. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 z-30"
        style={{
          width: size.w ? `${size.w}px` : '100%',
          height: size.h ? `${size.h}px` : '100%',
          pointerEvents: active ? 'auto' : 'none',
        }}
      >
        <canvas ref={paintRef} className="absolute top-0 left-0 h-full w-full" />
        <canvas
          ref={strokeRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          onPointerCancel={endStroke}
          className="absolute top-0 left-0 h-full w-full"
          style={{
            cursor: active ? cursor : 'default',
            pointerEvents: active ? 'auto' : 'none',
            touchAction: active ? 'none' : 'auto',
          }}
        />
      </div>

      {/* Toolbar. Sits opposite the WhatsApp and call buttons so the two
          floating controls never collide.

          z-40 matches StickyContact and deliberately sits below the header's
          z-50, so the mobile menu covers both floating controls instead of
          having them punch through the open drawer. */}
      <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
        {!open ? (
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setActive(true);
            }}
            className="flex items-center gap-2.5 rounded-full border border-line bg-paper/90 py-3 pr-5 pl-4 text-[0.9rem] font-medium text-ink-800 shadow-lg backdrop-blur-md transition-colors hover:bg-paper"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 3h6v5H9zM10 8v3a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8M12 13v3"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="9.5" y="16" width="5" height="5" rx="1.5" fill="currentColor" />
            </svg>
            Paint this page
          </button>
        ) : (
          <div className="w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-line bg-paper/95 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-[0.95rem] font-semibold text-ink-900">
                Paint this page
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setActive(false);
                }}
                className="rounded-full px-3 py-1.5 text-sm text-ink-500 hover:bg-surface hover:text-ink-900"
              >
                Done
              </button>
            </div>

            <div
              role="radiogroup"
              aria-label="Painting tool"
              className="mt-3.5 grid grid-cols-2 gap-1.5 rounded-full bg-surface-2 p-1"
            >
              {(Object.keys(TOOLS) as ToolName[]).map((name) => (
                <button
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={tool === name}
                  onClick={() => {
                    setTool(name);
                    setActive(true);
                  }}
                  className={`rounded-full py-2 text-[0.85rem] font-medium transition-colors ${
                    tool === name ? 'bg-paper text-ink-900 shadow-sm' : 'text-ink-500'
                  }`}
                >
                  {TOOLS[name].label}
                </button>
              ))}
            </div>

            <ul className="mt-3.5 grid grid-cols-6 gap-2">
              {PRESETS.map((preset) => {
                const selected = preset.hex.toLowerCase() === color.toLowerCase();
                return (
                  <li key={preset.hex}>
                    <button
                      type="button"
                      onClick={() => {
                        setColor(preset.hex);
                        setActive(true);
                      }}
                      title={preset.name}
                      aria-label={preset.name}
                      aria-pressed={selected}
                      className={`aspect-square w-full rounded-md transition-all ${
                        selected ? 'ring-2 ring-ink-900 ring-offset-2 ring-offset-paper' : ''
                      }`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="mt-3.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActive((v) => !v)}
                className={`flex-1 rounded-full py-2.5 text-[0.85rem] font-medium transition-colors ${
                  active
                    ? 'bg-ink-900 text-paper'
                    : 'border border-ink-300 text-ink-700 hover:border-ink-900'
                }`}
              >
                {active ? 'Painting' : 'Paused'}
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={!hasPaint}
                className="rounded-full border border-line px-4 py-2.5 text-[0.85rem] font-medium text-ink-700 transition-colors hover:border-ink-900 disabled:opacity-40"
              >
                Wipe
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCustom((v) => !v)}
              aria-expanded={custom}
              className="mt-3.5 text-[0.8rem] font-medium text-ink-600 underline decoration-line underline-offset-4 hover:decoration-brand-600"
            >
              {custom ? 'Hide custom colour' : 'Pick a custom colour'}
            </button>

            {custom && (
              <div className="mt-3 [&_.react-colorful]:h-32 [&_.react-colorful]:w-full">
                <HexColorPicker
                  color={color}
                  onChange={(next) => {
                    setColor(next);
                    setActive(true);
                  }}
                />
              </div>
            )}

            <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-400">
              {active
                ? 'Drag anywhere to paint. Press Escape or hit Done when you have had enough.'
                : 'Paused, so you can scroll and click as normal.'}
            </p>
          </div>
        )}
      </div>

      <span className="sr-only" aria-live="polite">
        {active
          ? `Painting with the ${TOOLS[tool].label.toLowerCase()}, in ${
              PRESETS.find((p) => p.hex.toLowerCase() === color.toLowerCase())?.name ?? color
            }`
          : ''}
      </span>
    </>
  );
}
