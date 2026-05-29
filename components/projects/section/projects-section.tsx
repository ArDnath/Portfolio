"use client"

import { ProjectCard } from "@/components/projects/card/project-card"
import { useProjectSelection } from "@/context/project-selection"
import { useIsLg } from "@/hooks/use-is-lg"
import { useRouter } from "next/navigation"
import { ArrowRight, Terminal } from "lucide-react"

export function ProjectsSection() {
  const router = useRouter()
  const isLg = useIsLg()
  const { projects, selectedId, selectProject } = useProjectSelection()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8 lg:pb-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          priority={index < 2}
          selected={isLg && selectedId === project.id}
          onSelect={() => {
            if (isLg) {
              selectProject(project.id)
            } else {
              router.push(`/projects/${project.id}`)
            }
          }}
        />
      ))}

      {/* Show All Projects Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push("/projects")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            router.push("/projects")
          }
        }}
        className="relative flex flex-col items-center justify-center min-h-[220px] rounded-md border border-dashed bg-white/20 dark:bg-black/10 hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur-md group transition-all duration-300 font-mono overflow-hidden cursor-pointer border-gray-300 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:border-solid hover:shadow-[0_0_20px_rgba(0,0,0,0.01)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="flex flex-col items-center gap-3 p-6 text-center z-10">
          <Terminal 
            size={22} 
            strokeWidth={1.5} 
            className="text-gray-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white group-hover:scale-110 transition-all duration-300"
          />
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold tracking-[0.25em] uppercase text-gray-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
              SHOW ALL PROJECTS
            </span>
            <ArrowRight 
              size={13} 
              strokeWidth={2}
              className="text-gray-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

