import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject, projectQueries } from "@/shared/api";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ apiKey, slug }: { apiKey: string; slug: string }) => deleteProject(apiKey, slug),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectQueries.lists() }),
  });
}
