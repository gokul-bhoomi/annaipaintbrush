'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Logo from '@/components/Logo';
import { categories } from '@/data/catalogue';
import { copy } from '@/lib/copy';
import { site } from '@/lib/site';

/**
 * Sticky header with a focus-trapped mobile drawer.
 *
 * The old navbar leaned on Materialize's jQuery-era sidenav, initialised by a
 * global `M.AutoInit()` that re-ran on every render. Its mobile state was
 * unreliable enough that the homepage shipped a button reading "Use Navigation
 * on the top left corner" as a workaround. That button is gone.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const links = [
    { href: '/products/', label: copy.nav.products },
    { href: '/about/', label: copy.nav.about },
    { href: '/contact/', label: copy.nav.contact },
  ];

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, '')) && href !== '/';

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          {/*
            The lockup scales to its height and the viewBox fixes the width, so
            the inline variant is 9.24x as wide as it is tall: 443px at 48px.
            The breakpoint is `lg`, not `sm`, because of what is left over
            after the nav:

              768px  (md, nav appears)  304px free  ->  inline fits at only 33px
              1024px (lg)               560px free  ->  inline fits at 60px

            So md is the tight one, not mobile. Below lg the descriptor is
            dropped rather than shrunk to something unreadable.
          */}
          <Logo variant="compact" className="h-10 lg:hidden" />
          <Logo variant="inline" className="hidden h-12 lg:block" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`text-[0.9rem] tracking-wide transition-colors ${
                isActive(link.href)
                  ? 'text-ink-900'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="rounded-full bg-ink-900 px-5 py-2.5 text-[0.9rem] font-medium text-paper transition-colors hover:bg-ink-800"
          >
            {copy.home.heroCtaContact}
          </Link>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="-mr-2 inline-flex items-center gap-2 rounded-lg p-2 text-sm text-ink-700 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{copy.nav.menu}</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label={copy.nav.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
          />
          <div
            ref={drawerRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={copy.nav.menu}
            className="absolute inset-y-0 right-0 flex w-[min(21rem,86vw)] flex-col overflow-y-auto bg-paper"
          >
            <div className="flex h-20 items-center justify-end px-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-ink-500"
              >
                {copy.nav.close}
              </button>
            </div>

            <nav className="flex flex-col px-5 pb-10" aria-label="Mobile">
              <Link href="/" className="border-b border-line py-4 font-display text-xl text-ink-900">
                {copy.nav.home}
              </Link>
              <Link
                href="/products/"
                className="border-b border-line py-4 font-display text-xl text-ink-900"
              >
                {copy.nav.products}
              </Link>

              <ul className="border-b border-line py-3">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/products/${category.slug}/`}
                      className="block py-2 text-[0.95rem] text-ink-500"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link href="/about/" className="border-b border-line py-4 font-display text-xl text-ink-900">
                {copy.nav.about}
              </Link>
              <Link href="/contact/" className="py-4 font-display text-xl text-ink-900">
                {copy.nav.contact}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
