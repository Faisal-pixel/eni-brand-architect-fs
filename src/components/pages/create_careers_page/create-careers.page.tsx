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
import fetchAllCareersApi from "@/helpers/api_callers/fatch-all-careers.api.callers";
import CareersEditModal from "./components/career-edit-modal.component";

const CreateCareersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalNumberOfCareers, setTotalNumberOfCareers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [careersPosts, setCareersPosts] = useState<CareerPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // STATES FOR EDIT MODAL
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedCareerData, setEditedCareerData] = useState<CareerPost | null>(null);

  const handleCareerSubmit = async (data: CareerFormData) => {
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
      const newResult = await fetchAllCareersApi(page);
      const transformedCareers = newResult.careers.map((career: CareerPost) => ({
        ...career,
        datePosted: career.datePosted?.slice(0, 10), // Format date to YYYY-MM-DD
      })) as CareerPost[];
      setCareersPosts(transformedCareers);
      setPage(newResult.page);
      setTotalPages(newResult.totalPages);
      setTotalNumberOfCareers(newResult.totalNumberOfCareers);
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
      setPage(data.page);
      setCareersPosts(transformedCareers);
      setTotalNumberOfCareers(data.totalNumberOfCareers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error refetching careers:", error);
    } 
  };

  const handleCareerEdit = async (career: CareerFormData) => {
    if(!editedCareerData) {
      return
    }

    const editedCareerDataToSendToBackend: CareerPost = {
      ...career,
      id: editedCareerData.id,
      datePosted: editedCareerData.datePosted,
    };

    const response = await fetch(`/api/v1/careers/${editedCareerDataToSendToBackend.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCareerDataToSendToBackend),
    });

    if (!response.ok) {
      throw new Error("Failed to update career");
    }

    // Refetch the careers after successful edit
    toast.success("Career updated successfully", {
      id: "career-update-success",
    });
    setCareersPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === editedCareerDataToSendToBackend.id
          ? editedCareerDataToSendToBackend
          : post
      )
    );
  };

  useEffect(() => {
    const fetchAllCareers = async () => {
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
        setPage(data.page);
        setTotalNumberOfCareers(data.totalNumberOfCareers);
        setTotalPages(data.totalPages);
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
          setEdittedCareerData={setEditedCareerData}
          setIsEditModalOpen={setIsEditModalOpen}
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
      <CareersEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleCareerEdit}
        edittedCareerData={editedCareerData}
      />
    </AdminContainer>
  );
};

export default CreateCareersPage;
