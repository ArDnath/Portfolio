import type { Transformation } from "@imagekit/next"

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

export const IMAGEKIT_TRANSFORMATION_POSITION = "path" as const

export function getImageKitEndpoint(): string {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim()
  if (!endpoint) {
    throw new Error(
      "Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT. Set it in .env (see .env.example).",
    )
  }
  return endpoint.replace(/\/$/, "")
}

/** Maps portfolio transform options to ImageKit SDK transformation objects. */
export function toImageKitTransformation(
  transform?: ImageKitTransform,
): Transformation[] {
  if (!transform) return []

  const entry: Transformation = {}
  if (transform.width != null) entry.width = transform.width
  if (transform.height != null) entry.height = transform.height
  if (transform.quality != null) entry.quality = transform.quality
  if (transform.format != null) entry.format = transform.format

  return Object.keys(entry).length > 0 ? [entry] : []
}

export function isImageKitPath(path: string): boolean {
  return !path.startsWith("http") && !path.startsWith("/")
}
