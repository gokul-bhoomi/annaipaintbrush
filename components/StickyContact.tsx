'use client';

import { useEffect, useState } from 'react';

import { copy } from '@/lib/copy';
import { site, whatsappUrl } from '@/lib/site';

/**
 * Floating WhatsApp + call actions.
 *
 * Replaces the old floating teal pill (`.side` in App.css, `position: fixed;
 * top: 60%`), which held only a phone icon and linked to the contact page
 * rather than actually starting a call.
 *
 * WhatsApp leads first: for wholesale trade in Tamil Nadu it's how buyers
 * actually get in touch. Appears after a short scroll so it never covers the
 * hero's own call to action.
 */
export default function StickyContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 flex flex-col gap-2.5 transition-all duration-300 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <a
        href={whatsappUrl("Hello, I'd like to enquire about Annai Paint Brush products.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label={copy.common.whatsapp}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.03-.52-.086-.148-.663-1.6-.908-2.19-.238-.574-.48-.497-.66-.505a11.2 11.2 0 0 0-.61-.011c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M20.52 3.449A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.334.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.364-8.452zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.892 6.993c-.003 5.451-4.437 9.886-9.885 9.886z" />
        </svg>
      </a>

      <a
        href={`tel:${site.phones[0].e164}`}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label={`${copy.common.callUs} ${site.phones[0].display}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.5 3h3l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2L20 13.5v3a2 2 0 0 1-2.18 2A17 17 0 0 1 3.5 5.18A2 2 0 0 1 5.5 3z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
