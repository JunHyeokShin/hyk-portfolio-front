import { ApiError } from "../api-error";
import { apiClient } from "../client";
import type { components } from "../schema";

export type UpdateProjectRequest = components["schemas"]["UpdateProjectRequest"];

export async function updateProject(apiKey: string, slug: string, body: UpdateProjectRequest) {
  const { data, error, response } = await apiClient.PUT("/projects/{slug}", {
    headers: { "X-API-Key": apiKey },
    params: { path: { slug } },
    body,
  });
  if (error) {
    throw new ApiError(response.status, typeof error === "object" ? error : undefined);
  }
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return data;
}
