'use client';

import { useEffect, useState } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';

/**
 * Crossfading product showcase for the hero.
 *
 * WHY PRODUCTS AND NOT A SCENE PHOTO
 * The original hero faded between three "lifestyle" slides. None survive an
 * overlaid headline:
 *   slides/1: painter at work, but with the logo and "MAGIC WITH COLOURS"
 *             burnt into the pixels; it showed straight through the h1.
 *   slides/2: generic cartoon clipart.
 *   slides/3: interior photo with marketing copy burnt in.
 * media/parallax.jpg is a stock photograph of terraced houses in Ireland and
 * media/contact/contact.jpg is blue clipart icons, neither is Annai's.
 *
 * The 30 product shots are the only genuinely good, on-brand photography in the
 * project: clean, evenly lit, on white. So the hero leads with the products on a
 * light background instead of white text over a dark stock photo. It keeps the
 * crossfade the old site had, and drops the react-slideshow-image dependency.
 *
 * Swap in new photography here if it's ever shot.
 */

const SLIDES = [
  {
    src: 'products/ANNAI PREMIUM MILK WHITE 4 INCH',
    alt: 'Annai Premium Milk White four inch wall brush, with a green handle and brass ferrule stamped ANNAI',
  },
  {
    src: 'products/ACRYLIC INTERIOR 9 INCH',
    alt: 'Annai nine inch acrylic interior paint roller with a yellow handle and wire frame',
  },
  {
    src: 'products/SET BRUSH',
    alt: 'A set of five Annai art brushes fanned out, with long pale wooden handles',
  },
];

const INTERVAL = 4200;

export default function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [paused]);

  // Don't animate while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div className="relative">
      {/*
        The photos are full-bleed rather than letterboxed with padding. Their
        backdrop sheets are inconsistent cool greys (#D5D8D7 to #E6E6EC), so on
        a warm panel they read as a visible grey rectangle floating inside the
        card. At 736x900 the sources are aspect 0.818 and this panel is 4/5
        (0.8), so object-cover crops essentially nothing.
      */}
      <div className="relative aspect-4/5 overflow-hidden rounded-[1.5rem] bg-surface-2 shadow-[var(--shadow-card)] ring-1 ring-line/60">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none"
            style={{ opacity: i === index ? 1 : 0 }}
            /* Only the visible slide is exposed to assistive tech. */
            aria-hidden={i !== index}
          >
            <ResponsiveImage
              src={slide.src}
              alt={slide.alt}
              sizes="(max-width: 1024px) 90vw, 480px"
              className="h-full w-full object-cover"
              priority={i === 0}
              placeholder={false}
            />
          </div>
        ))}
      </div>

      {/* Manual controls: an auto-rotating carousel with no way to steer it is
          a usability problem, and it's what the old hero did. */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => {
              setIndex(i);
              setPaused(true);
            }}
            aria-label={slide.alt}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-7 bg-brand-600' : 'w-2 bg-ink-300 hover:bg-ink-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
