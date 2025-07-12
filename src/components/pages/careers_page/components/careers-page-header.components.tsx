"use client";
import React, { useEffect, useState } from 'react';

const CareersPageHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-16">
      <div className="w-full">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-4xl font-semibold text-[rgba(24,29,39,1)] mb-5 leading-11">
            Careers
          </h1>
        </div>
        
        <div 
          className={`transform transition-all duration-1000 ease-out delay-300 ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="text-lg md:text-xl text-[rgba(83,88,98,1)]">
            We&#39;re hiring! join us—as we&#39;re passionate about crafting{' '}
            <br className="hidden md:block" />
            timeless designs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPageHeader;