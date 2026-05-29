"use client"

import { ImageKitProvider } from "@imagekit/next"
import { IMAGEKIT_TRANSFORMATION_POSITION } from "@/lib/imagekit"

export function AppImageKitProvider({
  urlEndpoint,
  children,
}: {
  urlEndpoint: string
  children: React.ReactNode
}) {
  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      transformationPosition={IMAGEKIT_TRANSFORMATION_POSITION}
    >
      {children}
    </ImageKitProvider>
  )
}
