import React from "react";
import { Button } from "../ui/button";
import { CalendarTopBarLogo, EbaNavbarLogo, NavLinkDivider } from "@/assets/icons";
import Image from "next/image";
import Container from "../container";
import Link from "next/link";
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
      <div className="bg-[rgba(105,65,198,1)] text-white py-3 px-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={CalendarTopBarLogo}
              alt="calendar-logo"
              className="w-[48px] h-[48px]"
            />

            <div className="flex flex-col">
              <span className="text-base font-semibold">
                Explore the future of branding, storytelling, and digital impact
                in an inspiring live experience.
              </span>
              <span className="text-sm text-[rgba(233,215,254,1)]">
                October 12-14, 2024 • Lekki Phase 1, Lagos, Nigeria
              </span>
            </div>
          </div>
          <Button className="px-4 py-[10px] bg-white text-black cursor-pointer hover:bg-white">
            Buy your Ticket
          </Button>
        </div>
      </div>

      {/* NAVBAR */}

      <header className="bg-white">
        <Container>
          <div className="py-4 px-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image src={EbaNavbarLogo} alt="eba-logo" className="" />
              </div>
              <nav className="hidden md:flex items-center">
                <span className="flex gap-x-8">
                  <Link
                    href="#"
                    className="text-[rgba(31,41,55,1)] font-medium"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="text-[rgba(31,41,55,1)] font-medium"
                  >
                    Career
                  </Link>
                </span>
                <Image src={NavLinkDivider} alt="" className="mr-8 ml-12"/>
                <span className="flex gap-4">
                    <Button
                  variant={"green-outline"}
                  size="sm"
                  className="px-[20px] py-[14px] cursor-pointer"
                >
                  Download the Brochure
                </Button>
                <Button
                  variant={"green"}
                  className="px-[20px] py-[14px] cursor-pointer"
                >
                  Book a Consultation
                </Button>
                </span>
              </nav>
            </div>
          </div>
        </Container>
      </header>

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

      <section id="why-successful-companies-choose-eba" className="bg-[rgba(234,243,240,1)] ">
        <Container>
          <WhySuccessfulCompaniesChooseEBASection />
        </Container>
      </section>

      <section id="services">
        <Container2>
          <ServiceSection />
        </Container2>
        </section>

        <section id="project-showcase">
          <Container2>
            <ProjectShowcaseSection />
          </Container2>
        </section>

        <section id="testimonials">
          <Container2>
            <TestimonialsSection />
          </Container2>
        </section>

        <section id="fast-growing-teams">
          <Container2>
            <FastGrowingTeamSection />
          </Container2>
        </section>

        <section id="faq">
          <Container2>
            <FAQSection />
          </Container2>
        </section>

        <section id="contact-us">
          <Container2>
            <ContactSection />
          </Container2>
        </section>

        <section id="newsletter">
          <Container2>
            <NewsletterSection />
          </Container2>
        </section>

        <section id="cta-section">
          <CTASection />
        </section>
    </div>
  );
}

export default HomePage;
