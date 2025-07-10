import React, { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';
import { CheckmarkIcon, PublicRelationsAndCommunication } from '@/assets/icons';
import Image from 'next/image';

const PRAndCommunication = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Press Release Writing & Distribution:",
      description: "We tailor press releases for broadcast, online, and print channels, ensuring your story is seen and heard by the right audience."
    },
    {
      title: "Crisis Management:",
      description: "Our crisis management strategies are designed to protect your brand's reputation, monitor public sentiment, and mitigate risks during challenging times, providing peace of mind when it matters most."
    },
    {
      title: "Platform Placements & Podcast Bookings:",
      description: "We strategically identify the best-fit platforms and podcasts to align with your brand's ethos and audience for maximum exposure."
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Media Showcase */}
          <div 
            className={`relative transform transition-all duration-1000 order-2 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Image src={PublicRelationsAndCommunication} alt="Public Relations and Communication" className="w-full h-full object-cover" />
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1">
            {/* Icon and Title */}
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Megaphone className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Public Relations & Communication
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Building credibility and trust with precision. We manage your brand&#39;s reputation across media landscapes, ensuring your message resonates with your audience and is communicated effectively.
              </p>
            </div>

            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transform transition-all duration-1000 ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${500 + index * 200}ms`
                  }}
                >
                  <Image src={CheckmarkIcon} alt="Checkmark" className="flex-shrink-0 w-6 h-6" />
                  <div>
                    <span className="font-semibold text-gray-900">{service.title}</span>
                    <span className="text-gray-600 ml-1">{service.description}</span>
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

export default PRAndCommunication;