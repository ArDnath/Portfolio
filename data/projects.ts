/**
 * Central project registry — edit this file to add or update portfolio entries.
 *
 * Card fields (left grid): name, liveUrl, description, technologies, thumbnail
 * Detail fields (right grid bento): architectureDiagram, decisions, videoDemo
 *
 * ImageKit paths are relative to your ImageKit media library root
 * (e.g. `portfolio/animap/architecture.png`). Local paths like `/animap.png`
 * work when NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set.
 */

export interface ProjectDecision {
  title: string
  body: string
}

export interface ProjectMedia {
  /** ImageKit path, absolute URL, or local public path (e.g. `/animap.png`) */
  src: string
  alt: string
  /** Set for video demos; omit for images/diagrams */
  type?: "image" | "video"
}

export interface Project {
  id: string
  name: string
  liveUrl: string
  description: string
  technologies: string[]
  thumbnail: ProjectMedia
  detail: {
    architectureDiagram: ProjectMedia
    decisions: ProjectDecision[]
    videoDemo: ProjectMedia
  }
}

export const projects: Project[] = [
  {
    id: "animap",
    name: "AniMap",
    liveUrl: "https://animap.aryamn.space",
    description:
      "Anime discovery platform with map-based browsing, rich metadata, and fast search across titles and studios.",
    technologies: [
      "react",
      "nextjs",
      "tailwindcss",
      "graphql",
      "playwright",
      "docker",
    ],
    thumbnail: {
      src: "/projects/animap.png",
      alt: "AniMap preview",
    },
    detail: {
      architectureDiagram: {
        src: "portfolio/animap/architecture.png",
        alt: "AniMap system architecture diagram",
      },
      decisions: [
        {
          title: "GraphQL over REST",
          body: "Nested anime ↔ studio ↔ genre queries map cleanly to the UI and reduce over-fetching on list views.",
        },
        {
          title: "Edge-friendly caching",
          body: "Static map tiles and popular title metadata are cached at the CDN layer to keep pan/zoom interactions snappy.",
        },
        {
          title: "Playwright in CI",
          body: "Critical map and search flows are covered end-to-end so regressions in geo rendering are caught before deploy.",
        },
      ],
      videoDemo: {
        src: "portfolio/animap/demo.mp4",
        alt: "AniMap product demo",
        type: "video",
      },
    },
  },
  {
    id: "tubebrief",
    name: "TubeBrief",
    liveUrl: "https://tubebrief.aryamn.space",
    description:
      "YouTube video summarizer that turns long-form content into concise, skimmable briefs with key takeaways.",
    technologies: ["nextjs", "tailwindcss", "bun", "cloudflare"],
    thumbnail: {
      src: "/projects/tubebrief.png",
      alt: "TubeBrief preview",
    },
    detail: {
      architectureDiagram: {
        src: "portfolio/tubebrief/architecture.png",
        alt: "TubeBrief system architecture diagram",
      },
      decisions: [
        {
          title: "Bun runtime",
          body: "Faster cold starts and native TypeScript execution keep summarization workers lean on the edge.",
        },
        {
          title: "Cloudflare Workers",
          body: "Transcript fetch + LLM orchestration run close to users with minimal origin round-trips.",
        },
        {
          title: "Streaming summaries",
          body: "Token streaming to the client avoids blank states while long videos are processed.",
        },
      ],
      videoDemo: {
        src: "portfolio/tubebrief/demo.mp4",
        alt: "TubeBrief product demo",
        type: "video",
      },
    },
  },
  {
    id: "cashlatics",
    name: "Cashlatics",
    liveUrl: "https://cashlatics.aryamn.space",
    description:
      "Personal finance tracker with dashboards, category insights, and secure multi-account aggregation.",
    technologies: [
      "react",
      "typescript",
      "nextjs",
      "tailwindcss",
      "postgresql",
      "prisma",
      "supabase",
    ],
    thumbnail: {
      src: "/projects/cashlatics.png",
      alt: "Cashlatics preview",
    },
    detail: {
      architectureDiagram: {
        src: "portfolio/cashlatics/architecture.png",
        alt: "Cashlatics system architecture diagram",
      },
      decisions: [
        {
          title: "Prisma + Postgres",
          body: "Typed queries and migrations keep financial ledger models consistent as features grow.",
        },
        {
          title: "Supabase auth",
          body: "Delegated auth with row-level security policies so users only see their own transactions.",
        },
        {
          title: "Server Components for dashboards",
          body: "Aggregate queries run on the server; charts hydrate only where interaction is needed.",
        },
      ],
      videoDemo: {
        src: "portfolio/cashlatics/demo.mp4",
        alt: "Cashlatics product demo",
        type: "video",
      },
    },
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
