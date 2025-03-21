import { getProjectContentRequest } from "@/apis";
import { ResponseDto } from "@/apis/response";
import { GetProjectContentResponseDto } from "@/apis/response/project";
import MDX from "@/components/MDX";
import SecretNavigation from "@/components/SecretNavigation";
import styles from "./page.module.css";

interface Params {
  params: Promise<{ id: string }>;
}

function getProjectContentResponse(responseBody: GetProjectContentResponseDto | ResponseDto | null) {
  if (!responseBody) return { code: undefined, content: undefined };
  const { code } = responseBody;
  if (code !== "SU") return { code, content: undefined };

  const { content } = responseBody as GetProjectContentResponseDto;
  return { code, content };
}

export default async function ProjectDetailPage({ params }: Params) {
  const id = (await params).id;
  const { code, content } = await getProjectContentRequest(id).then(getProjectContentResponse);

  return (
    <>
      {code === "SU" ? (
        <>
          <SecretNavigation type="project" id={id} />
          <MDX content={content} />
        </>
      ) : code === "NEP" ? (
        <p className={styles["not-loading"]}>존재하지 않는 프로젝트입니다.</p>
      ) : (
        <p className={styles["not-loading"]}>내용을 불러올 수 없습니다.</p>
      )}
    </>
  );
}
