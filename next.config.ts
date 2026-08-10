import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "**.prismic.io",
      },
      {
        protocol: "https",
        hostname: "prismic-io.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pub-2b91df05320148438318902a8dc7795b.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
  },
};

export default nextConfig;
