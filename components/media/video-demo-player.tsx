"use client"

import { loadYouTubeIframeApi } from "@/lib/youtube-iframe-api"
import { useCallback, useEffect, useRef, useState } from "react"

interface VideoDemoPlayerProps {
  youtubeId: string
  alt: string
  className?: string
  fill?: boolean
}

export function VideoDemoPlayer({
  youtubeId,
  alt,
  className = "",
  fill = false,
}: VideoDemoPlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const [playing, setPlaying] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let player: YT.Player | null = null

    const mount = async () => {
      await loadYouTubeIframeApi()
      if (cancelled || !hostRef.current || !window.YT?.Player) return

      player = new window.YT.Player(hostRef.current, {
        videoId: youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          cc_load_policy: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true)
            player?.playVideo()
          },
          onStateChange: (event) => {
            if (event.data === window.YT!.PlayerState.ENDED) {
              event.target.seekTo(0, true)
              event.target.playVideo()
            }
          },
        },
      })

      playerRef.current = player
    }

    const idleId =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback(() => void mount())
        : window.setTimeout(() => void mount(), 200)

    return () => {
      cancelled = true
      if (typeof requestIdleCallback === "function") {
        cancelIdleCallback(idleId)
      } else {
        clearTimeout(idleId)
      }
      player?.destroy()
      playerRef.current = null
      setReady(false)
    }
  }, [youtubeId])

  const handleToggle = useCallback(() => {
    const player = playerRef.current
    if (!player?.playVideo || !player?.pauseVideo) return

    setPlaying((prev) => {
      if (prev) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
      return !prev
    })
  }, [])

  const sizeClass = fill ? "absolute inset-0 w-full h-full" : className

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!ready}
      className={`${sizeClass} relative overflow-hidden border-0 p-0 bg-black cursor-default focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:cursor-wait`}
      aria-label={`${alt}. ${playing ? "Playing" : "Paused"}. Click to ${playing ? "pause" : "play"}.`}
    >
      <div
        ref={hostRef}
        className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none [&_iframe]:border-0"
        aria-hidden
      />
      {/* Block residual playlist prev/next affordances at the sides */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[18%] z-[1] bg-gradient-to-r from-black/80 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[18%] z-[1] bg-gradient-to-l from-black/80 to-transparent"
      />
      {!ready && (
        <span
          aria-hidden
          className="absolute inset-0 z-[2] bg-black/40 animate-pulse"
        />
      )}
    </button>
  )
}
