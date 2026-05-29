import { getBlogBySlug, getLocalBlogs } from "@/lib/blogs"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { MarkdownRenderer } from "@/components/blogs/markdown-renderer"
import { ImageKitImage } from "@/components/media/imagekit-image"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getLocalBlogs()
  return posts.map((post) => ({
    slug: post.slug,
  }))
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

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Back Link */}
        <div className="border-b border-dashed border-gray-300 dark:border-zinc-800 pb-5">
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
        </div>

        {/* Blog Post Header */}
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {post.date}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-800 hidden sm:inline" />
            <span className="flex items-center gap-1.5">
              <Tag size={11} />
              {post.tags.join(", ")}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-black dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed italic border-l-2 border-emerald-500 dark:border-emerald-400 pl-3.5 bg-gray-50 dark:bg-zinc-950/40 py-2">
            {post.description}
          </p>
        </header>

        {/* Blog Post Header Image (Only if populated in frontmatter) */}
        {post.imageUrl ? (
          <div className="w-full overflow-hidden border border-dashed border-gray-300 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/20 rounded-md p-1.5 my-2">
            <ImageKitImage
              src={post.imageUrl}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-sm"
              priority
              transform={{ width: 800, quality: 80, format: "auto" }}
            />
          </div>
        ) : null}

        {/* Horizontal Divider */}
        <hr className="border-dashed border-gray-300 dark:border-zinc-800 my-2" />

        {/* Content Area */}
        <div className="prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Horizontal Divider */}
        <hr className="border-dashed border-gray-300 dark:border-zinc-800 mt-8 mb-4" />

        {/* Footer Navigation */}
        <footer className="flex justify-between items-center text-[11px] text-gray-400 dark:text-zinc-500">
          <span>Ariyaman Debnath © {new Date().getFullYear()}</span>
          <Link
            href="/"
            className="underline hover:text-black dark:hover:text-white transition-colors duration-150"
          >
            Terminal Home
          </Link>
        </footer>
      </article>
    </div>
  )
}
