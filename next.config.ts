import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Set basePath for GitHub Pages (https://<owner>.github.io/mirasite)
// Can be overridden via NEXT_PUBLIC_BASE_PATH env var (e.g. NEXT_PUBLIC_BASE_PATH="" for custom domain)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/mirasite" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

