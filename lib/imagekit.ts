export type ImageKitTransform = {
  width?: number
  height?: number
  quality?: number
  format?: "auto" | "webp" | "jpg" | "png"
}

function buildTransformSegment(transform?: ImageKitTransform): string {
  if (!transform) return ""

  const parts: string[] = []
  if (transform.width) parts.push(`w-${transform.width}`)
  if (transform.height) parts.push(`h-${transform.height}`)
  if (transform.quality) parts.push(`q-${transform.quality}`)
  if (transform.format) parts.push(`f-${transform.format}`)

  return parts.length > 0 ? `tr:${parts.join(",")}/` : ""
}

/**
 * Builds an ImageKit delivery URL from a path (e.g. `portfolio/animap/arch.png`).
 * Falls back to the path as-is when NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is unset
 * (useful for local `/public` assets during development).
 */
export function imagekitUrl(path: string, transform?: ImageKitTransform): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  if (!endpoint) {
    return path.startsWith("/") ? path : `/${path}`
  }

  const base = endpoint.replace(/\/$/, "")
  const cleanPath = path.replace(/^\//, "")
  const tr = buildTransformSegment(transform)

  return `${base}/${tr}${cleanPath}`
}

export function isImageKitPath(path: string): boolean {
  return !path.startsWith("http") && !path.startsWith("/")
}
