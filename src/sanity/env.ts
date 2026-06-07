export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-08'

// Fall back to empty string so imports don't throw during Vercel build
// when env vars haven't been added yet. Actual fetches will fail gracefully.
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
