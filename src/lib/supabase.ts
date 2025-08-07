import { blogPostsSupabaseResponse } from "@/app/types/backend/blog-post.backend.types";
import { createClient } from "@supabase/supabase-js";

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export const getDataFromSupabase = async (tableName: string) => {
  try {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error("Error fetching data from Supabase:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    throw error;
  }
};

export const insertIntoSupabase = async (
  tableName: string,
  data: blogPostsSupabaseResponse
) => {
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();

    if (error) {
      console.error("Error inserting data into Supabase:", error);
      throw error;
    }

    return insertedData;
  } catch (error) {
    console.error("Error inserting data into Supabase:", error);
    throw error;
  }
};

export const updateARecordInSupabase = async (
  tableName: string,
  data: blogPostsSupabaseResponse,
  id: string
) => {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq("id", id)
      .select();
    console.log("I hite here")
    if (error) {
      console.error("Error updating data in Supabase:", error);
      throw error;
    }

    return updatedData;
  } catch (error) {
    console.error("Error updating data in Supabase:", error);
    throw error;
  }
}

export default supabase;
