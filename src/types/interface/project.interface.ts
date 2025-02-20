import ResourceListItem from "./resource-list-item.interface";

export default interface Project {
  id: string;
  name: string;
  thumbnail: string | null;
  themeColor: string;
  description: string;
  content: string;
  resourceList: ResourceListItem[];
}
