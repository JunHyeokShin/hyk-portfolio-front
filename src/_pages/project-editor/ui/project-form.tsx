"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition, type SubmitEvent } from "react";

import type { ReadProjectResponse } from "@/shared/api";

import { useDeleteProject } from "../api/use-delete-project";
import { useSaveProject } from "../api/use-save-project";
import { parseProjectForm, toFormErrors } from "../model/project-form";
import { Field } from "./field";
import { ImageUpload } from "./image-upload";

export function ProjectForm({ project }: { project?: ReadProjectResponse }) {
  const router = useRouter();
  const saveProject = useSaveProject(project?.slug);
  const deleteProject = useDeleteProject();
  const errors = toFormErrors(saveProject.error);
  const [apiKey, setApiKey] = useState("");
  const [thumbnail, setThumbnail] = useState(project?.thumbnail ?? "");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isNavigating, startNavigation] = useTransition();
  const isBusy = saveProject.isPending || deleteProject.isPending || isNavigating;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    saveProject.mutate(
      { apiKey, body: parseProjectForm(new FormData(form)) },
      {
        onSuccess: ({ slug }) => {
          if (!project) {
            form.reset();
            setThumbnail("");
          }
          startNavigation(() => router.push(`/projects/${slug}`));
        },
      },
    );
  }

  function handleDelete(slug: string) {
    if (confirm(`delete "${slug}"?`)) {
      deleteProject.mutate({ apiKey, slug }, { onSuccess: () => startNavigation(() => router.replace("/projects")) });
    }
  }

  function insertContentImage(url: string) {
    const content = contentRef.current!;
    content.setRangeText(url, content.selectionStart, content.selectionEnd, "end");
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isBusy}>
        <Field label="api key" error={errors.apiKey}>
          <input type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} required />
        </Field>

        <Field label="slug" error={errors.slug}>
          <input name="slug" defaultValue={project?.slug} required />
        </Field>
        <Field label="title" error={errors.title}>
          <input name="title" defaultValue={project?.title} required />
        </Field>
        <Field label="description" error={errors.description}>
          <input name="description" defaultValue={project?.description ?? ""} />
        </Field>
        <Field label="theme color" error={errors.themeColor}>
          <input name="themeColor" defaultValue={project?.themeColor ?? ""} placeholder="#RRGGBB" />
        </Field>
        <Field label="thumbnail" error={errors.thumbnail}>
          <input name="thumbnail" value={thumbnail} onChange={(event) => setThumbnail(event.target.value)} />
        </Field>
        <ImageUpload label="upload thumbnail" apiKey={apiKey} onUpload={setThumbnail} />

        <Field label="content" error={errors.content}>
          <textarea ref={contentRef} name="content" defaultValue={project?.content} rows={20} required />
        </Field>
        <ImageUpload label="upload content image" apiKey={apiKey} onUpload={insertContentImage} />

        <div>
          <button>{saveProject.isPending ? "saving..." : "save"}</button>
          {project && (
            <button type="button" disabled={!apiKey} onClick={() => handleDelete(project.slug)}>
              {deleteProject.isPending ? "deleting..." : "delete"}
            </button>
          )}
        </div>
        {errors.form && <p role="alert">{errors.form}</p>}
        {deleteProject.error && <p role="alert">{deleteProject.error.message}</p>}
      </fieldset>
    </form>
  );
}
