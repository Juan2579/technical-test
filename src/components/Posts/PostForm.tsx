"use client";

import { ChangeEvent, useState } from "react";
import { User, Session } from "@supabase/auth-js";
import { usePosts } from "@/context/PostsContext";

import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { enqueueSnackbar } from "notistack";

import { ProfileAvatar } from "../Shared/ProfileAvatar";
import { UploaderModal } from "../Shared/UploaderModal";
import { PostFormImage } from "./PostFormImage";

export const PostForm = ({
  user,
  session,
}: {
  user: User;
  session: Session;
}) => {
  const { isLoading, handleCreatePost } = usePosts();

  const [postContent, setPostContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [openUploaderModal, setOpenUploaderModal] = useState(false);

  const handleChangePostContent = (event: ChangeEvent<HTMLInputElement>) => {
    setPostContent(event.target.value);
  };

  const handleClickCreatePost = () => {
    handleCreatePost(postContent, postImageUrl);
    setPostContent("");
    setPostImageUrl("");
  };

  const handleOpenUploaderModal = () => {
    if (postImageUrl) {
      enqueueSnackbar("You can only upload one photo per post", {
        variant: "warning",
      });
      return;
    }

    setOpenUploaderModal(true);
  };

  const handleCloseUploaderModal = () => {
    setOpenUploaderModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 p-6 border">
      <div className="flex gap-4">
        <ProfileAvatar
          username={user.user_metadata["user_name"]}
          avatarUrl={user.user_metadata["avatar_url"]}
        />
        <div className="w-full flex flex-col gap-4">
          <TextField
            placeholder="What's your super idea for today?"
            variant="outlined"
            fullWidth
            multiline
            rows={!postImageUrl ? 3 : 0}
            onChange={handleChangePostContent}
            value={postContent}
            InputProps={{
              endAdornment: (
                <PostFormImage
                  url={postImageUrl}
                  handleCleanPhoto={() => setPostImageUrl("")}
                />
              ),
            }}
            sx={{
              ".MuiOutlinedInput-root": {
                paddingTop: "1rem",
                flexDirection: "column",
              },
            }}
          />
          <div className="w-full flex justify-between">
            <Tooltip title="Add Photo">
              <IconButton onClick={handleOpenUploaderModal}>
                <AddAPhotoIcon className="text-primary" />
              </IconButton>
            </Tooltip>
            <Button
              onClick={handleClickCreatePost}
              className="py-3 px-4 bg-primary text-white text-sm font-bold normal-case hover:bg-primary/70 disabled:text-white disabled:opacity-50 md:py-2"
              disabled={isLoading || (!postContent && !postImageUrl)}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <UploaderModal
        open={openUploaderModal}
        handleClose={handleCloseUploaderModal}
        user={user}
        session={session}
        setImageUrl={setPostImageUrl}
      />
    </div>
  );
};
