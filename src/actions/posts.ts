"use server";

import { createClient } from "@/utils/supabase/server";

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
        image_url,
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

export const createPost = async (content: string, imageUrl: string) => {
  try {
    const supabase = createClient();

    const user = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          content,
          user_uuid: user.data.user?.id,
          image_url: imageUrl
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageUrl}`
            : "",
        },
      ])
      .select();

    if (error) {
      return { errorMessage: error.message };
    }

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "Error creating post" };
  }
};
