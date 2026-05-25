import { IMAGEKIT_PATHS } from "@/lib/imagekit"

/**
 * Central project registry — edit this file to add or update portfolio entries.
 *
 * Card fields (left grid): name, liveUrl, description, technologies, thumbnail
 * Detail fields (right grid bento): architectureDiagram, decisions, videoDemo
 *
 * Media paths are ImageKit library paths under `public/` (see lib/imagekit.ts).
 * Video demos use YouTube IDs in `detail.videoDemo`.
 * Requires NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT in .env.
 */

export interface ProjectDecision {
  /** e.g. "LocalStorage vs. remote database" */
  title: string
  chose: string
  sacrificed: string
  rationale: string
}

export interface ProjectMedia {
  /** ImageKit library path (e.g. `public/projects/animap.png`) */
  src: string
  alt: string
  /** Set for video demos; omit for images/diagrams */
  type?: "image" | "video"
}

export interface ProjectVideoDemo {
  /** YouTube video ID (privacy-enhanced embed, no visible player chrome) */
  youtubeId: string
  alt: string
}

export interface Project {
  id: string
  name: string
  liveUrl: string
  githubUrl: string
  description: string
  technologies: string[]
  thumbnail: ProjectMedia
  detail: {
    architectureDiagram: ProjectMedia
    decisions: ProjectDecision[]
    videoDemo: ProjectVideoDemo
  }
}

