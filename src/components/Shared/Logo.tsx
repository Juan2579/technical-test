import CodeIcon from "@mui/icons-material/Code";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <CodeIcon sx={{ fontSize: 56 }} className="text-primary" />
      <span className="text-xl font-bold">DevsPost</span>
    </div>
  );
};
