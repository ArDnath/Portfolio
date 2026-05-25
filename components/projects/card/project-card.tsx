"use client"

import { TechChip } from "@/components/projects/icons"
import type { Project } from "@/data/projects"
import { imagekitUrl } from "@/lib/imagekit"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { SiGithub } from "react-icons/si"

interface ProjectCardProps {
  project: Project
  selected?: boolean
  onSelect: () => void
}

export function ProjectCard({ project, selected, onSelect }: ProjectCardProps) {
  const thumbnailUrl = imagekitUrl(project.thumbnail.src, {
    width: 480,
    quality: 75,
    format: "auto",
  })

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={[
        "relative flex flex-col rounded-md border border-dashed bg-white dark:bg-black group transition-all duration-200 font-mono overflow-hidden cursor-pointer",
        selected
          ? "border-black dark:border-white border-solid shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          : "border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative w-full h-[120px] overflow-hidden border-b border-dashed border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-colors duration-200">
        <Image
          src={thumbnailUrl}
          alt={project.thumbnail.alt}
          width={600}
          height={240}
          sizes="(max-width: 640px) 100vw, 300px"
          loading="lazy"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-black to-transparent" />
      </div>

      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-bold tracking-widest uppercase text-black dark:text-white truncate">
            {project.name}
          </h3>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.name} source on GitHub`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:border-solid transition-all duration-150"
            >
              <SiGithub size={14} aria-hidden />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/live inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white bg-black dark:bg-white dark:text-black rounded-md px-2.5 py-1.5 hover:opacity-70 active:scale-95 transition-all duration-150 whitespace-nowrap"
            >
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              LIVE
              <ArrowUpRight
                size={11}
                strokeWidth={2.5}
                className="group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform duration-150"
              />
            </a>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div
          role="list"
          className="flex flex-wrap gap-1.5 border-t border-dashed border-gray-300 dark:border-gray-700 pt-3 mt-auto"
        >
          {project.technologies.map((topic) => (
            <TechChip
              key={topic}
              slug={topic}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
