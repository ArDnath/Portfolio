import { ProjectData } from "@/lib/getProjectData"
import { TechIcon } from "./tech-icons"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  data: ProjectData
}

export function ProjectCard({ data }: ProjectCardProps) {
  return (
    <div className="relative flex flex-col rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black group hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-200 font-mono overflow-hidden">

      {/* Shimmer scan line on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Image */}
      <div className="relative w-full h-[120px] overflow-hidden border-b border-dashed border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-600 transition-colors duration-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = `https://opengraph.githubassets.com/1/${data.repoUrl.replace("https://github.com/", "")}`
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">

        {/* Name + Live button */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-bold tracking-widest uppercase text-black dark:text-white truncate">
            {data.name}
          </h3>

          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white bg-black dark:bg-white dark:text-black rounded-md px-2.5 py-1.5 hover:opacity-70 active:scale-95 transition-all duration-150 whitespace-nowrap flex-shrink-0"
          >
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            LIVE
            <ArrowUpRight
              size={11}
              strokeWidth={2.5}
              className="group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform duration-150"
            />
          </a>
        </div>

        {/* Description */}
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {data.description}
        </p>

        {/* Footer: tech chips only */}
        <div className="flex flex-wrap gap-1.5 border-t border-dashed border-gray-200 dark:border-gray-800 pt-3 mt-auto">
          {data.fallbackTopics.map((topic) => (
            <span
              key={topic}
              className="group/chip flex items-center h-6 px-1.5 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-gray-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white hover:border-solid hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300 ease-out cursor-default"
              title={topic}
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-[9px] tracking-wider opacity-0 group-hover/chip:max-w-[96px] group-hover/chip:opacity-100 group-hover/chip:mr-1.5 transition-all duration-300 ease-out">
                {topic}
              </span>
              <TechIcon name={topic} size={12} className="flex-shrink-0" />
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}