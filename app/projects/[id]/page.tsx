import { notFound } from "next/navigation"
import { ProjectDetailPage } from "@/components/projects"
import { getProjectById, projects } from "@/data/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return <ProjectDetailPage project={project} />
}
