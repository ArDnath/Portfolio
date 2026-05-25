import type { IconType } from "react-icons"
import {
  SiBun,
  SiCloudflare,
  SiDocker,
  SiDrizzle,
  SiGraphql,
  SiHono,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si"

export interface TechDefinition {
  label: string
  Icon?: IconType
  /** Used when no Simple Icon exists (e.g. Playwright, Neon) */
  initials?: string
  /** Brand tint */
  colorClass: string
}

const TECH: Record<string, TechDefinition> = {
  react: {
    label: "React",
    Icon: SiReact,
    colorClass: "text-[#61DAFB]",
  },
  nextjs: {
    label: "Next.js",
    Icon: SiNextdotjs,
    colorClass: "text-foreground",
  },
  tailwindcss: {
    label: "Tailwind",
    Icon: SiTailwindcss,
    colorClass: "text-[#38BDF8]",
  },
  graphql: {
    label: "GraphQL",
    Icon: SiGraphql,
    colorClass: "text-[#E10098]",
  },
  playwright: {
    label: "Playwright",
    initials: "PW",
    colorClass: "text-[#2EAD33]",
  },
  docker: {
    label: "Docker",
    Icon: SiDocker,
    colorClass: "text-[#2496ED]",
  },
  bun: {
    label: "Bun",
    Icon: SiBun,
    colorClass: "text-[#FBF0DF] dark:text-[#F9F1DD]",
  },
  cloudflare: {
    label: "Cloudflare",
    Icon: SiCloudflare,
    colorClass: "text-[#F38020]",
  },
  hono: {
    label: "Hono",
    Icon: SiHono,
    colorClass: "text-[#E36002]",
  },
  typescript: {
    label: "TypeScript",
    Icon: SiTypescript,
    colorClass: "text-[#3178C6]",
  },
  postgresql: {
    label: "Postgres",
    Icon: SiPostgresql,
    colorClass: "text-[#4169E1]",
  },
  drizzle: {
    label: "Drizzle",
    Icon: SiDrizzle,
    colorClass: "text-[#C5F74F] dark:text-[#C5F74F]",
  },
  zod: {
    label: "Zod",
    Icon: SiZod,
    colorClass: "text-[#3E67B1]",
  },
  shadcn: {
    label: "shadcn/ui",
    Icon: SiShadcnui,
    colorClass: "text-foreground",
  },
  neon: {
    label: "Neon",
    initials: "NE",
    colorClass: "text-[#00E599]",
  },
  betterauth: {
    label: "Better Auth",
    initials: "BA",
    colorClass: "text-foreground",
  },
}

const ALIASES: Record<string, string> = {
  next: "nextjs",
  tailwind: "tailwindcss",
  postgres: "postgresql",
  pg: "postgresql",
  ts: "typescript",
  shadcnui: "shadcn",
  betterauth: "betterauth",
}

export function normalizeTechSlug(raw: string): string {
  const key = raw.toLowerCase().replace(/[^a-z0-9]/g, "")
  return ALIASES[key] ?? key
}

export function resolveTech(raw: string): TechDefinition | null {
  const slug = normalizeTechSlug(raw)
  return TECH[slug] ?? null
}

export function formatTechLabel(raw: string): string {
  const tech = resolveTech(raw)
  if (tech) return tech.label
  return raw
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
