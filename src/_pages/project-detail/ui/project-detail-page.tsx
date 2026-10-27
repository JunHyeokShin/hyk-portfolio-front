import type { Metadata } from "next";
import { unstable_rethrow } from "next/navigation";

import { getProject } from "../api/get-project";

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return { title: project.title, description: project.description };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Error" };
  }
}

export async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);

  return (
    <main>
      <article>{project.content}</article>
    </main>
  );
}
