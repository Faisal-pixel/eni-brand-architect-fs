import React from "react";
import JobListings from "@/components/pages/careers_page/components/job-listings.component";
import CareersPageContainer from "./components/careers-page-container";
import CareersPageHeader from "./components/careers-page-header.components";

// type Props = {}

const CareersPage = () => {
  return (
    <div>
      {/* CAREERS SECTION HEADER */}
      <section>
        <CareersPageContainer>
          <CareersPageHeader />
        </CareersPageContainer>
      </section>

      {/* JOB LISTINGS SECTION */}
      <section>
        <CareersPageContainer>
          <JobListings />
        </CareersPageContainer>
      </section>
    </div>
  );
};

export default CareersPage;
