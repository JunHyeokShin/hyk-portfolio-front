"use client";

import Lenis, { LenisOptions } from "lenis";
import ReactLenis, { LenisProps, LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";

export default function CustomLenis({ root, options, children, className, props }: LenisProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [savedLenisOptions, setSavedLenisOptions] = useState<LenisOptions | undefined>(undefined);

  const onKeyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Shift" && lenisRef.current?.lenis) {
      setSavedLenisOptions(lenisRef.current.lenis.options);
      lenisRef.current.lenis.destroy();
      lenisRef.current.lenis = undefined;
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent) => {
    if (e.key === "Shift" && lenisRef.current && !lenisRef.current?.lenis) {
      lenisRef.current.lenis = new Lenis(savedLenisOptions);
    }
  };

  const onClickHandler = (e: MouseEvent) => {
    console.log("onClickHandler");
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.tagName.toLowerCase() === "a") {
      const href = clickedElement.getAttribute("href");
      if (href?.startsWith("#")) {
        const id = href.slice(1);
        const targetToScroll = document.getElementById(id);
        if (targetToScroll && lenisRef.current?.lenis) {
          const marginTop = window.getComputedStyle(targetToScroll).marginTop;
          const offset = isNaN(parseInt(marginTop)) ? 0 : -parseInt(marginTop);
          lenisRef.current?.lenis?.scrollTo(targetToScroll, { offset, lerp: options?.lerp, duration: options?.duration });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    window.addEventListener("keyup", onKeyUpHandler);
    window.addEventListener("click", onClickHandler);

    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
      window.removeEventListener("keyup", onKeyUpHandler);
      window.removeEventListener("click", onClickHandler);
    };
  });

  return (
    <ReactLenis root={root} options={options} className={className} ref={lenisRef} {...props}>
      {children}
    </ReactLenis>
  );
}
