"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { loginAction } from "@/actions/users";
import { Provider } from "@supabase/supabase-js";

import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Loader } from "../Shared/Loader";

export const LoginButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = (provider: Provider) => {
    startTransition(async () => {
      const { errorMessage, url } = await loginAction(provider);

      if (!errorMessage && url) {
        router.push(url);
      } else {
        console.error(errorMessage);
      }
    });
  };

  return (
    <>
      <Button
        startIcon={<GitHubIcon />}
        className="py-3 px-4 bg-primary text-white text-sm font-bold normal-case hover:bg-primary/70 disabled:text-white disabled:opacity-50 md:py-2"
        onClick={() => handleClickLoginButton("github")}
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign in with GitHub"}
      </Button>
      <Loader open={isPending} />
    </>
  );
};
