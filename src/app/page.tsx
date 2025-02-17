import { getProjectListRequest } from "@/apis";
import { ResponseDto } from "@/apis/response";
import { GetProjectListResponseDto } from "@/apis/response/project";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import styles from "./page.module.css";

function getProjectListResponse(responseBody: GetProjectListResponseDto | ResponseDto | null) {
  if (!responseBody || responseBody.code !== "SU") return;

  const { projectList } = responseBody as GetProjectListResponseDto;
  return projectList;
}

export default async function Home() {
  const projectList = await getProjectListRequest().then(getProjectListResponse);

  return (
    <main className={styles["container"]}>
      <Header type="home" />
      {projectList ? (
        <section className={styles["content"]}>
          {projectList.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </section>
      ) : (
        <p className={styles["not-loading"]}>프로젝트 목록을 불러올 수 없습니다.</p>
      )}
    </main>
  );
}
