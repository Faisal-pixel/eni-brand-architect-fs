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
  title: string;
}
const MarketingModalPopUpComponent: React.FC<ModalPopUpProps> = ({
  isOpen,
  onClose,
  title,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/20 flex  z-50 "
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
                  {title}
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
                    Expanding your reach and amplifying your brand&#39;s
                    message. We drive engagement, conversions, and ROI through
                    targeted marketing campaigns and strategic partnerships.
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
                    <VideoComponent videoSrc="https://res.cloudinary.com/daya1fdka/video/upload/v1754487230/Landing_page_video_1_pt9vll.mov" />
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

export default MarketingModalPopUpComponent;
