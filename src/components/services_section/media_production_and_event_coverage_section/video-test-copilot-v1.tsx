"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";

const MediaProdAndEventCoverageTesting = () => {
  // Animation state to control when the component appears on screen
  const [isVisible, setIsVisible] = useState(false);

  // Video reference to control the HTML video element directly
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video playback states - these tell us what's happening with the video
  const [isPlaying, setIsPlaying] = useState(false); // Is the video currently playing?
  const [currentTime, setCurrentTime] = useState(0); // How many seconds have played
  const [duration, setDuration] = useState(0); // Total video length in seconds
  const [volume, setVolume] = useState(1); // Volume level (0 to 1, where 1 is 100%)
  const [isMuted, setIsMuted] = useState(false); // Is the video muted?
  const [isFullscreen, setIsFullscreen] = useState(false); // Is video in fullscreen mode?

  // UI control states - these control what the user sees
  const [showControls, setShowControls] = useState(true); // Should we show the control bar?
  const [showSpeedMenu, setShowSpeedMenu] = useState(false); // Should we show the speed options popup?
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // Current playback speed (1 = normal speed)
  const [isHovering, setIsHovering] = useState(false); // Is user hovering over the video?

  // Timer references to control when things auto-hide
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Make the component fade in when it first loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-hide controls after 3 seconds when video is playing and user isn't hovering
  useEffect(() => {
    // If video is playing and user isn't hovering, start timer to hide controls
    if (isPlaying && !isHovering) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      // Otherwise, show controls
      setShowControls(true);
    }

    // Clean up timer when component unmounts or dependencies change
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  // Listen for fullscreen changes (when user presses ESC or F11)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // When user hovers over video, show controls and remember they're hovering
  const handleVideoMouseEnter = () => {
    setIsHovering(true);
    setShowControls(true);
  };

  // When user stops hovering, remember they're not hovering anymore
  const handleVideoMouseLeave = () => {
    setIsHovering(false);
  };

  // When user clicks anywhere on video, show controls temporarily
  const handleVideoClick = () => {
    setShowControls(true);
    // Cancel any existing timer that would hide controls
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  // Toggle between playing and pausing the video
  const togglePlay = () => {
    if (!videoRef.current) return; // Safety check - make sure video exists

    if (videoRef.current.paused) {
      // Video is paused, so start playing it
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      // Video is playing, so pause it
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // This runs every time the video time updates (many times per second)
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // This runs when video metadata loads (we learn the video duration)
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.volume = volume; // Set initial volume
    }
  };

  // When user drags the seek bar, jump to that time in the video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (isNaN(newTime) || newTime < 0 || newTime > duration) return; // Safety checks

    if (videoRef.current) {
      videoRef.current.currentTime = newTime; // Jump video to new time
    }
    setCurrentTime(newTime);
  };

  // Toggle between fullscreen and normal view
  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      // Not in fullscreen, so enter fullscreen
      videoRef.current.requestFullscreen();
    } else {
      // Already in fullscreen, so exit fullscreen
      document.exitFullscreen();
    }
  };

  // Toggle between muted and unmuted
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        // Currently muted, so unmute and restore previous volume
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        // Currently unmuted, so mute (set volume to 0)
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // When user changes volume slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }

    // If volume is 0, consider it muted
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Available speed options for the video
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // When user selects a new playback speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed; // Change video playback speed
    }
    setShowSpeedMenu(false); // Hide the speed menu
  };

  // Convert seconds to MM:SS format (like 1:30 for 1 minute 30 seconds)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          {/* Main Video Container - this wraps everything */}
          <div
            className={`transition-all max-w-5xl w-full duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Video Container with hover detection */}
              <div
                className="relative aspect-video bg-black"
                onMouseEnter={handleVideoMouseEnter}
                onMouseLeave={handleVideoMouseLeave}
                onClick={handleVideoClick}
              >
                {/* The actual video element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover cursor-pointer"
                  src="https://res.cloudinary.com/daya1fdka/video/upload/f_auto,q_auto/v1754487174/Landing_page_video_2_eknj4t.mov"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleMetadataLoaded}
                  onClick={togglePlay}
                />

                {/* Big Play/Pause Button in Center - only shows when video is paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110"
                    >
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </button>
                  </div>
                )}

                {/* Video Controls Bar at Bottom */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Progress Bar - this goes above the main controls */}
                  <div className="px-4 pb-2">
                    <div className="relative">
                      {/* The seek bar track */}
                      <div className="h-1 bg-white/30 rounded-full relative">
                        {/* Progress fill */}
                        <div
                          className="h-full bg-white rounded-full"
                          style={{
                            width: `${
                              duration > 0 ? (currentTime / duration) * 100 : 0
                            }%`,
                          }}
                        />
                      </div>
                      {/* Invisible input that lets user drag to seek */}
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-4 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Main Controls Row */}
                  <div className="flex items-center justify-between px-4 pb-4">
                    {/* Left side controls */}
                    <div className="flex items-center space-x-4">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>

                      {/* Volume Controls */}
                      <div className="flex items-center space-x-2">
                        {/* Mute/Unmute Button */}
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-gray-300 transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>

                        {/* Volume Slider */}
                        <div className="relative w-20">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, white 0%, white ${
                                (isMuted ? 0 : volume) * 100
                              }%, rgba(255,255,255,0.3) ${
                                (isMuted ? 0 : volume) * 100
                              }%, rgba(255,255,255,0.3) 100%)`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Time Display */}
                      <div className="flex items-center space-x-1 text-white text-sm">
                        <span>{formatTime(currentTime)}</span>
                        <span className="text-white/70">/</span>
                        <span className="text-white/70">
                          {formatTime(duration)}
                        </span>
                      </div>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                      {/* Speed Control */}
                      <div className="relative">
                        <button
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                          className="text-white hover:text-gray-300 transition-colors text-sm px-2 py-1 rounded bg-white/20 hover:bg-white/30"
                        >
                          {playbackSpeed}x
                        </button>

                        {/* Speed Menu Popup */}
                        {showSpeedMenu && (
                          <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 min-w-[80px] border border-white/20">
                            <div className="text-white text-xs font-medium mb-2 px-2">
                              Speed
                            </div>
                            <div className="space-y-1">
                              {speedOptions.map((speed) => (
                                <button
                                  key={speed}
                                  onClick={() => handleSpeedChange(speed)}
                                  className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white/20 transition-colors ${
                                    playbackSpeed === speed
                                      ? "bg-white/30 text-white"
                                      : "text-white/80"
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {isFullscreen ? (
                          <Minimize2 className="w-5 h-5" />
                        ) : (
                          <Maximize2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaProdAndEventCoverageTesting;
