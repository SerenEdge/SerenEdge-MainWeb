import type { PortableTextBlock } from '@portabletext/react'

export interface SanityPost {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  category?: string
  author?: string
  readTime?: number
  tags?: string[]
  coverImage?: {
    asset: { url: string; metadata?: { dimensions?: { width: number; height: number }; lqip?: string } }
    alt?: string
  }
  body?: PortableTextBlock[]
}
