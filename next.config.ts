import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    nodeMiddleware: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
