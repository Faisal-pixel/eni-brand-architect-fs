"use client";
import React, { useState } from "react";
import AdminContainer from "@/components/admin-container";
import BlogCreationModal from "./components/blog-creation-model.component";
import { BlogFormData } from "@/app/types/create-blog-page.types";
import BlogListsComponent from "./components/blog-lists.component";
import blogPosts from "@/data/blog-posts.data";
import EmptyStateComponent from "@/components/empty-state-component";

const CreateBlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlogSubmit = (data: BlogFormData) => {
    console.log("Form submitted", data);
  };

  const handleButtonClicked = () => {
    setIsModalOpen(true);
  };

  return (
    <AdminContainer>
      {
        blogPosts && blogPosts.length > 0 ? (
          <BlogListsComponent
        blogPostsProp={blogPosts}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
        ) : (
          <EmptyStateComponent
            emptyStateTitle="Your blog is looking empty"
            emptyStateDescription="Start sharing insights, case studies, or brand stories to inspire your audience."
            emptyStateButtonText="Add new blog post"
            handleButtonClicked={handleButtonClicked}
          />
        )
      }
      <BlogCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBlogSubmit}
      />
    </AdminContainer>
  );
};

export default CreateBlogPage;
