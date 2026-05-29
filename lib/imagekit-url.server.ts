import "server-only"

import { buildSrc } from "@imagekit/javascript"
import {
  getImageKitEndpoint,
  IMAGEKIT_TRANSFORMATION_POSITION,
  toImageKitTransformation,
  type ImageKitTransform,
} from "@/lib/imagekit"

/**
 * Builds an ImageKit delivery URL for server routes (OG image, favicons).
 * Uses `@imagekit/javascript` buildSrc (server-safe). UI uses `@imagekit/next` Image/Video.
 */
export function imagekitUrl(path: string, transform?: ImageKitTransform): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return buildSrc({
    urlEndpoint: getImageKitEndpoint(),
    src: path.replace(/^\//, ""),
    transformationPosition: IMAGEKIT_TRANSFORMATION_POSITION,
    transformation: toImageKitTransformation(transform),
  })
}
