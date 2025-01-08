import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkTorchlight from "remark-torchlight";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      [
        remarkTorchlight,
        {
          config: {
            token: process.env.TORCHLIGHT_API_TOKEN,
            cache: "cache",
            theme: "github-dark",
            options: { diffIndicators: true },
          },
        },
      ],
    ],
    rehypePlugins: [rehypeSlug],
  },
});

export default withMDX(nextConfig);
