import axios from "axios";
import { ResponseDto } from "./response";
import {
  DeleteProjectResponseDto,
  GetProjectContentResponseDto,
  GetProjectListResponseDto,
  GetProjectResponseDto,
  PostProjectResponseDto,
  PutProjectResponseDto,
} from "./response/project";
import {
  DeletePostResponseDto,
  GetNextIdResponseDto,
  GetPostContentResponseDto,
  GetPostListResponseDto,
  GetPostResponseDto,
  PostPostResponseDto,
  PutPostResponseDto,
} from "./response/post";

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
const DELETE_PROJECT_URL = (id: string) => `${API_DOMAIN}/project/${id}`;

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

export const deleteProjectRequest = async (id: string, apiKey: string) => {
  const result = await axios
    .delete(DELETE_PROJECT_URL(id), createHeaders({ apiKey }))
    .then((response) => {
      const responseBody: DeleteProjectResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const GET_POST_LIST_URL = () => `${API_DOMAIN}/post`;
const GET_POST_URL = (id: number) => `${API_DOMAIN}/post/${id}`;
const GET_POST_CONTENT_URL = (id: number) => `${API_DOMAIN}/post/${id}/content`;
const GET_NEXT_ID_URL = () => `${API_DOMAIN}/post/next-id`;
const POST_POST_URL = () => `${API_DOMAIN}/post`;
const PUT_POST_URL = (id: number) => `${API_DOMAIN}/post/${id}`;
const DELETE_POST_URL = (id: number) => `${API_DOMAIN}/post/${id}`;

export const getPostListRequest = async () => {
  const result = await axios
    .get(GET_POST_LIST_URL(), { adapter: "fetch", fetchOptions: { cache: "no-store" } })
    .then((response) => {
      const responseBody: GetPostListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getPostRequest = async (id: number) => {
  const result = await axios
    .get(GET_POST_URL(id))
    .then((response) => {
      const responseBody: GetPostResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getPostContentRequest = async (id: number) => {
  const result = await axios
    .get(GET_POST_CONTENT_URL(id))
    .then((response) => {
      const resopnseBody: GetPostContentResponseDto = response.data;
      return resopnseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getNextIdRequest = async () => {
  const result = await axios
    .get(GET_NEXT_ID_URL())
    .then((response) => {
      const responseBody: GetNextIdResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postPostRequest = async (data: FormData, apiKey: string) => {
  const result = await axios
    .post(POST_POST_URL(), data, createHeaders({ apiKey }))
    .then((response) => {
      const responseBody: PostPostResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const putPostRequest = async (id: number, data: FormData, apiKey: string) => {
  const result = await axios
    .put(PUT_POST_URL(id), data, createHeaders({ apiKey }))
    .then((response) => {
      const responseBody: PutPostResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const deletePostRequest = async (id: number, apiKey: string) => {
  const result = await axios
    .delete(DELETE_POST_URL(id), createHeaders({ apiKey }))
    .then((response) => {
      const responseBody: DeletePostResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
