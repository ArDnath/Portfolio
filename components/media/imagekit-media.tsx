"use client"

import { Image as IKImage, Video as IKVideo } from "@imagekit/next"
import {
  toImageKitTransformation,
  type ImageKitTransform,
} from "@/lib/imagekit"

export interface ImageKitMediaProps {
  src: string
  alt: string
  type?: "image" | "video"
  className?: string
  transform?: ImageKitTransform
  fill?: boolean
  priority?: boolean
  width?: number
  height?: number
  sizes?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

export function ImageKitMedia({
  src,
  alt,
  type = "image",
  className = "",
  transform,
  fill = false,
  priority = false,
  width = 1200,
  height = 800,
  sizes,
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
}: ImageKitMediaProps) {
  const transformation = toImageKitTransformation(transform)
  const fillClass = fill ? `absolute inset-0 w-full h-full ${className}` : className

  if (type === "video") {
    return (
      <IKVideo
        src={src}
        transformation={transformation}
        className={fillClass}
        controls={controls}
        controlsList={
          controls
            ? undefined
            : "nodownload noplaybackrate noremoteplayback nofullscreen"
        }
        disablePictureInPicture
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="auto"
        aria-label={alt}
        width={width}
        height={height}
      />
    )
  }

  if (fill) {
    return (
      <IKImage
        src={src}
        alt={alt}
        fill
        transformation={transformation}
        responsive={false}
        priority={priority}
        sizes={sizes}
        className={fillClass}
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
      sizes={sizes}
      className={className}
    />
  )
}
