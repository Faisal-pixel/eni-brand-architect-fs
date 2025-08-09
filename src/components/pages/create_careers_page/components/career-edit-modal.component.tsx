import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { z } from "zod";
import { X, Square } from "lucide-react";
import {
  CareerFormData,
  CareerPost,
  careerSchema,
} from "@/app/types/create-careers-page.types";
import Image from "next/image";
import {
  AlignCenterButtonIcon,
  AlignJustifyButtonIcon,
  AlignLeftButtonIcon,
  AlignRightButtonIcon,
  AttachImageContentButtonIcon,
  BoldButtonIcon,
  ItalicButtonIcon,
  LinkButtonIcon,
  ListButtonIcon,
  UnderlineButtonIcon,
} from "@/assets/icons";

// Zod validation schema

interface CareerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CareerFormData) => void;
  edittedCareerData: CareerPost | null;
}

const CareersEditModal: React.FC<CareerEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  edittedCareerData,
}) => {
  const [formData, setFormData] = useState<Partial<CareerFormData>>({
    jobTitle: edittedCareerData?.jobTitle || "",
    jobType: edittedCareerData?.jobType || undefined,
    shortJobBrief: edittedCareerData?.shortJobBrief || "",
    jobCategory: edittedCareerData?.jobCategory || undefined,
    linkToApply: edittedCareerData?.linkToApply || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const contentRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: "Design", label: "Design" },
    { value: "Product", label: "Product" },
    { value: "Marketing", label: "Marketing" },
    {value: "Engineering", label: "Engineering" },
    { value: "Development", label: "Development" },
    { value: "Sales", label: "Sales" },
    { value: "Customer", label: "Customer" },
    { value: "Management", label: "Management" },
  ];

  const jobTypes = [
    { value: "Full-time", label: "Full Time" },
    { value: "Part-time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Remote", label: "Remote" },
    { value: "Internship", label: "Internship" },
  ];

  // const colors = [
  //   '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  //   '#FFA500', '#800080', '#008000', '#FF1493', '#4169E1', '#32CD32', '#FF6347'
  // ];

  const handleInputChange = (
    field: keyof CareerFormData,
    value: string | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      executeCommand("insertImage", url);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      let content = contentRef.current.innerHTML;

      // Remove the placeholder text if it exists
      if (content.includes('text-gray-500">Write or type your blog post</p>')) {
        content = "";
        contentRef.current.innerHTML = "";
      }

      handleInputChange("shortJobBrief", content);
    }
  };

  const validateAndSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const validatedData = careerSchema.parse(formData);
      await onSubmit(validatedData);
      onClose();
      setFormData({
        jobTitle: "",
        jobType: undefined,
        shortJobBrief: "",
        jobCategory: undefined,
        linkToApply: "",
      });
      setErrors({});
      setSelectedColor("#000000");
      contentRef.current?.focus();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (contentRef.current) {
      if (
        edittedCareerData?.shortJobBrief &&
        edittedCareerData?.shortJobBrief.trim() !== ""
      ) {
        // Set the innerHTML to render the HTML content properly
        contentRef.current.innerHTML = edittedCareerData?.shortJobBrief;
      } else {
        // Set placeholder content if no content exists
        contentRef.current.innerHTML =
          '<p class="text-gray-500">Write or type your blog post</p>';
      }
    }
  }, [edittedCareerData?.shortJobBrief, isOpen]);

  useEffect(() => {
    if (edittedCareerData) {
      setFormData({
        jobTitle: edittedCareerData.jobTitle || "",
        jobType: edittedCareerData.jobType || undefined,
        shortJobBrief: edittedCareerData.shortJobBrief || "",
        jobCategory: edittedCareerData.jobCategory || undefined,
        linkToApply: edittedCareerData.linkToApply || "",
      });
    }
  }, [edittedCareerData]);

  useEffect(() => {
    if(!isOpen) {
        setFormData({
          jobTitle: "",
          jobType: undefined,
          shortJobBrief: "",
          jobCategory: undefined,
          linkToApply: "",
        });
    }
    }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Career Post
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-[rgba(17,24,39,1)] mb-2">
                Job Title
              </label>
              <input
                ref={titleInputRef}
                type="text"
                placeholder="Enter Job Title"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className={`w-full p-3 max-h-[40px] border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={formData.jobType || ""}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  className={`w-full px-4 py-3 border cursor-pointer rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.jobType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" className="cursor-pointer">
                    Select job type
                  </option>
                  {jobTypes.map((type) => (
                    <option
                      className="cursor-pointer"
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.jobCategory || ""}
                  onChange={(e) =>
                    handleInputChange("jobCategory", e.target.value)
                  }
                  className={`w-full px-4 py-3 border cursor-pointer rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.jobCategory ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" className="cursor-pointer">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option
                      className="cursor-pointer"
                      key={cat.value}
                      value={cat.value}
                    >
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgba(17,24,39,1)] mb-2">
                Link to Apply
              </label>
              <input
                ref={titleInputRef}
                type="text"
                placeholder="Enter Link to Apply"
                value={formData.linkToApply}
                onChange={(e) =>
                  handleInputChange("linkToApply", e.target.value)
                }
                className={`w-full p-3 max-h-[40px] border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.linkToApply ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.linkToApply && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.linkToApply}
                </p>
              )}
            </div>

            {/* Short Job Brief */}
            <div>
              <label className="block text-sm font-medium text-[rgba(17,24,39,1)] mb-2">
                Short Job Brief
              </label>

              {/* Formatting Toolbar */}
              <div className="p-[5px] flex flex-wrap gap-[12px]">
                <button
                  type="button"
                  onClick={() => executeCommand("bold")}
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                  title="Bold"
                >
                  <Image
                    src={BoldButtonIcon}
                    alt="Bold"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("italic")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Italic"
                >
                  <Image
                    src={ItalicButtonIcon}
                    alt="Italic"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("underline")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Underline"
                >
                  <Image
                    src={UnderlineButtonIcon}
                    alt="Underline"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("insertUnorderedList")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Bullet List"
                >
                  <Image
                    src={ListButtonIcon}
                    alt="List"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyLeft")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Align Left"
                >
                  <Image
                    src={AlignLeftButtonIcon}
                    alt="Align Left"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyCenter")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Align Center"
                >
                  <Image
                    src={AlignCenterButtonIcon}
                    alt="Align Center"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyRight")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Align Right"
                >
                  <Image
                    src={AlignRightButtonIcon}
                    alt="Align Right"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("justifyFull")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Justify"
                >
                  <Image
                    src={AlignJustifyButtonIcon}
                    alt="Align Justify"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand("formatBlock", "blockquote")}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Block Quote"
                >
                  <Square size={32} />
                </button>
                <button
                  type="button"
                  onClick={insertLink}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Insert Link"
                >
                  <Image
                    src={LinkButtonIcon}
                    alt="Insert Link"
                    width={32}
                    height={32}
                  />
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Insert Image"
                >
                  <Image
                    src={AttachImageContentButtonIcon}
                    alt="Insert Image"
                    width={32}
                    height={32}
                  />
                </button>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      executeCommand("foreColor", e.target.value);
                    }}
                    className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                    title="Text Color"
                  />
                </div>
              </div>

              <div
                ref={contentRef}
                contentEditable
                onInput={handleContentChange}
                className={`min-h-[200px] p-4 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.shortJobBrief ? "border-red-500" : ""
                }`}
                style={{ maxHeight: "400px", overflowY: "auto" }}
                suppressContentEditableWarning={true}
              >
                <p className="text-gray-500">Write or type the job brief</p>
              </div>
              {errors.shortJobBrief && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shortJobBrief}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="">
              <motion.button
                type="button"
                onClick={validateAndSubmit}
                disabled={isSubmitting}
                className="px-5 py-3.5 w-full cursor-pointer bg-[#017544] text-white rounded-xl hover:bg-[#016d3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CareersEditModal;
