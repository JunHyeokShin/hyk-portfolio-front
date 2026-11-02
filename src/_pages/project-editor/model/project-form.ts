import { ApiError } from "@/shared/api";

export function parseProjectForm(formData: FormData) {
  const required = (name: string) => formData.get(name) as string;
  const optional = (name: string) => required(name) || null;

  return {
    slug: required("slug"),
    title: required("title"),
    thumbnail: optional("thumbnail"),
    themeColor: optional("themeColor"),
    description: optional("description"),
    content: required("content"),
  };
}

export function toFormErrors(error: Error | null): Record<string, string> {
  if (!error) {
    return {};
  }
  const problem = error instanceof ApiError ? error.problem : undefined;
  if (problem?.title === "UNAUTHORIZED") {
    return { apiKey: error.message };
  }
  if (problem?.title === "SLUG_DUPLICATED") {
    return { slug: error.message };
  }
  if (problem?.errors?.length) {
    return Object.fromEntries(problem.errors.map(({ field, message }) => [field, message]));
  }
  return { form: error.message };
}
