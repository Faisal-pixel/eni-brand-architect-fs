import React from "react";
import JobListings from "@/components/pages/careers_page/components/job-listings.component";
import CareersPageContainer from "./components/careers-page-container";
import CareersPageHeader from "./components/careers-page-header.components";
import CTASection from "@/components/footer_section/footer-section";
import { jobs } from "@/data/job-listings.data";
import EmptyStateComponent from "@/components/empty-state-component";

// type Props = {}

const CareersPage = () => {
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
