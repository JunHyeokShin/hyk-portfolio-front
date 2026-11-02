import type { Metadata } from "next";
import { Suspense } from "react";

import { getProject } from "../api/get-project";
import { ProjectForm } from "./project-form";

export const metadata: Metadata = {
  title: "Edit Project",
};

export function ProjectEditPage({ params }: PageProps<"/projects/[slug]/edit">) {
  return (
    <main>
      <h1>edit project</h1>
      <Suspense fallback={<p>loading...</p>}>
        {params.then(({ slug }) => (
          <ProjectEditForm slug={slug} />
        ))}
      </Suspense>
    </main>
  );
}

async function ProjectEditForm({ slug }: { slug: string }) {
  const project = await getProject(slug);

  return <ProjectForm project={project} />;
}
