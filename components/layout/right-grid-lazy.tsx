"use client"

import dynamic from "next/dynamic"

const RightGrid = dynamic(() => import("@/components/layout/right-grid"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[480px] lg:min-h-0 lg:h-full rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 animate-pulse" />
  ),
})

export default function RightGridLazy() {
  return <RightGrid />
}
