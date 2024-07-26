import { Avatar, Box, Skeleton } from "@mui/material";

export const PostSkeleton = () => {
  return (
    <Box className="w-full flex gap-4 p-6 border">
      <Skeleton variant="circular" width={40} height={40}>
        <Avatar />
      </Skeleton>
      <Box className="w-full flex flex-col">
        <Skeleton width="40%" />
        <Skeleton width="90%" />
      </Box>
    </Box>
  );
};
