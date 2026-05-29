"use client"

import { ImageKitImage } from "@/components/media/imagekit-image"
import { IMAGEKIT_PATHS } from "@/lib/imagekit"

export function HeroLogo() {
  return (
    <ImageKitImage
      src={IMAGEKIT_PATHS.logo}
      alt="Ariyaman Debnath"
      width={144}
      height={144}
      transform={{ width: 400, quality: 90, format: "auto" }}
      priority
      className="relative z-[1] w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover border-2 border-slate-800 dark:border-slate-300"
    />
  )
}
