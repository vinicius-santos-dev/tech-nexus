import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
  },
};

export default nextConfig;
