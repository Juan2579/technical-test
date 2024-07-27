"use client";

import { useEffect } from "react";
import { usePosts } from "@/context/PostsContext";

import { User } from "@supabase/auth-js";

import { PostCard } from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import { PostsEmpty } from "./PostsEmpty";

export const PostsList = ({ user }: { user?: User }) => {
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
            <PostCard key={post.id} post={post} user={user} />
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
