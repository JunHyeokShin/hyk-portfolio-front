import { getPostContentRequest } from "@/apis";
import { ResponseDto } from "@/apis/response";
import { GetPostContentResponseDto } from "@/apis/response/post";
import MDX from "@/components/MDX";
import SecretNavigation from "@/components/SecretNavigation";
import styles from "./page.module.css";

interface Params {
  params: Promise<{ id: string }>;
}

function getPostContentResponse(responseBody: GetPostContentResponseDto | ResponseDto | null) {
  if (!responseBody) return { code: undefined, content: undefined };
  const { code } = responseBody;
  if (code !== "SU") return { code, content: undefined };

  const { tags, content } = responseBody as GetPostContentResponseDto;
  return { code, tags, content };
}

export default async function PostDetailPage({ params }: Params) {
  const id = (await params).id;
  const { code, tags, content } = await getPostContentRequest(parseInt(id)).then(getPostContentResponse);

  return (
    <>
      {code === "SU" ? (
        <>
          <SecretNavigation type="post" id={id} />
          <MDX content={content} />
        </>
      ) : code === "NEP" ? (
        <p className={styles["not-loading"]}>존재하지 않는 게시물입니다.</p>
      ) : (
        <p className={styles["not-loading"]}>내용을 불러올 수 없습니다.</p>
      )}
    </>
  );
}
