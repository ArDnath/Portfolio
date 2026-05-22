import React from "react"
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiHtml5, SiCss,
  SiPostgresql, SiMongodb, SiMysql, SiPython,
  SiDocker, SiGit, SiGithub, SiGraphql,
  SiPrisma, SiSupabase, SiRedis,
  SiFramer, SiVitest, SiJest,
  SiDrizzle, SiHono, SiTestinglibrary,
  SiVercel, SiZod, SiBun, SiPnpm,
  SiTurborepo, SiGooglegemini, SiResend,
  SiShadcnui, SiRadixui,
} from "react-icons/si"

const simpleIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  react: SiReact, reactjs: SiReact,
  typescript: SiTypescript, ts: SiTypescript,
  javascript: SiJavascript, js: SiJavascript,
  nextjs: SiNextdotjs, next: SiNextdotjs,
  tailwind: SiTailwindcss, tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs, node: SiNodedotjs,
  html: SiHtml5, html5: SiHtml5,
  css: SiCss, css3: SiCss,
  postgresql: SiPostgresql, postgres: SiPostgresql, pg: SiPostgresql,
  mongodb: SiMongodb, mongo: SiMongodb,
  mysql: SiMysql,
  python: SiPython, py: SiPython,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  graphql: SiGraphql,
  prisma: SiPrisma,
  supabase: SiSupabase,
  redis: SiRedis,
  framer: SiFramer, framermotion: SiFramer,
  vitest: SiVitest,
  jest: SiJest,
  drizzle: SiDrizzle,
  hono: SiHono,
  testinglibrary: SiTestinglibrary,
  vercel: SiVercel,
  zod: SiZod,
  bun: SiBun,
  pnpm: SiPnpm,
  turborepo: SiTurborepo,
  googlegemini: SiGooglegemini, gemini: SiGooglegemini, googleai: SiGooglegemini,
  resend: SiResend,
  shadcn: SiShadcnui, shadcnui: SiShadcnui,
  radix: SiRadixui, radixui: SiRadixui,
}

interface TechIconProps {
  name: string
  size?: number
  className?: string
}

export function TechIcon({ name, size = 20, className = "" }: TechIconProps) {
  const normName = name.toLowerCase().replace(/[^a-z0-9]/g, "")

  // --- Devicon first ---
  let deviconClass = ""

  switch (normName) {
    case "react": case "reactjs": deviconClass = "devicon-react-original colored"; break
    case "typescript": case "ts": deviconClass = "devicon-typescript-plain colored"; break
    case "javascript": case "js": deviconClass = "devicon-javascript-plain colored"; break
    case "nextjs": case "next": deviconClass = "devicon-nextjs-plain colored"; break
    case "tailwind": case "tailwindcss": deviconClass = "devicon-tailwindcss-original colored"; break
    case "nodejs": case "node": deviconClass = "devicon-nodejs-plain colored"; break
    case "html": case "html5": deviconClass = "devicon-html5-plain colored"; break
    case "css": case "css3": deviconClass = "devicon-css3-plain colored"; break
    case "postgresql": case "postgres": case "pg": deviconClass = "devicon-postgresql-plain colored"; break
    case "mongodb": case "mongo": deviconClass = "devicon-mongodb-plain colored"; break
    case "mysql": deviconClass = "devicon-mysql-plain colored"; break
    case "python": case "py": deviconClass = "devicon-python-plain colored"; break
    case "docker": deviconClass = "devicon-docker-plain colored"; break
    case "git": deviconClass = "devicon-git-plain colored"; break
    case "github": deviconClass = "devicon-github-original colored"; break
    case "graphql": deviconClass = "devicon-graphql-plain colored"; break
    case "prisma": deviconClass = "devicon-prisma-original colored"; break
    case "supabase": deviconClass = "devicon-supabase-plain colored"; break
    case "redis": deviconClass = "devicon-redis-plain colored"; break
    case "framermotion": case "framer": deviconClass = "devicon-framer-original colored"; break
    case "vitest": deviconClass = "devicon-vitest-plain colored"; break
    case "jest": deviconClass = "devicon-jest-plain colored"; break
    default: deviconClass = `devicon-${normName}-plain colored`; break
  }

  if (deviconClass && !deviconClass.startsWith("devicon--")) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} title={name}>
        <i className={deviconClass} style={{ fontSize: size }} />
      </span>
    )
  }

  // --- Simple Icons fallback ---
  const SimpleIcon = simpleIconMap[normName]
  if (SimpleIcon) {
    return <SimpleIcon size={size} className={className} />
  }

  // --- Text badge ultimate fallback ---
  return (
    <span
      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-600 ${className}`}
      title={name}
    >
      {name}
    </span>
  )
}