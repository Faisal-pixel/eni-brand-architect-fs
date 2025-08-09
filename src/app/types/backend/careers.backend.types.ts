// Supabase database types for careers table
// This represents how data is stored in Supabase (snake_case format)
type careersSupabaseResponse = {
  id?: string;
  job_title: string;
  job_type: "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote";
  job_category:
    | "Engineering"
    | "Development"
    | "Marketing"
    | "Sales"
    | "Design"
    | "Product"
    | "Customer"
    | "Management";
  short_job_brief: string;
  date_posted: string;
  link_to_apply: string;
};

// Frontend/API types for careers (camelCase format)
// This represents how data is used in the frontend
type careers = {
  id: string;
  jobTitle: string;
  jobType: "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote";
  jobCategory:
    | "Engineering"
    | "Development"
    | "Marketing"
    | "Sales"
    | "Design"
    | "Product"
    | "Customer"
    | "Management";
  shortJobBrief: string;
  datePosted: string;
  linkToApply: string;
};

export type { careersSupabaseResponse, careers };
