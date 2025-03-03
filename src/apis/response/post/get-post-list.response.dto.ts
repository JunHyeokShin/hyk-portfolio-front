import { PostListItem } from "@/types/interface";
import ResponseDto from "../response.dto";

export default interface GetPostListResponseDto extends ResponseDto {
  postList: PostListItem[];
}
