import { getUser } from "@/actions/users";

import { LoginButton } from "@/components/Auth/LoginButton";
import { Logo } from "./Logo";
import AccountMenu from "./AccountMenu";

export const Header = async () => {
  const { errorMessage, user } = await getUser();

  return (
    <header className="w-full shadow-sm p-4 md:p-5">
      <div className="max-w-5xl mx-auto flex justify-between gap-4">
        <Logo />
        {!user ? <LoginButton /> : <AccountMenu user={user} />}
      </div>
    </header>
  );
};
