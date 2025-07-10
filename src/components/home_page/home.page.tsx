"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  CalendarTopBarLogo,
  EbaNavbarLogo,
  NavLinkDivider,
  XCloseBuyYourTicketIcon,
  XCloseDropdownMenuIcon,
} from "@/assets/icons";
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
import GreenButton from "../ui_personal/green-button";
import GreenOutlineButton from "../ui_personal/green-outline-button";

// type Props = {}

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="bg-[rgba(105,65,198,1)] text-white py-3 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between ">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Image
              src={CalendarTopBarLogo}
              alt="calendar-logo"
              className="hidden md:block w-[48px] h-[48px]"
            />

            <div className="flex flex-col">
              <span className="text-base font-semibold">
                Explore the future of branding, storytelling, and digital impact
                in an inspiring live experience.
              </span>
              <span className="text-[rgba(233,215,254,1)] leading-6">
                October 12-14, 2024 • Lekki Phase 1, Lagos, Nigeria
              </span>
            </div>

            <Image
              src={XCloseBuyYourTicketIcon}
              alt="Close Ticket Icon"
              className="inline-block md:hidden cursor-pointer self-start"
            />
          </div>
          <Button className="px-4 py-[10px] bg-white text-black cursor-pointer hover:bg-white">
            Buy your Ticket
          </Button>
        </div>
      </div>

      {/* NAVBAR */}
      <section id="navbar" className="bg-white relative">
        <Container>
          <div className="py-4 px-10 md:pr-0 md:pl-20 lg:px-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image src={EbaNavbarLogo} alt="eba-logo" className="" />
              </div>

              {/* Desktop Navigation - hidden on medium tablet and smaller */}
              <nav className="hidden lg:flex items-center">
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
                <Image src={NavLinkDivider} alt="" className="mr-8 ml-12" />
                <span className="flex gap-4">
                  <Button
                    variant={"green-outline"}
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

              {/* Medium tablet navigation - shows only Blog and Career */}
              <nav className="hidden md:flex lg:hidden items-center">
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
              </nav>

              {/* Mobile hamburger menu */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="flex flex-col items-center justify-center w-8 h-8 space-y-1 cursor-pointer"
                >
                  <span className="block w-6 h-0.5 bg-black"></span>
                  <span className="block w-6 h-0.5 bg-black"></span>
                  <span className="block w-6 h-0.5 bg-black"></span>
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Mobile Menu Dropdown */}
        <div
          className={`absolute top-full right-0 w-[375px] bg-white shadow-lg z-50 md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-4 py-2.5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Image src={EbaNavbarLogo} alt="eba-logo" />
              <button onClick={toggleMenu} className="cursor-pointer">
                <Image src={XCloseDropdownMenuIcon} alt="close-menu-icon" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col">
              <div className="flex flex-col space-y-4 mb-6">
                <Link
                  href="#"
                  className="text-[rgba(31,41,55,1)] font-medium text-lg"
                  onClick={toggleMenu}
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-[rgba(31,41,55,1)] font-medium text-lg"
                  onClick={toggleMenu}
                >
                  Careers
                </Link>
              </div>

              <div className="flex space-x-2 mt-auto">
                <GreenOutlineButton
                  title="Download the Brochure"
                  className="px-[7.75px] py-[11px] cursor-pointer text-sm"
                  onClickFunction={toggleMenu}
                />
                <GreenButton
                  title="Book a Consultation"
                  className="px-[19.25px] py-[11px] cursor-pointer text-sm"
                  onClickFunction={toggleMenu}
                />
              </div>
            </nav>
          </div>
        </div>
      </section>

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
