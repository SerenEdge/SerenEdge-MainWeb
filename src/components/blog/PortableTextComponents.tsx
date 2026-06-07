import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(1200).auto('format').url()
      return (
        <figure className="blog-figure">
          <Image
            src={src}
            alt={value.alt ?? ''}
            width={1200}
            height={675}
            className="blog-img"
            style={{ objectFit: 'cover' }}
          />
          {value.caption && (
            <figcaption className="blog-caption">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    // Silently skip any block type we don't recognise
    unknownType: () => null,
  },
  marks: {
    code: ({ children }) => <code className="blog-code-inline">{children}</code>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="blog-link"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => <h2 className="blog-h2">{children}</h2>,
    h2: ({ children }) => <h2 className="blog-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="blog-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="blog-h4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="blog-blockquote">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="blog-p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="blog-ul">{children}</ul>,
    number: ({ children }) => <ol className="blog-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="blog-li">{children}</li>,
    number: ({ children }) => <li className="blog-li">{children}</li>,
  },
}
