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
  /** Muted default; brand tint on chip hover */
  hoverClass: string
}

const TECH: Record<string, TechDefinition> = {
  react: {
    label: "React",
    Icon: SiReact,
    hoverClass: "group-hover/chip:text-[#61DAFB]",
  },
  nextjs: {
    label: "Next.js",
    Icon: SiNextdotjs,
    hoverClass: "group-hover/chip:text-foreground",
  },
  tailwindcss: {
    label: "Tailwind",
    Icon: SiTailwindcss,
    hoverClass: "group-hover/chip:text-[#38BDF8]",
  },
  graphql: {
    label: "GraphQL",
    Icon: SiGraphql,
    hoverClass: "group-hover/chip:text-[#E10098]",
  },
  playwright: {
    label: "Playwright",
    initials: "PW",
    hoverClass: "group-hover/chip:text-[#2EAD33]",
  },
  docker: {
    label: "Docker",
    Icon: SiDocker,
    hoverClass: "group-hover/chip:text-[#2496ED]",
  },
  bun: {
    label: "Bun",
    Icon: SiBun,
    hoverClass: "group-hover/chip:text-[#FBF0DF] dark:group-hover/chip:text-[#F9F1DD]",
  },
  cloudflare: {
    label: "Cloudflare",
    Icon: SiCloudflare,
    hoverClass: "group-hover/chip:text-[#F38020]",
  },
  hono: {
    label: "Hono",
    Icon: SiHono,
    hoverClass: "group-hover/chip:text-[#E36002]",
  },
  typescript: {
    label: "TypeScript",
    Icon: SiTypescript,
    hoverClass: "group-hover/chip:text-[#3178C6]",
  },
  postgresql: {
    label: "Postgres",
    Icon: SiPostgresql,
    hoverClass: "group-hover/chip:text-[#4169E1]",
  },
  drizzle: {
    label: "Drizzle",
    Icon: SiDrizzle,
    hoverClass: "group-hover/chip:text-[#C5F74F] dark:group-hover/chip:text-[#C5F74F]",
  },
  zod: {
    label: "Zod",
    Icon: SiZod,
    hoverClass: "group-hover/chip:text-[#3E67B1]",
  },
  shadcn: {
    label: "shadcn/ui",
    Icon: SiShadcnui,
    hoverClass: "group-hover/chip:text-foreground",
  },
  neon: {
    label: "Neon",
    initials: "NE",
    hoverClass: "group-hover/chip:text-[#00E599]",
  },
  betterauth: {
    label: "Better Auth",
    initials: "BA",
    hoverClass: "group-hover/chip:text-foreground",
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
