import { Pause, Play } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";

/**
 * Reusable Video Player (TypeScript)
 * ----------------------------------
 * Drop-in component with a clean default UI + a full control API you can call
 * from refs OR render yourself via `controlsRenderer`.
 *
 * ✅ Meets requested features:
 * 1) Play/Pause (center overlay + tiny bottom button)
 * 2) Volume control (mute toggle + slider)
 * 3) Seek track
 * 4) Timers (elapsed / remaining)
 * 5) Playback speed control
 * 6) Fullscreen enter/exit/toggle
 *
 * SSR/Build Notes:
 * - We avoid touching `window`/`document` outside of effects/handlers.
 * - This file includes a **default export Demo** so canvas builds don't fail.
 */

export type VideoAPI = {
  // actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  seekTo: (t: number) => void;
  seekBy: (d: number) => void;
  setPlaybackRate: (r: number) => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
  // state
  isPlaying: boolean;
  muted: boolean;
  volume: number; // 0..1
  currentTime: number; // seconds
  duration: number; // seconds
  playbackRate: number;
  isFullscreen: boolean;
  bufferedPercent: number; // 0..100
  videoEl: HTMLVideoElement | null;
};

export type VideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  initialVolume?: number;
  initialPlaybackRate?: number;
  hideDefaultUI?: boolean;
  controlsRenderer?: (api: VideoAPI) => React.ReactNode;
};

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export const VideoPlayer = forwardRef<VideoAPI, VideoPlayerProps>(function VideoPlayer(
  {
    src,
    poster,
    className,
    initialVolume = 0.8,
    initialPlaybackRate = 1,
    hideDefaultUI = false,
    controlsRenderer,
  },
  ref
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(
    Math.min(Math.max(initialVolume, 0), 1)
  );
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(initialPlaybackRate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  // --- ACTIONS ---
  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    void v.play();
  }, []);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const setVolume = useCallback((val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.min(Math.max(val, 0), 1);
    v.volume = clamped;
    setVolumeState(clamped);
    if (clamped > 0 && v.muted) v.muted = false;
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const seekTo = useCallback((t: number) => {
    const v = videoRef.current;
    if (!v || !isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(t, 0), v.duration);
  }, []);

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v || !isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(v.currentTime + delta, 0), v.duration);
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = rate;
    setPlaybackRateState(rate);
  }, []);

  const enterFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    const el = containerRef.current;
    if (!el || document.fullscreenElement) return;
    el.requestFullscreen?.();
  }, []);

  const exitFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      containerRef.current?.requestFullscreen?.();
    }
  }, []);

  // --- EVENTS / EFFECTS ---
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // initialize once on mount + when deps change
    v.volume = volume;
    v.playbackRate = playbackRate;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(v.currentTime);
    const onLoaded = () => setDuration(v.duration || 0);
    const onVolume = () => {
      setVolumeState(v.volume);
      setMuted(v.muted);
    };
    const onProgress = () => {
      try {
        if (!v.buffered || v.buffered.length === 0 || !isFinite(v.duration)) {
          setBufferedPercent(0);
          return;
        }
        const end = v.buffered.end(v.buffered.length - 1);
        setBufferedPercent(Math.min(100, (end / v.duration) * 100));
      } catch {
        setBufferedPercent(0);
      }
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("volumechange", onVolume);
    v.addEventListener("progress", onProgress);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("volumechange", onVolume);
      v.removeEventListener("progress", onProgress);
    };
  }, [volume, playbackRate]);

  useEffect(() => {
    const onFsChange = () => {
      if (typeof document === "undefined") return;
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    if (typeof document !== "undefined") {
      document.addEventListener("fullscreenchange", onFsChange);
      return () => document.removeEventListener("fullscreenchange", onFsChange);
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (["input", "textarea"].includes(tag)) return; // don't hijack forms
      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          togglePlay();
          break; // space
        case "k":
          togglePlay();
          break;
        case "arrowright":
          seekBy(5);
          break;
        case "arrowleft":
          seekBy(-5);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "m":
          toggleMute();
          break;
        case ",":
          setPlaybackRate(Math.max(0.25, playbackRate - 0.25));
          break;
        case ".":
          setPlaybackRate(Math.min(3, playbackRate + 0.25));
          break;
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, [
    togglePlay,
    seekBy,
    toggleFullscreen,
    toggleMute,
    playbackRate,
    setPlaybackRate,
  ]);

  // Auto-hide overlay while playing
  useEffect(() => {
    if (!isPlaying) return;
    const t = setTimeout(() => setShowOverlay(false), 1200);
    return () => clearTimeout(t);
  }, [isPlaying, currentTime]);

  // --- expose API via ref ---
  useImperativeHandle(
    ref,
    () => ({
      play,
      pause,
      togglePlay,
      setVolume,
      toggleMute,
      seekTo,
      seekBy,
      setPlaybackRate,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isPlaying,
      muted,
      volume,
      currentTime,
      duration,
      playbackRate,
      isFullscreen,
      bufferedPercent,
      videoEl: videoRef.current,
    }),
    [
      play,
      pause,
      togglePlay,
      setVolume,
      toggleMute,
      seekTo,
      seekBy,
      setPlaybackRate,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isPlaying,
      muted,
      volume,
      currentTime,
      duration,
      playbackRate,
      isFullscreen,
      bufferedPercent,
    ]
  );

  const api: VideoAPI = useMemo(
    () => ({
      play,
      pause,
      togglePlay,
      setVolume,
      toggleMute,
      seekTo,
      seekBy,
      setPlaybackRate,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isPlaying,
      muted,
      volume,
      currentTime,
      duration,
      playbackRate,
      isFullscreen,
      bufferedPercent,
      videoEl: videoRef.current,
    }),
    [
      play,
      pause,
      togglePlay,
      setVolume,
      toggleMute,
      seekTo,
      seekBy,
      setPlaybackRate,
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isPlaying,
      muted,
      volume,
      currentTime,
      duration,
      playbackRate,
      isFullscreen,
      bufferedPercent,
    ]
  );

  // Derived values
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remaining = Math.max(0, duration - currentTime);

  const DefaultControls = () => (
    <>
      {/* Center big play/pause */}
      <button
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={togglePlay}
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          showOverlay || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: showOverlay || !isPlaying ? "auto" : "none" }}
      >
        <span className="bg-black/40 hover:bg-black/50 text-white rounded-full p-5 backdrop-blur-md">
          {isPlaying ? (
            <Pause />
          ) : (
            <Play />
          )}
        </span>
      </button>

      {/* Bottom controls bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2 bg-gradient-to-t from-black/60 to-transparent text-white">
        <div className="flex items-center gap-3">
          {/* tiny play/pause */}
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
            className="p-2 rounded hover:bg-white/10"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* seek track */}
          <div className="flex-1">
            <div className="relative h-3 group">
              {/* buffered bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/25"
                style={{ width: `${bufferedPercent}%` }}
              />
              {/* progress bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/70"
                style={{ width: `${progress}%` }}
              />
              {/* input range on top*/}
              <input
                aria-label="Seek"
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-3 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* timers: elapsed / remaining */}
          <div className="shrink-0 text-xs tabular-nums bg-black/30 rounded px-2 py-1">
            {formatTime(currentTime)} / -{formatTime(remaining)}
          </div>

          {/* volume */}
          <button
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="p-2 rounded hover:bg-white/10"
          >
            {muted || volume === 0 ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 9v6h4l5 5V4L9 9H5zm12.5 3a4.5 4.5 0 0 1-2.5 4.03v-8.06A4.5 4.5 0 0 1 17.5 12z" />
                <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 9v6h4l5 5V4L9 9H5zm12.5 3a4.5 4.5 0 0 1-2.5 4.03v-8.06A4.5 4.5 0 0 1 17.5 12z" />
              </svg>
            )}
          </button>
          <input
            aria-label="Volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />

          {/* speed */}
          <select
            aria-label="Playback speed"
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="text-xs bg-black/40 rounded px-2 py-1"
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => (
              <option key={r} value={r}>
                {r}×
              </option>
            ))}
          </select>

          {/* fullscreen */}
          <button
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleFullscreen}
            className="p-2 rounded hover:bg-white/10"
          >
            {isFullscreen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 10V5h5v2h-3v3h-2zm-4 4v5H5v-2h3v-3h2zm8 3v2h-5v-2h3v-3h2v3zM7 7H5V5h5v2H7v3H5V7z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 5h5v5h-2V7h-3V5zM5 14h2v3h3v2H5v-5zm12 3h-3v2h5v-5h-2v3zM7 7v3H5V5h5v2H7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={containerRef}
      className={
        "relative bg-black rounded-xl overflow-hidden select-none " +
        (className || "")
      }
      onMouseMove={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full block"
        onClick={() => setShowOverlay((s) => !s)}
        onDoubleClick={toggleFullscreen}
        playsInline
      />

      {!hideDefaultUI && <DefaultControls />}

      {/* Custom controls slot */}
      {typeof controlsRenderer === "function" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="pointer-events-auto">{controlsRenderer(api)}</div>
        </div>
      )}
    </div>
  );
});

