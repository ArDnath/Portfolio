import { projects } from "@/data/projects"
import { TechChip } from "@/components/projects/icons"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "All Projects | Ariyaman Debnath",
  description: "Complete archive of full-stack projects, open-source utilities, and live deployments.",
}

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Back Link and Header */}
        <div className="flex flex-col gap-4 border-b border-dashed border-gray-300 dark:border-gray-700 pb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-150"
          >
            <ArrowLeft
              size={12}
              className="group-hover:-translate-x-1 transition-transform duration-150"
            />
            Back to Portfolio
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-wider uppercase">
              All Shipped Projects
            </h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              A comprehensive index of live production deployments, microservices, and client platforms. Click any card to view the live build.
            </p>
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-6 transition-all duration-200 hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              {/* Top Row: Title and Live Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dashed border-gray-100 dark:border-zinc-900 pb-3">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[14px] font-bold tracking-widest uppercase text-black dark:text-white group-hover:underline decoration-dashed underline-offset-4">
                    {project.name}
                  </h2>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal lowercase">
                    {project.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="group/btn inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white bg-black dark:bg-white dark:text-black rounded-md px-3 py-1.5 hover:opacity-85 active:scale-95 transition-all duration-150">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    LIVE DEPLOYMENT
                    <ArrowUpRight
                      size={11}
                      strokeWidth={2.5}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-150 text-white dark:text-black"
                    />
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack section */}
              <div className="flex flex-wrap gap-1.5 mt-5 border-t border-dashed border-gray-200 dark:border-zinc-900 pt-4">
                {project.technologies.map((tech) => (
                  <TechChip key={tech} slug={tech} />
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
