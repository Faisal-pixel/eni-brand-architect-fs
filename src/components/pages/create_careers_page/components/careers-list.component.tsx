import { AddBlogPostIcon, UploadIcon } from "@/assets/icons";
import { ChevronLeft, ChevronRight, Edit3, Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";
import { CareerPost } from "@/app/types/create-careers-page.types";
import toast from "react-hot-toast";
import deleteCareersApi from "@/helpers/api_callers/delete-careers.api.callers";

type Props = {
  careersPostsProp: CareerPost[];
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  totalNumberOfCareers: number;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onCareersDeleted?: (postId: string) => void;
  setEdittedCareerData?: (career: CareerPost) => void;
  setIsEditModalOpen?: (isOpen: boolean) => void;
};

const CareersListsComponent = ({
  careersPostsProp,
  setIsModalOpen,
  totalNumberOfCareers,
  page,
  totalPages,
  setPage,
  onCareersDeleted,
  setEdittedCareerData,
  setIsEditModalOpen,
}: Props) => {
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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
    setSelectedCareers((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const confirmDelete = async () => {
    if (careerToDelete) { // if there is a post to delete
      try {
        setDeleting(true); // set the deleting state to true
        // Call the API to delete the blog post
        const deletedPost = await deleteCareersApi(careerToDelete);
        console.log("Deleted post:", deletedPost);
        toast.success(`${deletedPost.jobTitle} deleted successfully!`);

        // Call parent callback to refresh the data
        if (onCareersDeleted) { // So we will have a handleDeletePost function passed from the parent that refreshes the data
          onCareersDeleted(careerToDelete);
        }
      } catch (error) {
        console.error("Error deleting career:", error);
        toast.error("Failed to delete career.");
      } finally {
        setSelectedCareers((prev) => prev.filter((id) => id !== careerToDelete));
        setDeleting(false);
      }
    }
    setShowDeleteConfirm(false);
    setCareerToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setCareerToDelete(null);
  };

  const handleDeleteClick = (postId: string) => {
    setCareerToDelete(postId);
    setShowDeleteConfirm(true);
  };

  const handleEditClick = (career: CareerPost) => {
    if (setEdittedCareerData) {
      setEdittedCareerData(career);
    }
    if (setIsEditModalOpen) {
      setIsEditModalOpen(true);
    }
  };

  const filteredPosts = careersPostsProp.filter(
    (post) =>
      post.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.jobCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <section id="create-careers" className="">
      <div className="flex flex-col h-[81vh] rounded-[12px] border border-[#E9EAEB]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-[26px] pb-[21px]">
          <div className="flex items-center gap-2">
            <h1 className="text-lg leading-[28px] font-semibold text-gray-900">
              Careers
            </h1>
            <span className="bg-[#EAF8F2] text-[#017544] border border-[#E9D7FE] py-[2px] px-2 rounded-[16px] text-xs font-medium">
              {totalNumberOfCareers} Careers
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm leading-[20px] px-3.5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-[8px] cursor-pointer">
              <Image src={UploadIcon} alt="Upload" width={20} height={20} />
              Import
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-sm leading-[20px] px-3.5 py-2.5 text-white bg-[#017544] border border-gray-300 rounded-[8px] cursor-pointer"
            >
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
                <th className="w-12 pl-[24px] ">
                  <input
                    type="checkbox"
                    className="cursor-pointer w-5 h-5 rounded-[6px] border border-gray-300"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-700 leading-[18px]">
                  Job Title
                </th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 leading-[18px]">
                  Category
                </th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 leading-[18px]">
                  Job Type
                </th>
                <th className="text-left p-4 text-xs font-semibold text-gray-500 leading-[18px]">
                  Date
                </th>
                <th className="w-20 p-4"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredPosts.map((career) => (
                  <motion.tr
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="pl-[24px] py-[26px]">
                      <input
                        type="checkbox"
                        checked={selectedCareers.includes(career.id)}
                        onChange={() => handleSelectPost(career.id)}
                        className="w-5 h-5 text-emerald-600 cursor-pointer border border-gray-300 rounded-[6px] focus:ring-emerald-500"
                      />
                    </td>
                    <td className="p-4 pl-3">{career.jobTitle}</td>
                    <td className={`p-4 text-gray-900 `}>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          career.jobCategory
                        )}`}
                      >
                        {career.jobCategory}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{career.jobType}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium`}
                      >
                        {career.datePosted.slice(0, 10)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteClick(career.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button onClick={() => handleEditClick(career)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
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
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`flex items-center gap-2 px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  page === p
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
            className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Career Post
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this career post? This action
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
                  disabled={deleting}
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareersListsComponent;
