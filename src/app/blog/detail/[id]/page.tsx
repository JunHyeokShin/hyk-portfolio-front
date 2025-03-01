import styles from "./page.module.css";

interface Params {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: Params) {
  return <div>PostDetailPage</div>;
}
