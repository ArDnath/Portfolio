"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  // A simple but effective client-side syntax highlighter for code block display
  const highlightCode = (rawCode: string, lang: string) => {
    const cleanLang = lang.toLowerCase()
    
    // Escape HTML first to prevent injection
    let html = rawCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

    if (["bash", "sh", "zsh", "dockerfile", "ini", "lua", "typescript", "tsx", "javascript", "json"].includes(cleanLang)) {
      // 1. Highlight Comments
      html = html.replace(/(#.*|\/\/.*|--.*)/g, '<span class="text-zinc-500 font-mono italic">$1</span>')
      
      // 2. Highlight Strings
      html = html.replace(/(["'])(.*?)\1/g, '<span class="text-emerald-400 font-mono">$1$2$1</span>')
      
      // 3. Highlight Common Keywords
      const keywords = [
        "sudo", "pacman", "yay", "git", "clone", "install", "mkdir", "cd", "npm", "pnpm", "bun", "npx",
        "bind", "input", "general", "animations", "monitor",
        "return", "function", "local", "require", "import", "export", "const", "let", "from", "default", "as",
        "FROM", "WORKDIR", "COPY", "RUN", "ENV", "USER", "EXPOSE", "CMD", "AS",
      ]
      
      const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g")
      html = html.replace(keywordRegex, '<span class="text-violet-400 font-bold font-mono">$1</span>')

      // 4. Highlight numbers
      html = html.replace(/\b(\d+)\b/g, '<span class="text-amber-400 font-mono">$1</span>')
    }

    return <code className="block text-[11px] sm:text-[12px] font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <div className="my-5 border border-dashed border-gray-300 dark:border-zinc-800 rounded-md overflow-hidden bg-zinc-950 font-mono text-zinc-300 shadow-md">
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-dashed border-zinc-800 select-none">
        <div className="flex items-center gap-1.5">
          {/* macOS dots */}
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-[9px] uppercase tracking-wider font-semibold text-zinc-500">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-150 px-2 py-1 rounded bg-zinc-950/40 hover:bg-zinc-800 border border-zinc-800"
          title="Copy Code to Clipboard"
        >
          {copied ? (
            <>
              <Check size={10} className="text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy size={10} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <div className="p-4 overflow-x-auto no-scrollbar bg-black/60 select-text">
        <pre className="m-0 leading-relaxed">
          {highlightCode(code, language)}
        </pre>
      </div>
    </div>
  )
}
