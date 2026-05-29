import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { fetchBlogPosts } from "@/lib/blogs"

export async function BlogsSection() {
  const posts = await fetchBlogPosts()

  if (posts.length === 0) {
    return (
      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono pb-8">
        No articles found.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3 pb-8 font-mono">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blogs/${post.slug}`}
            className="group block rounded-md border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-4 transition-all duration-200 hover:border-gray-500 dark:hover:border-gray-400 hover:border-solid hover:shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[13px] font-bold tracking-widest uppercase text-black dark:text-white leading-snug group-hover:underline underline-offset-2">
                {post.title}
              </h3>
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="flex-shrink-0 text-gray-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-all duration-150"
              />
            </div>
            {post.description ? (
              <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {post.description}
              </p>
            ) : null}
            {post.date ? (
              <p className="mt-2 text-[10px] tracking-widest text-gray-400 dark:text-gray-500 uppercase">
                {post.date}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}

