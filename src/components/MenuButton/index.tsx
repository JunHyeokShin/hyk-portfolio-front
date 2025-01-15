"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import { BsChevronDown, BsList } from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import styles from "./styles.module.css";

export default function MenuButton() {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const menuToggleAnimation = useRef<GSAPTimeline>(null);

  const onMenuButtonClickHandler = () => {
    if (!isMenuOpened) {
      menuToggleAnimation.current?.play();
    } else {
      menuToggleAnimation.current?.reverse();
    }
    setIsMenuOpened(!isMenuOpened);
  };

  useGSAP(() => {
    menuToggleAnimation.current = gsap.timeline({ paused: true });
    menuToggleAnimation.current.to("#menu-button-icon", { top: "-1.5rem", duration: 0.2, ease: "power2.out" });
    menuToggleAnimation.current.to("#menu-button-icon-second", { top: 0, duration: 0.2, ease: "power2.out" }, 0);
    menuToggleAnimation.current.to("#home-button", { visibility: "inherit", y: "-5.125rem", duration: 0.2, ease: "back.out" }, 0);
    menuToggleAnimation.current.to("#blog-button", { visibility: "inherit", y: "-2.625rem", duration: 0.1, ease: "back.out" }, 0);
  });

  return (
    <div className={styles["container"]}>
      <Link href="/" className={`${styles["button"]} ${styles["home-button"]}`} id="home-button" onClick={onMenuButtonClickHandler}>
        <TiHome className={styles["button-icon"]} />
      </Link>
      <Link href="/blog" className={`${styles["button"]} ${styles["blog-button"]}`} id="blog-button" onClick={onMenuButtonClickHandler}>
        <RiArticleFill className={styles["button-icon"]} />
      </Link>
      <button className={styles["menu-button"]} id="menu-button" onClick={onMenuButtonClickHandler}>
        <div className={styles["menu-button-icon-wrapper"]}>
          <BsList className={styles["menu-button-icon"]} id="menu-button-icon" />
          <BsChevronDown className={styles["menu-button-icon-second"]} id="menu-button-icon-second" />
        </div>
      </button>
    </div>
  );
}
