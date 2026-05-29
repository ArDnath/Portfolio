"use client"

import { ImageKitImage } from "@/components/media/imagekit-image"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const MIN_SCALE = 0.5
const MAX_SCALE = 3
const STEP = 0.25
const DEFAULT_SCALE = 1

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))
}

interface ArchitectureDiagramViewerProps {
  src: string
  alt: string
  /** Resets zoom when the selected project changes */
  projectId: string
}

const CONTENT_PADDING = 24 // p-3 × 2

export function ArchitectureDiagramViewer({
  src,
  alt,
  projectId,
}: ArchitectureDiagramViewerProps) {
  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [fitWidth, setFitWidth] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const measure = () => {
      setFitWidth(Math.max(0, el.clientWidth - CONTENT_PADDING))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [projectId])

  useEffect(() => {
    setScale(DEFAULT_SCALE)
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [projectId])

  const zoomIn = useCallback(() => {
    setScale((s) => clampScale(Number((s + STEP).toFixed(2))))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((s) => clampScale(Number((s - STEP).toFixed(2))))
  }, [])

  const resetZoom = useCallback(() => {
    setScale(DEFAULT_SCALE)
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    if (!el) return

    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -STEP : STEP
      setScale((s) => clampScale(Number((s + delta).toFixed(2))))
      return
    }

    if (e.shiftKey && e.deltaY !== 0) {
      e.preventDefault()
      el.scrollLeft += e.deltaY
      return
    }

    if (e.deltaX !== 0) {
      el.scrollLeft += e.deltaX
    }
  }, [])

  const contentWidth =
    fitWidth != null ? Math.round(fitWidth * scale) : undefined

  const atMin = scale <= MIN_SCALE
  const atMax = scale >= MAX_SCALE
  const atDefault = scale === DEFAULT_SCALE

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between gap-2 px-3 py-2 border-b border-dashed border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
        <span className="text-[9px] tracking-[.18em] uppercase text-gray-500 dark:text-gray-400">
          Architecture
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] text-gray-400 dark:text-gray-600 tracking-widest tabular-nums min-w-[2.5rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <div className="flex items-center border border-dashed border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={zoomOut}
              disabled={atMin}
              aria-label="Zoom out"
              className="flex items-center justify-center w-7 h-7 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <Minus size={12} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={atMax}
              aria-label="Zoom in"
              className="flex items-center justify-center w-7 h-7 border-l border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <Plus size={12} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              disabled={atDefault}
              aria-label="Reset zoom"
              className="flex items-center justify-center w-7 h-7 border-l border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <RotateCcw size={11} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="absolute inset-x-0 bottom-0 top-9 overflow-scroll overscroll-contain architecture-scrollbar touch-pan-x touch-pan-y"
      >
        <div
          className="p-3 inline-block max-w-none transition-[width] duration-150 ease-out"
          style={{
            width: contentWidth ?? `${scale * 100}%`,
          }}
        >
          <ImageKitImage
            src={src}
            alt={alt}
            width={1400}
            height={900}
            transform={{ width: 1400, quality: 85, format: "auto" }}
            draggable={false}
            className="block w-full h-auto max-w-none opacity-90 group-hover:opacity-100 transition-opacity select-none"
          />
        </div>
      </div>
    </>
  )
}
