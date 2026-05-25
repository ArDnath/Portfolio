import Image from "next/image"
import ThemeToggle from "@/components/theme-toggle"
import { IMAGEKIT_PATHS, imagekitUrl } from "@/lib/imagekit"
import Link from "next/link"
import { SiGithub, SiX, SiGmail } from "react-icons/si"

const socialLinks = [
  { href: "https://github.com/ArDnath", label: "GitHub", Icon: SiGithub, color: "text-[#181717] dark:text-white" },
  { href: "https://x.com/AriyamanDe12_24", label: "Twitter", Icon: SiX, color: "text-black dark:text-white" },
  { href: "mailto:debnathariyaman1224@gmail.com", label: "Email", Icon: SiGmail, color: "text-[#EA4335]" },
] as const

export default function HeroSection() {
  return (
    <div className="relative font-mono border-b border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden px-6 pt-6 pb-5">

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-12%] text-gray-400 dark:text-gray-600 opacity-[0.1] dark:opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 62% at 50% 44%, #000 0%, #000 38%, transparent 74%)",
            maskImage:
              "radial-gradient(ellipse 72% 62% at 50% 44%, #000 0%, #000 38%, transparent 74%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-[10px] dark:backdrop-blur-[14px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 88% 78% at 50% 44%, transparent 42%, #000 100%)",
            maskImage:
              "radial-gradient(ellipse 88% 78% at 50% 44%, transparent 42%, #000 100%)",
          }}
        />
      </div>


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
            <h1 className="font-sans text-[clamp(32px,5vw,54px)] text-black dark:text-white leading-none tracking-wide">
              Ariyaman Debnath
            </h1>
          </div>

          <div className="flex items-center gap-2 mb-5">
        
            <p className="text-[9px] tracking-[.18em] uppercase text-gray-400 dark:text-gray-300 whitespace-nowrap">
              <span className="font-sans text-[14px] tracking-wider text-black dark:text-white">
                Future-Ready
              </span>{" "}
              Full‑Stack Engineer tending to Devops
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

        {/* Logo */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="group relative cursor-pointer">
            <div className="absolute inset-0 border p-2 rounded-sm bg-black/10 blur-2xl translate-y-4 scale-95 dark:bg-black/30" />
            <div className="relative overflow-hidden  border-slate-800 dark:border-slate-300  shadow-[10px_6.5px_10px_4px_rgba(0,0,0,0.3)] dark:shadow-[10px_6.5px_10px_0_rgba(255,255,255,0.2)] transition-shadow duration-300 group-hover:shadow-[0_0_0_0_rgba(0,0,0,0)]">
              <Image
                src={imagekitUrl(IMAGEKIT_PATHS.logo, { width: 400, quality: 90, format: "auto" })}
                alt="Ariyaman Debnath"
                width={80}
                height={80}
                priority
                className="relative z-[1] w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover border-2 border-slate-800 dark:border-slate-300"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom links — icons */}
      <div className="relative pt-2 border-gray-400 dark:border-gray-800 z-10 flex items-center gap-5">
        {socialLinks.map(({ href, label, Icon, color }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            className="group flex items-center gap-0 overflow-hidden border border-dashed border-gray-300 dark:border-gray-700 rounded-md hover:border-black dark:hover:border-white hover:border-solid transition-all duration-300"
          >
            <div className={`flex items-center justify-center w-9 h-9 shrink-0 ${color}`}>
              <Icon size={12} aria-hidden />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100 group-hover:pr-3 transition-all duration-300 whitespace-nowrap text-black dark:text-white">
              {label}
            </span>
          </Link>
        ))}
      </div>

    </div>
  )
}
