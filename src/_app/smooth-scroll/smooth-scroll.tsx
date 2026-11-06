"use client";

import "lenis/dist/lenis.css";

import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  return <ReactLenis root options={{ allowNestedScroll: true, anchors: true }} />;
}
