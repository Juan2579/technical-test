"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export const loginAction = async (provider: Provider) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${
          process.env.NEXT_PUBLIC_PROD_URL ?? process.env.NEXT_PUBLIC_LOCAL_URL
        }/api/auth`,
      },
    });

    if (error) return { errorMessage: error.message };

    return { errorMessage: null, url: data.url };
  } catch (error) {
    return { errorMessage: "Error logging in" };
  }
};

export const logoutAction = async () => {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) return { errorMessage: error.message };

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "Error logging out" };
  }
};

export const getUser = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) return { userErrorMessage: error.message };

    return { userErrorMessage: null, user: data.user };
  } catch (error) {
    return { userErrorMessage: "Error getting user" };
  }
};

export const getSession = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) return { sessionErrorMessage: error.message };

    return { sessionErrorMessage: null, session: data.session };
  } catch (error) {
    return { sessionErrorMessage: "Error getting session" };
  }
};
