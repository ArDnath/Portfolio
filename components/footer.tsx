"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { SiGithub } from "react-icons/si"
import { Moon, Sun } from "lucide-react"

const TIME_ZONE = "Asia/Kolkata"

type FooterTime = {
  full: string
  mobile: string
  isDay: boolean
}

function formatISTTime(date: Date): FooterTime {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)

  const timePart = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date)

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIME_ZONE,
      hour: "2-digit",
      hour12: false,
    }).format(date)
  )

  return {
    full: `${datePart} • ${timePart} IST`,
    mobile: `${timePart} IST`,
    isDay: hour >= 6 && hour < 18,
  }
}

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const [footerTime, setFooterTime] = useState<FooterTime>({
    full: "",
    mobile: "",
    isDay: true,
  })

  useEffect(() => {
    setMounted(true)

    const updateTime = () => {
      setFooterTime(formatISTTime(new Date()))
    }

    updateTime()
    const interval = window.setInterval(updateTime, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const icon = useMemo(
    () =>
      footerTime.isDay ? (
        <Sun size={12} className="shrink-0 text-amber-500" aria-hidden="true" />
      ) : (
        <Moon size={12} className="shrink-0 text-blue-400" aria-hidden="true" />
      ),
    [footerTime.isDay]
  )

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-50 border-t border-dashed border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/70"
      role="contentinfo"
    >
      <div className="grid h-9 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:h-10 sm:px-6 sm:text-[11px] dark:text-neutral-400">
        <div className="min-w-0">
          <span className="block truncate font-bold text-black dark:text-white">
            © Ariyaman
          </span>
        </div>

        <div className="flex min-w-0 items-center justify-center gap-1.5 text-black dark:text-white">
          {mounted ? (
            <>
              {icon}
              <span className="hidden whitespace-nowrap sm:inline">
                {footerTime.full}
              </span>
              <span className="whitespace-nowrap sm:hidden">
                {footerTime.mobile}
              </span>
            </>
          ) : (
            <span className="whitespace-nowrap">Syncing...</span>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href="https://github.com/ArDnath/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open portfolio repository on GitHub"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-600 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-neutral-300 dark:hover:text-white dark:focus-visible:ring-white/20"
          >
            <SiGithub size={13} className="shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  )
}