"use client";
import { EbaFooterLogo } from '@/assets/icons';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import GreenButton from '../ui_personal/green-button';
import GreenOutlineButton from '../ui_personal/green-outline-button';

// Configuration object - easily editable
const ctaConfig = {
  logo: {
    text: "eba.",
    tagline: "Do things different"
  },
  title: "Let's get started on something great",
  subtitle: "Join over 4,000+ startups already growing with EBA.",
  buttons: {
    primary: {
      text: "Book a Consultation",
      href: "#consultation"
    },
    secondary: {
      text: "Download the Brochure",
      href: "#brochure"
    }
  },
  footer: {
    copyright: "© 2025 EBA Team. All rights reserved.",
    links: [
      { text: "Terms", href: "#terms" },
      { text: "Privacy", href: "#privacy" },
      { text: "Cookies", href: "#cookies" }
    ]
  }
};

const CTASection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        setIsVisible(true);
        setHasAnimated(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  const handleButtonClick = (href: string) => {
    // Handle navigation or custom logic here
    console.log(`Navigate to: ${href}`);
  };

  return (
    <div ref={sectionRef} className="w-full bg-white py-16 flex flex-col">
      {/* Main content container */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className={`mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Image src={EbaFooterLogo} alt='Eba footer logo' />
        </div>

        {/* Main heading */}
        <div className={`mb-4 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-xl md:text-3xl text-gray-900 leading-[30px]">
            {ctaConfig.title}
          </h2>
        </div>

        {/* Subtitle */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {ctaConfig.subtitle}
          </p>
        </div>

        {/* Action buttons */}
        <div className={`w-full flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-x-2 mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Primary button */}
          
          <GreenButton onClickFunction={() => handleButtonClick(ctaConfig.buttons.primary.href)} title={ctaConfig.buttons.primary.text} className='py-3.5 md:px-5 leading-4 cursor-pointer' />

          {/* Secondary button */}
          <GreenOutlineButton title={ctaConfig.buttons.secondary.text} onClickFunction={() => handleButtonClick(ctaConfig.buttons.secondary.href)} className='py-3.5 md:px-5 leading-4 cursor-pointer' />
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-auto pt-8 transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          {/* Copyright */}
          <p className="mb-4 md:mb-0">
            {ctaConfig.footer.copyright}
          </p>

          {/* Footer links */}
          <div className="flex space-x-8">
            {ctaConfig.footer.links.map((link, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(link.href)}
                className="hover:text-gray-700 transition-colors duration-200"
              >
                {link.text}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CTASection;