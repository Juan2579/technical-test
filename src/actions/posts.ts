"use server";

import { Post } from "@/types/Post";
import { createClient } from "@/utils/supabase/server";

interface GetAllPostsResponse {
  errorMessage: string | null;
  data: Post[];
}

export const getAllPosts = async () => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        content,
        created_at,
        author:profiles(username, avatar_url),
        comments(
          id,
          content,
          created_at,
          author:profiles(username, avatar_url)
        )
      `
      )
      .order("created_at", { ascending: false })
      .order("created_at", { referencedTable: "comments", ascending: false });

    if (error) {
      return { errorMessage: error.message, data: [] };
    }

    return { errorMessage: null, data };
  } catch (error) {
    return { errorMessage: "Error getting posts", data: [] };
  }
};

export const createPost = async (content: string) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("posts")
    .insert([{ content, user_uuid: user.data.user?.id }])
    .select();

  if (error) {
    console.error("Error creating post:", error);
    return null;
  }

  return data[0];
};
