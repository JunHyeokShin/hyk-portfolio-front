import { ProjectListItem } from "@/types/interface";
import ResponseDto from "../response.dto";

export default interface GetProjectListResponseDto extends ResponseDto {
  projectList: ProjectListItem[];
}
