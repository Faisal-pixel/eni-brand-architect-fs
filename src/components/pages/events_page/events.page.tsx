import React from "react";
import EventsPageContainer from "./components/events-page-container";
import EventsPageHeader from "./components/events-page-header";
import PastAndUpcomingEventsSection from "./components/past-and-upcoming-events-section.component";
import CTASection from "@/components/footer_section/footer-section";

const EventsPage = () => {
  return (
    <>
      {/* HEADER */}
      <section id="events-page-header" className="mt-[60px] mb-[52px] lg:mt-16 lg:mb-16">
        <EventsPageContainer>
            <EventsPageHeader />
        </EventsPageContainer>
      </section>

      {/* PAST AND UPCOMING EVENTS SECTION */}
      <section className="mb-[60px] md:mb-[96px]">
        <EventsPageContainer>
          {/* Content for past and upcoming events goes here */}
          <PastAndUpcomingEventsSection />
        </EventsPageContainer>
      </section>

        {/* CTA & FOOTER */}
        <section id="cta-section">
          <EventsPageContainer>
            {/* CTA Section can be added here if needed */}
            <CTASection />
          </EventsPageContainer>
        </section>
    </>
  );
};

export default EventsPage;
