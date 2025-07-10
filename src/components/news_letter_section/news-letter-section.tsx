"use client";
import { NewsLetterLeftLogos, NewsLetterLogo } from '@/assets/icons';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { z } from 'zod';

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
});

// type EmailFormData = z.infer<typeof emailSchema>;

// Newsletter configuration object - easily editable
const newsletterConfig = {
  title: "Newsletters",
  subtitle: "Get the latest news, articles, and resources in your inbox weekly.",
  placeholderText: "Enter Email address",
  buttonText: "Subscribe",
  privacyText: "Your data is in the safe hands. Check out our",
  privacyLinkText: "Privacy policy",
  privacyLinkUrl: "#",
  additionalText: "for more info.",
  // Add your form submission endpoint here
  submissionEndpoint: "/api/newsletter/subscribe",
  // Success/error messages
  messages: {
    success: "Thank you for subscribing! Check your inbox for confirmation.",
    error: "Something went wrong. Please try again.",
  }
};

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const validateEmail = (emailValue: string): boolean => {
    try {
      emailSchema.parse({ email: emailValue });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ email: error.errors[0].message });
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare the submission data - easily customizable
      const submissionData = {
        email: email.trim(),
        timestamp: new Date().toISOString(),
        source: 'newsletter_signup',
        // Add any additional fields here
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Replace this with your actual API call
      const response = await fetch(newsletterConfig.submissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear errors when user starts typing
    if (errors.email) {
      setErrors({});
    }
    
    // Reset submit status when user modifies email
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  return (
    <div ref={sectionRef} className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between">

        {/* Partner logos */}
        <div className={` transition-all duration-1000 mb-2.5 flex items-center justify-center ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Image src={NewsLetterLeftLogos} alt="Newsletter Left Logo" className=''/>
        </div>

        {/* Main content */}
        <div className={`text-center w-[592px] transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl leading-11 md:text-5xl font-extrabold text-gray-900 mb-4">
            {newsletterConfig.title}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {newsletterConfig.subtitle}
          </p>

          {/* Newsletter form */}
          <div className="w-full mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={newsletterConfig.placeholderText}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-green-500'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Subscribing...' : newsletterConfig.buttonText}
              </button>
            </div>
          </div>

          {/* Status messages */}
          {submitStatus === 'success' && (
            <div className="max-w-md mx-auto mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-800 text-sm">{newsletterConfig.messages.success}</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="max-w-md mx-auto mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-800 text-sm">{newsletterConfig.messages.error}</p>
            </div>
          )}

          {/* Privacy notice */}
          <p className="text-gray-500 text-sm w-full">
            {newsletterConfig.privacyText}{' '}
            <a 
              href={newsletterConfig.privacyLinkUrl} 
              className="text-blue-600 hover:underline"
            >
              {newsletterConfig.privacyLinkText}
            </a>{' '}
            {newsletterConfig.additionalText}
          </p>
        </div>

        {/* Partner logos */}
        <div className={`transition-all duration-1000 mb-2.5 flex items-center justify-center ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Image src={NewsLetterLogo} alt="Newsletter Logo" className=''/>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;