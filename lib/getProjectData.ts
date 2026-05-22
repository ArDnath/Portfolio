export interface ProjectData {
  name: string
  repoUrl: string
  liveUrl: string
  description: string
  language: string
  stars: number
  forks: number
  pushedAt: string
  imageUrl: string
  fallbackTopics: string[]
}

export interface ProjectConfig {
  name: string
  repoUrl: string
  liveUrl: string
  fallbackImage: string
  fallbackTopics: string[]
}

function parseRepoUrl(url: string) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (!match) throw new Error("Invalid GitHub URL")
  return { owner: match[1], repo: match[2] }
}

async function getOgImage(url: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 86400 },
    })

    if (!res.ok) throw new Error("Failed to fetch")

    const html = await res.text()

    const ogMatch =
      html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i
      )

    if (ogMatch?.[1]) {
      return ogMatch[1].startsWith("http")
        ? ogMatch[1]
        : new URL(ogMatch[1], url).href
    }
  } catch {
    // fallback
  }

  return fallback
}

export async function getProjectData(config: ProjectConfig): Promise<ProjectData> {
  const { owner, repo } = parseRepoUrl(config.repoUrl)

  const [repoRes, imageUrl] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 },
    }),
    getOgImage(config.liveUrl, config.fallbackImage),
  ])

  if (!repoRes.ok) {
    throw new Error(`GitHub API error for ${config.name}`)
  }

  const repoData = await repoRes.json()

  return {
    name: config.name,
    repoUrl: config.repoUrl,
    liveUrl: config.liveUrl,
    description: repoData.description || "",
    language: repoData.language || "Unknown",
    stars: repoData.stargazers_count || 0,
    forks: repoData.forks_count || 0,
    pushedAt: repoData.pushed_at || "",
    imageUrl,
    fallbackTopics: config.fallbackTopics,
  }
}