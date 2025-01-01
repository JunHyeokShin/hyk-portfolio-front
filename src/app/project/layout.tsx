import styles from "./layout.module.css";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>{children}</main>
    </div>
  );
}
