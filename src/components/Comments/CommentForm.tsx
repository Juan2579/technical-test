"use client";

import { ChangeEvent, useState } from "react";
import { usePosts } from "@/context/PostsContext";

import { Post } from "@/types/Post";
import { User } from "@supabase/auth-js";

import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const CommentForm = ({ post, user }: { post: Post; user: User }) => {
  const { handleCreateComment } = usePosts();
  const [commentContent, setCommentContent] = useState("");

  const isPostFromCurrentUser =
    post.author.username === user.user_metadata["user_name"];

  const handleChangecommentContent = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.target.value);
  };

  const handleClickCreateComment = () => {
    handleCreateComment(post.id, commentContent);
    setCommentContent("");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <TextField
        className="w-full"
        variant="standard"
        multiline
        placeholder={
          isPostFromCurrentUser
            ? "Leave a comment on your post"
            : `Leave a comment on ${post.author.username}'s post`
        }
        value={commentContent}
        onChange={handleChangecommentContent}
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ padding: 2, paddingRight: 1 }} position="end">
              <Tooltip title="Send comment">
                <IconButton
                  onClick={handleClickCreateComment}
                  disabled={commentContent.length === 0}
                  edge="end"
                >
                  <SendIcon
                    className={`${
                      commentContent.length > 0
                        ? "text-primary"
                        : "text-primary/50"
                    }`}
                  />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
