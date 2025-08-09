"use client";
import React, { useEffect } from "react";
import JobListings from "@/components/pages/careers_page/components/job-listings.component";
import CareersPageContainer from "./components/careers-page-container";
import CareersPageHeader from "./components/careers-page-header.components";
import CTASection from "@/components/footer_section/footer-section";
import EmptyStateComponent from "@/components/empty-state-component";
import fetchAllCareersWithoutPaginationApi from "@/helpers/api_callers/fetch-all-careers-without-pagination.api.callers";
import { careers } from "@/app/types/backend/careers.backend.types";
import { Jobs } from "@/app/types/job-listings.types";

// type Props = {}

const CareersPage = () => {
  const [jobs, setJobs] = React.useState<Jobs>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetchAllCareersWithoutPaginationApi();
      if (response && response.careers) {
        // Assuming the API returns an array of jobs
        const jobsData: Jobs = response.careers.map((career: careers) => ({
          id: career.id,
          jobTitle: career.jobTitle,
          timeAgo: "Just posted", // Placeholder, you can implement actual time logic
          detailedDescription: career.shortJobBrief || "",
          jobCategory: career.jobCategory,
          jobType: career.jobType,
          datePosted: career.datePosted,
          link: career.linkToApply,
        }));
        setJobs(jobsData);
      }
    }

    fetchJobs();
  }, [])
  return (
    <div>
      {jobs && jobs.length > 0 ? (
        <>
          {/* CAREERS SECTION HEADER */}
          <section className="mb-8">
            <CareersPageContainer>
              <CareersPageHeader />
            </CareersPageContainer>
          </section>

          {/* JOB LISTINGS SECTION */}
          <section className="mb-8">
            <CareersPageContainer>
              <JobListings jobs={jobs} />
            </CareersPageContainer>
          </section>
        </>
      ) : (
        <EmptyStateComponent
          emptyStateTitle="No open roles at the moment"
          emptyStateDescription="We’re not hiring right now, but we’re always on the lookout for creative talent. Check back soon or explore our services."
          emptyStateButtonText="Explore Services"
        />
      )}

      {/* CTA & FOOTER */}

      <section id="cta-section">
        <CareersPageContainer>
          <CTASection />
        </CareersPageContainer>
      </section>
    </div>
  );
};

export default CareersPage;
