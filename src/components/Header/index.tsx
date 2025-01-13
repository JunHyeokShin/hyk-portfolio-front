"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { PiGithubLogoLight, PiInstagramLogoLight } from "react-icons/pi";
import styles from "./style.module.css";

export default function Header() {
  useGSAP(() => {
    gsap.to("#header", { opacity: 1, duration: 0 });
    gsap.from("#title-p", { y: "100%", duration: 1, delay: 0.15, ease: "power2.out" });
    gsap.from("#title-r", { y: "100%", duration: 1, delay: 0.2, ease: "power2.out" });
    gsap.from("#title-o", { y: "100%", duration: 1, delay: 0.25, ease: "power2.out" });
    gsap.from("#title-j", { y: "100%", duration: 1, delay: 0.3, ease: "power2.out" });
    gsap.from("#title-e", { y: "100%", duration: 1, delay: 0.35, ease: "power2.out" });
    gsap.from("#title-c", { y: "100%", duration: 1, delay: 0.4, ease: "power2.out" });
    gsap.from("#title-t", { y: "100%", duration: 1, delay: 0.45, ease: "power2.out" });
    gsap.from("#title-s, #pretitle, #email", { y: "100%", duration: 1, delay: 0.5, ease: "power2.out" });
    gsap.from("#icon-github, #icon-instagram", { opacity: 0, duration: 1, delay: 0.5, ease: "power2.out" });
  });

  return (
    <header className={styles["header"]} id="header">
      <div className={styles["header-left"]}>
        <div className="hidden-y">
          <h2 className={styles["header-left-pretitle"]} id="pretitle">
            my finished
          </h2>
        </div>
        <div className="hidden-y">
          <h1 className={styles["header-left-title"]}>
            <div className={styles["header-left-title-letter"]} id="title-p">
              p
            </div>
            <div className={styles["header-left-title-letter"]} id="title-r">
              r
            </div>
            <div className={styles["header-left-title-letter"]} id="title-o">
              o
            </div>
            <div className={styles["header-left-title-letter"]} id="title-j">
              j
            </div>
            <div className={styles["header-left-title-letter"]} id="title-e">
              e
            </div>
            <div className={styles["header-left-title-letter"]} id="title-c">
              c
            </div>
            <div className={styles["header-left-title-letter"]} id="title-t">
              t
            </div>
            <div className={styles["header-left-title-letter"]} id="title-s">
              s
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
