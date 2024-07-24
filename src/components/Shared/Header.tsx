import { LoginButton } from "@/components/Auth/LoginButton";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="w-full shadow-sm p-4 md:p-5">
      <div className="max-w-5xl mx-auto flex justify-between gap-4">
        <Logo />
        <LoginButton />
      </div>
    </header>
  );
};
