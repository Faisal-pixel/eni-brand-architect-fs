import type { NextConfig } from "next";

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
        hostname: "randomuser.me",
        pathname: "**", // allow all paths
      },
    ]
  }
};

export default nextConfig;
