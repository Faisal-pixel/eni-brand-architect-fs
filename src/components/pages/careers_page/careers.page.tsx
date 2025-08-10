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

/**
 * Utility function to calculate and format the time difference between a given date and now
 * @param datePosted - ISO string date when the job was posted (e.g., "2025-08-09T20:32:17.734Z")
 * @returns Human-readable time difference (e.g., "2 hours ago", "3 days ago", "1 week ago")
 */
const getTimeAgo = (datePosted: string): string => {
  try {
    // Convert the ISO string to a Date object
    const postedDate = new Date(datePosted);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const timeDifferenceMs = currentDate.getTime() - postedDate.getTime();

    // Convert milliseconds to different time units
    const seconds = Math.floor(timeDifferenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Return appropriate time format based on the time difference
    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (weeks > 0) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "Just posted"; // For very recent posts (less than a minute)
    }
  } catch (error) {
    console.error("Error calculating time ago:", error);
    return "Recently posted"; // Fallback in case of date parsing errors
  }
};

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
          // Transform the careers data from the API into the Jobs format expected by the UI
          const jobsData: Jobs = response.careers.map((career: careers) => ({
            id: career.id,
            jobTitle: career.jobTitle,
            // Calculate the time difference between the posted date and now
            timeAgo: getTimeAgo(career.datePosted),
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
