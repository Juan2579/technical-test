import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CommentForm } from "./CommentForm";
import { Post } from "@/types/Post";
import { User } from "@supabase/auth-js";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CommentCard from "./CommentCard";

interface CommentsModalProps {
  open: boolean;
  handleClose: () => void;
  post: Post;
  user?: User;
}

export const CommentsModal = ({
  open,
  handleClose,
  post,
  user,
}: CommentsModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      sx={{ zIndex: "100 !important" }}
      PaperProps={{
        style: {
          minWidth: !isMobile ? "580px" : "",
          maxWidth: "580px",
        },
      }}
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
      scroll="paper"
    >
      <DialogTitle className="w-full flex justify-between items-center">
        <Typography className="text-lg font-bold">Comments</Typography>
        <Tooltip title="Close comments">
          <IconButton onClick={handleClose}>
            <HighlightOffOutlinedIcon fontSize="large" color="error" />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent className="p-0" dividers>
        <DialogContentText>
          {post.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </DialogContentText>
      </DialogContent>
      {user && (
        <DialogActions className="p-6">
          <CommentForm post={post} user={user} />
        </DialogActions>
      )}
    </Dialog>
  );
};
