"use client";
import React, { useState, useEffect, useRef } from 'react';
import GreenButton from '../ui_personal/green-button';

const FAQSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  const faqs = [
    {
      id: 1,
      question: "What services does ENI Brand Architect offer?",
      answer: "We offer full-service brand strategy, media, PR, digital marketing, and content production, including social media management, event amplification, personal branding, and advertising."
    },
    {
      id: 2,
      question: "Who do you work with?",
      answer: "We work with brands, founders, professionals, creatives, and organizations—locally and globally—looking to build strong identities, connect with their audiences, and create long-term impact."
    },
    {
      id: 3,
      question: "Do you offer B2B services?",
      answer: "Yes, we work with other businesses to provide white-label branding, strategy consulting, media buying, and campaign development tailored to specific business goals."
    },
    {
      id: 4,
      question: "Can I work with you if I'm outside Nigeria?",
      answer: "Absolutely! Our services are available globally, and we've worked with clients across different countries through virtual consultations and online content delivery."
    },
    {
      id: 5,
      question: "How do I get started with ENI Brand Architect?",
      answer: "Simply fill out our contact form or send us an email. We'll schedule a discovery call to understand your needs, goals, and how best we can work together."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger header animation first
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, 'header']));
            }, 100);

            // Then trigger FAQ items with staggered delays
            faqs.forEach((faq, index) => {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, faq.id]));
              }, 300 + (index * 150));
            });

            // Finally trigger the bottom section
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, 'bottom']));
            }, 300 + (faqs.length * 150) + 200);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  });

  return (
    <div className="bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transform transition-all duration-800 ease-out ${
          visibleItems.has('header')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl lg:text-4xl font-semibold text-[rgba(24,29,39,1)] mb-5">
            FAQs
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            Everything you need to know about the product and billing. Can&#39;t find the answer 
            you&#39;re looking for? Please{' '}
            <span className="underline decoration-2 underline-offset-2">
              chat to our friendly team
            </span>
            .
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-16 mb-16 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-8">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`transform transition-all duration-800 ease-out ${
                visibleItems.has(faq.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`bg-[rgba(234,248,242,1)] rounded-2xl p-8 transform transition-all duration-800 ease-out ${
          visibleItems.has('bottom')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 max-w-[480px] md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-600 md:text-lg leading-6 md:leading-7">
                Can&#39;t find the answer you&#39;re looking for? Please chat to our friendly team.
              </p>
            </div>
            
            <GreenButton title='Get in touch' className='self-start px-5 py-4 cursor-pointer hover:bg-green-700 transition-colors duration-200'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;