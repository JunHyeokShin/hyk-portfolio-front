import { useMutation } from "@tanstack/react-query";

import { uploadResource } from "@/shared/api";

export function useUploadResource() {
  return useMutation({
    mutationFn: ({ apiKey, file }: { apiKey: string; file: File }) => uploadResource(apiKey, file),
  });
}
