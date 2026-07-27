import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Paint Brush Manufacturers in Coimbatore`,
    template: `%s | ${site.name}`,
  },
  description:
    'Manufacturers and wholesalers of premium paint brushes, paint rollers, art brushes and putty knives in Coimbatore. Over 20 years of manufacturing, supplying across India.',
  applicationName: site.name,
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink-600 antialiased">
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
      </body>
    </html>
  );
}
