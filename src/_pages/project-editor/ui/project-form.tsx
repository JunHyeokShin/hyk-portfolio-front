"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import type { ReadProjectResponse } from "@/shared/api";

import { useSaveProject } from "../api/use-save-project";
import { parseProjectForm, toFormErrors } from "../model/project-form";
import { Field } from "./field";
import { ImageUpload } from "./image-upload";

export function ProjectForm({ project }: { project?: ReadProjectResponse }) {
  const router = useRouter();
  const saveProject = useSaveProject(project?.slug);
  const errors = toFormErrors(saveProject.error);
  const [apiKey, setApiKey] = useState("");
  const [thumbnail, setThumbnail] = useState(project?.thumbnail ?? "");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveProject.mutate(
          { apiKey, body: parseProjectForm(new FormData(event.currentTarget)) },
          { onSuccess: ({ slug }) => router.push(`/projects/${slug}`) },
        );
      }}
    >
      <Field label="api key" error={errors.apiKey}>
        <input type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} required />
      </Field>
      <Field label="slug" error={errors.slug}>
        <input name="slug" defaultValue={project?.slug} required />
      </Field>
      <Field label="title" error={errors.title}>
        <input name="title" defaultValue={project?.title} required />
      </Field>
      <Field label="thumbnail" error={errors.thumbnail}>
        <input name="thumbnail" value={thumbnail} onChange={(event) => setThumbnail(event.target.value)} />
      </Field>
      <ImageUpload apiKey={apiKey} onUpload={setThumbnail} />
      <Field label="theme color" error={errors.themeColor}>
        <input name="themeColor" defaultValue={project?.themeColor ?? ""} placeholder="#RRGGBB" />
      </Field>
      <Field label="description" error={errors.description}>
        <input name="description" defaultValue={project?.description ?? ""} />
      </Field>
      <Field label="content" error={errors.content}>
        <textarea ref={contentRef} name="content" defaultValue={project?.content} required />
      </Field>
      <ImageUpload
        apiKey={apiKey}
        onUpload={(url) => {
          const content = contentRef.current!;
          content.setRangeText(`![](${url})`, content.selectionStart, content.selectionEnd, "end");
        }}
      />

      {errors.form && <p role="alert">{errors.form}</p>}
      <button disabled={saveProject.isPending}>{saveProject.isPending ? "saving..." : "save"}</button>
    </form>
  );
}
