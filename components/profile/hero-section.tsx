import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"
import { VT323 } from "next/font/google"
import { SiGithub, SiX, SiGmail } from "react-icons/si"

const vt323 = VT323({ weight: "400", subsets: ["latin"] })

const socialLinks = [
  { href: "https://github.com/ariyamandebnath", label: "GitHub", Icon: SiGithub },
  { href: "https://twitter.com/ariyamandebnath", label: "Twitter", Icon: SiX },
  { href: "mailto:ariyaman@email.com", label: "Email", Icon: SiGmail },
] as const

export default function HeroSection() {
  return (
    <div className="relative font-mono border-b border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden px-6 pt-6 pb-5">

      {/* Dense grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-gray-400 dark:text-gray-600 opacity-[0.1] dark:opacity-[0.01`]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
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
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                learn fast
              </span>
              ,{" "}
              <span className="font-bold text-amber-600 dark:text-amber-400 underline underline-offset-2 decoration-dashed decoration-amber-500/60">
                ship fast
              </span>
              , and treat every codebase{" "}
              <span className="font-bold text-violet-600 dark:text-violet-400">
                like it&apos;s production
              </span>
              .
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
              AI‑Native builder obsessed with shipping reliable software.
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="relative p-2 border "> 
            <Image
              src="/logo.png"
              alt="Ariyaman Debnath"
              width={80}
              height={80}
              priority
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom links — icons */}
      <div className="relative border-t border-dashed pt-2 border-gray-400 dark:border-gray-800  z-10 flex items-center gap-5">
        {socialLinks.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            className="inline-flex items-center justify-center w-9 h-9 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:border-solid transition-all duration-150"
          >
            <Icon size={18} aria-hidden className="shrink-0" />
          </Link>
        ))}
      </div>

    </div>
  )
}
