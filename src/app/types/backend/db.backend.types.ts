import { blogPosts } from "./blog-post.backend.types"
import { career } from "./career.backend.types";

type dbData = {
    blogPosts: blogPosts[];
    careers: career[]
}

export type { dbData };