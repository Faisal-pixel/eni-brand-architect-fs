"use client";
import React, { useState } from "react";
import AdminContainer from "@/components/admin-container";
import BlogCreationModal from "./components/blog-creation-model.component";
import { BlogFormData } from "@/app/types/create-blog-page.types";
import BlogListsComponent from "./components/blog-lists.component";
import blogPosts from "@/data/blog-posts.data";
import EmptyStateComponent from "@/components/empty-state-component";
import { toast } from "react-hot-toast";

const CreateBlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlogSubmit = async (data: BlogFormData) => {
    try {
      const signedResponse = await fetch("/api/v1/cloudinary-sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data.title }),
      });
      const signedData = await signedResponse.json();

      // Prepare the data for cloudinary
      const formData = new FormData();
      if (data.image) { // This ensures that the Image file is present
        formData.append("file", data.image);
      } else {
        throw new Error("Image file is required.");
      }
      formData.append("api_key", signedData.apiKey);
      formData.append("timestamp", signedData.timestamp);
      formData.append("signature", signedData.signature);
      formData.append("folder", signedData.folder);
      formData.append("public_id", signedData.publicId);

      // Upload to cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signedData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error?.message || "Failed to upload image");
      }

      const transformedData = {
        ...data,
        date: new Date().toISOString(),
        imageUrl: uploadData.secure_url, // Use the secure URL from Cloudinary
      };
      delete transformedData.image; // Remove the image file from the data;
      const response = await fetch("/api/v1/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      // Handle error appropriately, e.g., show a toast notification
      toast.error(
        error instanceof Error
          ? `Failed to create blog post. ${error.message}`
          : "Failed to create blog post. An unknown error occurred.",
        {
          id: "create-blog-post-error",
        }
      );
    }
  };

  const handleButtonClicked = () => {
    setIsModalOpen(true);
  };

  return (
    <AdminContainer>
      {blogPosts && blogPosts.length > 0 ? (
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
      )}
      <BlogCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBlogSubmit}
      />
    </AdminContainer>
  );
};

export default CreateBlogPage;
