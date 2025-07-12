"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  PaginationLeft,
  PaginationRight
} from "@/assets/icons";
import ArticleCardComponent from "./article-card.components";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("View all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Most recent");
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(10);

  const tabs = [
    "View all",
    "Design",
    "Product",
    "Software Engineering",
    "Customer Success",
  ];

  const sortOptions = [
    "Most recent",
    "Oldest first",
    "Alphabetical",
    "Most popular",
  ];

  // Sample content data matching your image
  const contentData = [
    {
      id: 1,
      category: "Design",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      author: "Olivia Rhye",
      authorAvatar: "/images/olivia-rhye.jpg",
      date: "20 Jan 2025",
      image: "/images/ux-review-presentations.jpg",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      category: "Product",
      title: "Migrating to Linear 101",
      description:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      author: "Phoenix Baker",
      authorAvatar: "/images/phoenix-baker.jpg",
      date: "19 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      category: "Software Engineering",
      title: "Building your API stack",
      description:
        "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
      author: "Lana Steiner",
      authorAvatar: "/images/lana-steiner.jpg",
      date: "18 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      category: "Leadership",
      title: "Bill Walsh leadership lessons",
      description:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
      author: "Alec Whitten",
      authorAvatar: "/images/alec-whitten.jpg",
      date: "17 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      id: 5,
      category: "Product",
      title: "PM mental models",
      description:
        "Mental models are simple expressions of complex processes or relationships.",
      author: "Demi Wilkinson",
      authorAvatar: "/images/demi-wilkinson.jpg",
      date: "16 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 6,
      category: "Design",
      title: "What is wireframing?",
      description:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
      author: "Candice Wu",
      authorAvatar: "/images/candice-wu.jpg",
      date: "15 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      id: 7,
      category: "Design",
      title: "How collaboration makes us better designers",
      description:
        "Collaboration can make our teams stronger, and our individual designs better.",
      author: "Natali Craig",
      authorAvatar: "/images/natali-craig.jpg",
      date: "14 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    },
    {
      id: 8,
      category: "Product",
      title: "Our top 10 Javascript frameworks to use",
      description:
        "JavaScript frameworks make development easy with extensive features and functionalities.",
      author: "Drew Cano",
      authorAvatar: "/images/drew-cano.jpg",
      date: "13 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    },
    {
      id: 9,
      category: "Customer Success",
      title: "Podcast: Creating a better CX Community",
      description:
        "Starting a community doesn't need to be complicated, but how do you get started?",
      author: "Orlando Diggs",
      authorAvatar: "/images/orlando-diggs.jpg",
      date: "12 Jan 2025",
      image: "",
      bgColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  // const getCategoryColor = (category: string) => {
  //   const colors: { [key: string]: string } = {
  //     Design: "bg-purple-100 text-purple-700",
  //     Product: "bg-blue-100 text-blue-700",
  //     "Software Engineering": "bg-green-100 text-green-700",
  //     Leadership: "bg-orange-100 text-orange-700",
  //     "Customer Success": "bg-pink-100 text-pink-700",
  //   };
  //   return colors[category] || "bg-gray-100 text-gray-700";
  // };

  const getFilteredContent = () => {
    if (activeTab === "View all") {
      return contentData;
    }
    return contentData.filter((item) => item.category === activeTab);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };


  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-8 md:gap-y-0 md:flex-row md:items-center md:justify-between md:border-b md:border-gray-200 ">
        {/* Tab Navigation */}
        <div className="scrollbar-hide flex items-center overflow-hidden overflow-x-scroll space-x-3 border-b border-gray-200 md:border-0 md:overflow-x-visible">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-1 py-2 text-nowrap font-semibold transition-all duration-300 transform cursor-pointer  ${
                activeTab === tab
                  ? "text-[rgba(105,65,198,1)] md:text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {tab}
              {/* Active indicator */}
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-[rgba(105,65,198,1)] md:bg-green-600 transition-all duration-300 ${
                  activeTab === tab ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 w-full md:w-auto"
          >
            <span>{sortBy}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ml-auto md:ml-0 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute w-full right-0 mt-2 md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-300 transform origin-top-right ${
              dropdownOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            {sortOptions.map((option, index) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  sortBy === option
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === sortOptions.length - 1 ? "rounded-b-lg" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area with Reveal Animation */}
      <div className="mt-12 md:mt-16 opacity-0 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample content cards */}
          {getFilteredContent().map((item, index) => (
            <ArticleCardComponent 
              key={item.id}
              index={index}
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              author={item.author}
              date={item.date}
              image={item.image || "/images/default-article-image.jpg"}
              bgColor={item.bgColor}
              authorAvatar={item.authorAvatar || "/images/default-avatar.jpg"}
            />
          ))}
        </div>

        {/* Pagination - Mobile Only */}
        <div className="mt-12 flex items-center md:hidden">
          <div className="w-full flex items-center justify-between space-x-4 pt-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                currentPage === 1
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 active:scale-95'
              }`}
            >
              
              <Image src={PaginationLeft} alt="Previous Page" className="w-5 h-5" />
            </button>
            
            {/* Page Indicator */}
            <div className="">
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                currentPage === totalPages
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 active:scale-95'
              }`}
            >

              <Image src={PaginationRight} alt="Next Page" className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Pagination - Desktop */}
        <div className="mt-8 hidden md:flex items-center justify-center">
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1 mx-4">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              {/* Dots */}
              <div className="px-2">
                <span className="text-gray-400">...</span>
              </div>
              
              {[8, 9, 10].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
              }`}
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in > div > div {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default TabNavigation;
