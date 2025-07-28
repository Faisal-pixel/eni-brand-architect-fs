import { Maximize2, MoreHorizontal, Pause, Play, Volume2 } from "lucide-react";
import React, { useRef, useState } from "react";

type Props = {
  videoSrc: string;
};

const VideoComponent = ({ videoSrc }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-amber-50 to-orange-100">
        {/* Video Thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoSrc}
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
  );
};

export default VideoComponent;
