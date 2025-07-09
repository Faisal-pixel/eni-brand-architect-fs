import React, { useState, useEffect } from 'react';
import { Check, Tag } from 'lucide-react';
import { BrandingAndIdentity, CheckmarkIcon } from '@/assets/icons';
import Image from 'next/image';

const BrandingIdentity = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Brand Strategy, Brand Audit & Positioning:",
      description: "We define your brand's identity, messaging, and positioning with personalized strategies that resonate with your target audience."
    },
    {
      title: "Logo & Visual Identity Design:",
      description: "Our design team crafts unique logos and visual identities that reflect your brand's values, culture, and story."
    },
    {
      title: "Brand Guidelines:",
      description: "We establish comprehensive brand guidelines to ensure consistency and cohesion across all platforms and touchpoints, creating a unified brand experience."
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Icon and Title */}
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Branding & Identity
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                From audit to identity, we lay the groundwork for your brand's success. Whether you're launching a new venture or redefining an existing one, we create distinctive brands that connect with your target audience and stand out in competitive markets.
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

          {/* Right Visual Content */}
          <div 
            className={`relative transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Image src={BrandingAndIdentity} alt="Branding and Identity" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingIdentity;