import { ArrowUpRightGoToArticleGrayIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  index: number;
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  image: string;
  bgColor?: string;
  authorAvatar?: string;
};

const ArticleCardComponent = ({
  index,
  id,
  title,
  description,
  category,
  author,
  date,
  image,
  bgColor,
  authorAvatar,
}: Props) => {
  console.log(image, "Image URL in ArticleCardComponent");
  return (
    <div
      key={id}
      className="bg-white hover:shadow-t-sm transition-all duration-300 transform overflow-hidden group"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Featured Image */}
      <div className="w-full h-[208.67px] md:h-[227.3333282470703px] lg:h-[261.3333435058594px] mb-4 relative overflow-hidden">
        <div
          className="w-full h-full rounded-2xl bg-cover bg-center transition-transform duration-300 "
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: bgColor,
          }}
        />
        {/* External link arrow */}
        {/* <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div> */}
      </div>

      {/* Content */}
      <div className="">
        {/* Category Tag */}
        <div className="mb-2">
          {/* <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full text-[rgba(105,65,198,1)] md:text-[rgba(1,117,68,1)] ${getCategoryColor(
                      item.category
                    )}`}
                  > */}
          <span
            className={`inline-block text-sm font-semibold text-[rgba(105,65,198,1)] md:text-[rgba(1,117,68,1)]`}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        {/* // Dynamic link based on item ID and title */}
        <Link
          href={`/blog/${id}/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="cursor-pointer"
        >
          <h3 className="flex text-lg font-semibold leading-7 text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
            {title}

            <Image
              src={ArrowUpRightGoToArticleGrayIcon}
              alt="Go to article"
              className="ml-auto"
            />
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 mb-5 line-clamp-2">{description}</p>

        {/* Author and Date */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            {authorAvatar || author === "" ? (
              <Image
                src={authorAvatar as string}
                alt={author}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            ) : (
              <span className="text-white text-xs font-medium">
                {author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{author}</div>
            <div className="text-sm text-gray-600">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardComponent;
