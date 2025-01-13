"use client";

import { ProjectListItem } from "@/types/interface";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import styles from "./style.module.css";

interface Props {
  project: ProjectListItem;
}

export default function ProjectCard({ project }: Props) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(`#${project.id}`, {
      scrollTrigger: {
        trigger: `#${project.id}`,
        start: `top 80%`,
      },
      y: "15%",
      duration: 1.5,
      ease: "power2.out",
    });
    gsap.to(`#${project.id}`, {
      scrollTrigger: {
        trigger: `#${project.id}`,
        start: `top 80%`,
      },
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });
  });

  return (
    <Link
      key={project.id}
      href={`/project/${project.id}`}
      className={styles["project-container"]}
      style={{ background: `${project.themeColor}` }}
      id={project.id}
    >
      <div className={styles["project-info-box"]}>
        <Image src={project.titleImage ? project.titleImage : ""} alt={project.title} width={1600} height={1200} className={styles["project-title-image"]} />
        <div className={styles["project-info"]}>
          <h2 className={styles["project-title"]}>{project.title}</h2>
          <p className={styles["project-description"]}>{project.description}</p>
        </div>
      </div>
      <div className={styles["project-button-container"]}>
        <button className="button-white">
          <p className="button-text-white">view project</p>
          <GoArrowUpRight className="button-icon" />
        </button>
      </div>
    </Link>
  );
}
