import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Commenté pour permettre les routes API
  // output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
