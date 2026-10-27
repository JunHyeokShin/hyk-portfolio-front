import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Not Found",
};

export function ProjectNotFound() {
  return (
    <main>
      <p>project not found</p>
      <Link href="/projects">back to projects</Link>
    </main>
  );
}
