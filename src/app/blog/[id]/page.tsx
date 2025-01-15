import "@/mdx-components.css";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Params) {
  const id = (await params).id;
  const { default: PostContent } = await import(`@/contents/post/${id}.mdx`);

  return (
    <main className="mdx-container">
      <PostContent />
    </main>
  );
}
