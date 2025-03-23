import { getPostListRequest } from "@/apis";
import { ResponseDto } from "@/apis/response";
import { GetPostListResponseDto } from "@/apis/response/post";
import FadeIn from "@/components/FadeIn";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import SecretNavigation from "@/components/SecretNavigation";
import { sortPostList } from "@/utils";
import styles from "./page.module.css";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

function getPostListResponse(responseBody: GetPostListResponseDto | ResponseDto | null) {
  if (!responseBody || responseBody.code !== "SU") return;

  const { postList } = responseBody as GetPostListResponseDto;
  return postList;
}

export default async function BlogHome({ searchParams }: Params) {
  const { sortBy = "write_datetime", order = "desc" } = await searchParams;
  const postList = await getPostListRequest().then(getPostListResponse);
  const sortedPostList = sortPostList(sortBy, order, postList);

  return (
    <main className={styles["container"]}>
      <SecretNavigation type="post" />
      <Header type="blog" />
      {sortedPostList ? (
        <section className={styles["content"]}>
          {sortedPostList.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </section>
      ) : (
        <FadeIn duration={1} delay={0.2}>
          <p className={styles["not-loading"]}>게시물 목록을 불러올 수 없습니다.</p>
        </FadeIn>
      )}
    </main>
  );
}
