import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { LATEST_POSTS_QUERY } from '@/sanity/lib/queries'
import type { SanityPost } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function extractTeaser(bodyPreview?: Array<{ text: string[] }>): string {
  if (!bodyPreview?.length) return ''
  const raw = bodyPreview
    .flatMap(b => b.text ?? [])
    .filter(Boolean)
    .join(' ')
    .trim()
  return raw.length > 200 ? raw.slice(0, 197) + '…' : raw
}

export async function LatestPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null

  let posts: SanityPost[] = []
  try {
    posts = await client.fetch<SanityPost[]>(LATEST_POSTS_QUERY)
  } catch {
    return null
  }

  if (!posts.length) return null

  return (
    <section className="blog-latest">
      <div className="section-head">
        <div>
          <div className="section-label">Latest</div>
          <h2 className="section-title">From the&nbsp;stack.</h2>
        </div>
        <div className="blog-latest-head-right">
          <p className="section-aside">
            Engineering notes, product updates, and deep dives —
            straight from the people building it.
          </p>
          <Link href="/blog" className="blog-latest-all">
            View all articles <span className="blog-latest-arr">→</span>
          </Link>
        </div>
      </div>

      <div className="blp-grid">
        {posts.map((post, i) => {
          const imgSrc = post.coverImage?.asset
            ? urlFor(post.coverImage).width(800).height(440).auto('format').url()
            : null
          const teaser = extractTeaser(post.bodyPreview)
          const showTeaser = teaser && teaser !== post.excerpt

          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="blp-card reveal"
              style={{ '--reveal-delay': `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className="blp-img-wrap">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={post.coverImage?.alt ?? post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="blp-img-placeholder" />
                )}
                <div className="blp-img-overlay" />
                {post.category && (
                  <div className="blp-cat-wrap">
                    <span className="blog-cat">{post.category}</span>
                  </div>
                )}
              </div>

              <div className="blp-body">
                <div className="blp-meta">
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.readTime && (
                    <>
                      <span className="blp-sep">·</span>
                      <span>{post.readTime} min read</span>
                    </>
                  )}
                </div>

                <h3 className="blp-title">{post.title}</h3>

                {post.excerpt && (
                  <p className="blp-excerpt">{post.excerpt}</p>
                )}

                {showTeaser && (
                  <p className="blp-teaser">{teaser}</p>
                )}

                <div className="blp-read">
                  Read article <span className="blp-arr">→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
