import { PostListItem } from "@/types/interface";

export const convertUrlToFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const extend = url.split(".").pop();
  const fileName = url.split("/").pop();
  const meta = { type: `image/${extend}` };

  return new File([data], fileName as string, meta);
};

export const sortPostList = (sortBy: string, order: string, postList?: PostListItem[]) => {
  if (!postList) return;

  const sortedPostList = [...postList];
  sortedPostList.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "write_datetime":
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      default:
        return 0;
    }

    return order === "asc" ? comparison : -comparison;
  });
  return sortedPostList;
};
