"use client";
import React from "react";
import Container from "../container";
import HeroVideoSection from "../hero_section/hero-section";
import TrustedBrandsSection from "../trusted_brands/trusted-brands-section";
import WhySuccessfulCompaniesChooseEBASection from "../why_successful_companies_choose_eba/why-successful-companies-choose-eba";
import Container2 from "../container-2";
import ServiceSection from "../services_section/service-section";
import ProjectShowcaseSection from "../project_showcase_section/project-showcase-section";
import TestimonialsSection from "../testimonial_section/testimonial-section";
import FastGrowingTeamSection from "../fast_growing_teams_section/fast-growing-teams-section";
import FAQSection from "../faq_section/faq-section";
import ContactSection from "../contact_us_section/contact-us-section";
import NewsletterSection from "../news_letter_section/news-letter-section";
import CTASection from "../footer_section/footer-section";

// type Props = {}

function HomePage() {

  return (
    <div>
      

      {/* NAVBAR */}
      {/* <NavBar /> */}

      <section id="hero">
        <Container>
          <HeroVideoSection />
        </Container>
      </section>

      <section id="trusted-brands">
        <Container>
          <TrustedBrandsSection />
        </Container>
      </section>

      <section
        id="why-successful-companies-choose-eba"
        className="bg-[rgba(234,243,240,1)] "
      >
        <Container>
          <WhySuccessfulCompaniesChooseEBASection />
        </Container>
      </section>

      <section id="services">
        <Container2>
          <ServiceSection />
        </Container2>
      </section>

      <section id="project-showcase" className="bg-[rgba(247,247,247,1)] mb-12 md:mb-16">
        <Container2>
          <ProjectShowcaseSection />
        </Container2>
      </section>

      <section id="testimonials" className="mb-12 md:mb-16">
        <Container2>
          <TestimonialsSection />
        </Container2>
      </section>

      <section id="fast-growing-teams" className="bg-[rgba(247,247,247,1)] mb-12 md:mb-16">
        <Container2>
          <FastGrowingTeamSection />
        </Container2>
      </section>

      <section id="faq" className="mb-12 md:mb-16">
        <Container2>
          <FAQSection />
        </Container2>
      </section>

      <section id="contact-us" className="mb-12 md:mb-16">
        <Container2>
          <ContactSection />
        </Container2>
      </section>

      <section id="newsletter" className="mb-12 md:mb-16">
        <Container2>
          <NewsletterSection />
        </Container2>
      </section>

      <section id="cta-section">
        <Container2>
          <CTASection />
        </Container2>
      </section>
    </div>
  );
}

export default HomePage;
