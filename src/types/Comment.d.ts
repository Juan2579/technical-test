import { Author } from "./Author";

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  author: Author;
  post_id: number;
}
