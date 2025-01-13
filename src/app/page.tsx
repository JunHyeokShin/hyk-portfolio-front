import Header from "@/components/Header";
import { projectListMock } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <Header />
        <section className={styles["content"]}>
          {projectListMock.map((projectListItem) => (
            <Link
              key={projectListItem.id}
              href={`/project/${projectListItem.id}`}
              className={styles["project-container"]}
              style={{ background: `${projectListItem.themeColor}`, textDecoration: "none" }}
            >
              <div className={styles["project-info-box"]}>
                <Image
                  src={projectListItem.titleImage ? projectListItem.titleImage : ""}
                  alt={projectListItem.title}
                  width={1600}
                  height={1200}
                  className={styles["project-title-image"]}
                />
                <div className={styles["project-info"]}>
                  <h2 className={styles["project-title"]}>{projectListItem.title}</h2>
                  <p className={styles["project-description"]}>{projectListItem.description}</p>
                </div>
              </div>
              <div className={styles["project-button-container"]}>
                <button className="button-white">
                  <p className="button-text-white">view project</p>
                  <GoArrowUpRight className="button-icon" />
                </button>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
