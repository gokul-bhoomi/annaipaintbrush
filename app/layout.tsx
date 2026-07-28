import type { Metadata } from 'next';
import { Archivo, Inter, Sora } from 'next/font/google';
import './globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PagePainter from '@/components/PagePainter';
import StickyContact from '@/components/StickyContact';
import { copy } from '@/lib/copy';
import { site } from '@/lib/site';

/**
 * next/font downloads and self-hosts these at build time, so there is no
 * runtime request to fonts.googleapis.com. The old site blocked first paint on
 * an external Material Icons stylesheet.
 */
const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-loaded',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-loaded',
});

/**
 * The logo typeface, and the only thing it is used for.
 *
 * Two weights, latin only, so it stays small. `display: 'block'` rather than
 * 'swap' on purpose: the wordmark is live SVG text, so a fallback face would
 * render at the wrong widths and visibly reflow the logo when Archivo arrives.
 * A brief blank is the right trade for a mark. next/font self-hosts and
 * preloads it, and the header is in the root layout, so the blank is short.
 */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-logo-loaded',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Paint Brush Manufacturers in Coimbatore`,
    template: `%s | ${site.name}`,
  },
  /**
   * Names both places on purpose. Coimbatore is the business address and the
   * term local search is fought over, Madurai is where the factory is and where
   * "paint brush manufacturer in Madurai" queries land. Kept under 160
   * characters so Google does not truncate it in the result.
   */
  description:
    'Paint brush manufacturers in Coimbatore, with our own factory in Madurai. Wholesale brushes, rollers, art brushes and putty knives, supplied across India.',
  applicationName: site.name,
  /**
   * SVG first so the tab icon stays sharp on any display, with the 192px PNG
   * behind it for browsers that do not take SVG favicons. Both are generated
   * from src/media/logo-icon.svg by the image pipeline.
   */
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable} ${archivo.variable}`}>
      {/*
        `relative` anchors the page painter's overlay, which is absolutely
        positioned to the height of the whole document so paint sticks to the
        content rather than sliding about as you scroll.
      */}
      <body className="relative bg-paper text-ink-600 antialiased">
        {/* First tab stop, for keyboard and screen reader users. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-paper"
        >
          {copy.common.skipToContent}
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyContact />
        <PagePainter />
      </body>
    </html>
  );
}
