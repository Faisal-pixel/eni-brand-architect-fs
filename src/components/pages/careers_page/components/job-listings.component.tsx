"use client";
import React, { useState, useEffect } from 'react';

const JobListings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Show all');

  const categories = [
    { name: 'Show all', count: 17 },
    { name: 'Design', count: null },
    { name: 'Development', count: null },
    { name: 'Marketing', count: null },
    { name: 'Management', count: null },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Executive Assistant',
      timeAgo: '4 Hours ago',
      description: 'Are you an aspiring Executive Assistant looking for an opportunity to take on new challenges and advance your career?',
      detailedDescription: 'If you are an enthusiastic leader with the ability to balance big-picture thinking with deep-dive research and attention to detail, we have the perfect job for you!',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'Executive Assistant',
      timeAgo: '4 Hours ago',
      description: 'Are you an aspiring Executive Assistant looking for an opportunity to take on new challenges and advance your career?',
      detailedDescription: 'If you are an enthusiastic leader with the ability to balance big-picture thinking with deep-dive research and attention to detail, we have the perfect job for you!',
      type: 'Full-time',
    },
    {
      id: 3,
      title: 'Executive Assistant',
      timeAgo: '4 Hours ago',
      description: 'Are you an aspiring Executive Assistant looking for an opportunity to take on new challenges and advance your career?',
      detailedDescription: 'If you are an enthusiastic leader with the ability to balance big-picture thinking with deep-dive research and attention to detail, we have the perfect job for you!',
      type: 'Full-time',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-6">
          <div 
            className={`transform transition-all duration-800 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : '-translate-y-4 opacity-0'
            }`}
          >
            <div className="flex overflow-x-auto scrollbar-hide space-x-1 bg-white rounded-lg p-1 shadow-sm">
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ 
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {category.name}
                  {category.count && (
                    <span className="ml-2 text-xs opacity-75">{category.count}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div 
              className={`transform transition-all duration-800 ease-out ${
                isVisible 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-8 opacity-0'
              }`}
            >
              <nav className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={category.name}
                    className={`transform transition-all duration-600 ease-out ${
                      isVisible 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-white text-black shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        {category.count && (
                          <span className="text-sm text-gray-500">{category.count}</span>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Job listings */}
          <div className="flex-1">
            <div className="space-y-4 md:space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`transform transition-all duration-800 ease-out ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    {/* Job header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-500">{job.timeAgo}</p>
                      </div>
                    </div>

                    {/* Job description */}
                    <div className="mb-4">
                      <p className="text-gray-700 mb-3 leading-relaxed text-sm md:text-base">
                        {job.description}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {job.detailedDescription}
                      </p>
                    </div>

                    {/* Job footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">
                        {job.type}
                      </span>
                      <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105 text-sm md:text-base">
                        Apply
                      </button>
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
}

export default JobListings;