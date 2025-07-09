"use client";
import React from "react";
import {
  FirstLogo,
  SecondLogo,
  ThirdLogo,
  FourthLogo,
  FifthLogo,
  SixthLogo,
  SeventhLogo,
  EightLogo,
} from "@/assets/icons";
import Image from "next/image";

export default function TrustedBrandsSection() {
  return (
    <div className="w-full">
      <div className="mb-[95px] md:mb-[88px]">
        {/* Header */}
        <h2 className="text-base font-medium text-gray-800 text-center mt-6 mb-6">
          Trusted by Top Brands
        </h2>

        {/* Sliding Logo Container */}
        <div className="overflow-hidden">
          <div className="flex gap-x-[10px] slider-track">
            <Image src={FirstLogo} alt="First Logo" />
            <Image src={SecondLogo} alt="Second Logo" />
            <Image src={ThirdLogo} alt="Third Logo" />
            <Image src={FourthLogo} alt="Fourth Logo" />
            <Image src={FifthLogo} alt="Fifth Logo" />
            <Image src={SixthLogo} alt="Sixth Logo" />
            <Image src={SeventhLogo} alt="Seventh Logo" />
            <Image src={EightLogo} alt="Seventh Logo" />

            {/* Duplicate logos for seamless loop */}

            <Image src={FirstLogo} alt="First Logo" />
            <Image src={SecondLogo} alt="Second Logo" />
            <Image src={ThirdLogo} alt="Third Logo" />
            <Image src={FourthLogo} alt="Fourth Logo" />
            <Image src={FifthLogo} alt="Fifth Logo" />
            <Image src={SixthLogo} alt="Sixth Logo" />
            <Image src={EightLogo} alt="Seventh Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
