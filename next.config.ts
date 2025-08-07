import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/daya1fdka/**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "**", // allow all paths
      },
    ]
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@": path.resolve(__dirname, "src"),
    }
  }
};

export default nextConfig;
