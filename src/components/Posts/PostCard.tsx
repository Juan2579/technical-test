import React from "react";
import { ProfileAvatar } from "../Shared/ProfileAvatar";
import { Post } from "@/types/Post";

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="w-full flex gap-4 p-6 border">
      <ProfileAvatar
        username={post.author.username}
        avatarUrl={post.author.avatar_url}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">{post.author.username}</span>
          <span className="text-sm">
            {new Date(post.created_at).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};
