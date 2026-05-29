"use client"

import { createContext, useContext, useCallback, useRef, useState, useEffect, ReactNode } from "react"

type Theme = "dark" | "light"
interface ThemeContextType { theme: Theme; toggleTheme: () => void }

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {} })

/** Duration must match CSS --vt-duration */
const DURATION = 700
const EASE     = `${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme]   = useState<Theme>("dark")
  const busy                = useRef(false)
  const leftOverlayRef      = useRef<HTMLDivElement>(null)
  const rightOverlayRef     = useRef<HTMLDivElement>(null)
  const lineLeftRef         = useRef<HTMLDivElement>(null)
  const lineRightRef        = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  const toggleTheme = useCallback(() => {
    if (busy.current) return
    busy.current = true

    const next: Theme = theme === "dark" ? "light" : "dark"
    const oldBg = theme === "dark" ? "#111827" : "#f9fafb"

    const lo  = leftOverlayRef.current
    const ro  = rightOverlayRef.current
    const lL  = lineLeftRef.current
    const lR  = lineRightRef.current
    if (!lo || !ro || !lL || !lR) { busy.current = false; return }

    // ── Step 1: switch theme NOW so new content renders underneath ──
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
    setTheme(next)

    // ── Step 2: cover the not-yet-swept halves with old bg colour ──
    //  Left  overlay: covers 0%→50%  via inset(0 50%  0 0%)
    //  Right overlay: covers 50%→100% via inset(0 0%  0 50%)
    //  These block the new theme from showing until the line passes
    ;[lo, ro, lL, lR].forEach(el => { el.style.transition = "none" })

    lo.style.backgroundColor = oldBg
    ro.style.backgroundColor = oldBg
    lo.style.clipPath = "inset(0 50% 0 0%)"
    ro.style.clipPath = "inset(0 0% 0 50%)"
    lo.style.display  = "block"
    ro.style.display  = "block"

    // Lines start at centre
    lL.style.left = "calc(50% - 1px)"
    lR.style.left = "calc(50% - 1px)"
    lL.style.opacity = "1"
    lR.style.opacity = "1"
    lL.style.display = "block"
    lR.style.display = "block"

    // Force reflow
    void lo.getBoundingClientRect()

    // ── Step 3: animate everything outward together ──
    //  Left overlay's right clip goes 50%→100% (shrinks off to left)
    //  Right overlay's left clip goes 50%→100% (shrinks off to right)
    lo.style.transition = `clip-path ${EASE}`
    lo.style.clipPath   = "inset(0 100% 0 0%)"

    ro.style.transition = `clip-path ${EASE}`
    ro.style.clipPath   = "inset(0 0% 0 100%)"

    // Lines fade out just before they reach the edges
    const lineEase = `${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`
    lL.style.transition = `left ${lineEase}, opacity 0.12s ease ${DURATION - 80}ms`
    lL.style.left       = "-2px"
    lL.style.opacity    = "0"

    lR.style.transition = `left ${lineEase}, opacity 0.12s ease ${DURATION - 80}ms`
    lR.style.left       = "calc(100% + 2px)"
    lR.style.opacity    = "0"

    setTimeout(() => {
      lo.style.display = "none"
      ro.style.display = "none"
      lL.style.display = "none"
      lR.style.display = "none"
      busy.current = false
    }, DURATION + 150)
  }, [theme])

  const overlayBase: React.CSSProperties = {
    position:      "fixed",
    inset:         0,
    zIndex:        9998,
    pointerEvents: "none",
    display:       "none",
    opacity:       0.82,
  }

  const lineBase: React.CSSProperties = {
    position:      "fixed",
    top:           0,
    bottom:        0,
    width:         "2px",
    zIndex:        9999,
    pointerEvents: "none",
    display:       "none",
    background:    "linear-gradient(to bottom, transparent 0%, #d1d5db 15%, #d1d5db 85%, transparent 100%)",
    boxShadow:     "0 0 6px rgba(209,213,219,0.8), 0 0 18px rgba(209,213,219,0.4)",
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      {/* Left shield – old theme bg covering left half */}
      <div ref={leftOverlayRef}  style={overlayBase} />
      {/* Right shield – old theme bg covering right half */}
      <div ref={rightOverlayRef} style={overlayBase} />
      {/* Glowing lines */}
      <div ref={lineLeftRef}  style={{ ...lineBase, left: "calc(50% - 1px)" }} />
      <div ref={lineRightRef} style={{ ...lineBase, left: "calc(50% - 1px)" }} />
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
