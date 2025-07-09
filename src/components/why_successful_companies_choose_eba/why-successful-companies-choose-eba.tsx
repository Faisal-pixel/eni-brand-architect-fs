"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MedalIcon, CompassIcon, TargetIcon, LinkPaperClipIcon } from '@/assets/icons';

const WhySuccessfulCompaniesChooseEBASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: MedalIcon,
      title: "Expertise",
      description: "Our specialists in branding, PR, media, and production work seamlessly to deliver creative solutions that meet the highest standards of quality and impact."
    },
    {
      icon: CompassIcon,
      title: "Strategy",
      description: "We take time to understand your goals and craft thoughtful strategies that capture your unique voice and connect meaningfully with your audience."
    },
    {
      icon: TargetIcon,
      title: "Results",
      description: "From startups to global enterprises, our work consistently drives measurable growth, lasting recognition, and sustained market relevance."
    },
    {
      icon: LinkPaperClipIcon,
      title: "Network",
      description: "Tap into our ecosystem of vetted partners, vendors, and collaborators to scale your brand confidently and unlock new opportunities."
    }
  ];

  return (
    <div className="mb-12 md:mb-16 bg-[rgba(234,243,240,1)] px-10 lg:px-[103px] py-[96px]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`mb-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl font-semibold mb-2">
            Why successful companies choose EBA
          </h1>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 lg:gap-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${300 + index * 150}ms`
                }}
              >
                <div className="p-2.5">
                  {/* Icon */}
                  <Image src={Icon} alt={feature.title} />

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhySuccessfulCompaniesChooseEBASection;