import Link from "next/link";

export function HomePage() {
  return (
    <main>
      <h1>HYK Portfolio</h1>
      <Link href="/projects">projects</Link>
    </main>
  );
}
