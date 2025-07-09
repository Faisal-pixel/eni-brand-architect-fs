import React from 'react';

const ServiceHeader = () => {
  return (
    <div className="bg-white px-4 mb-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Services Label */}
        <div className="mb-3">
          <span className="text-[rgba(1,117,68,1)] text-base font-semibold uppercase tracking-wide">
            Services
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-5 leading-11">
          Beautiful analytics to grow smarter
        </h1>

        {/* Subtitle */}
        <p className="text-lg  md:text-xl text-[rgba(83,88,98,1)] leading-relaxed max-w-3xl mx-auto">
          Powerful, self-serve product and growth analytics to help you convert, engage, 
          and retain more users. Trusted by over 4,000 startups.
        </p>
      </div>
    </div>
  );
};

export default ServiceHeader;