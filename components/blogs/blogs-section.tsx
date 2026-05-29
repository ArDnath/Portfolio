import Link from "next/link"
import { fetchBlogPosts } from "@/lib/blogs"

export async function BlogsSection() {
  const allPosts = await fetchBlogPosts()

  // Exclude the ncmpcpp blog from the homepage featured list
  const featuredPosts = allPosts.filter(
    (post) => post.slug !== "ncmpcpp-terminal-audio",
  )

  if (featuredPosts.length === 0) {
    return (
      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono pb-8">
        No articles found.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3 pb-8 font-mono">
      <ul className="flex flex-col gap-3">
        {featuredPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              aria-label={`Read blog post: ${post.title}`}
              className="group flex flex-col justify-between min-h-[100px] rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-4 transition-all duration-200 hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <div>
                <h3 className="text-[13px] font-bold tracking-widest uppercase text-black dark:text-white leading-snug group-hover:underline underline-offset-2">
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
