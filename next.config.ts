import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  /* config options here */
  typescript: {
    // Enable TypeScript checking for better code quality
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
