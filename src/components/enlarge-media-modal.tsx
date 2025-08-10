import { MediaItem } from "@/app/types/modal-pop-up.types";
import optimizeCloudinaryUrl from "@/helpers/optimizeCloudinaryImage";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mediaItem: MediaItem; // Assuming MediaItem is defined in your types
};

const EnlargeMediaModal = ({ isOpen, onClose, mediaItem }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
        >
          <div className="relative overflow-hidden max-w-5xl w-[90%] md:w-full h-[70vh]">
            {mediaItem.type === "image" ? (
              <Image
                src={optimizeCloudinaryUrl(mediaItem.src, 1300)}
                alt={mediaItem.alt || ""}
                fill
                unoptimized
                className="w-full h-full object-contain rounded-[6px] hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 rounded-[6px] flex items-center justify-center relative overflow-hidden">
                <video
                  src={mediaItem.src}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnlargeMediaModal;
