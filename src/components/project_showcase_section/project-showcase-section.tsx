import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Image from "next/image";

const ProjectShowcaseSection = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>("tee");

  const projects = [
    {
      id: "tee",
      number: "01",
      title: "The Eniivy Experience (TEE)",
      category: "Outreach",
      description:
        "Tallentville Africa is a pan african platform/community focused on discovering, showcasing, and empowering young African talent in the creative and performance arts",
      year: "2025",
      images: [
        {
          src: "/images/TEE-project-showcase-img-1.jpg",
          alt: "TEE project image 1",
        },
        {
          src: "/images/TEE-project-showcase-img-2.jpg",
          alt: "TEE project image 2",
        },
        {
          src: "/images/TEE-project-showcase-img-3.jpg",
          alt: "TEE project image 3",
        },
        {
          src: "/images/TEE-project-showcase-img-4.jpg",
          alt: "TEE project image 4",
        },
      ],
    },
    {
      id: "golf",
      number: "02",
      title: "PLAY WITH STEPHEN",
      category: "Outreach",
      description:
        "Play With Stephen is a purpose-driven African golf movement powered by the Olston Foundation. Since 2020, it has grown from a casual golf hangout into a multi-dimensional campaign advancing autism awareness, inclusion, and sport-driven advocacy across the continent.",
      year: "2024",
      images: [
        {
          src: "/images/TEE-project-showcase-img-1.jpg",
          alt: "TEE project image 1",
        },
        {
          src: "/images/TEE-project-showcase-img-2.jpg",
          alt: "PLAYWITHSTEPHEN GOLF TASTING project image 2",
        },
        {
          src: "/images/TEE-project-showcase-img-3.jpg",
          alt: "PLAYWITHSTEPHEN GOLF TASTING project image 3",
        },
        {
          src: "/images/TEE-project-showcase-img-4.jpg",
          alt: "PLAYWITHSTEPHEN GOLF TASTING project image 4",
        },
      ],
    },
    {
      id: "led",
      number: "03",
      title: "Talentville LED",
      category: "Outreach",
      description: "A Community of Storytelling, Soul, and Shared Moments Curated by ENI Brand Architect",
      year: "2024",
      images: [
        {
          src: "/images/TEE-project-showcase-img-1.jpg",
          alt: "LED project image 1",
        },
        {
          src: "/images/TEE-project-showcase-img-2.jpg",
          alt: "LED project image 2",
        },
        {
          src: "/images/TEE-project-showcase-img-3.jpg",
          alt: "LED project image 3",
        },
        {
          src: "/images/TEE-project-showcase-img-4.jpg",
          alt: "LED project image 4",
        },
      ],
    },
  ];

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="pt-24">
      <div className="">
        <motion.h1
          className="text-4xl font-semibold leading-11 text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Project Showcase
        </motion.h1>

        <motion.div
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`border-b border-gray-200 pb-6 ${
                project.number === "01" && "border-t"
              }`}
            >
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleProject(project.id)}
              >
                <div className="flex items-center">
                  <h2 className="text-xl font-medium text-[rgba(30,32,34,1)] py-4">
                    {project.title}
                  </h2>
                  <span className={`text-sm self-start font-medium ${expandedProject === project.id && "text-[rgba(1,117,68,1)]"}`}>
                    {project.number}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-[rgba(71,75,84,1)]">
                    {project.category}
                  </span>
                  <motion.div
                    animate={{
                      rotate: expandedProject === project.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-[rgba(71,75,84,1)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expandedProject === project.id && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-hidden"
                  >
                    <div className="">
                      <div className="flex flex-col md:flex-row md:gap-x-[39px] items-start mb-6">
                        <motion.div
                          variants={itemVariants}
                          className="mb-[39px] md:mb-0"
                        >
                          <p className="text-gray-700 leading-relaxed mb-[39px]">
                            {project.description}
                          </p>
                          <span className="text-sm  inline-flex items-end text-gray-500 h-[147px]">
                            {project.year}
                          </span>
                        </motion.div>

                        <motion.div variants={itemVariants} className="">
                          <div className="grid grid-cols-2 gap-2 h-[256px] w-[346px] pb-3.5">
                            <motion.div
                              variants={imageVariants}
                              className={`relative group row-span-2`}
                            >
                              <Image
                                src={project.images[0].src}
                                alt={project.images[0].alt}
                                fill
                                className="object-cover rounded-[5px] shadow-md shadow-[rgba(0,0,0,0.25)]"
                              />
                            </motion.div>
                            <motion.div
                              variants={imageVariants}
                              className={`relative group `}
                            >
                              <Image
                                src={project.images[1].src}
                                alt={project.images[1].alt}
                                fill
                                className="object-cover rounded-[5px] shadow-md shadow-[rgba(0,0,0,0.25)]"
                              />
                            </motion.div>
                            <motion.div
                              variants={imageVariants}
                              className={`relative group grid grid-cols-2 gap-x-2 `}
                            >
                              <div className="relative">
                                <Image
                                  src={project.images[2].src}
                                  alt={project.images[2].alt}
                                  fill
                                  className="object-cover rounded-[5px] shadow-md shadow-[rgba(0,0,0,0.25)]"
                                />
                              </div>
                              <div className="relative">
                                <Image
                                  src={project.images[3].src}
                                  alt={project.images[3].alt}
                                  fill
                                  className="object-cover rounded-[5px] shadow-md shadow-[rgba(0,0,0,0.25)]"
                                />
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectShowcaseSection;
