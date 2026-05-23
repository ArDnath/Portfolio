"use client"

import { ImageKitMedia } from "@/components/media/imagekit-media"
import { useProjectSelection } from "@/context/project-selection"
import type { Project } from "@/data/projects"
import { VT323 } from "next/font/google"

const vt323 = VT323({ weight: "400", subsets: ["latin"] })

function EmptyState() {
  return (
    <div className="h-full min-h-[320px] flex flex-col items-center justify-center gap-3 p-8 font-mono border border-dashed border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black">
      <span className={`${vt323.className} text-[22px] text-gray-300 dark:text-gray-700 tracking-wider`}>
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
  const { selectedProject: contextProject } = useProjectSelection()
  const selectedProject = projectProp ?? contextProject

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
      <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5 border border-dashed border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 bg-white dark:bg-black">
        <div className="flex-shrink-0 min-w-0 sm:max-w-[38%]">
          <span className="text-[9px] tracking-[.2em] uppercase text-gray-400 dark:text-gray-600 block mb-1">
            Project / Detail
          </span>
          <h2
            className={`${vt323.className} text-[clamp(22px,3vw,36px)] text-black dark:text-white leading-none tracking-wide`}
          >
            {selectedProject.name}
          </h2>
        </div>
        <p className="flex-1 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed sm:border-l sm:border-dashed sm:border-gray-200 dark:sm:border-gray-800 sm:pl-5">
          {selectedProject.description}
        </p>
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
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2 border-b border-dashed border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
            <span className="text-[9px] tracking-[.18em] uppercase text-gray-500 dark:text-gray-400">
              Architecture
            </span>
            <span className="text-[8px] text-gray-400 dark:text-gray-600 tracking-widest">
              DIAGRAM
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-9">
            <ImageKitMedia
              src={detail.architectureDiagram.src}
              alt={detail.architectureDiagram.alt}
              type={detail.architectureDiagram.type ?? "image"}
              fill
              className="object-contain p-3 opacity-90 group-hover:opacity-100 transition-opacity"
              transform={{ quality: 85, format: "auto" }}
            />
          </div>
        </div>

        {/* Bottom row: decisions + video */}
        <div
          className={`grid grid-cols-1 gap-3 ${
            isPage ? "" : "min-h-0 md:grid-cols-[1.2fr_0.8fr]"
          }`}
        >
          {/* Decisions & tradeoffs */}
          <div className="min-h-0 flex flex-col rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden">
            <div className="flex-shrink-0 px-3 py-2 border-b border-dashed border-gray-200 dark:border-gray-800">
              <span className="text-[9px] tracking-[.18em] uppercase text-gray-500 dark:text-gray-400">
                Decisions &amp; Tradeoffs
              </span>
            </div>
            <ul className="flex-1 min-h-0 overflow-y-auto no-scrollbar divide-y divide-dashed divide-gray-200 dark:divide-gray-800">
              {detail.decisions.map((item) => (
                <li key={item.title} className="px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <p className="text-[11px] font-bold text-black dark:text-white mb-1 tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Video — autoplay, no header, no controls */}
          <div
            className={`relative rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-black/5 dark:bg-white/5 overflow-hidden ${
              isPage ? "min-h-[200px]" : "min-h-0"
            }`}
          >
            <ImageKitMedia
              src={detail.videoDemo.src}
              alt={detail.videoDemo.alt}
              type="video"
              fill
              className="object-cover pointer-events-none"
              controls={false}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  )
}
