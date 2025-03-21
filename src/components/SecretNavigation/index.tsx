"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  type: "project" | "post";
  id?: string;
}

export default function SecretNavigation({ type, id }: Props) {
  const router = useRouter();

  useEffect(() => {
    let buffer = "";

    const onKeyPressHandler = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();

      if (buffer.length > 6) buffer = buffer.slice(1);

      if (buffer.includes("write")) {
        type === "project" ? router.push("/project/write") : router.push("/blog/write");
        buffer = "";
      }

      if (buffer.includes("update") && id) {
        type === "project" ? router.push(`/project/update/${id}`) : router.push(`/blog/update/${id}`);
        buffer = "";
      }
    };

    window.addEventListener("keypress", onKeyPressHandler);

    return () => window.removeEventListener("keypress", onKeyPressHandler);
  }, [router]);

  return null;
}
