import { formatTechLabel, resolveTech } from "./registry"

interface TechIconProps {
  slug: string
  size?: number
  className?: string
}

export function TechIcon({ slug, size = 14, className = "" }: TechIconProps) {
  const tech = resolveTech(slug)

  if (!tech) {
    const label = formatTechLabel(slug).slice(0, 2).toUpperCase()
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm border border-dashed border-gray-300 dark:border-gray-600 text-[8px] font-bold leading-none text-gray-500 dark:text-gray-400 ${className}`}
        style={{ width: size + 4, height: size + 4 }}
        aria-hidden
      >
        {label}
      </span>
    )
  }

  const { Icon, initials, colorClass } = tech

  if (!Icon && initials) {
    return (
      <span
        aria-hidden
        className={`inline-flex items-center justify-center rounded-sm border border-dashed border-gray-300 dark:border-gray-600 text-[8px] font-bold leading-none transition-colors duration-200 ${colorClass} ${className}`}
        style={{ width: size + 4, height: size + 4 }}
      >
        {initials}
      </span>
    )
  }

  if (!Icon) return null

  return (
    <Icon
      size={size}
      aria-hidden
      className={`flex-shrink-0 transition-colors duration-200 ${colorClass} ${className}`}
    />
  )
}
