import React, { useState, useEffect } from "react";
import { BarChart3, Target, Check } from "lucide-react";
import {
  BuildingB2BIcon,
  CheckmarkIcon,
  PalleteContentAndCreativityIcon,
} from "@/assets/icons";
import Image from "next/image";

const B2BSolutions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const b2bServices = [
    {
      title: "Access to a Registered Network of Service Providers:",
      description:
        "We connect you to a diverse network of trusted professionals, from creative talent to media partners, ensuring you have the right collaborators for your business needs.",
    },
    {
      title: "Creative Outsourcing for Agencies and Companies:",
      description:
        "Whether you're an agency looking for a reliable partner or a company in need of creative support, we provide outsourcing solutions that help bring your projects to life with expertise and efficiency.",
    },
    {
      title: "Brand-to-Brand Collaborations:",
      description:
        "We foster brand-to-brand collaborations that create meaningful connections and amplify your brand's reach, enabling you to work with other brands to co-create innovative campaigns and experiences.",
    },
    {
      title: "Plug-In Support for Campaigns, Events, and Content Execution:",
      description:
        "From content production to event management, we offer plug-in support for all aspects of your brand's campaigns, ensuring seamless execution across all touchpoints.",
    },
    {
      title: "Expert Event Production:",
      description:
        "Our team of seasoned event producers specializes in creating and executing exclusive events that resonate with your audience and elevate your brand. We understand the pulse of showbiz and tailor each event to captivate and leave a lasting impression.",
    },
  ];

  const contentServices = [
    {
      title: "Content Calendars:",
      description:
        "We create structured, strategic content calendars based on audience insights and performance metrics, ensuring every post aligns with your overall marketing goals.",
    },
    {
      title: "Copywriting, Motion Graphics & 3D Designs:",
      description:
        "We develop compelling copy and dynamic visuals, including motion graphics and 3D designs, that engage and drive action, whether it's conversions, brand affinity, or increased engagement.",
    },
    {
      title: "Infographics & Campaign Visuals:",
      description:
        "We craft shareable, platform-optimized visuals and infographics that simplify complex messages and boost audience engagement.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* B2B Solutions Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header with Icon */}
            <div className="space-y-6">
              <Image src={BuildingB2BIcon} alt="Building B2B Solutions Icon" />
              <h2 className="text-3xl font-bold text-gray-900">
                B2B Solutions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We enable seamless collaboration and growth. Through networking,
                service integration, and high-value partnerships, we create
                pathways for your business to thrive in dynamic markets.
              </p>
            </div>

            {/* Services List */}
            <div className="space-y-6">
              {b2bServices.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  <Image
                    src={CheckmarkIcon}
                    alt="Checkmark"
                    className="flex-shrink-0 w-6 h-6"
                  />
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold">{service.title}</span>{" "}
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content & Creative Strategy Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Header with Icon */}
            <div className="space-y-6">
              <Image
                src={PalleteContentAndCreativityIcon}
                alt="Building B2B Solutions Icon"
              />
              <h2 className="text-3xl font-bold text-gray-900">
                Content & Creative Strategy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Crafting content that connects deeply with your audience,
                elevating engagement across all platforms. From compelling
                visuals to impactful narratives, we design creative strategies
                that capture attention and foster lasting connections.
              </p>
            </div>

            {/* Services List */}
            <div className="space-y-6">
              {contentServices.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150 + 200}ms` }}
                >
                  <Image
                    src={CheckmarkIcon}
                    alt="Checkmark"
                    className="flex-shrink-0 w-6 h-6"
                  />
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold">{service.title}</span>{" "}
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BSolutions;
