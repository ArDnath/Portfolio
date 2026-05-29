export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
  imageUrl: string
  url: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/
  const match = fileContent.match(frontmatterRegex)
  
  const metadata: Record<string, string> = {}
  let content = fileContent
  
  if (match) {
    const rawFrontmatter = match[1]
    content = fileContent.replace(match[0], "").trim()
    
    const lines = rawFrontmatter.split("\n")
    for (const line of lines) {
      const parts = line.split(":")
      if (parts.length >= 2) {
        const key = parts[0].trim()
        const value = parts.slice(1).join(":").trim()
        metadata[key] = value.replace(/^["']|["']$/g, "")
      }
    }
  }
  
  return { metadata, content }
}

export async function getLocalBlogs(): Promise<BlogPost[]> {
  // Use require for server-only modules so that Next.js bundler does not include them in the client bundle
  const fs = require("fs")
  const path = require("path")
  
  const blogsDirectory = path.join(process.cwd(), "content/blogs")
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }
  
  const filenames = fs.readdirSync(blogsDirectory)
  const posts = filenames
    .filter((filename: string) => filename.endsWith(".mdx") || filename.endsWith(".md"))
    .map((filename: string) => {
      const slug = filename.replace(/\.mdx?$/, "")
      const filePath = path.join(blogsDirectory, filename)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      
      const { metadata, content } = parseFrontmatter(fileContent)
      
      let tags: string[] = []
      if (metadata.tags) {
        const cleaned = metadata.tags.replace(/[\[\]]/g, "")
        tags = cleaned.split(",").map((t: string) => t.trim().replace(/^["']|["']$/g, ""))
      }
      
      return {
        slug,
        title: metadata.title || "Untitled",
        description: metadata.description || "",
        date: metadata.date || "",
        tags,
        content,
        imageUrl: metadata.imageUrl || "",
        url: `/blogs/${slug}`
      }
    })
    
  return posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getLocalBlogs()
  return posts.find((p) => p.slug === slug)
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    return await getLocalBlogs()
  } catch (error) {
    console.error("Error loading local blog posts:", error)
    return []
  }
}

export const BLOGS_BASE_URL = ""
