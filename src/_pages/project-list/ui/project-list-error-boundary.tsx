"use client";

import { catchError, type ErrorInfo } from "next/error";

function ProjectListErrorFallback(_props: object, { retry }: ErrorInfo) {
  return (
    <>
      <p role="alert">failed to load projects</p>
      <button onClick={() => retry()}>try again</button>
    </>
  );
}

export const ProjectListErrorBoundary = catchError(ProjectListErrorFallback);
