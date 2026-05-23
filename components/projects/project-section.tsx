"use client"

import { useRouter } from "next/navigation"
import { ProjectCard } from "@/components/projects/project-card"
import { useProjectSelection } from "@/context/project-selection"
import { useIsLg } from "@/hooks/use-is-lg"

export function ProjectsSection() {
  const router = useRouter()
  const isLg = useIsLg()
  const { projects, selectedId, selectProject } = useProjectSelection()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8 lg:pb-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
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
    </div>
  )
}
