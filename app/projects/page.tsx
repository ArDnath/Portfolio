import { projects } from "@/data/projects"
import { TechChip } from "@/components/projects/icons"
import { ArrowUpRight } from "lucide-react"
import { SiGithub } from "react-icons/si"
import Link from "next/link"

export const metadata = {
  title: "All Projects | Ariyaman Debnath",
  description: "Complete archive of full-stack projects, open-source utilities, and live deployments.",
}

// Combine all projects into a single list with consistent format, styling, and GitHub repository links
const allProjects = [
  ...projects.map((p) => ({
    id: p.id,
    name: p.name,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    description: p.description,
    technologies: p.technologies,
  })),
  {
    id: "blogs",
    name: "Blogs",
    liveUrl: "https://blogs.ariyaman.in",
    githubUrl: "https://github.com/ArDnath/portfolio",
    description: "Personal technical blog covering full-stack engineering, DevOps, and system design deep-dives.",
    technologies: ["nextjs", "mdx", "tailwindcss", "typescript"],
  },
  {
    id: "mandi",
    name: "Mandi",
    liveUrl: "https://mandi.ariyaman.in",
    githubUrl: "https://github.com/ArDnath/mandi",
    description: "A marketplace-style web application built for fast listings and seamless transactional UX.",
    technologies: ["react", "tailwindcss", "firebase", "typescript"],
  },
  {
    id: "ui-niverse",
    name: "UI-Niverse",
    liveUrl: "https://ui-niverse.ariyaman.in",
    githubUrl: "https://github.com/ArDnath/ui-niverse",
    description: "A curated showcase of UI components, design patterns, and interactive frontend experiments.",
    technologies: ["html", "css", "javascript", "react"],
  },
]

export default function AllProjectsPage() {
  return (
    <div id="main" className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gray-400 dark:text-zinc-600 border-b border-dashed border-gray-300 dark:border-gray-700 pb-5">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors duration-150">
            Home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">Projects</span>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-wider uppercase">All Projects</h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Live production deployments. Click any card to open.
          </p>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-3">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col gap-2.5 rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-3.5 transition-all duration-200 hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              {/* Invisible overlay link for live URL */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0 cursor-pointer"
                aria-label={`Open live deployment for ${project.name}`}
              />

              {/* Title row */}
              <div className="relative z-10 flex items-center justify-between gap-2 pointer-events-none">
                <div className="flex items-baseline gap-2 min-w-0">
                  <h2 className="text-[12px] sm:text-[13px] font-bold tracking-widest uppercase text-black dark:text-white truncate">
                    {project.name}
                  </h2>
                  <span className="text-[9px] text-gray-400 dark:text-gray-600 shrink-0">{project.id}</span>
                </div>
                
                {/* Actions container (with pointer-events-auto enabled to allow clicks) */}
                <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
                  {/* GitHub Repository Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-1.5 rounded text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label={`View ${project.name} source code on GitHub`}
                    title={`View ${project.name} on GitHub`}
                  >
                    <SiGithub size={13} />
                  </a>

                  {/* Live Badge */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-white bg-black dark:bg-white dark:text-black rounded px-2 py-1 hover:opacity-85 transition-opacity"
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    LIVE
                    <ArrowUpRight size={9} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-[10.5px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed pointer-events-none">
                {project.description}
              </p>

              {/* Tech chips (pointer-events-auto to let chips expand on hover) */}
              <div className="relative z-10 flex flex-wrap gap-1.5 border-t border-dashed border-gray-100 dark:border-zinc-900 pt-3 pointer-events-auto">
                {project.technologies.map((tech) => (
                  <TechChip key={tech} slug={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
