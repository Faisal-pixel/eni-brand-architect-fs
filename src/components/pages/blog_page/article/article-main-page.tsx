"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Article } from "@/app/types/blog-articles.types";

type ArticleMainPageProps = {
  article: Article;
};

interface BlogPageProps {
  title: string;
  description: string;
  date: string;
  blogImage: string;
  blogText: string;
}

const BlogPage: React.FC<BlogPageProps> = ({
  title,
  description,
  date,
  blogImage,
  blogText,
}) => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col items-center justify-center mb-16"
        variants={itemVariants}
      >
        <motion.h1
          className="text-4xl font-semibold text-gray-900 mb-4 leading-[44px]"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl leading-[30px] text-gray-600 italic mb-6"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        <motion.p
          className="text-gray-500 text-sm leading-[30px]"
          variants={itemVariants}
        >
          {date}
        </motion.p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="relative w-full h-[426px] md:h-[716px] mb-16"
        variants={imageVariants}
      >
        <Image
          src={blogImage}
          alt={title}
          className="w-full h-full object-cover rounded-[10px]"
          fill
          priority // optional: ensures it's not lazy-loaded (useful for hero/banner)
        />
      </motion.div>

      {/* Blog Content */}
      <motion.div className="" variants={itemVariants}>
        <motion.div
          className="prose prose-lg max-w-none"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: blogText }}
          style={{
            lineHeight: "28px",
            fontSize: "1.1rem",
            color: "#535862",
          }}
        />
      </motion.div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>

      <style jsx>{``}</style>
    </motion.div>
  );
};

// Example usage component
const ArticleMainPage = ({ article }: ArticleMainPageProps) => {
  const sampleBlogText = `<p>${article.content}</p>`;

  const { title, description, date, imageUrl } = article;

  // Format the date from ISO string to readable format
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Fallback to original string if formatting fails
    }
  };

  return (
    <BlogPage
      title={title}
      description={description}
      date={formatDate(date)}
      blogImage={imageUrl as string}
      blogText={sampleBlogText}
    />
  );
};

export default ArticleMainPage;
