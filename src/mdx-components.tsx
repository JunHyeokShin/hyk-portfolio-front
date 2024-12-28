import type { MDXComponents } from "mdx/types";
import styles from "./mdx-components.module.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
