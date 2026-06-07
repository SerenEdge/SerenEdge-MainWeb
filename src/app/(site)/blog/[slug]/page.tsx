import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { POST_QUERY, POST_SLUGS_QUERY } from '@/sanity/lib/queries'
import type { SanityPost } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<SanityPost | null>(POST_QUERY, { slug })
  if (!post) return { title: 'Post not found — SerenEdge' }
  return {
    title: `${post.title} — SerenEdge Blog`,
    description: post.excerpt,
    openGraph: post.coverImage?.asset
      ? { images: [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] }
      : undefined,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch<SanityPost | null>(POST_QUERY, { slug })

  if (!post) notFound()

  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1400).height(700).auto('format').url()
    : null

  return (
    <main className="blog-post-page">
      <div className="blog-post-container">

        {/* Back */}
        <div className="blog-post-back">
          <Link href="/blog" className="blog-back-link">
            ← Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="blog-post-header">
          <div className="blog-post-meta">
            {post.category && <span className="blog-cat">{post.category}</span>}
            <span>{formatDate(post.publishedAt)}</span>
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.author && (
            <p className="blog-post-author">By {post.author}</p>
          )}
        </header>

        {/* Cover image */}
        {imgSrc && (
          <div className="blog-post-cover">
            <Image
              src={imgSrc}
              alt={post.coverImage?.alt ?? post.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
        )}

        {/* Body */}
        {post.body && (
          <article className="blog-post-body">
            <PortableText value={post.body} components={portableTextComponents} />
          </article>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Footer nav */}
        <div className="blog-post-nav">
          <Link href="/blog" className="blog-back-link">← All articles</Link>
        </div>

      </div>
    </main>
  )
}
