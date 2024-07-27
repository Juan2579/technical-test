"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { createComment } from "@/actions/comments";
import { createPost, getAllPosts } from "@/actions/posts";

import { Post } from "@/types/Post";
import { enqueueSnackbar } from "notistack";

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
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadAllPosts = async () => {
    const { errorMessage, data } = await getAllPosts();
    setPosts(data as Post[]);
    setIsLoading(false);

    if (errorMessage) enqueueSnackbar(errorMessage, { variant: "error" });
  };

  const handleCreatePost = async (newPostContent: string) => {
    setIsLoading(true);
    const { errorMessage } = await createPost(newPostContent);

    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      setIsLoading(false);
      return;
    }

    await handleLoadAllPosts();
    enqueueSnackbar("Post created successfully", { variant: "success" });
  };

  const handleCreateComment = async (idPost: number, content: string) => {
    setIsLoading(true);
    const { errorMessage } = await createComment(idPost, content);

    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      setIsLoading(false);
      return;
    }

    await handleLoadAllPosts();
    enqueueSnackbar("Comment created successfully", { variant: "success" });
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
