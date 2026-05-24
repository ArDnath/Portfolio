export type ImageKitTransform = {
  width?: number
  height?: number
  quality?: number
  format?: "auto" | "webp" | "jpg" | "png"
}

/** ImageKit media paths (folder `public/` on your ImageKit drive). */
export const IMAGEKIT_PATHS = {
  logo: "public/logo.png",
  projects: {
    animap: "public/projects/animap.png",
    tubebrief: "public/projects/tubebrief.png",
    cashlatics: "public/projects/cashlatics.png",
  },
  architecture: {
    animap: "public/architecture/animap.svg",
    tubebrief: "public/architecture/tubebrief.svg",
    cashlatics: "public/architecture/cashlatics.svg",
  },
} as const

function buildTransformSegment(transform?: ImageKitTransform): string {
  if (!transform) return ""

  const parts: string[] = []
  if (transform.width) parts.push(`w-${transform.width}`)
  if (transform.height) parts.push(`h-${transform.height}`)
  if (transform.quality) parts.push(`q-${transform.quality}`)
  if (transform.format) parts.push(`f-${transform.format}`)

  return parts.length > 0 ? `tr:${parts.join(",")}/` : ""
}

export function getImageKitEndpoint(): string {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim()
  if (!endpoint) {
    throw new Error(
      "Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT. Set it in .env (see .env.example).",
    )
  }
  return endpoint.replace(/\/$/, "")
}

/**
 * Builds an ImageKit delivery URL from a library path (e.g. `public/projects/animap.png`).
 * Absolute https URLs are returned unchanged.
 */
export function imagekitUrl(path: string, transform?: ImageKitTransform): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  const base = getImageKitEndpoint()
  const cleanPath = path.replace(/^\//, "")
  const tr = buildTransformSegment(transform)

  return `${base}/${tr}${cleanPath}`
}

export function isImageKitPath(path: string): boolean {
  return !path.startsWith("http") && !path.startsWith("/")
}
