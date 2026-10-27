import { ApiError } from "../api-error";
import { apiClient } from "../client";

export async function readProject(slug: string, signal?: AbortSignal) {
  const { data, error, response } = await apiClient.GET("/projects/{slug}", {
    params: { path: { slug } },
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
