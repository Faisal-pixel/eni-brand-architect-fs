"use client";
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { CheckmarkIcon, XModalIcon } from "@/assets/icons";
import VideoComponent from "@/components/video-component";

interface ModalPopUpProps {
  isOpen: boolean;
  onClose: () => void;
}
const MediaModalPopUpComponent: React.FC<ModalPopUpProps> = ({
  isOpen,
  onClose,
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/20 flex z-50 "
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-[8px] flex flex-col shadow-2xl max-w-[375px] md:max-w-[754px] lg:max-w-[1006px] mx-auto my-[23px] lg:my-[38px] max-h-[95vh] px-6 pt-6 md:px-[40px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="">
              <div className="flex flex-col ">
                <button
                  onClick={onClose}
                  className="p-2 self-end hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                  <Image
                    src={XModalIcon}
                    alt="Close Modal"
                    width={20}
                    height={20}
                    className="hidden"
                  />
                </button>
                <h2 className="text-2xl md:text-3xl leading-[38px] font-medium text-[#111827]">
                  Media Production & Event Coverage
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="mt-[16px] pb-[44px] overflow-y-auto scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                    Bringing your brand’s story to life. We create dynamic
                    content and capture key moments, ensuring your brand is
                    represented authentically and memorably.
                  </p>

                  <div className="space-y-6 px-4">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-4 transition-all duration-700 ease-out`}
                        style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                      >
                        <Image
                          src={CheckmarkIcon}
                          alt="Checkmark"
                          className="flex-shrink-0 w-6 h-6"
                        />

                        <div className="flex-1 flex flex-col gap-y-6">
                          <p className="text-gray-600 text-lg leading-relaxed">
                            <span className="">{service.title}</span>{" "}
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <VideoComponent videoSrc="https://res.cloudinary.com/daya1fdka/video/upload/v1754487174/Landing_page_video_2_eknj4t.mov" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaModalPopUpComponent;
