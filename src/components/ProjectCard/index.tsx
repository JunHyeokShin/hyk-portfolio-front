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
        start: "50% bottom",
      },
      y: "15%",
      duration: 1.5,
      ease: "power2.out",
    });
    gsap.to(`#${project.id}`, {
      scrollTrigger: {
        trigger: `#${project.id}`,
        start: "50% bottom",
      },
      opacity: 1,
      visibility: "inherit",
      duration: 1.5,
      ease: "power2.out",
    });
  });

  const onMouseEnterHandler = () => {
    gsap.to(`#${project.id}-title-image-wrapper`, { translateY: "1%", scaleY: 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-title-image`, { scaleX: 1.1, scaleY: 1.1 / 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button`, { backgroundColor: "#ffffffff", scale: 1.03, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-text`, { color: "black", duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-icon`, { top: "-1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#${project.id}-button-icon-second`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onMouseLeaveHandler = () => {
    gsap.to(`#${project.id}-title-image-wrapper`, { translateY: 0, scaleY: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-title-image`, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button`, { backgroundColor: "#00000000", scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-text`, { color: "white", duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-icon`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#${project.id}-button-icon-second`, { top: "1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
  };

  return (
    <Link
      href={`/project/${project.id}`}
      className={styles["project-container"]}
      style={{ background: `${project.themeColor}` }}
      id={project.id}
      onMouseEnter={onMouseEnterHandler}
      onTouchStart={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onTouchEnd={onMouseLeaveHandler}
    >
      <div className={styles["project-info-box"]}>
        <div className={styles["project-title-image-wrapper"]} id={`${project.id}-title-image-wrapper`}>
          <Image
            src={project.titleImage ? project.titleImage : ""}
            alt={project.title}
            width={1600}
            height={1200}
            className={styles["project-title-image"]}
            id={`${project.id}-title-image`}
          />
        </div>
        <div className={styles["project-info"]}>
          <h2 className={styles["project-title"]}>{project.title}</h2>
          <p className={styles["project-description"]}>{project.description}</p>
        </div>
      </div>
      <div className={styles["project-button-container"]}>
        <button className={styles["project-button"]} id={`${project.id}-button`}>
          <p className={styles["project-button-text"]} id={`${project.id}-button-text`}>
            view project
          </p>
          <div className={styles["project-button-icon-wrapper"]}>
            <GoArrowUpRight className={styles["project-button-icon"]} id={`${project.id}-button-icon`} />
            <GoArrowUpRight className={styles["project-button-icon-second"]} id={`${project.id}-button-icon-second`} />
          </div>
        </button>
      </div>
    </Link>
  );
}
