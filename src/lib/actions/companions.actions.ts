"use server";
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

export const GetAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  // Await the function call to get the Supabase client
  const supabase = await CreateSupaBaseClient();

  let Query = supabase.from("companions").select();

  if (subject && topic) {
    Query = Query.ilike("subject", `%${subject}%`).or(
      `topic.ilike.%${topic}%,name.ilike.%${topic}%`
    );
  } else if (subject) {
    Query = Query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    Query = Query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  Query = Query.range((page - 1) * limit, page * limit - 1).order(
    "created_at",
    { ascending: false }
  );

  const { data: companions, error } = await Query;

  if (error || !companions) {
    throw new Error(error?.message || "Failed to fetch companions");
  }

  return companions;
};

export const GetCompanionById = async (id: string) => {
  // Await the function call to get the Supabase client
  const supabase = await CreateSupaBaseClient();

  const { data: companion, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id)
    .single();

  if (error || !companion) {
    throw new Error(error?.message || "Failed to fetch companion");
  }

  return companion;
};
