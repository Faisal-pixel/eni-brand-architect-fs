"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  ArrowUpRightGoToArticleGrayIcon,
  EventCalendarIcon,
} from "@/assets/icons";
import Link from "next/link";

const PastAndUpcomingEventsSection = () => {
  const events = {
    pastEvents: [
      {
        id: "1",
        date: "27 October 2024",
        title: "The Eniivy Experience (It can only be Naija)",
        description:
          "An Evening of fun, movies, and conversations with the CommuniTEE",
        imageUrl: "/images/events/past-events-1-img.png",
        link: "#"
      },
      {
        id: "2",
        date: "23 February 2024",
        title: "The Eniivy Experience (The CommuniTEE is back)",
        description:
          "Come have conservations about love, heartbreak, sing your heart out and Partyyyyyyy!",
        imageUrl: "/images/events/past-events-2-img.png",
        link: "#"
      },
      {
        id: "3",
        date: "27 July 2025",
        title: "The Eniivy Experience (Movies & Conversations)",
        description:
          "An Evening of fun, movies, and conversations with the CommuniTEE",
        imageUrl: "/images/events/upcoming-events-3-img.png",
        link: "#"
      },
      {
        id: "4",
        date: "22nd - 24th August 2025",
        title: "Let's Swing for Autism",
        description: "Play with Stephen Golf Tournament.",
        imageUrl: "/images/events/upcoming-events-4-img.png",
        link: "#"
      },
    ],
    upcomingEvents: [
      {
        id: "1",
        date: "See you in November",
        title: "The Eniivy Experience (Sip & Share Edition)",
        description: "Participate in our upcoming The Eniivy Experience (Sip & Share Edition) event.",
        imageUrl: "/images/events/anticipate-sip-and-paint.png",
        link: "https://forms.gle/8bGKXFwRTf29TNhB7"
      },
    ],
  }; // This should be replaced with actual events data
  return (
    <div className="flex flex-col gap-y-16">
      {/* PAST EVENTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <h2 className="text-4xl font-semibold mb-4">Past Events</h2>
        {/* Past events content goes here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch">
          {events.pastEvents.map((event, index) => (
            // <Link
            //   key={index}
            //   href={`/events/${event.id}/${event.title
            //     .toLowerCase()
            //     .replace(/\s+/g, "-")}`}
            //   className="cursor-pointer"
            // >
            <Link
              key={index}
              href={event.link}
              className="cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex flex-col gap-y-4 md:max-w-[341px] lg:max-w-[392px] group hover:scale-102 transition-transform duration-300 cursor-hover"
              >
                <div className="md:max-w-[392px] relative h-[261px] rounded-2xl">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="self-start flex flex-row gap-x-2 text-sm text-gray-600 items-center justify-center">
                    <Image src={EventCalendarIcon} alt="Event Calendar Icon" />

                    {event.date}
                  </span>

                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-x-4">
                      {/* <Link
                        href={`/events/${event.id}/${event.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="cursor-pointer"
                      > */}
                      <Link
                        href={event.link}
                        className="cursor-pointer"
                      >
                        <h3 className="text-lg font-semibold leading-[28px] text-gray-900 group-hover:text-[rgba(1,117,68,1)]">
                          {event.title}
                        </h3>
                      </Link>

                      <Image
                        className="self-start"
                        src={ArrowUpRightGoToArticleGrayIcon}
                        alt="Arrow Up Right Go To Article Icon"
                      />
                    </div>

                    <div>
                      <p className="text-base leading-[24px] text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
      {/* UPCOMING EVENTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <h2 className="text-4xl font-semibold mb-4">Upcoming Events</h2>
        {/* Upcoming events content goes here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-stretch">
          {events.upcomingEvents.map((event, index) => (
            // <Link
            //   key={index}
            //   href={`/events/${event.id}/${event.title
            //     .toLowerCase()
            //     .replace(/\s+/g, "-")}`}
            //   className="cursor-pointer"
            // >
            <Link
              key={index}
              href={event.link}
              className="cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex flex-col gap-y-4 md:max-w-[341px] lg:max-w-[392px] group hover:scale-102 transition-transform duration-300 cursor-hover"
              >
                <div className="md:max-w-[392px] relative h-[261px] rounded-2xl">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="self-start flex flex-row gap-x-2 text-sm text-gray-600 items-center justify-center">
                    <Image src={EventCalendarIcon} alt="Event Calendar Icon" />

                    {event.date}
                  </span>

                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-x-4">
                      {/* <Link
                        href={`/events/${event.id}/${event.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="cursor-pointer"
                      > */}
                      <Link
                        href={event.link}
                        className="cursor-pointer"
                      >
                        <h3 className="text-lg font-semibold leading-[28px] text-gray-900 group-hover:text-[rgba(1,117,68,1)]">
                          {event.title}
                        </h3>
                      </Link>

                      <Image
                        className="self-start"
                        src={ArrowUpRightGoToArticleGrayIcon}
                        alt="Arrow Up Right Go To Article Icon"
                      />
                    </div>

                    <div>
                      <p className="text-base leading-[24px] text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PastAndUpcomingEventsSection;
