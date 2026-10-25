import { infiniteQueryOptions } from "@tanstack/react-query";

import { listProjects, type ListProjectsQuery } from "./list-projects";

export const projectQueries = {
  all: () => ["projects"] as const,
  lists: () => [...projectQueries.all(), "list"] as const,
  list: (query: Omit<ListProjectsQuery, "page"> = {}) =>
    infiniteQueryOptions({
      queryKey: [...projectQueries.lists(), query],
      queryFn: ({ pageParam, signal }) => listProjects({ ...query, page: pageParam }, signal),
      initialPageParam: 0,
      getNextPageParam: ({ page }) => (page.number + 1 < page.totalPages ? page.number + 1 : undefined),
    }),
};
