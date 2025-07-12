import React from "react";
import JobListings from "@/components/pages/careers_page/components/job-listings.component";
import CareersPageContainer from "./components/careers-page-container";
import CareersPageHeader from "./components/careers-page-header.components";
import CTASection from "@/components/footer_section/footer-section";

// type Props = {}

const CareersPage = () => {
  return (
    <div>
      {/* CAREERS SECTION HEADER */}
      <section className="mb-8">
        <CareersPageContainer>
          <CareersPageHeader />
        </CareersPageContainer>
      </section>

      {/* JOB LISTINGS SECTION */}
      <section className="mb-8">
        <CareersPageContainer>
          <JobListings />
        </CareersPageContainer>
      </section>

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
