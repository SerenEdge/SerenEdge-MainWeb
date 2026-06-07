export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  author,
  readTime,
  tags,
  coverImage {
    asset->{ url, metadata { dimensions, lqip } },
    alt
  }
}`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  category,
  author,
  readTime,
  tags,
  coverImage {
    asset->{ url, metadata { dimensions, lqip } },
    alt
  },
  body[] {
    ...,
    _type == "image" => { ..., asset-> }
  }
}`

export const POST_SLUGS_QUERY = `*[_type == "post"]{ "slug": slug.current }`
