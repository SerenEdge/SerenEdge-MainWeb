# SerenEdge × Sanity — A-to-Z Setup Guide

## What you get

| Route | Description |
|---|---|
| `/blog` | News-style listing — featured latest post + archive grid |
| `/blog/[slug]` | Individual post with full article body |
| `/studio` | Embedded Sanity Studio (CMS admin panel) |

---

## Step 1 — Create a Sanity account

1. Go to **https://www.sanity.io** and click **Get started free**
2. Sign in with Google (use your `dahamdissanayake05@gmail.com` account) or create a new account
3. Verify your email if prompted

---

## Step 2 — Create a new project

### Option A: via the CLI (recommended)

In your project root, run:

```bash
npx sanity@latest init
```

When prompted:

- **Log in** with your Sanity account
- **Create new project** → name it `SerenEdge`
- **Default dataset** → keep `production`
- **Project output path** → press Enter to use the current directory (it will warn about existing files — say **No** to overwriting)
- **Select project template** → press Enter to skip (we already have the schema)

This will:
- Create the project at `sanity.io/manage`
- Print your **Project ID** — copy it

### Option B: via the web

1. Go to **https://www.sanity.io/manage** and click **New project**
2. Name it `SerenEdge`, use dataset `production`
3. Copy the **Project ID** shown on the project page

---

## Step 3 — Fill in environment variables

Open `.env.local` in your project root and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                         # leave blank for now (read-only public access works without it)
```

Replace `your_project_id_here` with the Project ID you copied.

---

## Step 4 — Allow your localhost in CORS settings

The embedded Studio at `/studio` needs CORS access:

1. Go to **https://www.sanity.io/manage** → your project → **API** → **CORS origins**
2. Click **Add CORS origin**
3. Add `http://localhost:3000` (with credentials checked)
4. Also add your production domain when you deploy (e.g. `https://serenedge.com`)

---

## Step 5 — Run the dev server

```bash
npm run dev
```

Then open:

- **`http://localhost:3000/blog`** — Blog listing page
- **`http://localhost:3000/studio`** — Sanity Studio (CMS)

---

## Step 6 — Create your first blog post

1. Open `http://localhost:3000/studio`
2. Click **Blog Post** in the left sidebar → **+ New**
3. Fill in:
   - **Title** — your post title
   - **Slug** — auto-filled from title (click Generate if not)
   - **Published At** — set to now or a future date
   - **Category** — pick one
   - **Excerpt** — 1–2 sentences shown on the listing page
   - **Cover Image** — upload or drag an image
   - **Author** — defaults to `Daham Dissanayake`
   - **Read Time** — estimated minutes (e.g. `5`)
   - **Tags** — add keywords
   - **Body** — write your article using the rich text editor
4. Click **Publish** (top right)

Your post appears on `/blog` within 60 seconds (ISR revalidation interval).

---

## Step 7 — Deploy the Studio (optional, for production)

To access the Studio without running the dev server, deploy it:

```bash
npx sanity@latest deploy
```

- It will ask for a **Studio hostname** → use `serenedge` → Studio deploys to `https://serenedge.sanity.studio`
- **Or** your embedded `/studio` route works in production too — it's the same Studio, no extra deploy needed if you're hosting on Vercel.

---

## Step 8 — Production deployment on Vercel

Add the environment variables to your Vercel project:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. Add your production domain to Sanity CORS origins (Step 4)
4. Redeploy

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Studio shows "Missing environment variable" | Check `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID` set and restart the dev server |
| Blog page shows "Setup required" | Same as above |
| Studio CORS error in browser console | Add `http://localhost:3000` to CORS origins in sanity.io/manage |
| Images not loading | Ensure `cdn.sanity.io` is in `next.config.ts` `remotePatterns` (already done) |
| Posts not updating after publish | ISR revalidates every 60s — wait a moment or restart dev server |

---

## Schema reference

Your `post` document has these fields:

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generated from title |
| `publishedAt` | datetime | Defaults to now |
| `category` | string | Engineering / Product / IoT / ML/AI / Company / DevLog |
| `excerpt` | text | Shown on listing page |
| `coverImage` | image | With hotspot + alt text |
| `author` | string | Defaults to Daham Dissanayake |
| `readTime` | number | Minutes |
| `tags` | array of strings | Tag cloud |
| `body` | portable text | Rich content: paragraphs, headings, lists, images, blockquotes |

---

## Useful links

- Sanity manage: https://www.sanity.io/manage
- GROQ cheatsheet: https://www.sanity.io/docs/groq-cheat-sheet
- Portable Text docs: https://portabletext.org
