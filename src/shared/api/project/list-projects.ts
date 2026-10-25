import { ApiError } from "../api-error";
import { apiClient } from "../client";
import type { operations } from "../schema";

export type ListProjectsQuery = NonNullable<operations["listProjects"]["parameters"]["query"]>;

export async function listProjects(query?: ListProjectsQuery, signal?: AbortSignal) {
  const { data, error, response } = await apiClient.GET("/projects", {
    params: { query },
    signal,
  });
  if (error) {
    throw new ApiError(response.status, typeof error === "object" ? error : undefined);
  }
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return data;
}
