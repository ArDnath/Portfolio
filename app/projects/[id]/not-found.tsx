import Link from "next/link"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 font-mono bg-background text-foreground">
      <p className="text-[11px] tracking-widest uppercase text-gray-500">Project not found</p>
      <Link
        href="/"
        className="text-[11px] tracking-widest uppercase border border-dashed border-gray-300 dark:border-gray-700 px-3 py-2 hover:border-black dark:hover:border-white transition-colors"
      >
        Back to portfolio
      </Link>
    </div>
  )
}
