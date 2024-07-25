import { Backdrop, CircularProgress } from "@mui/material";

export const Loader = ({ open }: { open: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress className="text-primary" />
    </Backdrop>
  );
};
