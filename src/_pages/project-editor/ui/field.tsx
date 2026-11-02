import type { ReactNode } from "react";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label>
        {label}
        {children}
      </label>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
