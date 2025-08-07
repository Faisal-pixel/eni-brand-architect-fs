// So here we want to map the object we are receiving from supabase to camel case

import { blogPosts, blogPostsSupabaseResponse } from "@/app/types/backend/blog-post.backend.types";

// and also map data we want to pass back to supabase to snake casing
export const mapBlogPostFromSupabase = (post: blogPostsSupabaseResponse) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  description: post.description,
  author: post.author,
  authorAvatar: post.author_avatar,
  date: post.date,
  imageUrl: post.image_url,
  content: post.content,
  latestArticle: post.latest_article,
});

export const mapBlogPostToSupabase = (post: blogPosts) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  description: post.description,
  author: post.author,
  author_avatar: post.authorAvatar,
  date: post.date,
  image_url: post.imageUrl,
  content: post.content,
  latest_article: post.latestArticle,
});
