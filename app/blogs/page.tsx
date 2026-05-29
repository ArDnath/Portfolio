import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { fetchBlogPosts } from "@/lib/blogs"
import { ImageKitImage } from "@/components/media/imagekit-image"

export const metadata = {
  title: "Blogs | Ariyaman Debnath",
  description: "Complete archive of technical articles, setups, and engineering deep-dives.",
}

export default async function AllBlogsPage() {
  const posts = await fetchBlogPosts()

  return (
    <div id="main" className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-gray-400 dark:text-zinc-600 border-b border-dashed border-gray-300 dark:border-gray-700 pb-5">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors duration-150">
            Home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">Blogs</span>
        </div>

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-wider uppercase">All Blogs</h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Articles, setup logs, and engineering guides.
          </p>
        </div>

        {/* Blog list */}
        {posts.length === 0 ? (
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            No articles found.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blogs/${post.slug}`}
                  aria-label={`Read blog post: ${post.title}`}
                  className="group flex flex-row items-stretch rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black overflow-hidden transition-all duration-200 hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                >
                  {/* Thumbnail */}
                  {post.image_url ? (
                    <div className="relative w-[160px] shrink-0 overflow-hidden border-r border-dashed border-gray-300 dark:border-gray-700">
                      <ImageKitImage
                        src={post.image_url}
                        alt={post.title}
                        fill
                        transform={{ width: 240, height: 240, quality: 75, format: "auto" }}
                        className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                        sizes="120px"
                      />
                    </div>
                  ) : (
                    /* Placeholder strip when no image */
                    <div className="w-[120px] shrink-0 border-r border-dashed border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
                      <span className="text-[8px] tracking-widest uppercase text-gray-300 dark:text-zinc-700 rotate-90 whitespace-nowrap">
                        No img
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 p-4 min-w-0">
                    <div>
                      <h2 className="text-[13px] font-bold tracking-widest uppercase text-black dark:text-white leading-snug group-hover:underline underline-offset-2 line-clamp-2">
                        {post.title}
                      </h2>
                      {post.description ? (
                        <p className="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      {/* Tag chips */}
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 text-[9px] tracking-widest uppercase border border-dashed border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Date */}
                      {post.date ? (
                        <p className="text-[10px] tracking-widest text-gray-400 dark:text-gray-500 uppercase shrink-0">
                          {post.date}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
}
