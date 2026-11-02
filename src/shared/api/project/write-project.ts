import { ApiError } from "../api-error";
import { apiClient } from "../client";
import type { components } from "../schema";

export type WriteProjectRequest = components["schemas"]["WriteProjectRequest"];

export async function writeProject(apiKey: string, body: WriteProjectRequest) {
  const { data, error, response } = await apiClient.POST("/projects", {
    headers: { "X-API-Key": apiKey },
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
