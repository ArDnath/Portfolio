declare namespace YT {
  interface PlayerOptions {
    videoId?: string
    host?: string
    playerVars?: Record<string, number | string>
    events?: {
      onReady?: (event: PlayerEvent) => void
      onStateChange?: (event: OnStateChangeEvent) => void
    }
  }

  interface PlayerEvent {
    target: Player
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: number
  }

  class Player {
    constructor(elementId: string | HTMLElement, options: PlayerOptions)
    playVideo(): void
    pauseVideo(): void
    seekTo(seconds: number, allowSeekAhead: boolean): void
    destroy(): void
  }

  const PlayerState: {
    ENDED: number
  }
}
