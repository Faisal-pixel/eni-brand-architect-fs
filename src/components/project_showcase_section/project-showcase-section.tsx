"use client";
import { TeeSideImage } from '@/assets/icons';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ProjectShowcaseSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: "01",
      title: "TEE",
      description: "The ones with (*) at the end of the point are the points they feel we should add to the design.",
      year: "2025",
      category: "Outreach",
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: "02",
      title: "PLAYWITHSTEPHEN GOLF TASTING",
      description: "",
      year: "",
      category: "Outreach",
      images: []
    },
    {
      id: "03",
      title: "Talentville LED",
      description: "",
      year: "",
      category: "Outreach",
      images: []
    }
  ];

  return (
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Showcase
          </h1>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-emerald-600">
                          {project.id}
                        </span>
                        <span className="text-right text-sm text-gray-500">
                          {project.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-gray-600 leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  )}

                  {project.year && (
                    <p className="text-lg font-semibold text-gray-900">
                      {project.year}
                    </p>
                  )}
                </div>

                {/* Right Images Grid */}
                <div className="relative">
                  {
                    index === 0 && (
                        <Image src={TeeSideImage} alt='TEE side image' className='ml-auto'/>
                    )
                  }
                    
                </div>
              </div>

              {/* Separator line */}
              {index < projects.length - 1 && (
                <div className="mt-16 w-full h-px bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcaseSection;