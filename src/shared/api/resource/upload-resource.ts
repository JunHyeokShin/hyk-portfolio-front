import { ApiError } from "../api-error";
import { apiClient } from "../client";

export async function uploadResource(apiKey: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const { data, error, response } = await apiClient.POST("/resources", {
    headers: { "X-API-Key": apiKey },
    body: formData as never,
  });
  if (error) {
    throw new ApiError(response.status, typeof error === "object" ? error : undefined);
  }
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return data;
}
