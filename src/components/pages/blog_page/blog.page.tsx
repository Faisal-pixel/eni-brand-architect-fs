import React from "react";
import BlogHeader from "./components/blog-header.components";
import BlogPageContainer from "./components/blog-page-container";
import LatestArticleCard from "./components/latest-article-card.component";
import TabNavigation from "./components/tab-navigation";
import CTASection from "@/components/footer_section/footer-section";

const BlogPage = () => {
  return (
    <>
      {/* Header */}
      <section className="mt-[60px] mb-[52px] lg:mt-16 lg:mb-16">
        <BlogPageContainer>
          <BlogHeader />
        </BlogPageContainer>
      </section>
      {/* MAIN ARTICLE CARD */}
      <section id="blog-article-card" className="mb-12 md:mb-16">
        <BlogPageContainer>
          <LatestArticleCard
            title="Article Title"
            description="Article Description"
            author="Author Name"
            authorAvatar="/path/to/avatar.jpg"
            date="March 10, 2023"
            imageUrl="/path/to/image.jpg"
            category="Category Name"
            fileUnderTags={["Design", "Research", "Presentation"]}
            linkToArticle="/article_number/article_name"
          />
        </BlogPageContainer>
      </section>

      {/* FILTER ARTICLE BY CATEGORY NAVBAR AND DROPDOWN AND ARTICLE CARDS*/}
      <section className="mb-[134px] md:mb-16">
        <BlogPageContainer>
          <TabNavigation />
          {/* Example component to always delete */}
        </BlogPageContainer>
      </section>

      {/* CTA & FOOTER */}

      <section id="cta-section">
        <BlogPageContainer>
          <CTASection />
        </BlogPageContainer>
      </section>
    </>
  );
};

export default BlogPage;
