"use client";
import React, { useState } from "react";
import AdminContainer from "@/components/admin-container";
import EmptyStateComponent from "@/components/empty-state-component";
import CareersListsComponent from "./components/careers-list.component";
import { CareerFormData } from "@/app/types/create-careers-page.types";
import careersPosts from "@/data/careers-posts.data";
import CareersCreationModal from "./components/career-creation-modal.component";

const CreateCareersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlogSubmit = (data: CareerFormData) => {
    console.log("Form submitted", data);
  };

  const handleButtonClicked = () => {
    setIsModalOpen(true);
  };

  return (
    <AdminContainer>
      {
        careersPosts && careersPosts.length > 0 ? (
          <CareersListsComponent
            careersPostsProp={careersPosts}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        ) : (
          <EmptyStateComponent
            emptyStateTitle="No positions listed yet."
            emptyStateDescription="Add new roles to showcase opportunities and attract talent that aligns with EBA’s vision."
            emptyStateButtonText="Add a New Role"
            handleButtonClicked={handleButtonClicked}
          />
        )
      }
      <CareersCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBlogSubmit}
      />
    </AdminContainer>
  );
};

export default CreateCareersPage;
