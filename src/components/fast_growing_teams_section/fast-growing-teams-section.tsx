"use client";
import { XTeamIcon, LinkedinTeamIcon, PortfolioTeamIcon } from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import GreenButton from '../ui_personal/green-button';

const FastGrowingTeamSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: "Eniola Omoniyi",
      role: "Founder, Creative Director",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 2,
      name: "Kayode Ayeni",
      role: "Community Manager & Video Editor",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 3,
      name: "Perfect Alamuoye",
      role: "Projects & Production Lead",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 4,
      name: "Sanusi Posi",
      role: "Creative Stylist & Producer",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 5,
      name: "Tomiwa Adeoye",
      role: "Graphics designer",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 6,
      name: "Tamilore Tifase",
      role: "Graphics Designer & Copywriter",
      image: "/api/placeholder/80/80",
      isFlag: true,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 7,
      name: "Amarachi Pen",
      role: "Branding & Costume Specialist",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 8,
      name: "Adebambo Jamiu Ademola",
      role: "Admin",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 9,
      name: "Taiwo Akintan",
      role: "Executive Assistant to the Founder",
      image: "/api/placeholder/80/80",
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    },
    {
      id: 10,
      name: "Okonkwo Chidubem",
      role: "Writer",
      image: "/api/placeholder/80/80",
      isColorful: true,
      socialLinks: {
        twitter: "#",
        linkedin: "#",
        portfolio: "#"
      }
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations for all team members with staggered delays
            teamMembers.forEach((member, index) => {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, member.id]));
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  });

  

  return (
    <div className="py-16 md:py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 md:mb-5">
              We&#39;re a fast-growing team
            </h2>
            <p className="text-lg text-[rgba(83,88,98,1)] max-w-2xl mb-8 md:mb-0">
              We&#39;re always on the lookout for passionate, dynamic, and talented individuals.
            </p>
          </div>
          <GreenButton title='Open Positions' className='text-lg md:text-sm md:font-medium py-3.5 mb-12 cursor-pointer md:py-2.5 md:px-4'/>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`transform transition-all duration-800 ease-out ${
                visibleItems.has(member.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="t">
                {/* Profile Image */}
                <div className="mb-6 flex">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    {member.isFlag ? (
                      <div className="w-full h-full bg-gradient-to-b from-black via-red-500 to-yellow-400"></div>
                    ) : member.isColorful ? (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"></div>
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                </div>

                {/* Name and Role */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[rgba(24,29,39,1)]">
                    {member.name}
                  </h3>
                  <p className="text-[rgba(1,117,68,1)] ">
                    {member.role}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <Link href={member.socialLinks.twitter}>
                    <Image src={XTeamIcon} alt="X Icon" />
                  </Link>
                  
                  <Link href={member.socialLinks.linkedin}>
                  <Image src={LinkedinTeamIcon} alt="LinkedIn Icon" />
                  </Link>

                  <Link href={member.socialLinks.portfolio}>
                  <Image src={PortfolioTeamIcon} alt="X Icon" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FastGrowingTeamSection;