"use client";
import { Jobs } from "@/app/types/job-listings.types";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

type JobListingsProps = {
  jobs: Jobs;
};

const JobListings = ({ jobs }: JobListingsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Show all");
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const categories = [
    { name: "Show all", count: jobs.length },
    {
      name: "Design",
      count: jobs.filter((job) => job.jobCategory === "Design").length,
    },
    {
      name: "Development",
      count: jobs.filter((job) => job.jobCategory === "Development").length,
    },
    {
      name: "Marketing",
      count: jobs.filter((job) => job.jobCategory === "Marketing").length,
    },
    {
      name: "Management",
      count: jobs.filter((job) => job.jobCategory === "Management").length,
    },
    {
      name: "Product",
      count: jobs.filter((job) => job.jobCategory === "Product").length,
    },
  ];

  // useEffect(() => {
  //   if (descriptionRef.current) {
  //     descriptionRef.current.style.maxHeight = "none"; // Reset max-height for smooth transition
  //     descriptionRef.current.innerHTML = 
  //   }
  // }, [jobs]);


  const filteredJobs =
    selectedCategory === "Show all"
      ? jobs
      : jobs.filter((job) => job.jobCategory === selectedCategory); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-6">
          <div
            className={`transform transition-all duration-800 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <div className="flex overflow-x-auto scrollbar-hide space-x-1 bg-white">
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 cursor-pointer px-[13.5px] py-[5px] rounded-full text-sm transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-[rgba(249,249,250,1)] text-[rgba(83,88,98,1)]"
                  }`}
                  style={{
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {category.name}
                  {category.count ? (
                    <span className="ml-2 text-xs opacity-75">
                      {category.count}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block flex-shrink-0">
            <div
              className={`transform transition-all duration-800 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              <nav className="flex flex-col items-center space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={category.name}
                    className={`transform transition-all duration-600 ease-out ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-sm font-normal text-left text-[rgba(83,88,98,1)] px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                        selectedCategory === category.name
                          ? "bg-[rgba(249,249,250,1)] shadow-sm"
                          : "hover:text-gray-900 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-x-[17px]">
                        <span className="font-medium">{category.name}</span>
                        {category.count ? (
                          <span className="text-sm text-gray-500">
                            {category.count}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Job listings */}
          <div className="flex-1">
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`transform transition-all duration-800 ease-out ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <div className="bg-[rgba(249,249,250,1)] rounded-lg p-5">
                    {/* Job header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                          {job.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-500">{job.timeAgo}</p>
                      </div>
                    </div>

                    {/* Job description */}
                    <div className="mb-4">
                      {/* <p className="text-gray-700 mb-3 leading-relaxed text-sm md:text-base">
                        {job.description}
                      </p> */}
                      <p ref={descriptionRef} 
                      dangerouslySetInnerHTML={{ __html: job.detailedDescription }}
                      className="text-gray-700 leading-relaxed text-sm md:text-base">
                      </p>
                    </div>

                    {/* Job footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">
                        {job.jobType}
                      </span>
                      <Link
                        href={job.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="bg-green-700 cursor-pointer hover:bg-green-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105 text-sm md:text-base">
                          Apply
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
