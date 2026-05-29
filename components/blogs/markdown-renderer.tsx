import React from "react"
import Link from "next/link"
import { CodeBlock } from "@/components/blogs/code-block"
import { ImageKitImage } from "@/components/media/imagekit-image"

interface BlogImageProps {
  src: string
  alt: string
}

function BlogImage({ src, alt }: BlogImageProps) {
  // If it's an ImageKit image (either a full ImageKit URL or a relative path from drive)
  const isImageKit = src.includes("ik.imagekit.io") || (!src.startsWith("http") && !src.startsWith("/"))

  return (
    <figure className="my-6 flex flex-col items-center gap-2 select-none">
      <div className="w-full overflow-hidden border border-dashed border-gray-300 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950/20 rounded-md p-1.5">
        {isImageKit ? (
          <ImageKitImage
            src={src}
            alt={alt}
            width={800}
            height={500}
            className="w-full h-auto object-cover rounded-sm hover:scale-[1.01] transition-transform duration-300"
            transform={{ width: 800, quality: 80, format: "auto" }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover rounded-sm hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        )}
      </div>
      {alt ? (
        <figcaption className="text-[10px] sm:text-[11px] tracking-widest text-gray-400 dark:text-zinc-500 uppercase text-center mt-1">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  )
}

interface MarkdownRendererProps {
  content: string
}

function renderInlineStyles(text: string): React.ReactNode[] | string {
  const tokens: React.ReactNode[] = []
  
  // Regexes
  const boldRegex = /\*\*([^*]+)\*\*/g
  const italicRegex = /\*([^*]+)\*/g
  const codeRegex = /`([^`]+)`/g
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  
  interface Match {
    start: number
    end: number
    type: "bold" | "italic" | "code" | "link"
    content: string
    url?: string
  }
  
  const matches: Match[] = []
  
  // Find bold matches
  let m
  while ((m = boldRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, type: "bold", content: m[1] })
  }
  // Find italic matches
  italicRegex.lastIndex = 0
  while ((m = italicRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, type: "italic", content: m[1] })
  }
  // Find code matches
  codeRegex.lastIndex = 0
  while ((m = codeRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, type: "code", content: m[1] })
  }
  // Find link matches
  linkRegex.lastIndex = 0
  while ((m = linkRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, type: "link", content: m[1], url: m[2] })
  }
  
  // Sort matches by start index
  matches.sort((a, b) => a.start - b.start)
  
  // Filter out overlapping matches
  const nonOverlappingMatches: Match[] = []
  let lastEnd = 0
  for (const match of matches) {
    if (match.start >= lastEnd) {
      nonOverlappingMatches.push(match)
      lastEnd = match.end
    }
  }
  
  let lastIdx = 0
  nonOverlappingMatches.forEach((match, i) => {
    // Add text before match
    if (match.start > lastIdx) {
      tokens.push(text.substring(lastIdx, match.start))
    }
    
    // Add matched styled element
    if (match.type === "bold") {
      tokens.push(<strong key={`b-${i}`} className="font-bold text-black dark:text-white">{match.content}</strong>)
    } else if (match.type === "italic") {
      tokens.push(<em key={`i-${i}`} className="italic">{match.content}</em>)
    } else if (match.type === "code") {
      tokens.push(
        <code key={`c-${i}`} className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 text-amber-600 dark:text-amber-400 font-mono text-[10.5px] sm:text-[11px] font-medium">
          {match.content}
        </code>
      )
    } else if (match.type === "link") {
      const isExternal = match.url?.startsWith("http")
      if (isExternal) {
        tokens.push(
          <a key={`l-${i}`} href={match.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 underline decoration-dashed hover:text-black dark:hover:text-white transition-colors duration-150">
            {match.content}
          </a>
        )
      } else {
        tokens.push(
          <Link key={`l-${i}`} href={match.url || "#"} className="text-emerald-600 dark:text-emerald-400 underline decoration-dashed hover:text-black dark:hover:text-white transition-colors duration-150">
            {match.content}
          </Link>
        )
      }
    }
    
    lastIdx = match.end
  })
  
  if (lastIdx < text.length) {
    tokens.push(text.substring(lastIdx))
  }
  
  return tokens.length > 0 ? tokens : text
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n")
  const blocks: React.ReactNode[] = []
  
  let inCodeBlock = false
  let codeBlockLang = ""
  let codeBlockLines: string[] = []
  
  let currentListItems: string[] = []
  let currentListType: "ul" | "ol" | null = null
  
  const flushList = (key: number) => {
    if (!currentListType) return null
    
    const items = currentListItems.map((item, idx) => {
      return (
        <li key={idx} className="mb-2 leading-relaxed text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300 flex items-start">
          <span className="text-emerald-500 dark:text-emerald-400 mr-2.5 select-none font-bold">
            {currentListType === "ul" ? "•" : `${idx + 1}.`}
          </span>
          <span className="flex-1">{renderInlineStyles(item)}</span>
        </li>
      )
    })
    
    const listComponent = currentListType === "ul" ? (
      <ul key={`list-${key}`} className="my-4 pl-2 list-none">
        {items}
      </ul>
    ) : (
      <ol key={`list-${key}`} className="my-4 pl-2 list-none">
        {items}
      </ol>
    )
    
    currentListItems = []
    currentListType = null
    return listComponent
  }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Standalone Markdown Image Block: ![alt](url)
    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      if (currentListType) {
        const flushed = flushList(i)
        if (flushed) blocks.push(flushed)
      }
      blocks.push(
        <BlogImage key={`img-${i}`} src={imgMatch[2]} alt={imgMatch[1]} />
      )
      continue
    }
    
    // Code block toggle
    if (line.trim().startsWith("```")) {
      // First flush list if inside list
      if (currentListType) {
        const flushed = flushList(i)
        if (flushed) blocks.push(flushed)
      }

      if (inCodeBlock) {
        const codeText = codeBlockLines.join("\n")
        blocks.push(
          <CodeBlock 
            key={`code-${i}`} 
            language={codeBlockLang} 
            code={codeText} 
          />
        )
        inCodeBlock = false
        codeBlockLines = []
        codeBlockLang = ""
      } else {
        inCodeBlock = true
        codeBlockLang = line.trim().substring(3).trim()
      }
      continue
    }
    
    if (inCodeBlock) {
      codeBlockLines.push(line)
      continue
    }
    
    // Lists parsing
    const ulMatch = line.match(/^(\s*)[-*]\s+(.*)$/)
    const olMatch = line.match(/^(\s*)\d+\.\s+(.*)$/)
    
    if (ulMatch) {
      if (currentListType === "ol") {
        const flushed = flushList(i)
        if (flushed) blocks.push(flushed)
      }
      currentListType = "ul"
      currentListItems.push(ulMatch[2])
      continue
    } else if (olMatch) {
      if (currentListType === "ul") {
        const flushed = flushList(i)
        if (flushed) blocks.push(flushed)
      }
      currentListType = "ol"
      currentListItems.push(olMatch[2])
      continue
    } else if (line.trim() === "" || (!line.match(/^(\s*)[-*]\s+/) && !line.match(/^(\s*)\d+\.\s+/))) {
      if (currentListType) {
        const flushed = flushList(i)
        if (flushed) blocks.push(flushed)
      }
    }
    
    if (line.trim() === "") {
      continue
    }
    
    // Headings
    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={i} className="text-lg sm:text-xl font-extrabold tracking-widest uppercase text-black dark:text-white mt-8 mb-4 border-b border-dashed border-gray-300 dark:border-zinc-800 pb-2">
          {line.substring(2)}
        </h1>
      )
      continue
    }
    
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="text-[14px] sm:text-[15px] font-bold tracking-widest uppercase text-black dark:text-white mt-8 mb-4 border-b border-dashed border-gray-200 dark:border-zinc-900 pb-1.5">
          {line.substring(3)}
        </h2>
      )
      continue
    }
    
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="text-[12px] sm:text-[13px] font-bold tracking-widest uppercase text-black dark:text-white mt-6 mb-3">
          {line.substring(4)}
        </h3>
      )
      continue
    }
    
    // Blockquote
    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={i} className="border-l-2 border-emerald-500 dark:border-emerald-400 bg-gray-50 dark:bg-zinc-950/40 pl-4 py-3 my-4 text-[12px] sm:text-[13px] text-gray-500 dark:text-zinc-400 font-mono italic">
          {renderInlineStyles(line.substring(2))}
        </blockquote>
      )
      continue
    }
    
    // Horizontal Rule
    if (line.trim() === "---") {
      blocks.push(
        <hr key={i} className="border-dashed border-gray-200 dark:border-zinc-900 my-8" />
      )
      continue
    }
    
    // Regular Paragraph
    blocks.push(
      <p key={i} className="my-4 leading-relaxed text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300">
        {renderInlineStyles(line)}
      </p>
    )
  }
  
  // Flush any remaining lists
  if (currentListType) {
    const flushed = flushList(lines.length)
    if (flushed) blocks.push(flushed)
  }
  
  return <div className="markdown-body select-text">{blocks}</div>
}
