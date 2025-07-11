"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface DesignCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
}

const DesignCard: React.FC<DesignCardProps> = ({
  title,
  description,
  author,
  date,
  imageUrl,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl group cursor-pointer"
    >
      <div className="relative w-full h-[500px]">
        <Image
          src={imageUrl}
          alt="Design card background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-500"></div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <motion.h2
          className="text-2xl font-semibold mb-2"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>
        <p className="mb-4 text-sm text-gray-200 max-w-xl">
          {description}
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Author"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span>{author}</span>
          </div>
          <span className="text-gray-300">|</span>
          <span>{date}</span>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
            Design
          </span>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
            Research
          </span>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
            Presentation
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DesignCard;
