export interface ProjectConfig {
  name: string
  repoUrl: string
  liveUrl: string
  fallbackImage: string
  fallbackTopics: string[]
}

export const projects: ProjectConfig[] = [
  {
    name: "AniMap",
    repoUrl: "https://github.com/ArDnath/AniMap",
    liveUrl: "https://animap.aryamn.space",
    fallbackImage: "/animap.png",
    fallbackTopics: ["react", "nextjs", "tailwindcss", "graphql", "playwright", "docker"],
  },
  {
    name: "TubeBrief",
    repoUrl: "https://github.com/ArDnath/TubeBrief",
    liveUrl: "https://tubebrief.aryamn.space",
    fallbackImage: "/anitube.png",
    fallbackTopics: ["nextjs", "tailwindcss", "bun", "cloudflare"],
  },
  {
    name: "Cashlatics",
    repoUrl: "https://github.com/ArDnath/Cashlatics",
    liveUrl: "https://cashlatics.aryamn.space",
    fallbackImage: "/cashlatics.png",
    fallbackTopics: ["react", "typescript", "nextjs", "tailwindcss", "postgresql", "prisma", "supabase"],
  },
]