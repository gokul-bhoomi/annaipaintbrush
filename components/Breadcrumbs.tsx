import Link from 'next/link';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
 * separately by lib/seo.ts, so the markup here stays presentational.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-400">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="transition-colors hover:text-ink-700">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className="text-ink-600">
                  {crumb.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-ink-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
