"use client";

import { Post } from "@/types/Post";
import { User } from "@supabase/auth-js";

import { Button, Typography } from "@mui/material";

import { getPostedDate } from "@/utils/getPostedDate";

import { ProfileAvatar } from "../Shared/ProfileAvatar";
import { CommentForm } from "../Comments/CommentForm";
import { useState } from "react";
import { CommentsModal } from "../Comments/CommentsModal";

export const PostCard = ({ post, user }: { post: Post; user?: User }) => {
  const [openCommentsModal, setOpenCommentsModal] = useState(false);

  const handleOpenCommentsModal = () => {
    setOpenCommentsModal(true);
  };

  const handleCloseCommentsModal = () => {
    setOpenCommentsModal(false);
  };

  return (
    <div className="w-full flex gap-4 p-6 border">
      <ProfileAvatar
        username={post.author.username}
        avatarUrl={post.author.avatar_url}
      />
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">{post.author.username}</span>
          <span className="text-sm">{getPostedDate(post.created_at)}</span>
        </div>
        {post.content && <span>{post.content}</span>}
        {post.image_url && (
          <img
            src={post.image_url}
            alt={`${post.author.username}'s post image `}
            className="w-full object-cover"
          />
        )}
        <div className="w-full flex flex-col gap-4 pt-3">
          {user && <CommentForm post={post} user={user} />}
          <div className="w-full flex justify-end">
            {post.comments.length > 0 ? (
              <Button
                className="text-primary font-bold border-primary normal-case hover:bg-primary/5 hover:border-primary"
                variant="outlined"
                onClick={handleOpenCommentsModal}
              >
                View all {post.comments.length} comments
              </Button>
            ) : (
              <Typography className="text-primary font-semibold">
                No comments yet.
              </Typography>
            )}
          </div>
        </div>
      </div>
      <CommentsModal
        open={openCommentsModal}
        handleClose={handleCloseCommentsModal}
        post={post}
        user={user}
      />
    </div>
  );
};
