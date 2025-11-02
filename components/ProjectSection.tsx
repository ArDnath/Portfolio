import React from 'react'
import { projects } from "@/constants/index"
import Link from 'next/link';
import { AiOutlineRight } from "react-icons/ai";

function ProjectSection() {
  return (
    <div className="mt-3">
          <div className="flex justify-between items-baseline border-b-2 pb-2">
            <h1 className="text-2xl  mt-5">Projects</h1>
            <Link href="/projects" className="hover:underline">
              more
            </Link>
          </div>
          <div className="flex flex-col">
            {projects.slice(0, 5).map((project) => (
              <Link
                className="proj group"
                key={project.name.replace(" ", "-")}
                href={`/projects/${project.slug}`}
              >
                <article className="flex flex-row gap-0 items-center justify-between lg:justify-center mt-5 mb-2">
                  <div className="flex flex-col justify-start opacity-100 flex-none shrink-0 h-auto relative whitespace-pre w-auto mr-3">
                    <div className='flex gap-3 items-center'>
                    <h1 className="text-lg font-medium leading-[1.3em] text-left  group-hover:text-green">
                      {project.name}
                    </h1>
                    </div>
                    
                  </div>
                  <div className="w-full mr-2 border-y border-gray-700 rounded-2 transition duration-110 opacity-80 group-hover:border-white"></div>
                  <AiOutlineRight
                    className="text-gray-400 transition-all duration-[110ms] group-hover:text-white h-4 w-4 shrink-0"
                    size={20}
                  />
                </article>
              </Link>
            ))}
          </div>
        </div>
  )
}

export default ProjectSection