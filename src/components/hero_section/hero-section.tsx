"use client"
import React, { useRef, useEffect } from 'react';
// import { Play } from 'lucide-react';

const HeroVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl mb-6 pt-[48px] md:pt-[83px] lg:pt-[204px] pb-[102px] md:pb-[83px] lg:pb-[285.5px] pl-[13px] md:pl-[22px] lg:pl-[89px]">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/eni-brand-sample-video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        {/* <div className="absolute inset-0 bg-gray-800" /> */}
      </video>

      {/* Dark Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-70" /> */}

      {/* Content Overlay */}
      <div className="relative z-10  max-w-[287px] md:max-w-[370px] lg:max-w-[603px]">
        {/* Main Heading */}
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
          Building Brands That{' '}
          <span className="block md:inline">Resonate</span>
        </h1>

        {/* Description */}
        <p className="text-[rgba(255,255,255,1)] text-[13px] md:text-[15px] lg:text-lg leading-relaxed mb-8 max-w-lg">
          We help brands and individuals craft identities that connect deeply and communicate clearly—combining cultural insight with world-class strategy.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row gap-2 lg:gap-3">
          {/* Primary Button */}
          <button className="bg-emerald-600  text-white whitespace-nowrap cursor-pointer px-3 py-[13px] md:px-4 md:py-2.5 lg:px-5 lg:py-3.5 rounded-lg font-semibold text-xs md:text-base lg:text-lg transition-colors duration-200 shadow-lg">
            Book a Free Consultation
          </button>

          {/* Secondary Button */}
          <button className="bg-white border-2 whitespace-nowrap cursor-pointer border-[rgba(1,117,68,1)] text-[rgba(1,117,68,1)] px-3 py-[13px] md:px-4 md:py-2.5 lg:px-5 lg:py-3.5 rounded-lg font-semibold text-xs transition-all duration-200">
            Download the Brochure
          </button>
        </div>
      </div>

      {/* Play Button Overlay (positioned like in the image) */}
      {/* <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 cursor-pointer pointer-events-auto hover:bg-opacity-30 transition-all duration-200">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div> */}
    </div>
  );
};

export default HeroVideoSection;