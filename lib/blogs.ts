export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image_url: string
  content: string
  url: string
}

export async function getLocalBlogs(): Promise<BlogPost[]> {
  const fs = require("fs")
  const path = require("path")

  const blogsDirectory = path.join(process.cwd(), "content/blogs")
  if (!fs.existsSync(blogsDirectory)) return []

  const filenames = fs.readdirSync(blogsDirectory)
  const posts: BlogPost[] = []

  for (const filename of filenames) {
    if (filename.endsWith(".mdx") || filename.endsWith(".md")) {
      const slug = filename.replace(/\.mdx?$/, "")
      try {
        const mod = await import(`@/content/blogs/${slug}.mdx`)
        const meta = mod.metadata || {}
        posts.push({
          slug,
          title: meta.title || "Untitled",
          description: meta.description || "",
          date: meta.date || "",
          tags: meta.tags || [],
          image_url: meta.image_url || "",
          content: "",
          url: `/blogs/${slug}`,
        })
      } catch (err) {
        console.error(`Failed to dynamically import blog metadata for ${slug}:`, err)
      }
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getBlogBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getLocalBlogs()
  return posts.find((p) => p.slug === slug)
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    return await getLocalBlogs()
  } catch (err) {
    console.error("Error loading local blog posts:", err)
    return []
  }
}
