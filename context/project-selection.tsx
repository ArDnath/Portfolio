"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { projects, type Project, getProjectById } from "@/data/projects"

interface ProjectSelectionContextValue {
  selectedId: string | null
  selectedProject: Project | null
  selectProject: (id: string) => void
  clearSelection: () => void
  projects: Project[]
}

const ProjectSelectionContext = createContext<ProjectSelectionContextValue | null>(
  null
)

export function ProjectSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    projects[0]?.id ?? null,
  )

  const selectProject = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedId(null)
  }, [])

  const value = useMemo(
    () => ({
      selectedId,
      selectedProject: selectedId ? getProjectById(selectedId) ?? null : null,
      selectProject,
      clearSelection,
      projects,
    }),
    [selectedId, selectProject, clearSelection]
  )

  return (
    <ProjectSelectionContext.Provider value={value}>
      {children}
    </ProjectSelectionContext.Provider>
  )
}

export function useProjectSelection() {
  const ctx = useContext(ProjectSelectionContext)
  if (!ctx) {
    throw new Error("useProjectSelection must be used within ProjectSelectionProvider")
  }
  return ctx
}
