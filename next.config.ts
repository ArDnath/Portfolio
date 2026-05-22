import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.aryamn.space',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig