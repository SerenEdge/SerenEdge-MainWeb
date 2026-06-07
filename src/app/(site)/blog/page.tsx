import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import type { SanityPost } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | SerenEdge',
  description: 'Engineering notes, product updates, and deep dives from the SerenEdge team.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function PostCard({ post }: { post: SanityPost }) {
  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(800).height(480).auto('format').url()
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-img-wrap">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="blog-card-img-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {post.category && <span className="blog-cat">{post.category}</span>}
          <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
          {post.readTime && <span className="blog-card-rt">{post.readTime} min</span>}
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  let posts: SanityPost[] = []

  if (isConfigured) {
    try {
      posts = await client.fetch<SanityPost[]>(POSTS_QUERY)
    } catch {
      // Sanity not yet configured — show empty state
    }
  }

  const [featured, ...rest] = posts

  return (
    <main className="blog-page">
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <div className="section-label">Blog</div>
          <h1 className="blog-hero-title">From the stack.</h1>
          <p className="blog-hero-sub">
            Engineering notes, product updates, and deep dives
            <br />from the SerenEdge team.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────── */}
      <section className="blog-content">

        {!isConfigured && (
          <div className="blog-empty">
            <div className="section-label">Setup required</div>
            <p>Add your Sanity project ID and dataset to <code>.env.local</code> to start publishing.</p>
          </div>
        )}

        {isConfigured && posts.length === 0 && (
          <div className="blog-empty">
            <div className="section-label">Coming soon</div>
            <p>No posts yet — check back soon.</p>
          </div>
        )}

        {/* Featured post */}
        {featured && (
          <div className="blog-featured-wrap">
            <Link href={`/blog/${featured.slug}`} className="blog-featured">
              <div className="blog-featured-img">
                {featured.coverImage?.asset ? (
                  <Image
                    src={urlFor(featured.coverImage).width(1400).height(700).auto('format').url()}
                    alt={featured.coverImage?.alt ?? featured.title}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes="100vw"
                  />
                ) : (
                  <div className="blog-featured-img-placeholder" aria-hidden="true" />
                )}
                <div className="blog-featured-overlay" />
              </div>
              <div className="blog-featured-body">
                <div className="blog-featured-meta">
                  {featured.category && (
                    <span className="blog-cat blog-cat-inv">{featured.category}</span>
                  )}
                  <span>{formatDate(featured.publishedAt)}</span>
                  {featured.readTime && <span>{featured.readTime} min read</span>}
                </div>
                <h2 className="blog-featured-title">{featured.title}</h2>
                {featured.excerpt && (
                  <p className="blog-featured-excerpt">{featured.excerpt}</p>
                )}
                <span className="blog-featured-cta">
                  Read article <span className="blog-featured-arr">→</span>
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Archive grid */}
        {rest.length > 0 && (
          <div className="blog-archive">
            <div className="blog-archive-head">
              <div className="section-label">All articles</div>
            </div>
            <div className="blog-grid">
              {rest.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}

      </section>
    </main>
  )
}
