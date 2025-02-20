import axios from "axios";
import { ResponseDto } from "./response";
import {
  GetProjectContentResponseDto,
  GetProjectListResponseDto,
  GetProjectResponseDto,
  PostProjectResponseDto,
  PutProjectResponseDto,
} from "./response/project";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const API_DOMAIN = `${DOMAIN}/api/v1`;

interface HeaderOptions {
  isMultipartFormData?: boolean;
  apiKey?: string;
}

const createHeaders = (options: HeaderOptions): Record<string, any> => {
  const headers: Record<string, any> = {};
  if (options.isMultipartFormData) headers["Content-Type"] = "multipart/form-data";
  if (options.apiKey) headers["API-KEY"] = options.apiKey;
  return { headers };
};

const GET_PROJECT_LIST_URL = () => `${API_DOMAIN}/project`;
const GET_PROJECT_URL = (id: string) => `${API_DOMAIN}/project/${id}`;
const GET_PROJECT_CONTENT_URL = (id: string) => `${API_DOMAIN}/project/${id}/content`;
const POST_PROJECT_URL = () => `${API_DOMAIN}/project`;
const PUT_PROJECT_URL = (id: string) => `${API_DOMAIN}/project/${id}`;

export const getProjectListRequest = async () => {
  const result = await axios
    .get(GET_PROJECT_LIST_URL(), { adapter: "fetch", fetchOptions: { cache: "no-store" } })
    .then((response) => {
      const responseBody: GetProjectListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getProjectRequest = async (id: string) => {
  const result = await axios
    .get(GET_PROJECT_URL(id))
    .then((response) => {
      const responseBody: GetProjectResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getProjectContentRequest = async (id: string) => {
  const result = await axios
    .get(GET_PROJECT_CONTENT_URL(id))
    .then((response) => {
      const responseBody: GetProjectContentResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postProjectRequest = async (data: FormData, apiKey: string) => {
  const result = await axios
    .post(POST_PROJECT_URL(), data, createHeaders({ apiKey }))
    .then((response) => {
      const responseBody: PostProjectResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const putProjectRequest = async (id: string, data: FormData, apiKey: string) => {
  const result = await axios
    .put(PUT_PROJECT_URL(id), data, createHeaders({ apiKey }))
    .then((response) => {
      const responseBody: PutProjectResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
