/**
 * Renders one or more JSON-LD objects as <script type="application/ld+json">.
 * Server component — emitted into the static HTML so crawlers see it without JS.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema objects are built server-side from trusted site config
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