export const projects: Project[] = [
  {
    id: "animap",
    name: "AniMap",
    liveUrl: "https://animap.aryamn.space",
    githubUrl: "https://github.com/ArDnath/AniMap",
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
      src: IMAGEKIT_PATHS.projects.animap,
      alt: "AniMap preview",
    },
    detail: {
      architectureDiagram: {
        src: IMAGEKIT_PATHS.architecture.animap,
        alt: "AniMap system architecture diagram",
      },
      decisions: [
        {
          title: "LocalStorage vs. remote database",
          chose: "Watch history, favorites, and continue-watching in localStorage via Zustand—no auth, no backend DB.",
          sacrificed: "Cross-device sync; history stays on one browser.",
          rationale:
            "$0 backend, no PII on servers, no GDPR surface. Users own their data locally—acceptable for a personal streaming frontend.",
        },
        {
          title: "Server Components vs. full client app",
          chose: "App Router with Server Components by default; interactive UI in small \"use client\" islands.",
          sacrificed: "Simpler mental model—constant server vs. client boundary decisions.",
          rationale:
            "~50% smaller client JS bundle, faster TTI, and dynamic SEO metadata without extra tooling.",
        },
        {
          title: "Local fuzzy search vs. API-native search",
          chose: "Fetch a bounded pool (~50) from AniList, rank locally with Fuse.js across EN / Romaji / native titles.",
          sacrificed: "Extra CPU and memory vs. delegating search entirely to the API.",
          rationale:
            "AniList search fails on minor typos; local fuzzy matching dramatically improved find rate in testing.",
        },
        {
          title: "Turborepo monorepo vs. single repo",
          chose: "pnpm workspaces: apps/web + packages/api + packages/ui with Turborepo build cache.",
          sacrificed: "Steeper onboarding and strict package boundaries for contributors.",
          rationale:
            "@anitube/api is reusable for a future mobile app; CI build time dropped ~70% via caching.",
        },
        {
          title: "Direct API calls vs. BFF + Redis",
          chose: "Next.js and client hit AniList/Jikan directly; React Query (60s stale) + PWA CacheFirst.",
          sacrificed: "Central rate-limit control and a shared Redis cache for all users.",
          rationale:
            "Zero backend cost and one deploy target. At 10K+ users I'd add an Upstash BFF—not justified yet.",
        },
      ],
      videoDemo: {
        youtubeId: "JczuByIPFTY",
        alt: "AniMap product demo",
      },
    },
  },
  {
    id: "tubebrief",
    name: "TubeBrief",
    liveUrl: "https://tubebrief.aryamn.space",
    githubUrl: "https://github.com/ArDnath/TubeBrief",
    description:
      "YouTube video summarizer that turns long-form content into concise, skimmable briefs with key takeaways.",
    technologies: ["nextjs", "tailwindcss", "bun", "cloudflare", "hono"],
    thumbnail: {
      src: IMAGEKIT_PATHS.projects.tubebrief,
      alt: "TubeBrief preview",
    },
    detail: {
      architectureDiagram: {
        src: IMAGEKIT_PATHS.architecture.tubebrief,
        alt: "TubeBrief system architecture diagram",
      },
      decisions: [
        {
          title: "Cloudflare Workers vs. Next.js API routes",
          chose: "YouTube transcript fetch + LLM summarization on a Cloudflare Worker; Next.js on Vercel for UI.",
          sacrificed: "Single-platform simplicity—CORS, split logs, cross-network debugging.",
          rationale:
            "Vercel hobby functions cap at ~10–15s; transcript + LLM often exceeds that. Workers handle long streaming at the edge.",
        },
        {
          title: "Client streaming vs. SSR summaries",
          chose: "ReadableStream via fetch + getReader() in a client boundary; chunks rendered as they arrive.",
          sacrificed: "SSR/SEO for summary pages—content is user-specific and behind a form.",
          rationale:
            "Bots won't index generated briefs. Client streaming powers a live typewriter UX instead of a 5–10s blank wait.",
        },
        {
          title: "requestAnimationFrame vs. Framer Motion",
          chose: "Custom rAF loop for per-character typewriter timing in summary-display.",
          sacrificed: "Declarative animation APIs and faster initial implementation.",
          rationale:
            "rAF syncs to the paint cycle (smooth 60fps), fine-grained speed control, and ~20KB less JS than Framer Motion.",
        },
        {
          title: "TextDecoder({ stream: true }) vs. .text()",
          chose: "Incremental UTF-8 decode on each network chunk with stream: true buffering.",
          sacrificed: "One-liner .text() / .json() convenience.",
          rationale:
            "Multi-byte characters (emoji, CJK) split across chunks won't garble—naive decoding breaks on fragmented streams.",
        },
        {
          title: "Local React state vs. global store",
          chose: "summary / loading / error in page-level useState; one level of props to UrlInput + SummaryDisplay.",
          sacrificed: "Easy reuse if multiple summary routes or history views are added later.",
          rationale:
            "State is scoped to input→display. Zustand/Redux would add indirection with no current benefit.",
        },
      ],
      videoDemo: {
        youtubeId: "mZ8uS1Q7rsk",
        alt: "TubeBrief product demo",
      },
    },
  },
  {
    id: "cashlatics",
    name: "Cashlatics",
    liveUrl: "https://cashlatics.aryamn.space",
    githubUrl: "https://github.com/ArDnath/cashlatics",
    description:
      "Personal finance tracker with dashboards, category insights, and secure multi-account aggregation.",
    technologies: [
      "typescript",
      "nextjs",
      "tailwindcss",
      "postgresql",
      "drizzle",
      "zod",
      "shadcn",
      "neon",
      "better-auth",
    ],
    thumbnail: {
      src: IMAGEKIT_PATHS.projects.cashlatics,
      alt: "Cashlatics preview",
    },
    detail: {
      architectureDiagram: {
        src: IMAGEKIT_PATHS.architecture.cashlatics,
        alt: "Cashlatics system architecture diagram",
      },
      decisions: [
        {
          title: "Server Actions vs. REST APIs",
          chose: "Mutations as Server Actions (server/user.ts)—typed RPC from the client, no hand-written fetch layer.",
          sacrificed: "Platform-agnostic APIs reusable from React Native without route handlers.",
          rationale:
            "~40% less mutation boilerplate for a web-only FinTech app; app/api routes can be exposed later if needed.",
        },
        {
          title: "Drizzle + Neon vs. Prisma + RDS",
          chose: "Drizzle ORM on Neon serverless Postgres with HTTP/WebSocket connection proxying.",
          sacrificed: "Prisma-style nested includes and the simplest relational ergonomics.",
          rationale:
            "TCP pooling breaks at serverless scale; Neon handles thousands of concurrent functions. Drizzle stays explicit and edge-friendly.",
        },
        {
          title: "BroadcastChannel vs. storage events",
          chose: "useSessionState hook broadcasts login/logout across tabs via BroadcastChannel.",
          sacrificed: "Familiar localStorage 'storage' event pattern for cross-tab sync.",
          rationale:
            "HTTP-only session cookies don't fire storage events—BroadcastChannel gives instant multi-tab sync without extra server pings.",
        },
        {
          title: "shadcn/ui vs. MUI / Chakra",
          chose: "Owned components under components/ui—Radix primitives, Tailwind, full source control.",
          sacrificed: "Fastest day-one UI velocity from a batteries-included component library.",
          rationale:
            "FinTech UX needs custom motion and brutalist styling without fighting opinionated CSS or bundle bloat.",
        },
        {
          title: "React 19 + Next 16 vs. stable LTS",
          chose: "Turbopack dev, useActionState for forms, Neon DB branching per PR.",
          sacrificed: "Occasional ecosystem gaps and RSC-incompatible libraries.",
          rationale:
            "~80% faster HMR and simpler Server Action flows; branching makes bleeding-edge changes safe to experiment.",
        },
        {
          title: "Arcjet edge rate limiting",
          chose: "@arcjet/next in middleware for bot detection and rate limits before app code runs.",
          sacrificed: "Extra vendor dependency and middleware complexity.",
          rationale:
            "Abuse is blocked at the edge—not after hitting Postgres. Security treated as a first-class requirement, not an afterthought.",
        },
      ],
      videoDemo: {
        youtubeId: "Xw0_Ex3Uc8E",
        alt: "Cashlatics product demo",
      },
    },
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
