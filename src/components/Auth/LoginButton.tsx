import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const LoginButton = () => {
  return (
    <Button
      startIcon={<GitHubIcon />}
      className="py-3 px-4 bg-primary text-white text-sm font-bold normal-case hover:bg-primary/70 md:py-2"
    >
      Sign in with Github
    </Button>
  );
};
