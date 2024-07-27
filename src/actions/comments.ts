"use server";

import { createClient } from "@/utils/supabase/server";

export const createComment = async (postId: number, content: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, content }])
      .single();

    return { errorMessage: error?.message };
  } catch (error) {
    return { errorMessage: "Error creating comment" };
  }
};
