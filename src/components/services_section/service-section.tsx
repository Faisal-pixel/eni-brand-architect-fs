"use client";

import B2BSolutions from "../b2b_solutions_section/b2b-solutions-section";
import MarketingAmplificationSection from "./marketing_amplification_section/marketing-amplification";
import MediaProdAndEventCoverage from "./media_production_and_event_coverage_section/m-prod-and-event-cov";
import PRAndCommunication from "./public_relations_and_communication_section/public-relations-and-communication";
import BrandingIdentity from "./branding-and-identity";
import ServiceHeader from "./service-header";

const ServiceSection = () => {
  

  return (
    <div className="">
        <ServiceHeader />

        <BrandingIdentity />

        <PRAndCommunication />

        <MarketingAmplificationSection />

        <MediaProdAndEventCoverage />

        <B2BSolutions />
    </div>
  );
};

export default ServiceSection;