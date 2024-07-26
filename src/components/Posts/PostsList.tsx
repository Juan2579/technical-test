"use client";

import { useEffect } from "react";
import { usePosts } from "@/context/PostsContext";
import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import { PostsEmpty } from "./PostsEmpty";

export const PostsList = () => {
  const { posts, isLoading, handleLoadAllPosts } = usePosts();

  useEffect(() => {
    handleLoadAllPosts();
  }, []);

  if (posts.length === 0 && !isLoading) {
    return <PostsEmpty />;
  }

  return (
    <>
      {!isLoading ? (
        <div className="w-full flex flex-col">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
    </>
  );
};
