"use client";

import { ChangeEvent, useState } from "react";
import { User } from "@supabase/auth-js";
import { usePosts } from "@/context/PostsContext";

import { Button, TextField } from "@mui/material";
import { ProfileAvatar } from "../Shared/ProfileAvatar";

export const PostForm = ({ user }: { user: User }) => {
  const { isLoading, handleCreatePost } = usePosts();
  const [postContent, setPostContent] = useState("");

  const handleChangePostContent = (event: ChangeEvent<HTMLInputElement>) => {
    setPostContent(event.target.value);
  };

  const handleClickCreatePost = () => {
    handleCreatePost(postContent);
    setPostContent("");
  };

  return (
    <div className="w-full flex flex-col gap-4 p-6 border">
      <div className="flex gap-4">
        <ProfileAvatar
          username={user.user_metadata["user_name"]}
          avatarUrl={user.user_metadata["avatar_url"]}
        />
        <TextField
          label="What's your super idea for today?"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={handleChangePostContent}
          value={postContent}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button
          onClick={handleClickCreatePost}
          className="py-3 px-4 bg-primary text-white text-sm font-bold normal-case hover:bg-primary/70 disabled:text-white disabled:opacity-50 md:py-2"
          disabled={isLoading || postContent.length === 0}
        >
          Post
        </Button>
      </div>
    </div>
  );
};
