"use client";

import { PostListItem } from "@/types/interface";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "./style.module.css";

interface Props {
  post: PostListItem;
}

export default function PostCard({ post }: Props) {
  const revealAnimation = useRef<GSAPTimeline>(null);

  const onMouseEnterHandler = () => {
    gsap.to(`#post-${post.id}-thumbnail-wrapper`, { translateX: "1%", scaleX: 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-thumbnail`, { scaleX: 1.1 / 1.02, scaleY: 1.1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-button`, { backgroundColor: "#ffffffff", scale: 1.03, duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-button-text`, { color: "#1a1a1a", duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-button-icon`, { top: "-1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#post-${post.id}-button-icon-second`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onMouseLeaveHandler = () => {
    gsap.to(`#post-${post.id}-thumbnail-wrapper`, { translateX: 0, scaleX: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-thumbnail`, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-button`, { backgroundColor: "#00000000", scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-button-text`, { color: "#ffffff", duration: 0.5, ease: "power2.out" });
    gsap.to(`#post-${post.id}-button-icon`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#post-${post.id}-button-icon-second`, { top: "1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    revealAnimation.current = gsap
      .timeline({ scrollTrigger: { trigger: `#post-${post.id}`, start: "40% bottom" } })
      .from(`#post-${post.id}`, { y: "15%", duration: 1.5, ease: "power2.out" })
      .to(`#post-${post.id}`, { opacity: 1, visibility: "inherit", duration: 1.5, ease: "power2.out" }, "<");
  });

  return (
    <Link
      href={`/blog/detail/${post.id}`}
      className={styles["post-container"]}
      style={{ background: post.themeColor }}
      id={`post-${post.id}`}
      onMouseEnter={onMouseEnterHandler}
      onTouchStart={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onTouchEnd={onMouseLeaveHandler}
    >
      <div className={styles["post-thumbnail-wrapper"]} id={`post-${post.id}-thumbnail-wrapper`}>
        <Image
          src={post.thumbnail ? post.thumbnail : "/resources/default-thumbnail.png"}
          alt={`${post.id}`}
          width={1600}
          height={1200}
          className={styles["post-thumbnail"]}
          id={`post-${post.id}-thumbnail`}
        />
      </div>
      <div className={styles["post-info"]}>
        <div>
          <h2 className={styles["post-title"]}>{post.title}</h2>
          <ul>
            {post.tags.map((tag) => (
              <li className={styles["post-tag"]} key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles["post-info-bottom"]}>
          <p className={styles["post-write-datetime"]}>{post.createdAt}</p>
          <button className={styles["post-button"]} id={`post-${post.id}-button`}>
            <p className={styles["post-button-text"]} id={`post-${post.id}-button-text`}>
              view post
            </p>
            <div className={styles["post-button-icon-wrapper"]}>
              <GoArrowUpRight className={styles["post-button-icon"]} id={`post-${post.id}-button-icon`} />
              <GoArrowUpRight className={styles["post-button-icon-second"]} id={`post-${post.id}-button-icon-second`} />
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
}
