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

export const AddToSessionHistory = async (CompanionId: string) => {
  const { userId } = await auth();
  const supabase = await CreateSupaBaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .insert({
      companion_id: CompanionId,
      user_id: userId,
    })
    .select();
  if (error || !data) {
    throw new Error(error?.message || "Failed to add to session history");
  }
  return data;
};

export const GetRecentSessions = async (limit = 10) => {
  const supabase = await CreateSupaBaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) {
    throw new Error(error?.message || "Failed to fetch recent sessions");
  }
  return data.map(({ companions }) => companions);
};

export const GetUserSessions = async (userId: string, limit = 10) => {
  const supabase = await CreateSupaBaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) {
    throw new Error(error?.message || "Failed to fetch recent sessions");
  }
  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = await CreateSupaBaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .eq("author", userId)
    .order("created_at", { ascending: false });
  if (error || !data) {
    throw new Error(error?.message || "Failed to fetch user companions");
  }
  return data;
};

export const newCompanionsPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = await CreateSupaBaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true; // Pro users have no limits
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { count, error } = await supabase
    .from("companions")
    .select("*", { count: "exact", head: true })
    .eq("author", userId);

  if (error) {
    throw new Error(error?.message || "Failed to fetch user companions");
  }

  const currentCount = count || 0;

  if (currentCount >= limit) {
    return false;
  }

  // console.log("count", count, "currentCount", currentCount, "limit", limit);
  return true;
};
