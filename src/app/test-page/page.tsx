"use client";
import MediaProdAndEventCoverageTesting from "@/components/services_section/media_production_and_event_coverage_section/vide-test";
import {
  VideoAPI,
  VideoPlayer,
} from "@/components/services_section/media_production_and_event_coverage_section/video-component";
import React, { useRef } from "react";
import ReactPlayer from 'react-player'

const Page = () => {
  const ref1 = useRef<VideoAPI>(null);

  const sample =
    "https://res.cloudinary.com/daya1fdka/video/upload/f_auto,q_auto/v1754487174/Landing_page_video_2_eknj4t.mov";
  return (
    <div className="flex flex-col  justify-center gap-10 p-10">
      <MediaProdAndEventCoverageTesting />
      <div className="max-w-5xl">
        <VideoPlayer
          ref={ref1}
          src={sample}
          className="aspect-video"
          poster=""
        />
      </div>

      <ReactPlayer src={sample} controls />
    </div>
  );
};

export default Page;
