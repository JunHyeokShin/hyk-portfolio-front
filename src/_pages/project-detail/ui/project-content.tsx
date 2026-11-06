import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const options: MDXRemoteOptions = {
  mdxOptions: {
    format: "md",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

function ProjectContentError({ error }: { error: Error }) {
  console.error(error);
  return <p role="alert">failed to render content</p>;
}

export function ProjectContent({ source }: { source: string }) {
  return <MDXRemote source={source} options={options} onError={ProjectContentError} />;
}
