"use client";

import { useState } from "react";
import { Post } from "@/types/Post";
import { User } from "@supabase/auth-js";

import { Button, Typography } from "@mui/material";

import { getPostedDate } from "@/utils/getPostedDate";

import { ProfileAvatar } from "../Shared/ProfileAvatar";
import { CommentForm } from "../Comments/CommentForm";
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
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4">
          <ProfileAvatar
            username={post.author.username}
            avatarUrl={post.author.avatar_url}
          />
          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">{post.author.username}</span>
              <span className="text-sm">{getPostedDate(post.created_at)}</span>
            </div>
            {post.content && <span className="break-all">{post.content}</span>}
          </div>
        </div>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={`${post.author.username}'s post image `}
            className="w-full max-h-80 object-cover"
          />
        )}
        <div className="w-full flex flex-col gap-4">
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
