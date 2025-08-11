// So here we want to map the object we are receiving from supabase to camel case

import {
  blogPosts,
  blogPostsSupabaseResponse,
} from "@/app/types/backend/blog-post.backend.types";
import {
  careers,
  careersSupabaseResponse,
} from "@/app/types/backend/careers.backend.types";
import { newsletter, newsletterSupabaseResponse } from "@/app/types/backend/newsletter.backend.types";

// ===== BLOG POST MAPPERS =====

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

// ===== CAREER MAPPERS =====

// Convert data FROM Supabase (snake_case) TO our frontend format (camelCase)
// This is used when we GET data from the database
export const mapCareerFromSupabase = (
  career: careersSupabaseResponse
): careers => ({
  id: career.id || "", // Add default empty string if id is undefined
  jobTitle: career.job_title,
  jobType: career.job_type,
  jobCategory: career.job_category,
  shortJobBrief: career.short_job_brief,
  datePosted: career.date_posted,
  linkToApply: career.link_to_apply,
});

// Convert data FROM our frontend format (camelCase) TO Supabase format (snake_case)
// This is used when we POST/PUT data to the database
export const mapCareerToSupabase = (
  career: careers
): careersSupabaseResponse => ({
  id: career.id,
  job_title: career.jobTitle,
  job_type: career.jobType,
  job_category: career.jobCategory,
  short_job_brief: career.shortJobBrief,
  date_posted: career.datePosted,
  link_to_apply: career.linkToApply,
});

export const mapNewsLetterFromSupabase = (
  newsletter: newsletterSupabaseResponse
): newsletter => ({
  id: newsletter.id || "",
  email: newsletter.email ?? "",
  timestamp: newsletter.timestamp ?? "",
  source: newsletter.source ?? "",
  userAgent: newsletter.user_agent ?? "",
  referrer: newsletter.referrer ?? "",
});

export const mapNewsLetterToSupabase = (
  newsletter: newsletter
): newsletterSupabaseResponse => ({
  id: newsletter.id,
  email: newsletter.email,
  timestamp: newsletter.timestamp,
  source: newsletter.source,
  user_agent: newsletter.userAgent,
  referrer: newsletter.referrer,
});