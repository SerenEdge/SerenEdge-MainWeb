# SerenEdge — SEO Playbook (`SEOproper.md`)

> Goal: when someone searches **SerenEdge**, **seren edge**, **SerenEdge automation**,
> or **Daham Dissanayake**, our site ranks #1 and ideally triggers a brand
> knowledge panel. Then: rank for the service/intent terms (IoT, automation, web
> dev in Sri Lanka).

This doc has two parts:
1. **What's already done in the codebase** (so you don't redo it).
2. **What YOU must do manually** — Search Console, verification, backlinks, the
   ongoing work. This is the part that actually moves rankings.

---

## Part 1 — Already implemented in code ✅

| Area | What was done | File |
|------|---------------|------|
| Central SEO config | Single source of truth for domain, NAP, founder, keywords | `src/lib/site.ts` |
| Structured data | Organization, WebSite, Person (Daham), Service, BlogPosting, Breadcrumb JSON-LD | `src/lib/structured-data.ts`, `src/components/seo/JsonLd.tsx` |
| Sitewide schema | Org + WebSite + Person injected on every page | `src/app/layout.tsx` |
| Rich metadata | Title template, expanded keywords (brand + founder + automation), OG/Twitter, theme-color, appleWebApp | `src/app/layout.tsx` |
| Dynamic sitemap | Home + `/blog` + every post, with lastmod | `src/app/sitemap.ts` |
| robots | Allows site, **blocks `/studio` & `/api`**, points to sitemap | `src/app/robots.ts` |
| Studio noindex | `X-Robots-Tag: noindex` header on `/studio` | `next.config.ts` |
| Semantic H1 | Hero `<h1>` now carries brand + "IT, IoT & automation studio in Sri Lanka, founded by Daham Dissanayake" | `src/components/sections/Hero.tsx` |
| Blog SEO | Canonicals, `article` OG (published time, author, tags), per-post BlogPosting + Breadcrumb schema | `src/app/(site)/blog/...` |
| Founder portfolio | `daham.serenedge.com` linked in footer (`rel="author"`) + in Person/Org schema as portfolio | `Footer.tsx`, `structured-data.ts` |

