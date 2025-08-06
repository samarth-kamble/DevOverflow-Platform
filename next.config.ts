import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },
  // Add these for debugging production issues
  experimental: {
    // Better error reporting
    serverComponentsExternalPackages: ["mongoose", "mongodb"],
  },

  // Enable detailed logging in development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
