import React, { useState, useEffect, useRef } from "react";
import { CheckmarkIcon, MediaProductionIcon } from "@/assets/icons";
import Image from "next/image";
import MediaModalPopUpComponent from "../components/media-modal-pop-up.component";
import ReactPlayer from 'react-player'

const MediaProdAndEventCoverage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);


   
  const services = [
    {
      title: "Event Production & Planning:",
      description:
        "We handle every aspect of event production, from concept to execution, creating immersive, branded experiences that leave a lasting impact on your audience.",
    },
    {
      title: "Short-form & Long-form Video:",
      description:
        "Our production team creates compelling video content, from quick promotional clips to full-length documentaries, telling your brand’s story in a way that resonates with your audience.",
    },
    {
      title: "Podcast Creation & Editing:",
      description:
        "We produce high-quality podcasts that reflect your brand’s voice, positioning your brand as an industry leader.",
    },
    {
      title: "Vlogging, BTS & Experience Storytelling:",
      description:
        "We create engaging vlogs and behind-the-scenes content, sharing your brand’s story in a personal, relatable way.",
    },
  ];
  
  const sample =
    "https://res.cloudinary.com/daya1fdka/video/upload/f_auto,q_auto/v1754487174/Landing_page_video_2_eknj4t.mov";

  return (
    <div className="py-20">
      <div className="max-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Media Showcase */}
          <div
            className={`transition-all duration-1000 ease-out order-2 lg:order-1 ${
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
                  <ReactPlayer ref={videoRef} className="!w-full !h-full aspect-video" src={sample} controls />
                </div>
                
              </div>


            </div>
          </div>

          {/* Right Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out order-1 lg:order-2 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header with Icon */}
            <div className="flex flex-col space-y-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Image src={MediaProductionIcon} alt="Media Production & Event Coverage" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Media Production & Event Coverage
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Bringing your brand’s story to life. We create dynamic content and
              capture key moments, ensuring your brand is represented
              authentically and memorably.
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
              Explore {'>'}
            </span>
          </div>
        </div>
      </div>
      <MediaModalPopUpComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MediaProdAndEventCoverage;
