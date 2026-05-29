/** Canonical site URL for metadata (OG, sitemap, etc.). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ariyaman.in"
