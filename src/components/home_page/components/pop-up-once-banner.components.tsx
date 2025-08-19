import React from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { XCloseUpPopUpOnceIcon } from "@/assets/icons";
import Image from "next/image";
import GreenButton from "@/components/ui_personal/green-button";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PopUpOnceBanner = ({ isOpen, onClose }: Props) => {
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
  return (
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
            className="bg-white rounded-[8px] flex flex-col shadow-2xl max-w-[300px] md:max-w-[684px] overflow-hidden pt-[10px] md:pt-[24px] pb-[10px] md:pb-[44px] px-[14px] md:px-[40px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex cursor-pointer" onClick={onClose}>
              <Image
                src={XCloseUpPopUpOnceIcon}
                alt="Close"
                className="ml-auto"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <Image
                src="/images/events/anticipate-sip-and-paint.png"
                alt="pop once img"
                className=" h-[300px] md:h-auto w-auto"
                width={294}
                height={394}
              />

              <div className="self-start">
                <div className="mb-8">
                  <h3 className="mb-2 text-lg font-medium leading-[28px]">
                    The Eniivy Experience (Sip & Share Edition)
                  </h3>
                  <p className="text-sm leading-[20px]">
                    Register for the Eniivy Experience (Sip & Share Edition)
                  </p>
                </div>

                <Link href="https://forms.gle/8bGKXFwRTf29TNhB7" target="_blank" rel="noopener noreferrer">
                  <GreenButton
                    title="Register"
                    className="w-full cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopUpOnceBanner;
