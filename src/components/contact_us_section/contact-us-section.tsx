import React, { useState, useEffect, useRef } from 'react';
import { z } from 'zod';

// Zod schema for form validation
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
  agreedToPolicy: z.boolean().refine(val => val === true, 'You must agree to the privacy policy')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreedToPolicy: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger header animation first
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, 'header']));
            }, 100);

            // Then trigger contact methods
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, 'contact-methods']));
            }, 300);

            // Finally trigger the form
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, 'form']));
            }, 500);
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
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const isFormValid = () => {
    return contactFormSchema.safeParse(formData).success;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Organize form data into a well-structured object
    const organizedData = {
      personalInfo: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim().toLowerCase()
      },
      communication: {
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
        source: 'website_contact_form'
      },
      compliance: {
        agreedToPolicy: formData.agreedToPolicy,
        agreementTimestamp: new Date().toISOString(),
        ipAddress: null, // You can add IP tracking if needed
        userAgent: navigator.userAgent
      },
      metadata: {
        submissionId: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        formVersion: '1.0',
        pageUrl: window.location.href,
        referrer: document.referrer || 'direct'
      }
    };

    try {
      // Here you would typically send the data to your backend
      console.log('Organized Contact Form Data:', organizedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form on successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        agreedToPolicy: false
      });
      
      // You can add success notification here
      alert('Message sent successfully!');
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      id: 'email',
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      description: 'Our friendly team is here to help.',
      contact: 'info@enibrand.com',
      isLink: true
    },
    {
      id: 'chat',
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Live chat',
      description: 'Our friendly team is here to help.',
      contact: 'Start new chat',
      isLink: true
    },
    {
      id: 'office',
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Office',
      description: 'Come say hello at our office HQ.',
      contact: '1 Tom Ogboi Avenue, Lekki Phase 1',
      isLink: false
    },
    {
      id: 'phone',
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      description: 'Mon-Fri from 8am to 5pm.',
      contact: '+234 (903) 380-1241',
      isLink: true
    }
  ];

  return (
    <div className="bg-white py-16 px-4" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transform transition-all duration-800 ease-out ${
          visibleItems.has('header')
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-green-600 font-medium mb-4">Contact us</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Chat to our friendly team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            We'd love to hear from you. Please fill out this form or shoot us an email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Methods */}
          <div className={`transform transition-all duration-800 ease-out ${
            visibleItems.has('contact-methods')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}>
            <div className="space-y-8">
              {contactMethods.map((method) => (
                <div key={method.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {method.description}
                    </p>
                    {method.isLink ? (
                      <a href={method.id === 'email' ? `mailto:${method.contact}` : method.id === 'phone' ? `tel:${method.contact}` : '#'} className="text-green-600 font-medium hover:text-green-700 transition-colors">
                        {method.contact}
                      </a>
                    ) : (
                      <div className="text-green-600 font-medium">
                        {method.contact}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transform transition-all duration-800 ease-out ${
            visibleItems.has('form')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}>
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="First name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Leave us a message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.agreedToPolicy}
                  onChange={(e) => handleInputChange('agreedToPolicy', e.target.checked)}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  You agree to our friendly{' '}
                  <a href="#" className="text-gray-900 underline hover:text-green-600 transition-colors">
                    privacy policy
                  </a>
                  .
                </label>
              </div>
              {errors.agreedToPolicy && (
                <p className="text-sm text-red-500">{errors.agreedToPolicy}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isFormValid() && !isSubmitting
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;