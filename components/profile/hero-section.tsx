import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"
import { VT323 } from "next/font/google"

const vt323 = VT323({ weight: "400", subsets: ["latin"] })

export default function HeroSection() {
  return (
    <div className="relative font-mono border-b border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden px-6 pt-6 pb-5">

      {/* Dense grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Radial corner fades — vignette that eats the grid at edges */}
      
      {/* Dark mode version of the same fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background: `radial-gradient(ellipse 70% 70% at 0% 0%,   black 0%, transparent 60%),
                       radial-gradient(ellipse 70% 70% at 100% 0%,  black 0%, transparent 60%),
                       radial-gradient(ellipse 70% 70% at 0% 100%,  black 0%, transparent 60%),
                       radial-gradient(ellipse 70% 70% at 100% 100%, black 0%, transparent 60%)`,
        }}
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-end gap-2 mb-5 z-10">
        <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[.1em] text-gray-500 dark:text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 px-2 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          OPEN TO WORK
        </span>
        <ThemeToggle />
      </div>

      {/* Main row */}
      <div className="relative flex items-start justify-between gap-6 z-10">

        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-0 mb-2">
            <h1 className={`${vt323.className} text-[clamp(32px,5vw,54px)] text-black dark:text-white leading-none tracking-wide`}>
              Ariyaman Debnath
            </h1>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <span className="w-7 h-px border-t border-dashed border-gray-300 dark:border-gray-700 flex-shrink-0" />
            <p className="text-[9px] tracking-[.18em] uppercase text-gray-400 dark:text-gray-600 whitespace-nowrap">
              <span className={`${vt323.className} text-[14px] tracking-wider text-black dark:text-white`}>
                Future-Ready
              </span>{" "}
              Full‑Stack Engineer
            </p>
            <span className="w-7 h-px border-t border-dashed border-gray-300 dark:border-gray-700 flex-shrink-0" />
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              I{" "}
              <span className="font-bold text-black dark:text-white">learn fast</span>,{" "}
              <span className="font-bold text-black dark:text-white underline underline-offset-2 decoration-dashed">
                ship fast
              </span>
              , and treat every codebase{" "}
              <span className="font-bold text-black dark:text-white">like it&apos;s production</span>.
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              AI‑Native builder obsessed with shipping reliable software.
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="relative">
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-black dark:border-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-black dark:border-white" />
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-black dark:border-white" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-black dark:border-white" />
            <Image
              src="/Me.png"
              alt="Ariyaman Debnath"
              width={160}
              height={160}
              priority
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <span className={`${vt323.className} text-[13px] tracking-[.1em] text-gray-300 dark:text-gray-700`}>
            ID_ARIYAMAN.PNG
          </span>
        </div>
      </div>

      {/* Bottom links */}
      <div className="relative border-t border-dashed border-gray-200 dark:border-gray-800 mt-5 pt-4 z-10 flex items-center gap-6">
        {[
          { label: "GitHub_",  href: "https://github.com/ariyamandebnath" },
          { label: "Twitter_", href: "https://twitter.com/ariyamandebnath" },
          { label: "Mail_",    href: "mailto:ariyaman@email.com" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${vt323.className} text-[16px] tracking-[.1em] text-gray-400 dark:text-gray-600 border-b border-dashed border-gray-300 dark:border-gray-700 pb-px hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:border-solid transition-all duration-150`}
          >
            {label}
          </Link>
        ))}
      </div>

    </div>
  )
}