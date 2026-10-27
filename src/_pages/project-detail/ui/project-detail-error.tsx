"use client";

import type { ErrorInfo } from "next/error";

export function ProjectDetailError({ retry }: ErrorInfo) {
  return (
    <main>
      <p role="alert">failed to load project</p>
      <button onClick={() => retry()}>try again</button>
    </main>
  );
}
