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
      className="group/chip inline-flex items-center gap-0 overflow-hidden h-6 px-1.5 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:border-solid hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center justify-center shrink-0">
        <TechIcon slug={slug} size={13} />
      </div>
      <span className="text-[9px] tracking-[.08em] uppercase leading-none max-w-0 opacity-0 group-hover/chip:max-w-[100px] group-hover/chip:opacity-100 group-hover/chip:pl-1.5 transition-all duration-300 whitespace-nowrap overflow-hidden">
        {label}
      </span>
    </span>
  )
}
