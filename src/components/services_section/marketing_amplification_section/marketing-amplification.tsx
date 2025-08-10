import React, { useState, useEffect} from "react";
import Image from "next/image";
import { CheckmarkIcon, GraphIcon } from "@/assets/icons";
import MarketingModalPopUpComponent from "../components/marketing-modal-pop-up.component";
import ReactPlayer from 'react-player'

const MarketingAmplificationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const services = [
    {
      title: "Influencer Marketing:",
      description:
        "We connect your brand with authentic influencers whose audience aligns with your values, boosting credibility and reach.",
    },
    {
      title: "Digital Ads:",
      description:
        "We optimize ad campaigns in real-time, ensuring maximum engagement, conversions, and ROI across platforms like Google, YouTube, and Meta.",
    },
    {
      title: "Billboard & LED Campaigns:",
      description:
        "We strategically place your brand in high-traffic areas to maximize visibility and audience engagement.",
    },
  ];

  const sample =
    "https://res.cloudinary.com/daya1fdka/video/upload/f_auto,q_auto/v1754487230/Landing_page_video_1_pt9vll.mov";

  return (
    <div className="py-20">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header with Icon */}
            <div className="flex flex-col space-y-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src={GraphIcon}
                  alt="Graph Icon for Marketing & Amplification"
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Marketing & Advertising
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Expanding your reach and amplifying your brand&#39;s message. We
              drive engagement, conversions, and ROI through targeted marketing
              campaigns and strategic partnerships.
            </p>

            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
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

            <span
              onClick={() => setIsModalOpen(true)}
              className="text-lg leading-[28px] text-[#017544] cursor-pointer"
            >
              Explore {">"}
            </span>
          </div>

          {/* Right Video Player */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                {/* Video Thumbnail */}
                <div className="h-full w-full flex items-center justify-center">
                  <ReactPlayer className="!w-full !h-full aspect-video" src={sample} controls />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MarketingModalPopUpComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Marketing & Amplification"
      />
    </div>
  );
};

export default MarketingAmplificationSection;
