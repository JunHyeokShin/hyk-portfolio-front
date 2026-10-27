import { notFound } from "next/navigation";
import { cache } from "react";

import { ApiError, readProject } from "@/shared/api";

export const getProject = cache(async (slug: string) => {
  try {
    return await readProject(slug);
  } catch (error) {
    if (error instanceof ApiError && error.problem?.title === "PROJECT_NOT_FOUND") {
      notFound();
    }
    throw error;
  }
});
