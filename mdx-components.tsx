import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/components/blogs/code-block"
import Link from "next/link"

/**
 * Required by @next/mdx for App Router.
 * Maps markdown/MDX element names to custom React components.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="font-bold tracking-wider text-black dark:text-white text-xl mt-10 mb-4 pb-2 border-b border-dashed border-gray-200 dark:border-zinc-800">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-bold tracking-wider text-black dark:text-white text-[15px] mt-8 mb-3 pb-1.5 border-b border-dashed border-gray-100 dark:border-zinc-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold tracking-wider text-black dark:text-white text-[13px] mt-6 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-bold text-black dark:text-white text-[12px] mt-4 mb-1">
        {children}
      </h4>
    ),

    // Paragraph
    p: ({ children }) => (
      <p className="my-4 text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </p>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="border-dashed border-gray-200 dark:border-zinc-800 my-8" />
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-emerald-500 dark:border-emerald-400 bg-gray-50 dark:bg-zinc-950/50 pl-4 pr-3 py-3 my-5 rounded-r-sm text-[12px] sm:text-[13px] text-gray-600 dark:text-zinc-400 italic">
        {children}
      </blockquote>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="my-4 flex flex-col gap-1.5 pl-1 list-none">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 flex flex-col gap-1.5 pl-1 list-none">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2.5 text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
        <span className="text-emerald-500 dark:text-emerald-400 select-none mt-[1px] font-bold shrink-0">
          —
        </span>
        <span className="flex-1">{children}</span>
      </li>
    ),

    // Inline code
    code: ({ children, className }) => {
      // Block code (inside pre) has a className like "language-bash"
      const lang = /language-(\w+)/.exec(className ?? "")?.[1]
      if (lang) {
        return (
          <CodeBlock language={lang} code={String(children).replace(/\n$/, "")} />
        )
      }
      // Inline code
      return (
        <code className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-medium">
          {children}
        </code>
      )
    },
    // Remove the <pre> wrapper — CodeBlock handles its own container
    pre: ({ children }) => <>{children}</>,

    // Table (GFM)
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-[11px] sm:text-[12px] font-mono border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-dashed border-gray-300 dark:border-zinc-700">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="text-left px-3 py-2 text-[10px] tracking-widest uppercase text-gray-500 dark:text-zinc-400 font-semibold">
        {children}
      </th>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-dashed border-gray-100 dark:border-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-950/40 transition-colors">
        {children}
      </tr>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 text-gray-700 dark:text-gray-300 align-top">
        {children}
      </td>
    ),

    // Links
    a: ({ href, children }) => {
      if (!href) return <>{children}</>
      const external = href.startsWith("http")
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 underline decoration-dashed underline-offset-2 hover:text-black dark:hover:text-white transition-colors duration-150"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-emerald-600 dark:text-emerald-400 underline decoration-dashed underline-offset-2 hover:text-black dark:hover:text-white transition-colors duration-150"
        >
          {children}
        </Link>
      )
    },

    // Strong / em
    strong: ({ children }) => (
      <strong className="font-bold text-black dark:text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-600 dark:text-gray-300">{children}</em>
    ),

    // Pass through any other components
    ...components,
  }
}
