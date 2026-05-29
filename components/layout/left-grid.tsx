import HeroSection from '@/components/profile/hero-section';
import { ProjectsSection } from "@/components/projects"
import { BlogsSection } from "@/components/blogs/blogs-section"
import Link from 'next/link';

export default function LeftGrid() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* Clickable Deployed Projects Header */}
      <Link 
        href="/projects" 
        className="group flex items-baseline justify-between text-3xl border-b border-dashed border-gray-300 dark:border-gray-700 py-1 px-4 cursor-pointer select-none"
      >
        <span>Deployed Projects</span>
        <span className="text-[10px] tracking-widest uppercase font-mono text-gray-400 dark:text-zinc-600">
          [View All]
        </span>
      </Link>
      
      <div className='mt-4 px-4'>
        <ProjectsSection />
      </div>

      {/* Clickable Blogs Header */}
      <Link 
        href="/blogs" 
        className="group flex items-baseline justify-between text-3xl border-b border-dashed border-gray-300 dark:border-gray-700 py-1 px-4 mt-2 cursor-pointer select-none"
      >
        <span>Blogs</span>
        <span className="text-[10px] tracking-widest uppercase font-mono text-gray-400 dark:text-zinc-600">
          [View All]
        </span>
      </Link>
      
      <div className="mt-4 px-4">
        <BlogsSection />
      </div>
    </div>
  )
}
