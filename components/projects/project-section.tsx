"use client"

import { ProjectData } from "@/lib/getProjectData"
import { ProjectCard } from "@/components/projects/project-card"

export function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
      {projects.map((project) => (
        <ProjectCard 
          key={project.name} 
          data={project} 
        />
      ))}
    </div>
  )
}