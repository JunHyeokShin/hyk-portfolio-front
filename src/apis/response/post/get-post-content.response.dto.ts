import { PostContent } from "@/types/interface";
import ResponseDto from "../response.dto";

export default interface GetPostContentResponseDto extends ResponseDto, PostContent {}
