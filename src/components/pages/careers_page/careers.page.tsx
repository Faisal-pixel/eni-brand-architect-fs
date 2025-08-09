"use client";
import React, { useEffect, useState } from "react";
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
  const [jobs, setJobs] = useState<Jobs>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error("Error fetching careers:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch careers"
        );
        // Handle error appropriately, e.g., show a toast notification
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading careers..</p>
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
