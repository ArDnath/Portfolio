import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
  // Allow .md and .mdx files to be used as pages or imports
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ariyaman.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
}

const withMDX = createMDX({
  // Use require.resolve to bypass strict pnpm module resolution restrictions
  options: {
    remarkPlugins: [require.resolve("remark-gfm")],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
