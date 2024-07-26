export interface Post {
  id: number;
  content: string;
  created_at: string;
  author: Author;
}

interface Author {
  username: string;
  avatar_url: string;
}
