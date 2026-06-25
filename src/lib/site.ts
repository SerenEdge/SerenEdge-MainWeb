/**
 * Central site configuration — single source of truth for SEO, structured
 * data, sitemap and metadata. Change a fact here and it propagates everywhere.
 */

export const SITE = {
  name: "SerenEdge",
  /** Variants people actually type / search for. Feeds keywords + sameAs + alternateName. */
  alternateNames: ["Seren Edge", "SerenEdge Automation", "Seren Edge Automation"],
  url: "https://serenedge.com",
  /** Used as the OG/Twitter image and Organization logo source. */
  ogImage: "/OG-page.png",
  logo: "/icons/Base Logo - Light.ico",
  tagline: "For each node.",
  description:
    "SerenEdge is a deeply technical IT studio in Sri Lanka. We take on the problems other shops won't — web platforms, IoT, automation, custom systems and machine learning — and ship them end-to-end. For each node.",
  /** Short, punchy description for OG/Twitter cards. */
  shortDescription: "Give us any IT problem. We will solve it. Web · IoT · Automation · ML.",
  locale: "en_US",
  foundingDate: "2026-02",
  email: "dahamdissanayake05@gmail.com",
  phone: "+94704888440",
  phoneDisplay: "+94 70 488 8440",
  areaServed: "Worldwide",
  location: {
    country: "Sri Lanka",
    countryCode: "LK",
  },
  founder: {
    name: "Daham Dissanayake",
    url: "https://daham.serenedge.com",
    jobTitle: "Founder & Lead Engineer",
    image: "/Founder-daham.webp",
  },
} as const;

/** Keyword pool — brand, founder and service-intent variants. */
export const SITE_KEYWORDS: string[] = [
  "SerenEdge",
  "Seren Edge",
  "SerenEdge automation",
  "Seren Edge automation",
  "Daham Dissanayake",
  "IT solutions Sri Lanka",
  "automation Sri Lanka",
  "IoT development Sri Lanka",
  "web development Sri Lanka",
  "machine learning Sri Lanka",
  "embedded systems",
  "custom software studio",
  "full-stack development",
  "SoterCare",
  "for each node",
];

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE.url;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
