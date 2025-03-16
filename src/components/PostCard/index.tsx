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
    gsap.to(`#thumbnail-wrapper-${post.id}`, { translateY: "1%", scaleY: 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#thumbnail-${post.id}`, { scaleX: 1.1, scaleY: 1.1 / 1.02, duration: 0.5, ease: "power2.out" });
    gsap.to(`#button-${post.id}`, { backgroundColor: "#ffffffff", scale: 1.03, duration: 0.5, ease: "power2.out" });
    gsap.to(`#button-text-${post.id}`, { color: "#1a1a1a", duration: 0.5, ease: "power2.out" });
    gsap.to(`#button-icon-${post.id}`, { top: "-1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#button-icon-second-${post.id}`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
  };

  const onMouseLeaveHandler = () => {
    gsap.to(`#thumbnail-wrapper-${post.id}`, { translateY: 0, scaleY: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#thumbnail-${post.id}`, { scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#button-${post.id}`, { backgroundColor: "#00000000", scale: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(`#button-text-${post.id}`, { color: "#ffffff", duration: 0.5, ease: "power2.out" });
    gsap.to(`#button-icon-${post.id}`, { top: "0", left: "0", duration: 0.5, ease: "power1.out" });
    gsap.to(`#button-icon-second-${post.id}`, { top: "1.5rem", left: "0", duration: 0.5, ease: "power1.out" });
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
      <div className={styles["post-info-box"]}>
        <div className={styles["post-thumbnail-wrapper"]} id={`thumbnail-wrapper-${post.id}`}>
          <Image
            src={post.thumbnail ? post.thumbnail : "/resources/default-thumbnail.png"}
            alt={post.title}
            width={1600}
            height={1200}
            className={styles["post-thumbnail"]}
            id={`thumbnail-${post.id}`}
          />
        </div>
        <div className={styles["post-info"]}>
          <h2 className={styles["post-title"]}>{post.title}</h2>
          <ul>
            {post.tags.map((tag) => (
              <li className={styles["post-tag"]} key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles["post-button-container"]}>
        <button className={styles["post-button"]} id={`button-${post.id}`}>
          <p className={styles["post-button-text"]} id={`button-text-${post.id}`}>
            view post
          </p>
          <div className={styles["post-button-icon-wrapper"]}>
            <GoArrowUpRight className={styles["post-button-icon"]} id={`button-icon-${post.id}`} />
            <GoArrowUpRight className={styles["post-button-icon-second"]} id={`button-icon-second-${post.id}`} />
          </div>
        </button>
        <p className={styles["post-write-datetime"]}>{post.createdAt.slice(0, 10)}</p>
      </div>
    </Link>
  );
}
