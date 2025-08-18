import { blogPostsSupabaseResponse } from "@/app/types/backend/blog-post.backend.types";
import { newsletterSupabaseResponse } from "@/app/types/backend/newsletter.backend.types";
import { createClient } from "@supabase/supabase-js";

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

export const getASingleDataFromSupabase = async (
  tableName: string,
  searchValue: string,
  searchField: string = "id"
) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq(searchField, searchValue)
      .single();


    if(error && !data) {
      return data
    }

    if (error) {
      throw error;
    }

    return data as blogPostsSupabaseResponse | newsletterSupabaseResponse;
  } catch (error) {
    console.error("Error fetching single data from Supabase:", error);
    throw error;
  }
};

export const insertIntoSupabase = async (
  tableName: string,
  data: blogPostsSupabaseResponse | newsletterSupabaseResponse
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
    if (error) {
      console.error("Error updating data in Supabase:", error);
      throw error;
    }

    return updatedData;
  } catch (error) {
    console.error("Error updating data in Supabase:", error);
    throw error;
  }
};

export const deleteRecordFromSupabase = async (
  tableName: string,
  id: string
) => {
  try {
    const response = await supabase.from(tableName).delete().eq("id", id);

    if (response.error) {
      console.error("Error deleting data from Supabase:", response.error);
      throw response.error;
    }
  } catch (error) {
    console.error("Error deleting data from Supabase:", error);
    throw error;
  }
};

export const deleteMultipleRows = async (table: string, ids: string[]) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .in("id", ids)
      .select("id");

    if (error) {
      console.error("Error deleting multiple rows from Supabase:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error deleting multiple rows from Supabase:", error);
    throw error;
  }
};

export default supabase;
