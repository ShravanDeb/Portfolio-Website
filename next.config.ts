import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },
  serverExternalPackages: ["puppeteer"],
};

export default nextConfig;
