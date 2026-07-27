/**
 * Emits a JSON-LD block into the prerendered HTML.
 *
 * Kept as its own component so lib/seo.ts stays plain TypeScript that builds
 * schema objects, with no JSX in it.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Built entirely from our own typed data, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
