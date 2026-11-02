import type { Metadata } from "next";

import { ProjectForm } from "./project-form";

export const metadata: Metadata = {
  title: "New Project",
};

export function ProjectWritePage() {
  return (
    <main>
      <h1>new project</h1>
      <ProjectForm />
    </main>
  );
}
