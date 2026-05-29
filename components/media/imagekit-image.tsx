"use client"

import { Image as IKImage } from "@imagekit/next"
import {
  toImageKitTransformation,
  type ImageKitTransform,
} from "@/lib/imagekit"

export interface ImageKitImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  transform?: ImageKitTransform
  sizes?: string
  draggable?: boolean
}

/**
 * ImageKit-native image: transformations run on ImageKit, not via Next.js optimizer.
 */
export function ImageKitImage({
  src,
  alt,
  width = 1200,
  height = 800,
  fill = false,
  priority = false,
  className = "",
  transform,
  sizes,
  draggable,
}: ImageKitImageProps) {
  const transformation = toImageKitTransformation(transform)

  if (fill) {
    return (
      <IKImage
        src={src}
        alt={alt}
        fill
        transformation={transformation}
        responsive={false}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        draggable={draggable}
        className={className}
      />
    )
  }

  return (
    <IKImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      transformation={transformation}
      responsive={false}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      draggable={draggable}
      className={className}
    />
  )
}
