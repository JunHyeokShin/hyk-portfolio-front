import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";

import { projectQueries } from "@/shared/api";

import { ProjectList } from "./project-list";
import { ProjectListErrorBoundary } from "./project-list-error-boundary";

export const metadata: Metadata = {
  title: "Projects",
};

export function ProjectListPage() {
  return (
    <main>
      <h1>my finished projects</h1>
      <ProjectListErrorBoundary>
        <Suspense fallback={<p>loading...</p>}>
          <PrefetchedProjectList />
        </Suspense>
      </ProjectListErrorBoundary>
    </main>
  );
}

async function PrefetchedProjectList() {
  const queryClient = new QueryClient();
  await queryClient.infiniteQuery(projectQueries.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectList />
    </HydrationBoundary>
  );
}
