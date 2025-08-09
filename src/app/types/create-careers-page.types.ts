import { z } from "zod";

const careerSchema = z.object({
  jobTitle: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"], {
    errorMap: () => ({ message: "Please select a valid job type" }),
    }),
  shortJobBrief: z.string().min(1, "Short job brief is required"),
  jobCategory: z.enum(["Engineering", "Development", "Marketing", "Sales", "Design", "Product", "Customer", "Management"], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  linkToApply: z.string().url("Invalid URL").min(1, "Link is required"),
});

type CareerFormData = z.infer<typeof careerSchema>;

// type CareerPost = {
//   id: string;
//   jobTitle: string;
//   shortJobBrief: string;
//   jobType: "full-time" | "part-time" | "contract";
//   category: "design" | "product" | "marketing";
//   datePosted: string; // Date in ISO format
// };

type CareerPost = {
    id: string;
    jobTitle: string;
    jobType: "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote";
    jobCategory: "Engineering"| "Development" | "Marketing" | "Sales" | "Design" | "Product" | "Customer" | "Management";
    shortJobBrief: string;
    datePosted: string;
    linkToApply: string;
};

export type { CareerFormData, CareerPost};
export { careerSchema };
