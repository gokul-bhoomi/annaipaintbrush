'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper.
 *
 * Replaces the GSAP animation in the old Home.js, which called `fadeIn`/
 * `fadeOut` directly in the component's render body (src/components/pages/home/
 * Home.js:46-47). That fired a tween on every render and, because it also
 * animated *out*, left sections stranded at fractional opacity, the live site
 * currently renders `.about` at opacity 0.69 and `.cards` at 0.47 mid-scroll.
 *
 * This reveals once and never hides again, so content cannot end up invisible.
 * Animation is CSS; this only toggles an attribute.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in ms, for sequences like a card row. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  /**
   * Widened to ElementType so the single ref can serve any of the allowed tags.
   * Left as the specific union in the prop signature, so callers still get
   * autocomplete and are stopped from passing an arbitrary tag.
   */
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect the OS setting: show immediately, don't animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.dataset.revealed = 'true';
      return;
    }

    // Already in view on load (e.g. above the fold): reveal without waiting.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
