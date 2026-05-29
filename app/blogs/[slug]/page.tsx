import { getBlogBySlug, getLocalBlogs } from "@/lib/blogs"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Tag } from "lucide-react"
import { ImageKitImage } from "@/components/media/imagekit-image"
import React from "react"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getLocalBlogs()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Ariyaman Debnath`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) notFound()

  // Dynamically load the MDX component compile result from next-loader
  let ContentComponent: React.ComponentType | null = null
  try {
    const mod = await import(`@/content/blogs/${slug}.mdx`)
    ContentComponent = mod.default
  } catch (err) {
    console.error("Error loading compiled MDX component:", err)
    notFound()
  }

  const hasCoverImage = !!post.image_url

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Back */}
        <div className="border-b border-dashed border-gray-300 dark:border-zinc-800 pb-5 flex items-center gap-2 text-[10px] tracking-widest uppercase text-gray-400 dark:text-zinc-600 font-mono">
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white transition-colors duration-150"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/blogs"
            className="hover:text-black dark:hover:text-white transition-colors duration-150"
          >
            Blogs
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white truncate max-w-[180px]">{post.title}</span>
        </div>

        {/* Cover image */}
        {hasCoverImage && (
          <div className="w-full overflow-hidden rounded-md border border-dashed border-gray-200 dark:border-zinc-800">
            <ImageKitImage
              src={post.image_url}
              alt={post.title}
              width={800}
              height={420}
              priority
              className="w-full h-auto object-cover"
              transform={{ width: 800, quality: 80, format: "auto" }}
            />
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700 hidden sm:inline-block" />
            <span className="flex items-center gap-1.5 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-dashed border-gray-300 dark:border-zinc-700 text-[9px] tracking-widest uppercase font-mono text-gray-500 dark:text-zinc-400"
                >
                  <Tag size={9} />
                  {tag}
                </span>
              ))}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-black dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-emerald-500 dark:border-emerald-400 pl-3.5 py-1 bg-gray-50 dark:bg-zinc-950/40">
            {post.description}
          </p>
        </header>

        <hr className="border-dashed border-gray-200 dark:border-zinc-800" />

        {/* Content */}
        <div className="markdown-body select-text">
          {ContentComponent && <ContentComponent />}
        </div>

        <hr className="border-dashed border-gray-200 dark:border-zinc-800 mt-4" />

        {/* Footer */}
        <footer className="flex justify-between items-center text-[11px] text-gray-400 dark:text-zinc-500 pb-4">
          <span>Ariyaman Debnath © {new Date().getFullYear()}</span>
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors duration-150"
          >
            ← Home
          </Link>
        </footer>
      </article>
    </div>
  )
}
