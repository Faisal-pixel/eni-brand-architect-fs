"use client";
import React, { useState, useEffect, useRef } from 'react';
import GreenButton from '../ui_personal/green-button';

const TestimonialsSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Stephen Onaivi",
      title: "Founder, Play With Stephen Golf Tournament & Okton Foundation",
      image: "/api/placeholder/60/60",
      quote: "People now recognize my page as one of the leading golf platforms in Nigeria.",
      content: "EBA has been instrumental in the growth and visibility of my brand across multiple platforms. From producing our press conference and masterclass events to curating premium video content and managing my personal and foundation pages, their work is top-tier. The team created my logo, media kit, and brand assets, and the feedback has been incredible.\n\nWhat I love most is the passion the EBA team brings to every project. They don't just deliver, they care deeply.\n\nIf you want your brand handled with intentionality and excellence, work with EBA."
    },
    {
      id: 2,
      name: "Tega Agbosa",
      title: "CEO, Dinku Transational",
      image: "/api/placeholder/60/60",
      quote: "Every touchpoint exceeded my expectations.",
      content: "Working with Eni Brand Architect has been nothing short of transformational. From the pace of delivery to the professionalism of the entire team, every touchpoint exceeded my expectations. They didn't just help shape my corporate brand; they refined my brand with strategic precision and clarity. I now have a brand presence that feels powerful, premium, and aligned with my values.\n\nI highly recommend EBA to any leader looking to elevate both their business and personal brand."
    },
    {
      id: 3,
      name: "Ann Obaseki",
      title: "Founder, Talentville Africa & Loud Urban Choir",
      image: "/api/placeholder/60/60",
      quote: "Their attention to detail and crisis management is unmatched.",
      content: "Eni Brand Architect manages my brand and our community platforms with an exceptional blend of creativity and strategy. Whether it's organic content, storytelling, or design, the ideas they generate are always fresh, thoughtful, and aligned with our voice.\n\nTheir attention to detail, quick turnaround time, and ability to calmly manage even chaotic situations are unmatched. I trust them completely, and I'm always excited to see what they'll come up with next.\n\nEBA is a creative partner every visionary brand needs."
    },
    {
      id: 4,
      name: "Miss Amarchi",
      title: "Founder, HostessNG",
      image: "/api/placeholder/60/60",
      quote: "EBA works like they're in the future, and the rest of us are catching up.",
      content: "What stands out most about working with Eni Brand Architect is their ability to think and execute ahead of the curve. They're not just building brands for now, they're designing for the future.\n\nEBA fully understands brand vision and aligns every creative decision with long-term growth. It always feels like they're three steps ahead, and the rest of us are just catching up. Their work isn't only smart, it's visionary.\n\nIf you want future-ready branding, EBA is the team to trust."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataId = entry.target.getAttribute('data-id');
            if (dataId !== null) {
              const id = parseInt(dataId);
              setVisibleItems(prev => new Set([...prev, id]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const elements = document.querySelectorAll('[data-testimonial]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center mb-12">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
              Don&#39;t just take our word for it
            </h2>
            <p className="text-base md:text-xl text-[rgba(83,88,98,1)]">
              Hear from some of our amazing customers who are building faster.
            </p>
          </div>
          {/* <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 self-start md:ml-auto">
            Book a Consultation
          </button> */}

          <GreenButton title='Book a Consultation' className='bg-[rgba(1,117,68,1)] w-full md:w-auto self-start md:ml-auto py-3.5 md:px-5 cursor-pointer' />
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-testimonial
              data-id={testimonial.id}
              className={`transform transition-all duration-1000 ease-out ${
                visibleItems.has(testimonial.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="bg-white border-b border-[rgba(229,231,235,1)] pb-8">
                <div className="flex flex-col-reverse md:flex-row items-start md:gap-8">
                  {/* Profile Image */}
                  <div className="w-full flex gap-x-4 md:flex-1 ">
                    <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    </div>
                    {/* Name and Title */}
                    <div className='flex-1'>
                      <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-[rgba(107,114,128,1)] text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-[2]">
                    {/* Quote */}
                    <div className="mb-6">
                      <p className="text-xl font-medium text-gray-900 leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>

                    {/* Full Content */}
                    <div className="text-gray-700 leading-relaxed">
                      {testimonial.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;