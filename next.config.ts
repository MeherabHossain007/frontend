// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/**`)],
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "."),
    };
    return config;
  },
};

export default nextConfig;
