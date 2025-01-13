import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { projectListMock } from "@/mocks";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <Header />
        <section className={styles["content"]}>
          {projectListMock.map((project) => (
            <ProjectCard project={project} />
          ))}
        </section>
      </main>
    </div>
  );
}
