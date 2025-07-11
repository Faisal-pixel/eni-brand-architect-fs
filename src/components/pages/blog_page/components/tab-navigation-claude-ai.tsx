"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('View all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Most recent');

  const tabs = [
    'View all',
    'Design',
    'Product',
    'Software Engineering',
    'Customer Success'
  ];

  const sortOptions = [
    'Most recent',
    'Oldest first',
    'Alphabetical',
    'Most popular'
  ];

  // Sample content data matching your image
  const contentData = [
    {
      id: 1,
      category: 'Design',
      title: 'UX review presentations',
      description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
      author: 'Olivia Rhye',
      date: '20 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      category: 'Product',
      title: 'Migrating to Linear 101',
      description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here\'s how to get started.',
      author: 'Phoenix Baker',
      date: '19 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      category: 'Software Engineering',
      title: 'Building your API stack',
      description: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
      author: 'Lana Steiner',
      date: '18 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      category: 'Leadership',
      title: 'Bill Walsh leadership lessons',
      description: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
      author: 'Alec Whitten',
      date: '17 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      category: 'Product',
      title: 'PM mental models',
      description: 'Mental models are simple expressions of complex processes or relationships.',
      author: 'Demi Wilkinson',
      date: '16 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 6,
      category: 'Design',
      title: 'What is wireframing?',
      description: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
      author: 'Candice Wu',
      date: '15 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 7,
      category: 'Design',
      title: 'How collaboration makes us better designers',
      description: 'Collaboration can make our teams stronger, and our individual designs better.',
      author: 'Natali Craig',
      date: '14 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      id: 8,
      category: 'Product',
      title: 'Our top 10 Javascript frameworks to use',
      description: 'JavaScript frameworks make development easy with extensive features and functionalities.',
      author: 'Drew Cano',
      date: '13 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      id: 9,
      category: 'Customer Success',
      title: 'Podcast: Creating a better CX Community',
      description: 'Starting a community doesn\'t need to be complicated, but how do you get started?',
      author: 'Orlando Diggs',
      date: '12 Jan 2025',
      image: '',
      bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Design': 'bg-purple-100 text-purple-700',
      'Product': 'bg-blue-100 text-blue-700',
      'Software Engineering': 'bg-green-100 text-green-700',
      'Leadership': 'bg-orange-100 text-orange-700',
      'Customer Success': 'bg-pink-100 text-pink-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getFilteredContent = () => {
    if (activeTab === 'View all') {
      return contentData;
    }
    return contentData.filter(item => item.category === activeTab);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        {/* Tab Navigation */}
        <div className="flex items-center space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {tab}
              {/* Active indicator */}
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ${
                  activeTab === tab ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            <span>{sortBy}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-300 transform origin-top-right ${
              dropdownOpen 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            {sortOptions.map((option, index) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  sortBy === option ? 'text-green-600 bg-green-50' : 'text-gray-700'
                } ${index === 0 ? 'rounded-t-lg' : ''} ${
                  index === sortOptions.length - 1 ? 'rounded-b-lg' : ''
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area with Reveal Animation */}
      <div className="mt-8 opacity-0 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample content cards */}
          {getFilteredContent().map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden group cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Featured Image */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundColor: item.bgColor
                  }}
                />
                {/* External link arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Category Tag */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Author and Date */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {item.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.author}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in > div > div {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default TabNavigation;