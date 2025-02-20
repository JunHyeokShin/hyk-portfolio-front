"use client";

import { ProjectListItem } from "@/types/interface";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "./style.module.css";

interface Props {
  project: ProjectListItem;
}

export default function ProjectCard({ project }: Props) {
  const revealAnimation = useRef<GSAPTimeline>(null);

  const onMouseEnterHandler = () => {
    gsap.to(`#${project.id}-thumbnail-wrapper`, { translateY: "1%", scaleY: 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-thumbnail`, { scaleX: 1.1, scaleY: 1.1 / 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button`, { backgroundColor: "#ffffffff", scale: 1.03, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-text`, { color: "#1a1a1a", duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-icon`, { top: "-1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#${project.id}-button-icon-second`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onMouseLeaveHandler = () => {
    gsap.to(`#${project.id}-thumbnail-wrapper`, { translateY: 0, scaleY: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-thumbnail`, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button`, { backgroundColor: "#00000000", scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-text`, { color: "#ffffff", duration: 0.5, ease: "power2.out" });
    gsap.to(`#${project.id}-button-icon`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#${project.id}-button-icon-second`, { top: "1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    revealAnimation.current = gsap
      .timeline({ scrollTrigger: { trigger: `#${project.id}`, start: "40% bottom" } })
      .from(`#${project.id}`, { y: "15%", duration: 1.5, ease: "power2.out" })
      .to(`#${project.id}`, { opacity: 1, visibility: "inherit", duration: 1.5, ease: "power2.out" }, "<");
  });

  return (
    <Link
      href={`/project/detail/${project.id}`}
      className={styles["project-container"]}
      style={{ background: project.themeColor }}
      id={project.id}
      onMouseEnter={onMouseEnterHandler}
      onTouchStart={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onTouchEnd={onMouseLeaveHandler}
    >
      <div className={styles["project-info-box"]}>
        <div className={styles["project-thumbnail-wrapper"]} id={`${project.id}-thumbnail-wrapper`}>
          <Image
            src={project.thumbnail ? project.thumbnail : "/resources/default-thumbnail.png"}
            alt={project.name}
            width={1600}
            height={1200}
            className={styles["project-thumbnail"]}
            id={`${project.id}-thumbnail`}
          />
        </div>
        <div className={styles["project-info"]}>
          <h2 className={styles["project-name"]}>{project.name}</h2>
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
