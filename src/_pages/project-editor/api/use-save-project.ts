import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  projectQueries,
  updateProject,
  writeProject,
  type UpdateProjectRequest,
  type WriteProjectRequest,
} from "@/shared/api";

type SaveProjectVariables = {
  apiKey: string;
  body: WriteProjectRequest & UpdateProjectRequest;
};

export function useSaveProject(slug?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ apiKey, body }: SaveProjectVariables) =>
      slug ? updateProject(apiKey, slug, body) : writeProject(apiKey, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectQueries.lists() }),
  });
}
