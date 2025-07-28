import {z} from "zod";

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, "Description is required").max(500, 'Description must be less than 500 characters'),
  date: z.string().min(1, 'Date is required'),
  image: z.union([z.string().url(), z.instanceof(File)]).optional(),
  content: z.string().min(1, 'Content is required'),
//   authorName: z.string().min(1, 'Author name is required'),
//   authorImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
  category: z.enum(['inspiration'], {
    errorMap: () => ({ message: 'Please select a valid category' })
  })
});

type BlogFormData = z.infer<typeof blogSchema>;

export type {BlogFormData}
export {blogSchema}