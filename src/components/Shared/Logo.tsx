import CodeIcon from "@mui/icons-material/Code";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <CodeIcon className="text-primary text-3xl md:text-5xl" />
      <span className="text-secondary text-lg font-bold md:text-xl">
        DevsPost
      </span>
    </div>
  );
};
