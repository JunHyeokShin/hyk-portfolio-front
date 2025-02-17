import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkTorchlight from "remark-torchlight";
import "./style.css";
import styles from "./style.module.css";

interface Props {
  content: string;
}

const components: MDXComponents = {
  p: (props) => (
    <p className={styles["p"]} {...props}>
      {props.children}
    </p>
  ),
  h1: (props) => (
    <h1 className={styles["h1"]} {...props}>
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 className={styles["h2"]} {...props}>
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 className={styles["h3"]} {...props}>
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 className={styles["h4"]} {...props}>
      {props.children}
    </h4>
  ),
  h5: (props) => (
    <h5 className={styles["h5"]} {...props}>
      {props.children}
    </h5>
  ),
  h6: (props) => (
    <h6 className={styles["h6"]} {...props}>
      {props.children}
    </h6>
  ),
  ol: (props) => (
    <ol className={styles["ol"]} {...props}>
      {props.children}
    </ol>
  ),
  ul: (props) => (
    <ul className={styles["ul"]} {...props}>
      {props.children}
    </ul>
  ),
  li: (props) => (
    <li className={styles["li"]} {...props}>
      {props.children}
    </li>
  ),
  hr: () => <hr className={styles["hr"]} />,
  pre: (props) => (
    <pre className={styles["pre"]} {...props}>
      {props.children}
    </pre>
  ),
  code: (props) => (
    <code className={styles["code"]} {...props}>
      {props.children}
    </code>
  ),
  img: (props) => <img className={styles["img"]} {...props} />,
  blockquote: (props) => (
    <blockquote className={styles["blockquote"]} {...props}>
      {props.children}
    </blockquote>
  ),
};

export default function MDX({ content }: Props) {
  return (
    <main className="mdx-container">
      <MDXRemote
        source={content}
        components={{ ...components }}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              [
                remarkTorchlight,
                { config: { token: process.env.TORCHLIGHT_API_TOKEN, cache: "cache", theme: "github-dark", options: { diffIndicators: true } } },
              ],
            ],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </main>
  );
}
