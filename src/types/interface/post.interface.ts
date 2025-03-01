import ResourceListItem from "./resource-list-item.interface";

export default interface Post {
  id: number;
  title: string;
  thumbnail: string | null;
  themeColor: string;
  tags: string[];
  content: string;
  resourceList: ResourceListItem[];
}
