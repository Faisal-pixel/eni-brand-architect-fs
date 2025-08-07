"use client";
import React, { useEffect, useState } from "react";
import AdminContainer from "@/components/admin-container";
import EmptyStateComponent from "@/components/empty-state-component";
import CareersListsComponent from "./components/careers-list.component";
import {
  CareerFormData,
  CareerPost,
} from "@/app/types/create-careers-page.types";
import CareersCreationModal from "./components/career-creation-modal.component";
import toast from "react-hot-toast";

const CreateCareersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalNumberOfCareers, setTotalNumberOfCareers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [careersPosts, setCareersPosts] = useState<CareerPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCareerSubmit = async (data: CareerFormData) => {
    console.log("Form submitted", data);
    try {
      const response = await fetch("/api/v1/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create career");
      }

      // Update the local state with the new career post
      setCareersPosts((prevPosts) => [...prevPosts, result]);
    } catch (error) {
      console.error("Error creating career:", error);
      // Handle error appropriately, e.g., show a toast notification
      toast.error(
        error instanceof Error
          ? `Failed to create career. ${error.message}`
          : "Failed to create career. An unknown error occurred.",
        {
          id: "create-career-error",
        }
      );
    }
  };

  const handleButtonClicked = () => {
    setIsModalOpen(true);
  };

  const handleDeletePost = async () => {
    // Refetch the current page data after deletion
    try {
      const response = await fetch(`/api/v1/careers?page=${page}&limit=6`);
      if (!response.ok) {
        throw new Error("Failed to fetch careers");
      }
      const data: {
        page: number;
        careers: CareerPost[];
        totalNumberOfCareers: number;
        totalPages: number;
      } = await response.json();
      const transformedCareers = data.careers.map((career: CareerPost) => ({
        ...career,
        datePosted: career.datePosted?.slice(0, 10), // Format date to YYYY-MM-DD
      })) as CareerPost[];
      setCareersPosts(transformedCareers);
      setTotalNumberOfCareers(data.totalNumberOfCareers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error refetching careers:", error);
    }
  };

  useEffect(() => {
    const fetchAllCareers = async () => {
      console.log("Fetching careers posts");
      try {
        const response = await fetch(`/api/v1/careers?page=${page}&limit=6`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch careers");
        }
        const data: {
          page: number;
          careers: CareerPost[];
          totalNumberOfCareers: number;
          totalPages: number;
        } = await response.json();
        const transformedCareers = data.careers.map((career: CareerPost) => ({
          ...career,
          datePosted: career.datePosted?.slice(0, 10), // Format date to YYYY-MM-DD
        })) as CareerPost[];
        setCareersPosts(transformedCareers);
        setPage(data.page);
        setTotalNumberOfCareers(data.totalNumberOfCareers);
        setTotalPages(data.totalPages);

        console.log("Fetched careers posts:", data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCareers();
  }, [page]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading careers...</p>
      </div>
    );
  }

  return (
    <AdminContainer>
      {careersPosts && careersPosts.length > 0 ? (
        <CareersListsComponent
          onCareersDeleted={handleDeletePost}
          careersPostsProp={careersPosts}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          totalNumberOfCareers={totalNumberOfCareers}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      ) : (
        <EmptyStateComponent
          emptyStateTitle="No positions listed yet."
          emptyStateDescription="Add new roles to showcase opportunities and attract talent that aligns with EBA’s vision."
          emptyStateButtonText="Add a New Role"
          handleButtonClicked={handleButtonClicked}
        />
      )}
      <CareersCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCareerSubmit}
      />
    </AdminContainer>
  );
};

export default CreateCareersPage;
