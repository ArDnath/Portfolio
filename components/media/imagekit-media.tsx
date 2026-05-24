"use client"

import Image from "next/image"
import { imagekitUrl, type ImageKitTransform } from "@/lib/imagekit"

export interface ImageKitMediaProps {
  src: string
  alt: string
  type?: "image" | "video"
  className?: string
  transform?: ImageKitTransform
  fill?: boolean
  priority?: boolean
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
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
}: ImageKitMediaProps) {
  const url = imagekitUrl(src, transform)
  const isSvg = src.toLowerCase().endsWith(".svg")
  const fillClass = fill ? `absolute inset-0 w-full h-full ${className}` : className

  if (type === "video") {
    return (
      <video
        src={url}
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
      />
    )
  }

  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        className={fillClass}
        loading={priority ? "eager" : "lazy"}
      />
    )
  }

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        priority={priority}
        className={className}
        sizes="(max-width: 1024px) 100vw, 66vw"
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={1200}
      height={800}
      priority={priority}
      className={className}
      sizes="(max-width: 1024px) 100vw, 66vw"
    />
  )
}
