import type { MDXComponents } from "mdx/types";
import styles from "./mdx-components.module.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <p className={styles["p"]}>{children}</p>,
    h1: ({ children }) => <h1 className={styles["h1"]}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles["h2"]}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles["h3"]}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles["h4"]}>{children}</h4>,
    h5: ({ children }) => <h5 className={styles["h5"]}>{children}</h5>,
    h6: ({ children }) => <h6 className={styles["h6"]}>{children}</h6>,
    ol: ({ children }) => <ol className={styles["ol"]}>{children}</ol>,
    ul: ({ children }) => <ul className={styles["ul"]}>{children}</ul>,
    li: ({ children }) => <li className={styles["li"]}>{children}</li>,
    hr: ({ children }) => <hr className={styles["hr"]}>{children}</hr>,
    pre: ({ children }) => <pre className={styles["pre"]}>{children}</pre>,
    code: ({ children }) => <code className={styles["code"]}>{children}</code>,
    img: (props) => <img className={styles["img"]} {...props} />,
    blockquote: ({ children }) => <blockquote className={styles["blockquote"]}>{children}</blockquote>,
    ...components,
  };
}
