import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  rewrites: async () => [
    {
      source: "/resources/:path*",
      destination: `${process.env.BACK_DOMAIN}/resources/:path*`,
    },
    {
      source: "/api/:path*",
      destination: `${process.env.BACK_DOMAIN}/api/:path*`,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
