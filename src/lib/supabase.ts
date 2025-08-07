import { createClient } from '@supabase/supabase-js';

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export const getDataFromSupabase = async (tableName: string) => {
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error('Error fetching data from Supabase:', error);
        throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    throw error;
  }
};

export default supabase;