// --------------------
// TEST CASES / DEMO
// --------------------
// We export a demo so the canvas can preview and you can quickly verify the API.
// Replace the src with your own file.

function CustomBar({ api }: { api: VideoAPI }) {
  return (
    <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 bg-black/50 text-white rounded-lg px-2 py-1">
      <button className="text-xs px-2 py-1 bg-white/10 rounded" onClick={api.togglePlay}>
        {api.isPlaying ? "Pause" : "Play"}
      </button>
      <button className="text-xs px-2 py-1 bg-white/10 rounded" onClick={() => api.seekBy(-10)}>
        -10s
      </button>
      <button className="text-xs px-2 py-1 bg-white/10 rounded" onClick={() => api.seekBy(10)}>
        +10s
      </button>
      <span className="text-[10px] tabular-nums ml-auto">
        {formatTime(api.currentTime)} / {formatTime(api.duration)}
      </span>
    </div>
  );
}

export default function Demo() {
  const ref1 = useRef<VideoAPI>(null);
  const ref2 = useRef<VideoAPI>(null);

  const sample =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Test Case 1: Default UI */}
      <div>
        <h2 className="text-sm font-medium mb-2 text-gray-200">Test 1: Default UI</h2>
        <VideoPlayer ref={ref1} src={sample} className="aspect-video" poster="" />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref1.current?.seekBy(-5)}>
            ◀︎ -5s
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref1.current?.seekBy(5)}>
            +5s ▶︎
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref1.current?.setPlaybackRate(2)}>
            2× speed
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref1.current?.toggleFullscreen()}>
            Toggle Fullscreen
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref1.current?.toggleMute()}>
            Toggle Mute
          </button>
        </div>
      </div>

      {/* Test Case 2: Custom Controls Renderer */}
      <div>
        <h2 className="text-sm font-medium mb-2 text-gray-200">Test 2: Custom Controls</h2>
        <VideoPlayer
          ref={ref2}
          src={sample}
          className="aspect-video"
          hideDefaultUI
          controlsRenderer={(api) => <CustomBar api={api} />}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref2.current?.play()}>
            Play()
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref2.current?.pause()}>
            Pause()
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref2.current?.setVolume(0.2)}>
            Volume 20%
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => ref2.current?.seekTo(30)}>
            SeekTo 30s
          </button>
        </div>
      </div>
    </div>
  );
}
