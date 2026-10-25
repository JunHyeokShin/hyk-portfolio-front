"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

import { projectQueries } from "@/shared/api";

export function ProjectList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError } = useSuspenseInfiniteQuery(
    projectQueries.list(),
  );
  const projects = data.pages.flatMap((page) => page.content);

  return (
    <>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            {project.description && <p>{project.description}</p>}
            <p>{project.createdAt}</p>
          </li>
        ))}
      </ul>
      {isFetchNextPageError && !isFetchingNextPage && <p role="alert">failed to load more projects</p>}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "loading..." : isFetchNextPageError ? "try again" : "load more"}
        </button>
      )}
    </>
  );
}
