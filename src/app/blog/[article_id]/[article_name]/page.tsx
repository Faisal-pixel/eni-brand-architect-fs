import React from "react";
import { notFound } from "next/navigation";
// import articles from "@/data/blog-articles.data";
import ArticleMainPage from "@/components/pages/blog_page/article/article-main-page";
import CTASection from "@/components/footer_section/footer-section";
import BlogPageContainer from "@/components/pages/blog_page/components/blog-page-container";
import { Article } from "@/app/types/blog-articles.types";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ article_id: string; article_name: string }>;
}) {
  const { article_id } = await params;

  try {
    // Use absolute URL for server-side fetching
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `${
            process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
          }`
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/v1/blogPosts/${article_id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return notFound();
      }
      throw new Error("Failed to fetch article");
    }

    const data: Article = await response.json();
    if (!data) return notFound();

    return (
      <>
        <section className="max-w-[1321px] mx-auto px-[40px] md:px-[60px] mt-[150px] lg:px-[100px] blogPageLargestScreenSize:px-0">
          <ArticleMainPage article={data} />
        </section>
        <section id="cta-section">
          <BlogPageContainer>
            <CTASection />
          </BlogPageContainer>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    // Use absolute URL for build-time fetching
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/v1/blogPosts`);

    if (!response.ok) {
      console.error(
        "Failed to fetch articles for static generation:",
        response.status
      );
      return []; // Return empty array instead of throwing error
    }


    const data= await response.json();



    return data.posts.map((article: Article) => ({
      article_id: article.id,
      article_name: encodeURIComponent(
        article.title.toLowerCase().replace(/\s+/g, "-")
      ), // URL-safe slug
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return []; // Return empty array to prevent build failure
  }
}
