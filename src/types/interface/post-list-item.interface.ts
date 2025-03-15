export default interface PostListItem {
  id: number;
  title: string;
  thumbnail: string | null;
  themeColor: string;
  tags: string[];
  createdAt: string;
}
