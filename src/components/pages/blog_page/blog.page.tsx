"use client";
import React, { useState, useEffect } from "react";
import BlogHeader from "./components/blog-header.components";
import BlogPageContainer from "./components/blog-page-container";
import LatestArticleCard from "./components/latest-article-card.component";
import TabNavigation from "./components/tab-navigation";
import CTASection from "@/components/footer_section/footer-section";
import EmptyStateComponent from "@/components/empty-state-component";
import slugify from "@/helpers/slugify";

// Define types for the blog post data
interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  author?: string;
  authorAvatar?: string;
  fileUnderTags?: string[];
  latestArticle?: boolean; // Indicates if this is the latest article
}

interface BlogPostsResponse {
  page: number;
  posts: BlogPost[];
  totalNumberOfPosts: number;
  totalPages: number;
}

const BlogPage = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch blog posts from your API
        const response = await fetch(`/api/v1/blogPosts?page=${page}&limit=10`);

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }

        const data: BlogPostsResponse = await response.json();

        // Transform the data if needed to match your component's expected format
        const transformedPosts = data.posts.map((post) => ({
          ...post,
          // Ensure date is formatted properly
          date: post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
          // Set default values if not provided
          author: post.author || "Admin",
          authorAvatar: post.authorAvatar || "/default-avatar.jpg",
          fileUnderTags: post.fileUnderTags || [post.category],
        }));

        setArticles(transformedPosts);
        setTotalPages(data.totalPages);
        // setTotalPosts(data.totalNumberOfPosts);

      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch blog posts"
        );
        setArticles([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [page]); // Refetch when page changes

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get the latest article (first article) for the featured card
  const latestArticle = articles.find(article => article.latestArticle === true);

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

          {/* MAIN ARTICLE CARD - Show latest article */}
          {latestArticle && (
            <section id="blog-article-card" className="mb-12 md:mb-16">
              <BlogPageContainer>
                <LatestArticleCard
                  id={latestArticle.id}
                  title={latestArticle.title}
                  description={latestArticle.description}
                  author={latestArticle.author || "Admin"}
                  authorAvatar={
                    latestArticle.authorAvatar || "/default-avatar.jpg"
                  }
                  date={latestArticle.date}
                  imageUrl={latestArticle.imageUrl || "/default-blog-image.jpg"}
                  category={latestArticle.category}
                  fileUnderTags={
                    latestArticle.fileUnderTags || [latestArticle.category]
                  }
                  linkToArticle={`/blog/${latestArticle.id}/${slugify(latestArticle.title)}`}
                />
              </BlogPageContainer>
            </section>
          )}

          {/* FILTER ARTICLE BY CATEGORY NAVBAR AND DROPDOWN AND ARTICLE CARDS*/}
          <section className="mb-[134px] md:mb-16">
            <BlogPageContainer>
              <TabNavigation totalPages={totalPages} articles={articles} page={page} setPage={setPage} />
            </BlogPageContainer>
          </section>

          {/* Pagination Controls (if you want to add pagination) */}
          {/* {totalPages > 1 && (
            <section className="mb-8">
              <BlogPageContainer>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </BlogPageContainer>
            </section>
          )} */}

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
          emptyStateDescription="We're working on fresh content and insights that will be live soon. Explore our services in the meantime."
          emptyStateButtonText="Explore Services"
        />
      )}
    </>
  );
};

export default BlogPage;
