import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import type { ComponentProps } from "react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function Markdown({ source }: { source: string }) {
  return <MDXRemote source={source} options={options} components={components} onError={MarkdownError} />;
}

const options: MDXRemoteOptions = {
  mdxOptions: {
    format: "md",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

const components = { a: MarkdownLink };

function MarkdownLink({ href = "", ...props }: ComponentProps<"a">) {
  if (/^(#|mailto:|tel:)/.test(href)) {
    return <a href={href} {...props} />;
  }
  return <a href={href} target="_blank" {...props} />;
}

function MarkdownError({ error }: { error: Error }) {
  console.error(error);
  return <p role="alert">failed to render content</p>;
}
