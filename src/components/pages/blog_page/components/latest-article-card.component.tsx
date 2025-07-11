"use client";
import React from "react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRightGoToArticleIcon } from "@/assets/icons";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  imageUrl: string;
  category: string;
  fileUnderTags: string[];
  linkToArticle: string;
  isLatest?: boolean;
};

const LatestArticleCard = ({
  title,
  description,
  author,
  authorAvatar,
  date,
  imageUrl,
  category,
  fileUnderTags,
  linkToArticle,
}: Props) => {
    console.log(category)
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full overflow-hidden rounded-2xl group cursor-pointer"
    >
      <div className="relative w-full h-[720px]">
        <Image
          src={imageUrl && "/images/latest-article-card.jpg"}
          alt="Design card background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/50 group-hover:via-black/30 transition duration-500"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-y-6 text-white">
        {/* ARTICLE TITLE AND DESCRIPTION */}
        <Link href={linkToArticle}>
            <div className="flex flex-col gap-y-2">
          <h2 className="flex text-2xl font-semibold leading-8">
            {title &&
              `Improve your design skills: Develop an "eye" for design.`}
            <span className="ml-auto">
              <Image
                src={ArrowUpRightGoToArticleIcon}
                alt="Arrow up right go to article icon"
              />
            </span>
          </h2>
          <p className="text-[rgba(255, 255, 255, 1)]">
            {description &&
              `Tools and trends change, but good design is timeless. Learn how to quickly develop an "eye" for design.`}
          </p>
        </div>
        </Link>

        {/* ARTICLE AUTHOR AND DATE AND FILE UNDER TAGS */}
        <div className="flex gap-x-6">
          {/* AUTHOR AND DATE */}
          <div className="flex flex-2 gap-x-8">
            {/* WRITTEN BY - AUTHOR PROFILE AND NAME */}
            <div className="flex flex-col gap-y-2">
              <span className="self-start">Written by</span>
              <div className="flex">
                {/* PROFILE PICTURE */}
                <div className="h-10 w-10 flex items-center justify-center overflow-hidden">
                  <Image
                    src={authorAvatar && "/images/article-author-profile.png"}
                    alt="Author avatar"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                </div>
                {/* AUTHOR NAME */}
                <span className="self-center ml-2">{author}</span>
              </div>
            </div>

            {/* PUBLISHED ON - DATE */}
            <div className="flex flex-col gap-y-2">
              <span className="self-start">Published on {date}</span>
              <span className="py-2">{date && "10 April, 2023"}</span>
            </div>
          </div>

          {/* FILE UNDER TAGS */}
          <div className="flex flex-col flex-1 gap-y-2 text-sm">
            <span>File under</span>

            <div className="py-2 flex flex-wrap gap-2">
              {(fileUnderTags || ["Design", "Research", "Presentation"]).map(
                (tag, index) => {
                  console.log(tag, index, typeof tag);
                  return (
                    <span
                      key={index}
                      className="bg-transparent py-0.5 px-2.5 border-[1.5px] border-white rounded-2xl"
                    >
                      {tag}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestArticleCard;
