"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminContainer from "@/components/admin-container";
import Image from "next/image";
import { AddBlogPostIcon, UploadIcon } from "@/assets/icons";

interface BlogPost {
  id: string;
  image: string;
  title: string;
  date: string;
  category: "Design" | "Product" | "Marketing";
}

const CreateBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      image: "/api/placeholder/80/80",
      title: "The real life something of Falz",
      date: "12/10/2025",
      category: "Design",
    },
    {
      id: "2",
      image: "/api/placeholder/80/80",
      title: "The real life something of Falz",
      date: "12/10/2025",
      category: "Product",
    },
    {
      id: "3",
      image: "/api/placeholder/80/80",
      title: "The real life something of Falz",
      date: "12/10/2025",
      category: "Marketing",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Design":
        return "bg-purple-100 text-purple-700";
      case "Product":
        return "bg-blue-100 text-blue-700";
      case "Marketing":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setBlogPosts((prev) => prev.filter((post) => post.id !== postToDelete));
      setSelectedPosts((prev) => prev.filter((id) => id !== postToDelete));
    }
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminContainer>
      <section id="create-blog" className="">
        <div className="flex flex-col h-[81vh] rounded-[12px] border border-[#E9EAEB]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-[26px] pb-[21px]">
            <div className="flex items-center gap-2">
              <h1 className="text-lg leading-[28px] font-semibold text-gray-900">
                Blog Posts
              </h1>
              <span className="bg-[#EAF8F2] text-[#017544] border border-[#E9D7FE] py-[2px] px-2 rounded-[16px] text-xs font-medium">
                {blogPosts.length} Posts
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm leading-[20px] px-3.5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-[8px] cursor-pointer">
                <Image src={UploadIcon} alt="Upload" width={20} height={20} />
                Import
              </button>
              <button className="flex items-center gap-2 text-sm leading-[20px] px-3.5 py-2.5 text-white bg-[#017544] border border-gray-300 rounded-[8px] cursor-pointer">
                <Image
                  src={AddBlogPostIcon}
                  alt="Add Post"
                  width={20}
                  height={20}
                />
                Add Post
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="py-3 px-6 border-t border-[#E9EAEB]">
            <div className="relative max-w-[400px] ml-auto">
              <Search
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Stripe"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#017544] focus:border-transparent"
              />
              <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                ⌘K
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Image
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Title
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="w-20 p-4"></th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredPosts.map((post) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => handleSelectPost(post.id)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-4">
                        <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-900">{post.title}</td>
                      <td className="p-4 text-gray-600">{post.date}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteClick(post.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit3 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-auto">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    page === 1
                      ? "bg-emerald-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Blog Post
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this blog post? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </AdminContainer>
  );
};

export default CreateBlogPage;
