import { useUploadResource } from "../api/use-upload-resource";
import { Field } from "./field";

export function ImageUpload({ apiKey, onUpload }: { apiKey: string; onUpload: (url: string) => void }) {
  const { mutate, isPending, error } = useUploadResource();

  return (
    <Field label={isPending ? "uploading..." : "upload image"} error={error?.message}>
      <input
        type="file"
        accept="image/*"
        disabled={!apiKey || isPending}
        onChange={(event) => {
          const input = event.currentTarget;
          const file = input.files?.[0];
          if (file) {
            mutate({ apiKey, file }, { onSuccess: ({ url }) => onUpload(url) });
            input.value = "";
          }
        }}
      />
    </Field>
  );
}
