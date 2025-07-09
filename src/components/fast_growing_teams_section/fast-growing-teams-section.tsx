"use client";
import React, { useState, useEffect, useRef } from 'react';

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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
        dribbble: "#"
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
  }, []);

  const SocialIcon = ({ type, href }) => {
    const iconPaths = {
      twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      dribbble: "M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.273 5.698-.653-.126-7.512-1.563-7.512-1.563s-.04-.22-.088-.532c2.062-.847 3.03-2.055 3.327-3.603zM12 2.25c2.4 0 4.6.9 6.3 2.4-.3 1.3-1.2 2.4-2.7 3.2-1.6-2.9-3.4-5.3-3.6-5.6zm-3.9 1.3c.2.3 1.9 2.7 3.6 5.5-4.6 1.2-8.7 1.2-9.1 1.2-.6-2.7.3-5.3 1.8-7.4 1.1.2 2.5.5 3.7.7zM2.3 12c0-.1 0-.2 0-.3 0 0 .1 0 .2 0 .5 0 5.6 0 10.7-1.5.1.2.2.4.3.7-5.6 1.6-8.5 6-8.8 6.4C3.2 16.1 2.3 14.1 2.3 12zm7.7 9.8c-2.1 0-4.1-.7-5.7-1.9.2-.3 2.6-4.2 8.7-6.1 2 5.2 2.8 9.6 2.9 10.9-1.9.7-3.9 1.1-5.9 1.1zm7.9-2.4c-.1-.6-.8-4.7-2.6-9.6 2.3-.4 4.3-.1 4.6-.1-.3 4.1-1.9 7.6-4.6 9.8 1.4.1 2.6-.1 2.6-.1z"
    };

    return (
      <a 
        href={href}
        className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d={iconPaths[type]} />
        </svg>
      </a>
    );
  };

  return (
    <div className="bg-white py-16 px-4" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              We're a fast-growing team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              We're always on the lookout for passionate, dynamic, and talented individuals.
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 self-start lg:self-center">
            Open positions
          </button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`transform transition-all duration-800 ease-out ${
                visibleItems.has(member.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="text-center">
                {/* Profile Image */}
                <div className="mb-6 flex justify-center">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {member.role}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <SocialIcon type="twitter" href={member.socialLinks.twitter} />
                  <SocialIcon type="linkedin" href={member.socialLinks.linkedin} />
                  <SocialIcon type="dribbble" href={member.socialLinks.dribbble} />
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