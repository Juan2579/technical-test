import { Author } from "./Author";
import { Comment } from "./Comment";

export interface Post {
  id: number;
  content?: string;
  created_at: string;
  author: Author;
  image_url?: string;
  comments: Comment[];
}
