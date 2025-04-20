// next.config.ts
import type { NextConfig } from "next";
import i18nConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  i18n: i18nConfig.i18n,
  images: {
    remotePatterns: [new URL('http://localhost:1337/**')],
  },
};

export default nextConfig;
