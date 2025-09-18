'use server';
import { auth } from "@clerk/nextjs/server";
import { CreateSupaBaseClient } from "../supabase";

export const CreateCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();

  // Await the function call to get the Supabase client
  const supabase = await CreateSupaBaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({
      ...formData,
      author,
    })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create companion");
  }

  return data[0];
};
