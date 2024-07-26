import { Typography } from "@mui/material";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";

export const PostsEmpty = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center p-6 border">
      <Diversity1OutlinedIcon className="text-8xl text-primary" />
      <Typography className="text-lg font-bold">
        Be the first user in create a post!
      </Typography>
    </div>
  );
};
