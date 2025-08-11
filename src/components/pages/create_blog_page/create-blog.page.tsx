"use client";
import React, { useEffect, useState } from "react";
import AdminContainer from "@/components/admin-container";
import BlogCreationModal from "./components/blog-creation-model.component";
import {
  BlogFormData,
  BlogPost,
  BlogPostResponse,
} from "@/app/types/create-blog-page.types";
import BlogListsComponent from "./components/blog-lists.component";
import EmptyStateComponent from "@/components/empty-state-component";
import { toast } from "react-hot-toast";
import BlogEditModal from "./components/blog-edit-model.component";
import uploadImageToCloudinary from "@/helpers/cloudinary/upload-image.cloudinary";
import deleteImageFromCloudinary from "@/helpers/cloudinary/delete-image.cloudinary";
import fetchAllBlogsApi from "@/helpers/api_callers/fetch-all-blogs.api.callers";

const CreateBlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPosts, setTotalNumberOfPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBlogData, setEditBlogData] = useState<BlogPost | null>(null);

  const handleBlogEditSubmit = async (data: BlogFormData) => {
    if (!editBlogData) {
      return;
    }

    try {
      // If the image is a file, we need to delete the old image and upload the new one
      // Then get the url of the new image and update the blog post with the new image URL
      if (typeof data.image === "object") {
        // First delete the old image.
        await deleteImageFromCloudinary(editBlogData.image as string);

        const uploadDataSecureUrl = await uploadImageToCloudinary(data.image);

        const newData = {
          ...data,
          imageUrl: uploadDataSecureUrl, // Use the secure URL from Cloudinary
        };

        delete newData.image; // Remove the image file from the data;
        data = newData; // Update data to the new data with imageUrl
      }

      const response = await fetch(`/api/v1/blogPosts/${editBlogData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to update blog post");
      }
      // Update the local state with the edited blog post
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editBlogData.id
            ? {
                ...post,
                ...data,
                image: typeof data.image === "string" ? data.image : post.image, // Ensure image is a string
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

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
      if (data.image) {
        // This ensures that the Image file is present
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

     const allBlogs = await fetchAllBlogsApi(page); // Refetch the blog posts to include the new one
      setBlogPosts(allBlogs.posts.map((post: BlogPostResponse) => ({
        ...post,
        image: post.imageUrl, // Ensure image is a string for display
        date: post.date?.slice(0, 10), // Format date to YYYY-MM-DD
      })) as BlogPost[]);

      setPage(allBlogs.page);
      setTotalNumberOfPosts(allBlogs.totalNumberOfPosts);
      setTotalPages(allBlogs.totalPages);
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

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`/api/v1/blogPosts?page=${page}&limit=6`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data: {
          page: number;
          posts: BlogPostResponse[];
          totalNumberOfPosts: number;
          totalPages: number;
        } = await response.json();
        const transformedPosts = data.posts.map((post: BlogPostResponse) => ({
          ...post,
          image: post.imageUrl, // Ensure image is a string for display
          date: post.date?.slice(0, 10), // Format date to YYYY-MM-DD
        })) as BlogPost[];
        setBlogPosts(transformedPosts);
        setPage(data.page);
        setTotalNumberOfPosts(data.totalNumberOfPosts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [page]);

  const handleButtonClicked = () => {
    setIsModalOpen(true);
  };

  const handleDeletePost = async () => {
    // Refetch the current page data after deletion
    try {
      const response = await fetch(`/api/v1/blogPosts?page=${page}&limit=6`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      const data: {
        page: number;
        posts: BlogPostResponse[];
        totalNumberOfPosts: number;
        totalPages: number;
      } = await response.json();
      const transformedPosts = data.posts.map((post: BlogPostResponse) => ({
        ...post,
        image: post.imageUrl,
        date: post.date?.slice(0, 10),
      })) as BlogPost[];
      setBlogPosts(transformedPosts);
      setTotalNumberOfPosts(data.totalNumberOfPosts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error refetching blog posts:", error);
    }
  };

  if (error) {
    toast.error(`Error: ${error}`, {
      id: "fetch-blog-posts-error",
    });
    return (
      <AdminContainer>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      {blogPosts && blogPosts.length > 0 ? (
        <BlogListsComponent
          page={page}
          setPage={setPage}
          blogPostsProp={blogPosts}
          setIsModalOpen={setIsModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          setEditBlogData={setEditBlogData}
          isModalOpen={isModalOpen}
          totalNumberOfPosts={totalNumberOfPosts}
          totalPages={totalPages}
          onDeletePost={handleDeletePost}
        />
      ) : loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading blog posts...</p>
        </div>
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
      {isEditModalOpen && editBlogData && (
        <BlogEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleBlogEditSubmit}
          editBlogData={editBlogData}
        />
      )}
    </AdminContainer>
  );
};

export default CreateBlogPage;
