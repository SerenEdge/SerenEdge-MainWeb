# Hero Redesign — Bottom-left Anchor with AVIF Background

**Date:** 2026-06-08  
**Status:** Approved

---

## Summary

Replace the current text-only hero with a full-bleed AVIF background image, dark gradient overlay, and a minimal content block anchored to the bottom-left. Remove all CTA buttons. Surface only the slogan, one descriptor, and the brand name.

---

## Layout

- `<section class="hero">`: `position: relative; min-height: 100vh; overflow: hidden`
- Remove `background: var(--bg)` — replaced by the image layer
- Remove existing `padding: 160px 40px 80px` — content is absolutely positioned

**Background image:**
- `<Image>` (Next.js) with `fill`, `priority`, `objectFit: "cover"`, `objectPosition: "center"`
- src: `/Hero Background avif.avif`
- `z-index: 0`

**Gradient overlay:**
- `position: absolute; inset: 0; z-index: 1`
- `background: linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)`
- Theme-invariant: always dark gradient regardless of `data-theme`. The image needs a dark base for text legibility.

---

## Content block

Absolutely positioned: `bottom: 48px; left: 48px; z-index: 2; max-width: 640px`

```
SerenEdge                          ← .hero-brand   — mono, 11px, white 45% opacity
for each node.                     ← h1.hero-slogan — Syne, clamp(48px,8vw,112px), white, weight 600
A deeply technical IT studio.      ← p.hero-desc   — mono, 14px, white 65% opacity, max 2 lines
Web · IoT · Automation · ML.
```

No buttons. No eyebrow status dot (removed).

---

## Scroll hint

Keep existing `.hero-scroll-hint` at `bottom: 40px; left: 40px`. Reposition to `left: 50%; transform: translateX(-50%)` — centered bottom — to avoid colliding with the content block.

---

## Animations (GSAP)

Same pattern as current Hero.tsx. On mount:
1. Image: `opacity: 0 → 1`, `duration: 1.8`, `ease: "power2.out"`
2. `.hero-brand`: `opacity: 0, y: 16 → 0`, `duration: 0.8`, `delay: 0.4`, `ease: "expo.out"`
3. `h1.hero-slogan`: `opacity: 0, y: 24 → 0`, `duration: 1.0`, `delay: 0.55`, `ease: "expo.out"`
4. `p.hero-desc`: `opacity: 0, y: 16 → 0`, `duration: 0.8`, `delay: 0.75`, `ease: "expo.out"`
5. `.hero-scroll-hint`: `opacity: 0 → 1`, `duration: 0.6`, `delay: 1.1`

---

## CSS changes (`globals.css`)

Remove from `.hero`:
- `background: var(--bg)`
- `padding: 160px 40px 80px`
- `justify-content: center`

Add to `.hero`:
- `padding: 0`

New classes:
```css
.hero-brand {
  font-family: var(--font-mono), monospace;
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 12px; display: block;
}
.hero-slogan {
  font-family: var(--font-accent), sans-serif;
  font-size: clamp(48px, 8vw, 112px);
  font-weight: 600; line-height: 1; letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 20px;
}
.hero-desc {
  font-family: var(--font-mono), monospace;
  font-size: 14px; line-height: 1.6;
  color: rgba(255,255,255,0.65);
}
.hero-content {
  position: absolute; bottom: 48px; left: 48px;
  z-index: 2; max-width: 600px;
}
.hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 50%, transparent 100%);
  pointer-events: none;
}
```

Update `.hero-scroll-hint`:
- Change `left: 40px` → `left: 50%; transform: translateX(-50%)`

---

## Responsive

- Mobile (`≤ 768px`): `bottom: 32px; left: 24px; right: 24px; max-width: 100%`
- `.hero-slogan` font floor: `clamp(40px, ...)` already handled by clamp

---

## Files touched

1. `src/components/sections/Hero.tsx` — full rewrite
2. `src/app/globals.css` — hero CSS block updates
