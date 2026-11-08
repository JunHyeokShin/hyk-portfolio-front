import { ApiError } from "../api-error";
import { apiClient } from "../client";

export async function deleteProject(apiKey: string, slug: string) {
  const { error, response } = await apiClient.DELETE("/projects/{slug}", {
    headers: { "X-API-Key": apiKey },
    params: { path: { slug } },
  });
  if (error) {
    throw new ApiError(response.status, typeof error === "object" ? error : undefined);
  }
  if (!response.ok) {
    throw new ApiError(response.status);
  }
}
