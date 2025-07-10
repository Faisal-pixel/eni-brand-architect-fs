import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  MoreHorizontal,
} from "lucide-react";
import { CheckmarkIcon, MediaProductionIcon } from "@/assets/icons";
import Image from "next/image";

const MediaProdAndEventCoverage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (isNaN(newTime) || newTime < 0 || newTime > duration) return;
    if (videoRef.current) {
      videoRef.current.currentTime = parseFloat(e.target.value);
    }

    setCurrentTime(newTime);
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const services = [
    {
      title: "Event Production & Planning:",
      description:
        "We handle every aspect of event production, from concept to execution, creating immersive, branded experiences that leave a lasting impact on your audience.",
    },
    {
      title: "Short-form & Long-form Video:",
      description:
        "Our production team creates compelling video content, from quick promotional clips to full-length documentaries, telling your brand’s story in a way that resonates with your audience.",
    },
    {
      title: "Podcast Creation & Editing:",
      description:
        "We produce high-quality podcasts that reflect your brand’s voice, positioning your brand as an industry leader.",
    },
    {
      title: "Vlogging, BTS & Experience Storytelling:",
      description:
        "We create engaging vlogs and behind-the-scenes content, sharing your brand’s story in a personal, relatable way.",
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Media Showcase */}
          <div
            className={`transition-all duration-1000 ease-out order-2 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Video Container */}
              <div className="relative aspect-video bg-gradient-to-br from-amber-50 to-orange-100">
                {/* Video Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src="/videos/eni-brand-sample-video.mp4" // from public folder
                    muted
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleMetadataLoaded}
                  />
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-gray-800 ml-1" />
                    ) : (
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center space-x-3">
                  <button className="text-white cursor-pointer hover:text-gray-200 transition-colors">
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                  <button className="text-white hover:text-gray-200 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>

                  {/* Progress Bar */}
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 relative h-1 bg-white/30 rounded-full">
                      {/* <div className="w-1/4 h-full bg-white rounded-full"></div> */}
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        onInput={handleSeek}
                        className="w-full h-1 accent-white relative -top-[0.9rem] left-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {formatTime(currentTime)}
                    </span>
                    <span className="text-white/70 text-sm">
                      -{formatTime(duration - currentTime)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">1×</span>
                    <button className="text-white hover:text-gray-200 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleFullscreen}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out order-1 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Header with Icon */}
            <div className="flex flex-col space-y-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Image src={MediaProductionIcon} alt="Media Production & Event Coverage" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Media Production & Event Coverage
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Bringing your brand’s story to life. We create dynamic content and
              capture key moments, ensuring your brand is represented
              authentically and memorably.
            </p>

            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <Image
                    src={CheckmarkIcon}
                    alt="Checkmark"
                    className="flex-shrink-0 w-6 h-6"
                  />
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-semibold">{service.title}</span>{" "}
                      {service.description}
                    </p>
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

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export default MediaProdAndEventCoverage;
