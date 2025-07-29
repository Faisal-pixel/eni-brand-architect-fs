import React from "react";
import BlogHeader from "./components/blog-header.components";
import BlogPageContainer from "./components/blog-page-container";
import LatestArticleCard from "./components/latest-article-card.component";
import TabNavigation from "./components/tab-navigation";
import CTASection from "@/components/footer_section/footer-section";
import articles from "@/data/blog-articles.data";
import EmptyStateComponent from "@/components/empty-state-component";

const BlogPage = () => {
  return (
    <>
      {articles && articles.length > 0 ? (
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
                category="Inspiration"
                fileUnderTags={["Design", "Research", "Presentation"]}
                linkToArticle="/article_number/article_name"
              />
            </BlogPageContainer>
          </section>

          {/* FILTER ARTICLE BY CATEGORY NAVBAR AND DROPDOWN AND ARTICLE CARDS*/}
          <section className="mb-[134px] md:mb-16">
            <BlogPageContainer>
              <TabNavigation articles={articles} />
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
      ) : (
        <EmptyStateComponent
          emptyStateTitle="No blog posts available"
          emptyStateDescription="We’re working on fresh content and insights that will be live soon. Explore our services in the meantime."
          emptyStateButtonText="Explore Services"
        />
      )}
    </>
  );
};

export default BlogPage;
