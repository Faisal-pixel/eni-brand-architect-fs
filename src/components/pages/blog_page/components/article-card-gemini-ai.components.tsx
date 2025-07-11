"use client";
import Image from 'next/image';
import React, { useState } from 'react';

// Define the props interface for the ArticleCard component
interface ArticleCardProps {
  imageUrl: string; // URL for the main background image
  category: string; // Main category, e.g., "Design"
  title: string;
  description: string;
  authorName: string;
  authorAvatarUrl: string; // URL for the author's avatar image
  publishedDate: string;
  tags: string[]; // Additional tags like "Research", "Presentation"
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  category,
  title,
  description,
  authorName,
  authorAvatarUrl,
  publishedDate,
  tags,
}) => {
  // State to manage hover effect for reveal transition
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Main container for the article card
    // Responsive width, max-width, margin auto for centering
    // Relative for absolute positioning of children, overflow-hidden for image zoom effect
    // Group class enables group-hover utilities on child elements
    <div
      className="relative w-full max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto rounded-xl overflow-hidden shadow-xl
                 transition-all duration-500 ease-in-out transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Container */}
      {/* Absolute positioning to cover the entire card, with responsive height */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out
                    ${isHovered ? 'scale-105' : 'scale-100'}
                    h-[250px] md:h-[400px] lg:h-[500px]`} // Responsive height for the image area
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Fallback for image loading errors */}
        <Image
          src={imageUrl}
          alt="Article background"
          className="sr-only" // Screen reader only
          width={1200}
          height={800}
          onError={(e) => {
            // Placeholder image in case the provided URL fails
            e.currentTarget.src = `https://placehold.co/1200x800/A0A0A0/FFFFFF?text=Image+Not+Found`;
          }}
        />
        {/* Dark gradient overlay for text readability, especially on larger screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
      </div>

      {/* Content Area */}
      {/* This div holds all the text and author details. */}
      {/* For large screens, it's absolutely positioned over the image. */}
      {/* For medium/mobile, it's below the image or takes up more relative space. */}
      <div className={`relative p-5 md:p-6 lg:absolute lg:bottom-0 lg:left-0 lg:w-2/3 lg:p-10
                       transition-all duration-500 ease-out
                       ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}>

        {/* Top Right Expand Icon (always visible, positioned relative to the card) */}
        <div className="absolute top-4 right-4 text-white text-2xl opacity-75 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 16.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </div>

        {/* Main Category (visible on mobile/medium, hidden on large where it's part of tags) */}
        <p className="text-purple-400 font-semibold mb-2 text-sm md:text-base lg:hidden">
          {category}
        </p>

        {/* Title */}
        <h2 className="text-white font-bold mb-3 leading-tight">
          {/* Responsive font sizes for the title */}
          <span className="text-2xl md:text-3xl lg:text-4xl">{title}</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 mb-6 font-light">
          {/* Responsive line clamping for description */}
          <span className="line-clamp-4 md:line-clamp-3 lg:line-clamp-2 text-sm md:text-base lg:text-lg">
            {description}
          </span>
        </p>

        {/* Author and Date Section */}
        <div className="flex items-center text-white mb-6">
          <Image src={authorAvatarUrl} alt={authorName} className="w-10 h-10 rounded-full mr-4 object-cover" width={40} height={40}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/40x40/CCCCCC/000000?text=AV`; // Placeholder for avatar
            }}
          />
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Written by */}
            <div className="mr-6">
              <p className="text-xs font-semibold opacity-80">Written by</p>
              <p className="text-sm md:text-base">{authorName}</p>
            </div>
            {/* Published on */}
            <div>
              <p className="text-xs font-semibold opacity-80">Published on</p>
              <p className="text-sm md:text-base">{publishedDate}</p>
            </div>
          </div>
        </div>

        {/* File Under Tags (visible on medium/large, hidden on mobile) */}
        <div className="hidden md:block text-sm text-white">
          <p className="font-semibold mb-2 opacity-80">File under</p>
          <div className="flex flex-wrap gap-2">
            {/* Combine main category with other tags for large/medium screens */}
            {[category, ...tags].map((tag, index) => (
              <span
                key={index}
                className="inline-block border border-gray-500 rounded-full px-4 py-1 text-xs font-semibold text-gray-300
                           hover:bg-gray-700 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;