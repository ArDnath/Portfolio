"use client"

import {
  ArchitectureDiagramViewer,
  TechChip,
  TradeoffAccordion,
} from "@/components/projects"
import { useProjectSelection } from "@/context/project-selection"
import type { Project } from "@/data/projects"
import dynamic from "next/dynamic"
import { useEffect } from "react"

const VideoDemoPlayer = dynamic(
  () =>
    import("@/components/media/video-demo-player").then((m) => m.VideoDemoPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-black/10 dark:bg-white/5 animate-pulse" />
    ),
  },
)

function EmptyState() {
  return (
    <div className="h-full min-h-[320px] flex flex-col items-center justify-center gap-3 p-8 font-mono border border-dashed border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black">
      <span className="font-sans text-[22px] text-gray-300 dark:text-gray-700 tracking-wider">
        SELECT_A_PROJECT
      </span>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center max-w-xs leading-relaxed">
        Click a project card on the left to view architecture, tradeoffs, and a demo here.
      </p>
    </div>
  )
}

interface ProjectDetailBentoProps {
  project?: Project
  /** `page` = scrollable mobile route; `panel` = desktop right column */
  variant?: "page" | "panel"
}

export function ProjectDetailBento({
  project: projectProp,
  variant = "panel",
}: ProjectDetailBentoProps) {
  const { selectedProject: contextProject, clearSelection } = useProjectSelection()
  const selectedProject = projectProp ?? contextProject

  // Esc key closes the detail panel (only when used as a panel, not a dedicated page)
  useEffect(() => {
    if (variant !== "panel") return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSelection()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [variant, clearSelection])

  if (!selectedProject) {
    return <EmptyState />
  }

  const { detail } = selectedProject

  const isPage = variant === "page"

  return (
    <div
      className={
        isPage
          ? "flex flex-col gap-3 p-4 pb-10 font-mono"
          : "h-full min-h-0 flex flex-col gap-3 p-4 font-mono"
      }
    >
      {/* Title + description */}
      <div className="flex-shrink-0 flex flex-col gap-2.5 border border-dashed border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 bg-white dark:bg-black">
        <span className="text-[9px] tracking-[.2em] uppercase text-gray-400 dark:text-gray-600">
          Project / Detail
        </span>
        <h2
          className="font-sans text-[clamp(22px,3vw,36px)] text-black dark:text-white leading-none tracking-wide"
        >
          {selectedProject.name}
        </h2>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-prose">
          {selectedProject.description}
        </p>
        <div role="list" className="flex flex-wrap gap-1.5 pt-0.5">
          {selectedProject.technologies.map((topic) => (
            <TechChip key={topic} slug={topic} />
          ))}
        </div>
      </div>

      {/* Bento body */}
      <div
        className={
          isPage
            ? "grid gap-3"
            : "flex-1 min-h-0 grid grid-rows-[minmax(0,1.4fr)_minmax(0,1fr)] gap-3"
        }
      >
        {/* Architecture — largest cell */}
        <div
          className={`relative rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden group hover:border-gray-500 dark:hover:border-gray-400 transition-colors ${
            isPage ? "min-h-[240px]" : "min-h-0"
          }`}
        >
          <ArchitectureDiagramViewer
            src={detail.architectureDiagram.src}
            alt={detail.architectureDiagram.alt}
            projectId={selectedProject.id}
          />
        </div>

        {/* Bottom row: decisions + video */}
        <div
          className={`grid grid-cols-1 gap-3 ${
            isPage ? "" : "min-h-0 md:grid-cols-[1.2fr_0.8fr]"
          }`}
        >
          {/* Decisions & tradeoffs */}
          <div className="min-h-0 flex flex-col rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden">
            <div className="flex-shrink-0 px-3 py-2 border-b border-dashed border-gray-300 dark:border-gray-700">
              <span className="text-[9px] tracking-[.18em] uppercase text-gray-500 dark:text-gray-400">
                Decisions &amp; Tradeoffs
              </span>
            </div>
            <TradeoffAccordion
              key={selectedProject.id}
              decisions={detail.decisions}
            />
          </div>

          {/* Video — autoplay, no header, no controls */}
          <div
            className={`relative rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-black/5 dark:bg-white/5 overflow-hidden ${
              isPage ? "min-h-[200px]" : "min-h-0"
            }`}
          >
            <VideoDemoPlayer
              key={selectedProject.id}
              youtubeId={detail.videoDemo.youtubeId}
              alt={detail.videoDemo.alt}
              fill
            />
          </div>
        </div>
      </div>
    </div>
  )
}
