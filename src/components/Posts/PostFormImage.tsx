import { IconButton, Tooltip } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export const PostFormImage = ({
  url,
  handleCleanPhoto,
}: {
  url: string;
  handleCleanPhoto: () => void;
}) => {
  const imageBaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images`;

  return (
    <div className={`w-full pt-10 relative ${url ? "block" : "hidden"}`}>
      <Tooltip title="Delete photo">
        <IconButton onClick={handleCleanPhoto} className="absolute right-0">
          <HighlightOffOutlinedIcon
            className="bg-white rounded-full"
            fontSize="large"
            color="error"
          />
        </IconButton>
      </Tooltip>
      <img
        className="w-full h-full max-h-52 object-cover"
        src={`${imageBaseUrl}/${url}`}
        alt="Post Image Preview"
      />
    </div>
  );
};
