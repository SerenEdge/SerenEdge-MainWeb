# Graph Report - D:\Github\SerenEdge-MainWeb  (2026-06-10)

## Corpus Check
- Corpus is ~41,574 words - fits in a single context window. You may not need a graph.

## Summary
- 292 nodes · 371 edges · 29 communities (25 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.79)
- Token cost: 7,400 input · 3,590 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Static Content Data|Static Content Data]]
- [[_COMMUNITY_Blog & App Pages|Blog & App Pages]]
- [[_COMMUNITY_App Layout & Core Hooks|App Layout & Core Hooks]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Dev & Build Tooling|Dev & Build Tooling]]
- [[_COMMUNITY_Sanity CMS Config|Sanity CMS Config]]
- [[_COMMUNITY_Layout & Animation|Layout & Animation]]
- [[_COMMUNITY_SEO & Sanity Setup|SEO & Sanity Setup]]
- [[_COMMUNITY_Hero Redesign Spec|Hero Redesign Spec]]
- [[_COMMUNITY_Contact API Route|Contact API Route]]
- [[_COMMUNITY_Theme & Navigation|Theme & Navigation]]
- [[_COMMUNITY_SoterCare Brand Assets|SoterCare Brand Assets]]
- [[_COMMUNITY_SerenEdge Light Logo|SerenEdge Light Logo]]
- [[_COMMUNITY_Open Graph Identity|Open Graph Identity]]
- [[_COMMUNITY_Sanity Error Handling|Sanity Error Handling]]
- [[_COMMUNITY_Next.js Config & CSP|Next.js Config & CSP]]
- [[_COMMUNITY_SerenEdge Dark Logo|SerenEdge Dark Logo]]
- [[_COMMUNITY_Sanity Post Schema|Sanity Post Schema]]
- [[_COMMUNITY_Claude Dev Settings|Claude Dev Settings]]
- [[_COMMUNITY_Founder Portrait|Founder Portrait]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `SerenEdge Sanity Setup Guide` - 10 edges
3. `Hero Redesign Design Spec` - 10 edges
4. `urlFor()` - 9 edges
5. `SoterCare Banner Image` - 6 edges
6. `scripts` - 5 edges
7. `confirmationHtml()` - 5 edges
8. `notificationHtml()` - 5 edges
9. `prefersReducedMotion()` - 5 edges
10. `client` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Syne Font (hero-slogan)` --semantically_similar_to--> `Inter Font (studio-static.sanity.io)`  [INFERRED] [semantically similar]
  docs/superpowers/specs/2026-06-08-hero-redesign-design.md → .sanity/runtime/index.html
- `/studio Route — Embedded Sanity Studio` --conceptually_related_to--> `Sanity Studio Runtime HTML`  [INFERRED]
  docs/sanity-setup-guide.md → .sanity/runtime/index.html
- `Vercel Production Deployment` --conceptually_related_to--> `Sitemap (https://serenedge.com/sitemap.xml)`  [INFERRED]
  docs/sanity-setup-guide.md → public/robots.txt
- `generateMetadata()` --calls--> `urlFor()`  [EXTRACTED]
  src/app/(site)/blog/[slug]/page.tsx → src/sanity/lib/image.ts
- `BlogPostPage()` --calls--> `NotFound()`  [INFERRED]
  src/app/(site)/blog/[slug]/page.tsx → src/app/not-found.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sanity Studio + Blog Routes + Post Schema Integration** — sanity_setup_guide_studio_route, sanity_setup_guide_blog_route, sanity_setup_guide_post_schema, sanity_setup_guide_isr_revalidation [INFERRED 0.85]
- **Hero Visual Layer Stack (Background + Overlay + Content)** — 2026_06_08_hero_redesign_design_avif_background, 2026_06_08_hero_redesign_design_gradient_overlay, 2026_06_08_hero_redesign_design_content_block, 2026_06_08_hero_redesign_design_scroll_hint [EXTRACTED 1.00]

## Communities (29 total, 4 thin omitted)

### Community 0 - "Static Content Data"
Cohesion: 0.08
Nodes (21): processSteps, projects, services, techStack, testimonials, About(), Hero(), items (+13 more)

### Community 1 - "Blog & App Pages"
Cohesion: 0.13
Nodes (16): NotFound(), BlogPage(), formatDate(), metadata, PostCard(), portableTextComponents, client, builder (+8 more)

### Community 2 - "App Layout & Core Hooks"
Cohesion: 0.13
Nodes (13): jetbrainsMono, metadata, spaceGrotesk, syne, KONAMI, useKonami(), ContactModal(), FormState (+5 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.10
Nodes (20): dependencies, clsx, gsap, @gsap/react, lenis, lucide-react, next, next-sanity (+12 more)

### Community 4 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "Dev & Build Tooling"
Cohesion: 0.11
Nodes (18): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, tailwindcss, @types/node, @types/react (+10 more)

### Community 6 - "Sanity CMS Config"
Cohesion: 0.16
Nodes (6): structure(), authorType, blockContentType, categoryType, schema, postType

### Community 7 - "Layout & Animation"
Cohesion: 0.17
Nodes (8): Footer(), LenisContext, SmoothScrollProvider(), counterUp(), drawSvgLine(), fadeSlideIn(), prefersReducedMotion(), revealText()

### Community 8 - "SEO & Sanity Setup"
Cohesion: 0.15
Nodes (16): robots.txt — Crawler Policy, Sitemap (https://serenedge.com/sitemap.xml), Sanity Studio App Entry (app.js), Inter Font (studio-static.sanity.io), Sanity Studio Runtime HTML, /blog Route — News-style Listing, /blog/[slug] Route — Individual Post, Sanity CORS Origins Configuration (+8 more)

### Community 9 - "Hero Redesign Spec"
Cohesion: 0.24
Nodes (12): AVIF Background Image (/Hero Background avif.avif), Hero Content Block (brand, slogan, desc), Hero CSS Classes (globals.css), globals.css (App Styles), Dark Gradient Overlay (theme-invariant), GSAP Entry Animations for Hero, Hero Section Layout — Bottom-left Anchor, Hero.tsx Component (sections) (+4 more)

### Community 10 - "Contact API Route"
Cohesion: 0.30
Nodes (11): C, checkRate(), confirmationHtml(), emailHead(), esc(), IS_SANDBOX, logoBlock(), notificationHtml() (+3 more)

### Community 11 - "Theme & Navigation"
Cohesion: 0.24
Nodes (7): Theme, useTheme(), Navbar(), navLinks, openContactModal(), showToast(), Contact()

### Community 12 - "SoterCare Brand Assets"
Cohesion: 0.36
Nodes (8): SoterCare Banner Image, Dark Charcoal Brand Color, Light Blue Brand Color, SoterCare Logo, SoterCare Brand, Wellness Simplified Tagline, sotercare.com Website, Wellness / Health Category

### Community 13 - "SerenEdge Light Logo"
Cohesion: 0.53
Nodes (6): SerenEdge Brand Name, Steel Blue Brand Color, Arcing Diagonal Text Layout, SerenEdge Base Logo (Light Theme), Light Theme Variant, Bold Rounded Sans-Serif Typography

### Community 14 - "Open Graph Identity"
Cohesion: 0.53
Nodes (6): OG Image Color Palette, Domain: serenedge.com, SerenEdge Infinity Loop Logo, SerenEdge OG Preview Image, SerenEdge Brand Identity, Tagline: for each node

### Community 15 - "Sanity Error Handling"
Cohesion: 0.33
Nodes (6): window.addEventListener error Listener, Sanity Error Channel (pub/sub), _handleError Function, _renderErrorOverlay Function, window.__sanityErrorChannel Global, window.onerror Error Listener

### Community 16 - "Next.js Config & CSP"
Cohesion: 0.50
Nodes (3): MAIN_CSP, nextConfig, STUDIO_CSP

### Community 17 - "SerenEdge Dark Logo"
Cohesion: 0.67
Nodes (4): SerenEdge Brand Name Typography, Dark Logo Color Palette (Near-Black + Steel Blue), Infinity Symbol Motif, SerenEdge Base Logo (Dark Variant)

### Community 20 - "Founder Portrait"
Cohesion: 0.67
Nodes (3): Daham Dissanayake, Founder Daham - Portrait Photo, Black and White Portrait Photography Style

## Knowledge Gaps
- **100 isolated node(s):** `allow`, `MAIN_CSP`, `STUDIO_CSP`, `nextConfig`, `name` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Dev & Build Tooling`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `allow`, `MAIN_CSP`, `STUDIO_CSP` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Static Content Data` be split into smaller, more focused modules?**
  _Cohesion score 0.07681365576102418 - nodes in this community are weakly interconnected._
- **Should `Blog & App Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.1330049261083744 - nodes in this community are weakly interconnected._
- **Should `App Layout & Core Hooks` be split into smaller, more focused modules?**
  _Cohesion score 0.12857142857142856 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._