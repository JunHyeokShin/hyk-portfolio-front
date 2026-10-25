import type { components } from "./schema";

type ProblemDetail = components["schemas"]["ProblemDetail"];

export class ApiError extends Error {
  override readonly name = "ApiError";

  constructor(
    readonly status: number,
    readonly problem?: ProblemDetail,
  ) {
    super(problem?.detail ?? `HTTP ${status}`);
  }
}
