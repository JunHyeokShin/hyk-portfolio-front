"use client";

import { LenisRefContext, LenisRefObject } from "@/contexts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { BiArrowToTop } from "react-icons/bi";
import { BsChevronDown, BsList } from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import styles from "./styles.module.css";

export default function MenuButton() {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const lenisRef = useContext<LenisRefObject>(LenisRefContext);
  const menuToggleAnimation = useRef<GSAPTimeline>(null);

  const onMenuButtonClickHandler = () => {
    if (!isMenuOpened) menuToggleAnimation.current?.play();
    else menuToggleAnimation.current?.reverse();
    setIsMenuOpened(!isMenuOpened);
  };

  const onTopButtonClickHandler = () => {
    if (lenisRef?.current?.lenis) lenisRef.current.lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    onMenuButtonClickHandler();
  };

  useGSAP(() => {
    menuToggleAnimation.current = gsap
      .timeline({ paused: true })
      .to("#menu-button-icon", { top: "-1.5rem", duration: 0.2, ease: "power2.out" })
      .to("#menu-button-icon-second", { top: 0, duration: 0.2, ease: "power2.out" }, 0)
      .to("#home-button", { visibility: "inherit", y: "-7.875rem", duration: 0.3, ease: "back.out" }, 0)
      .to("#blog-button", { visibility: "inherit", y: "-5.375rem", duration: 0.2, ease: "back.out" }, 0)
      .to("#top-button", { visibility: "inherit", y: "-2.875rem", duration: 0.1, ease: "back.out" }, 0);
  });

  return (
    <div className={styles["container"]}>
      <Link href="/" className={`${styles["button"]} ${styles["home-button"]}`} id="home-button" onClick={onMenuButtonClickHandler}>
        <TiHome className={styles["button-icon"]} />
      </Link>
      <Link href="/blog" className={`${styles["button"]} ${styles["blog-button"]}`} id="blog-button" onClick={onMenuButtonClickHandler}>
        <RiArticleFill className={styles["button-icon"]} />
      </Link>
      <button className={`${styles["button"]} ${styles["top-button"]}`} id="top-button" onClick={onTopButtonClickHandler}>
        <BiArrowToTop className={styles["button-icon"]} />
      </button>
      <button className={styles["menu-button"]} id="menu-button" onClick={onMenuButtonClickHandler}>
        <div className={styles["menu-button-icon-wrapper"]}>
          <BsList className={styles["menu-button-icon"]} id="menu-button-icon" />
          <BsChevronDown className={styles["menu-button-icon-second"]} id="menu-button-icon-second" />
        </div>
      </button>
    </div>
  );
}
