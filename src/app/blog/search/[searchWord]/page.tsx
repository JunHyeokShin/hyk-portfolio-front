import { getSearchPostListRequest } from "@/apis";
import { ResponseDto } from "@/apis/response";
import { GetSearchPostListResponseDto } from "@/apis/response/post";
import FadeIn from "@/components/FadeIn";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { sortPostList } from "@/utils";
import styles from "./page.module.css";

interface Params {
  params: Promise<{ searchWord: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

function getSearchPostListResponse(responseBody: GetSearchPostListResponseDto | ResponseDto | null) {
  if (!responseBody || responseBody.code !== "SU") return;

  const { searchList } = responseBody as GetSearchPostListResponseDto;
  return searchList;
}

export default async function PostSearchPage({ params, searchParams }: Params) {
  const searchWord = decodeURI((await params).searchWord);
  const { sortBy = "write_datetime", order = "desc" } = await searchParams;
  const searchPostList = await getSearchPostListRequest(searchWord).then(getSearchPostListResponse);
  const sortedSearchPostList = sortPostList(sortBy, order, searchPostList);

  return (
    <main className={styles["container"]}>
      <Header type="blog" />
      {sortedSearchPostList ? (
        sortedSearchPostList.length > 0 ? (
          <div className={styles["content-container"]}>
            <FadeIn duration={1} delay={0.2}>
              <p className={styles["search-result-text"]}>
                <strong>'{searchWord}'</strong>에 대한 검색 결과({sortedSearchPostList.length}):
              </p>
            </FadeIn>
            <section className={styles["content"]}>
              {sortedSearchPostList.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </section>
          </div>
        ) : (
          <FadeIn duration={1} delay={0.2}>
            <p className={styles["not-loading"]}>
              <strong>'{searchWord}'</strong>에 대한 검색 결과가 없습니다.
            </p>
          </FadeIn>
        )
      ) : (
        <FadeIn duration={1} delay={0.2}>
          <p className={styles["not-loading"]}>검색 결과를 불러올 수 없습니다.</p>
        </FadeIn>
      )}
    </main>
  );
}
