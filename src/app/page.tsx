import { getSession, getUser } from "@/actions/users";

import { PostForm } from "@/components/Posts/PostForm";
import { PostsList } from "@/components/Posts/PostsList";

export default async function Home() {
  const { userErrorMessage, user } = await getUser();
  const { sessionErrorMessage, session } = await getSession();

  return (
    <main className="w-full mx-auto max-w-xl flex flex-col justify-center items-center shadow-sm border">
      {user && session && <PostForm user={user} session={session} />}
      <PostsList user={user} />
    </main>
  );
}
