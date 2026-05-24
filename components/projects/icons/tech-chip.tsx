"use client"

import { formatTechLabel } from "./registry"
import { TechIcon } from "./tech-icon"

interface TechChipProps {
  slug: string
  onClick?: (e: React.MouseEvent) => void
}

export function TechChip({ slug, onClick }: TechChipProps) {
  const label = formatTechLabel(slug)

  return (
    <span
      role="listitem"
      title={label}
      onClick={onClick}
      className="group/chip inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:border-solid hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 cursor-default"
    >
      <TechIcon slug={slug} size={13} />
      <span className="text-[9px] tracking-[.08em] uppercase leading-none">
        {label}
      </span>
    </span>
  )
}
