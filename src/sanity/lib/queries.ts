// Handles both our custom schema and the sanity-init schema:
// - author may be a string or a reference → coalesce(author->name, author)
// - coverImage may be coverImage or mainImage
// - category may be a string or categories[] references

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "category": coalesce(category, categories[0]->title),
  "author": coalesce(author->name, author),
  readTime,
  tags,
  "coverImage": coalesce(
    coverImage { asset->{ url, metadata { dimensions, lqip } }, alt },
    mainImage  { asset->{ url, metadata { dimensions, lqip } }, alt }
  )
}`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "category": coalesce(category, categories[0]->title),
  "author": coalesce(author->name, author),
  readTime,
  tags,
  "coverImage": coalesce(
    coverImage { asset->{ url, metadata { dimensions, lqip } }, alt },
    mainImage  { asset->{ url, metadata { dimensions, lqip } }, alt }
  ),
  body[] {
    ...,
    _type == "image" => { ..., asset->{ url, metadata { dimensions, lqip } } }
  }
}`

export const POST_SLUGS_QUERY = `*[_type == "post"]{ "slug": slug.current }`

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "category": coalesce(category, categories[0]->title),
  readTime,
  "coverImage": coalesce(
    coverImage { asset->{ url, metadata { dimensions, lqip } }, alt },
    mainImage  { asset->{ url, metadata { dimensions, lqip } }, alt }
  ),
  "bodyPreview": body[_type == "block" && style == "normal"][0...2] {
    "text": children[].text
  }
}`
