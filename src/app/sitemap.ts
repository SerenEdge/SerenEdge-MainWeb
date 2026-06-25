import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import { client } from "@/sanity/lib/client";

type SlugRow = { slug: string; publishedAt?: string };

const SITEMAP_POSTS_QUERY = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  publishedAt
} | order(publishedAt desc)`;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  let posts: SlugRow[] = [];
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      posts = await client.fetch<SlugRow[]>(SITEMAP_POSTS_QUERY);
    } catch {
      // Sanity unavailable at build — ship the static routes only.
    }
  }

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
