/**
 * JSON-LD structured data builders. Each returns a plain object that gets
 * serialised into a <script type="application/ld+json"> via the <JsonLd>
 * component. Keeping these pure makes them trivial to reuse per-page.
 */
import { SITE, absoluteUrl } from "@/lib/site";

/** Stable @id anchors so nodes can reference each other across the graph. */
export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const FOUNDER_ID = `${SITE.url}/#daham`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    legalName: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.ogImage),
      width: 1200,
      height: 630,
    },
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: SITE.foundingDate,
    email: SITE.email,
    telephone: SITE.phone,
    founder: { "@id": FOUNDER_ID },
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.location.countryCode,
    },
    areaServed: SITE.areaServed,
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      telephone: SITE.phone,
      contactType: "sales",
      availableLanguage: ["English", "Sinhala"],
    },
    knowsAbout: [
      "Web Development",
      "Internet of Things",
      "Automation",
      "System Development",
      "Machine Learning",
      "Embedded Systems",
    ],
    sameAs: [SITE.founder.url],
  };
}

export function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: SITE.founder.name,
    alternateName: "Daham",
    url: SITE.founder.url,
    image: absoluteUrl(SITE.founder.image),
    jobTitle: SITE.founder.jobTitle,
    description: `${SITE.founder.name} is the founder of ${SITE.name}. Portfolio: ${SITE.founder.url}`,
    worksFor: { "@id": ORG_ID },
    founderOf: { "@id": ORG_ID },
    /** Portfolio / personal site as the canonical identity link. */
    mainEntityOfPage: SITE.founder.url,
    sameAs: [SITE.founder.url],
    knowsAbout: [
      "Web Development",
      "IoT",
      "Automation",
      "Machine Learning",
      "Embedded Systems",
    ],
    nationality: SITE.location.country,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** Catalogue of what SerenEdge offers — strengthens topical relevance. */
export function servicesSchema(
  services: { title: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: { "@id": ORG_ID },
        areaServed: SITE.areaServed,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  author?: string;
  coverImageUrl?: string | null;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.coverImageUrl ? [post.coverImageUrl] : [absoluteUrl(SITE.ogImage)],
    keywords: post.tags?.join(", "),
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE.url}/blog/#blog`,
    name: `${SITE.name} Blog`,
    description:
      "Engineering notes, product updates, and deep dives from the SerenEdge team.",
    url: absoluteUrl("/blog"),
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
