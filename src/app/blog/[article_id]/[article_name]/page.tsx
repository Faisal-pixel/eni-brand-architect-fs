import React from "react";
import { notFound } from "next/navigation";
import articles from "@/data/blog-articles.data";
import ArticleMainPage from "@/components/pages/blog_page/article/article-main-page";
import CTASection from "@/components/footer_section/footer-section";
import BlogPageContainer from "@/components/pages/blog_page/components/blog-page-container";

interface BlogPostProps {
  params: {
    article_id: string;
    article_name: string;
  };
}

const BlogPost = ({ params }: BlogPostProps) => {
  // Fetch blog post data using params.article_id
  const { article_id } = params;

  // const post = fetchPostById(article_id);
  // if (!post) return notFound();
  const article = articles.find(
    (article) => article.id.toString() === article_id
  );

  if (!article) return notFound();
  return (
    <>
      <section className="max-w-[1321px] mx-auto px-[40px] md:px-[60px] mt-[150px] lg:px-[100px] blogPageLargestScreenSize:px-0">
        <ArticleMainPage article={article} />
      </section>
      <section id="cta-section">
        <BlogPageContainer>
          <CTASection />
        </BlogPageContainer>
      </section>
    </>
  );
};

export default BlogPost;

export async function generateStaticParams() {
  // This function can be used to generate static paths for the blog posts
  // For example, you can fetch a list of articles from an API or database
  const articles = [
    { id: "1", name: "first-article" },
    { id: "2", name: "second-article" },
  ];

  // I will fetch the articles from the backend

  return articles.map((article) => ({
    article_id: article.id,
    article_name: article.name,
  }));
}
