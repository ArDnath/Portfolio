"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectDetailBento } from "@/components/layout/project-detail-bento"
import type { Project } from "@/data/projects"

export function ProjectDetailPage({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <header className="sticky top-0 z-20 border-b border-dashed border-gray-300 dark:border-gray-700 bg-white/95 dark:bg-black/95 backdrop-blur-sm px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back
        </Link>
      </header>
      <ProjectDetailBento project={project} variant="page" />
    </div>
  )
}