### Verify after every deploy
- `https://serenedge.com/robots.txt` → shows sitemap + disallows `/studio`.
- `https://serenedge.com/sitemap.xml` → lists home, `/blog`, all posts.
- Paste the homepage URL into **[Rich Results Test](https://search.google.com/test/rich-results)**
  → should detect Organization, WebSite, Person.
- Paste a blog post URL → should detect BlogPosting + Breadcrumb.
- Paste any URL into **[Schema Markup Validator](https://validator.schema.org/)** → 0 errors.

---

## Part 2 — Manual work (this is what actually ranks you)

### Step 0 — Prerequisites
- [ ] Site is live on the **canonical domain** `https://serenedge.com` (pick www vs non-www
      and 301-redirect the other — we use **non-www**).
- [ ] HTTPS enforced, no mixed content.
- [ ] One home for the founder portfolio: `https://daham.serenedge.com`.

### Step 1 — Google Search Console (GSC)
1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**.
2. Add a **Domain property** (`serenedge.com`) — covers http/https, www/non-www, all subdomains.
   - This needs a **DNS TXT record**. Copy the value GSC gives you, add it as a TXT
     record at your DNS provider (Cloudflare / registrar). Wait for propagation, click Verify.
   - *Alternative if you can't edit DNS:* add a **URL-prefix property** for
     `https://serenedge.com` and verify via the HTML meta tag — see Step 1a.
3. Once verified:
   - [ ] **Sitemaps** → submit `sitemap.xml`.
   - [ ] **URL Inspection** → paste `https://serenedge.com` → **Request Indexing**.
   - [ ] Repeat Request Indexing for `/blog` and each blog post (priority pages first).
4. Add a **separate property** for the portfolio subdomain `daham.serenedge.com`
   and submit its sitemap too — so Daham's name ranks on his own site.

#### Step 1a — Meta-tag verification (optional, if using URL-prefix)
This is **already wired** in `src/app/layout.tsx`. Just set the env var in
`.env.local` (and in Vercel project settings), then redeploy:
```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxx
```
The `<meta name="google-site-verification">` tag appears automatically when set.
*(Domain-property DNS verification is preferred — you usually won't need this.)*

### Step 2 — Bing Webmaster Tools (don't skip — feeds ChatGPT/Copilot search)
1. **[bing.com/webmasters](https://www.bing.com/webmasters)**.
2. **Import from Google Search Console** (one click) or verify via DNS.
3. Submit `sitemap.xml`. Use **URL Submission** for the homepage + key pages.

### Step 3 — Google Business Profile (huge for a local brand SERP)
- [ ] Create a **[Google Business Profile](https://business.google.com)** for SerenEdge
      (Service-area business → Sri Lanka). Category: *Software company* / *Website designer*.
- [ ] Same NAP everywhere (Name / Address-area / Phone): `+94 70 488 8440`,
      `dahamdissanayake05@gmail.com`. Consistency matters for entity trust.
- [ ] Add logo, the OG banner, services, website link. This is the single biggest
      lever for a knowledge panel on the brand name.

### Step 4 — Build the entity (gets the knowledge panel for "SerenEdge" / "Daham Dissanayake")
Google builds a brand/person entity from **consistent mentions + sameAs links**.
1. [ ] Create official profiles and link them back to `serenedge.com`:
   - LinkedIn **Company page** (SerenEdge) + LinkedIn **personal** (Daham).
   - GitHub org (SerenEdge) + GitHub personal.
   - X/Twitter, Instagram (the footer icons are already placeholders — wire them up).
   - Crunchbase / Wellfound (AngelList) company entry.
2. [ ] **Add every profile URL to the `sameAs` arrays** in `src/lib/structured-data.ts`
   (`organizationSchema().sameAs` and `founderSchema().sameAs`). This is what links
   the entity graph — do it as soon as the profiles exist.
3. [ ] Wikidata: once there are a few independent references, create a Wikidata item
   for SerenEdge (free, helps the knowledge panel).
4. [ ] Make sure the founder portfolio `daham.serenedge.com` has its own
   Person JSON-LD and links to `serenedge.com` (`founderOf`), forming a two-way link.

### Step 5 — Content engine (ranks the intent keywords, not just the brand)
The brand terms are easy; the money is in intent terms. Publish on the blog:
- [ ] "Automation services in Sri Lanka", "IoT development Sri Lanka", "custom ERP Sri Lanka",
      "remote patient monitoring" (SoterCare), etc. — one focused post each.
- [ ] Each post: one clear `<h1>`, a target keyword in title + first 100 words,
      internal links to `/` and related posts, a cover image with descriptive `alt`,
      fill the Sanity `excerpt`, `tags`, and `readTime` (they feed metadata + schema).
- [ ] Cadence: **2–4 posts/month** beats 10 then silence. Consistency signals freshness.
- [ ] Add an FAQ section to the homepage or a service page and mark it up with
      `FAQPage` schema (extend `structured-data.ts`) — earns FAQ rich results.

### Step 6 — Backlinks & citations (off-page = ~50% of ranking)
- [ ] List SerenEdge in **Sri Lankan business directories** + global ones
      (Clutch, GoodFirms, DesignRush, Google Business, Yellow Pages LK).
- [ ] Guest posts / dev community posts (dev.to, Medium, Hashnode) that link back —
      great for both the brand and Daham's name.
- [ ] If SoterCare gets press, ensure the article links `serenedge.com`.
- [ ] Quality over quantity. One link from a real, relevant site > 50 spammy ones.

### Step 7 — Technical health (keep it green)
- [ ] **Core Web Vitals**: run [PageSpeed Insights](https://pagespeed.web.dev/) on `/`
      and `/blog`. The hero AVIF is `priority` (good). Watch LCP — keep it < 2.5s.
- [ ] Confirm there are **no duplicate H1s** and the page hierarchy is `h1 → h2 → h3`.
- [ ] Every `<img>` has meaningful `alt` (decorative ones use `alt=""`).
- [ ] No accidental `noindex` on real pages. `/studio` SHOULD be noindex (it is).
- [ ] After any deploy, re-check Rich Results Test for the schema.

---

## Monitoring — what to watch in GSC (weekly → monthly)
- **Performance** → queries: are you ranking #1 for `serenedge`, `seren edge`,
  `serenedge automation`, `daham dissanayake`? (Target: yes within 2–4 weeks of indexing.)
- **Pages** → all key URLs show "Indexed". Fix anything under "Not indexed".
- **Enhancements** → Breadcrumbs / Logo / Sitelinks searchbox show as valid.
- **Links** → external backlinks are growing.

### Realistic timeline
| When | Expectation |
|------|-------------|
| Day 0 | Deploy, verify GSC + Bing, submit sitemaps, request indexing. |
| Week 1–2 | Brand terms (`SerenEdge`, `seren edge`, `Daham Dissanayake`) hit #1. |
| Week 2–6 | Blog posts indexed; long-tail intent terms start appearing. |
| Month 2–3 | Knowledge panel possible IF profiles + GBP + sameAs are done. |
| Month 3–6 | Competitive intent terms move up with content + backlinks. |

---

## Quick-start checklist (do these first, in order)
1. [ ] Deploy to `https://serenedge.com` (non-www, HTTPS).
2. [ ] Verify domain in **Google Search Console** (DNS TXT).
3. [ ] Submit `sitemap.xml`; Request Indexing for `/`, `/blog`, each post.
4. [ ] Verify in **Bing Webmaster** (import from GSC).
5. [ ] Create **Google Business Profile** (Sri Lanka, software company).
6. [ ] Create LinkedIn / GitHub / X profiles → add URLs to `sameAs` in `structured-data.ts`.
7. [ ] Verify the portfolio `daham.serenedge.com` in GSC too.
8. [ ] Publish 2 intent-focused blog posts.
9. [ ] Run Rich Results Test + PageSpeed; fix anything flagged.
10. [ ] Re-check GSC weekly for the first month.

---

_Last reviewed: 2026-06-25_
