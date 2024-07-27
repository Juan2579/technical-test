import { getUser } from "@/actions/users";

import { PostForm } from "@/components/Posts/PostForm";
import { PostsList } from "@/components/Posts/PostsList";

export default async function Home() {
  const { errorMessage, user } = await getUser();

  return (
    <main className="w-full mx-auto max-w-xl flex flex-col justify-center items-center shadow-sm border">
      {user && <PostForm user={user} />}
      <PostsList user={user} />
    </main>
  );
}
