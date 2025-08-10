"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { XModalIcon } from "@/assets/icons";
import {
  ProjectSectionModalPopupSection,
  MediaItem,
} from "@/app/types/modal-pop-up.types";
import EnlargeMediaModal from "./enlarge-media-modal";
import optimizeCloudinaryUrl from "@/helpers/optimizeCloudinaryImage";

interface ModalPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: ProjectSectionModalPopupSection[];
}
const ModalPopUp: React.FC<ModalPopUpProps> = ({
  isOpen,
  onClose,
  title,
  data,
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "photos" | "videos">(
    "all"
  );
  const [shouldEnlargeMedia, setShouldEnlargeMedia] = useState<boolean>(false);
  const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);

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

  const getFilteredMedia = (section: ProjectSectionModalPopupSection) => {
    switch (activeFilter) {
      case "photos":
        return section.images;
      case "videos":
        return section.videos;
      case "all":
      default:
        return [...section.images, ...section.videos];
    }
  };

  const renderMediaItem = (item: MediaItem, index: number) => {
    const handleMediaClicked = (media: MediaItem) => {
      setMediaItem(media)
      setShouldEnlargeMedia(true)
    }
    return(
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer w-[157.5px] h-[157.5px] md:w-[159.5px] md:h-[159.5px] lg:w-[175.6px] lg:h-[175.6px] rounded-[6px] overflow-hidden"
      // style={{ width: "175.6px", height: "175.6px" }}
    >
      {item.type === "image" ? (
        <>
          <Image
            src={optimizeCloudinaryUrl(item.src, 175.6)}
            alt={item.alt || ""}
            width={175.6}
            height={175.6}
            onClick={() => {
              handleMediaClicked(item);
            }}
            unoptimized
            className="w-full h-full object-cover rounded-[6px] hover:scale-105 transition-transform duration-200"
          />

          
        </>
      ) : (
        <div className="w-full h-full bg-gray-900 rounded-[6px] flex items-center justify-center relative overflow-hidden">
          <video
            src={item.src}
            className="w-full h-full object-cover"
            muted
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[8px] border-l-gray-800 border-y-[6px] border-y-transparent ml-1"></div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )};

  return (<>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 "
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-[8px] flex flex-col shadow-2xl max-w-[375px] md:max-w-[754px] lg:max-w-[1006px] max-h-[80vh] overflow-hidden  pt-[24px] px-[24px] md:px-[40px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-100">
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
                <h2 className="text-lg leading-[28px] font-medium text-[#111827]">
                  {title}
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex p-1 mt-[10px] gap-x-1 border border-[#E9EAEB] w-full md:max-w-fit rounded-[10px] bg-[#FAFAFA]">
                {[
                  { key: "all", label: "All" },
                  { key: "photos", label: "Photos" },
                  { key: "videos", label: "Videos" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() =>
                      setActiveFilter(tab.key as "photos" | "videos" | "all")
                    }
                    className={`px-3 min-w-[103.66666412353516px] md:min-w-auto md:px-[65.5px] py-2 text-sm font-medium transition-colors relative cursor-pointer ${
                      activeFilter === tab.key
                        ? "bg-white text-[#414651] rounded-[6px]"
                        : "text-gray-500 hover:text-gray-700 bg-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto scrollbar-hide max-h-[calc(877px-140px)] mt-[24px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {data.map((section, sectionIndex) => {
                    const filteredMedia = getFilteredMedia(section);

                    if (filteredMedia.length === 0) return null;

                    return (
                      <motion.div
                        key={`${section.sectionTitle}-${activeFilter}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                        className="mb-12"
                      >
                        {/* Date */}
                        <h3 className="text-sm mb-4 text-gray-500">
                          {section.sectionTitle}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-8 leading-relaxed">
                          {section.paragraph}
                        </p>

                        {/* Media Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {filteredMedia.map((item, index) =>
                            renderMediaItem(item, index)
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <EnlargeMediaModal
            isOpen={shouldEnlargeMedia}
            onClose={() => setShouldEnlargeMedia(false)}
            mediaItem={mediaItem as MediaItem}
          />
    </>
  );
};

export default ModalPopUp;
