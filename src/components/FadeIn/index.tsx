"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import styles from "./style.module.css";

interface Props {
  children?: React.ReactNode;
  duration: number;
  delay?: number;
}

export default function FadeIn({ children, duration, delay }: Props) {
  const revealAnimation = useRef<GSAPTimeline>(null);

  useGSAP(() => {
    revealAnimation.current = gsap.timeline().to("#fade-in-container", { opacity: 1, visibility: "inherit", duration, ease: "power2.out", delay });
  });

  return (
    <div className={styles["fade-in-container"]} id="fade-in-container">
      {children}
    </div>
  );
}
