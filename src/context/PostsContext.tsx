"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useTransition,
} from "react";

import { createComment } from "@/actions/comments";
import { createPost, getAllPosts } from "@/actions/posts";

import { Post } from "@/types/Post";

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  handleLoadAllPosts: () => void;
  handleCreatePost: (newPostContent: string) => void;
  handleCreateComment: (idPost: number, content: string) => void;
}

export const PostsContext = createContext<PostsContextType | null>(null);

export default function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, startTransition] = useTransition();

  const handleLoadAllPosts = () => {
    startTransition(async () => {
      const { errorMessage, data } = await getAllPosts();
      setPosts(data as Post[]);
    });
  };

  const handleCreatePost = (newPostContent: string) => {
    startTransition(async () => {
      const { errorMessage } = await createPost(newPostContent);
      handleLoadAllPosts();
    });
  };

  const handleCreateComment = (idPost: number, content: string) => {
    startTransition(async () => {
      const { errorMessage } = await createComment(idPost, content);
      handleLoadAllPosts();
    });
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        isLoading,
        handleLoadAllPosts,
        handleCreatePost,
        handleCreateComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
