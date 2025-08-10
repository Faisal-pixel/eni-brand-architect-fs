"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  MoreHorizontal,
} from "lucide-react";

const MediaProdAndEventCoverageTesting = () => {
  const [isVisible, setIsVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-hide controls functionality
  useEffect(() => {
    if (isPlaying && !isHovering) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  const handleVideoMouseEnter = () => {
    setIsHovering(true);
    setShowControls(true);
  };

  const handleVideoMouseLeave = () => {
    setIsHovering(false);
  };

  const handleVideoClick = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

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
      videoRef.current.volume = volume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (isNaN(newTime) || newTime < 0 || newTime > duration) return;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Volume control functions
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleVolumeMouseEnter = () => {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 500);
  };

  // Speed control functions
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          {/* Left Media Showcase */}
          <div
            className={`transition-all max-w-5xl w-full duration-1000 ease-out order-2 lg:order-1 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Video Container */}
              <div
                className="relative aspect-video bg-gradient-to-br from-amber-50 to-orange-100"
                onMouseEnter={handleVideoMouseEnter}
                onMouseLeave={handleVideoMouseLeave}
                onClick={handleVideoClick}
              >
                {/* Video Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover cursor-pointer"
                    src="https://res.cloudinary.com/daya1fdka/video/upload/f_auto,q_auto/v1754487174/Landing_page_video_2_eknj4t.mov"
                    muted
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleMetadataLoaded}
                    onClick={togglePlay}
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
              <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="text-white cursor-pointer hover:text-gray-200 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  {/* Volume Control */}
                  <div
                    className="relative"
                    onMouseEnter={handleVolumeMouseEnter}
                    onMouseLeave={handleVolumeMouseLeave}
                  >
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    {/* Volume Slider */}
                    {showVolumeSlider && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 rounded-lg p-2">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-vertical transform -rotate-90"
                          style={{
                            background: `linear-gradient(to right, white 0%, white ${
                              (isMuted ? 0 : volume) * 100
                            }%, rgba(255,255,255,0.3) ${
                              (isMuted ? 0 : volume) * 100
                            }%, rgba(255,255,255,0.3) 100%)`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 relative h-1 bg-white/30 rounded-full">
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
                    <span className="text-white text-sm">{playbackSpeed}×</span>

                    {/* Speed Control */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        className="text-white hover:text-gray-200 transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      {/* Speed Menu */}
                      {showSpeedMenu && (
                        <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 min-w-[80px]">
                          <div className="text-white text-xs font-medium mb-2 px-2">
                            Speed
                          </div>
                          <div className="max-h-32 overflow-y-auto">
                            {speedOptions.map((speed) => (
                              <button
                                key={speed}
                                onClick={() => handleSpeedChange(speed)}
                                className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white/20 transition-colors ${
                                  playbackSpeed === speed
                                    ? "bg-white/20 text-white"
                                    : "text-white/80"
                                }`}
                              >
                                {speed}×
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

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

export default MediaProdAndEventCoverageTesting;
