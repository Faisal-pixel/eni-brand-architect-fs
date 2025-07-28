"use client";
import React from "react";
import { motion } from "motion/react";

const EventsPageHeader = () => {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[768px]"
      >
        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[rgba(105,65,198,1)] font-semibold leading-6 lg:text-[rgba(1,117,68,1)]"
        >
          Past and Upcoming Events
        </motion.div> */}

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-semibold text-[rgba(24,29,39,1)] leading-[44px] md:leading-[60px] mt-3 mb-6"
        >
          Past and Upcoming Events
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl leading-[30px] text-gray-600"
        >
          Highlights of the experiences and activations we’ve brought to life.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EventsPageHeader;
