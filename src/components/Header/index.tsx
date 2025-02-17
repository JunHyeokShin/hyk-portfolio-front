"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { PiGithubLogoLight, PiInstagramLogoLight } from "react-icons/pi";
import styles from "./style.module.css";

interface Props {
  type: "home" | "blog";
}

export default function Header({ type }: Props) {
  const revealAnimation = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    if (type === "home") {
      revealAnimation.current = gsap
        .timeline()
        .to("#header", { opacity: 1, duration: 0 })
        .from("#title-1", { y: "100%", duration: 1, ease: "power2.out" })
        .from("#title-2", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-3", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-4", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-5", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-6", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-7", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-8, #pretitle, #email", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#icon-github, #icon-instagram", { opacity: 0, duration: 1, ease: "power2.out" }, "<");
    } else {
      revealAnimation.current = gsap
        .timeline()
        .to("#header", { opacity: 1, duration: 0 })
        .from("#title-1", { y: "100%", duration: 1, ease: "power2.out" })
        .from("#title-2", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-3", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-4", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#title-5, #pretitle, #email", { y: "100%", duration: 1, ease: "power2.out" }, "<0.05")
        .from("#icon-github, #icon-instagram", { opacity: 0, duration: 1, ease: "power2.out" }, "<");
    }
  });

  return (
    <header className={styles["header"]} id="header">
      <div className={styles["header-left"]}>
        <div className="hidden-y">
          <h2 className={styles["header-left-pretitle"]} id="pretitle">
            {type === "home" ? "my finished" : "my study"}
          </h2>
        </div>
        <div className="hidden-y">
          <h1 className={styles["header-left-title"]}>
            <div className={styles["header-left-title-letter"]} id="title-1">
              {type === "home" ? "p" : "n"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-2">
              {type === "home" ? "r" : "o"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-3">
              {type === "home" ? "o" : "t"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-4">
              {type === "home" ? "j" : "e"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-5">
              {type === "home" ? "e" : "s"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-6">
              {type === "home" && "c"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-7">
              {type === "home" && "t"}
            </div>
            <div className={styles["header-left-title-letter"]} id="title-8">
              {type === "home" && "s"}
            </div>
          </h1>
        </div>
      </div>
      <div className={styles["header-right"]}>
        <div className={styles["header-right-icon-box"]}>
          <Link href="https://github.com/junhyeokshin" className={styles["header-right-icon"]} id="icon-github">
            <PiGithubLogoLight />
          </Link>
          <Link href="https://instagram.com/junhyeok_shin" className={styles["header-right-icon"]} id="icon-instagram">
            <PiInstagramLogoLight />
          </Link>
        </div>
        <div className="hidden-y">
          <p className={styles["header-right-email"]} id="email">
            junhyeok001010@gmail.com
          </p>
        </div>
      </div>
    </header>
  );
}
