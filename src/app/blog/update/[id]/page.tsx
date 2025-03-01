"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.css";

export default function PostUpdatePage() {
  const { id } = useParams<{ id: string }>();

  return <div>PostUpdatePage</div>;
}
