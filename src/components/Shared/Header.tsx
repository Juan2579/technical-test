import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="flex justify-between p-6 shadow-sm">
      <Logo />
    </header>
  );
};
