import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { z } from "zod";
import { X, Image as LucideImage, Square } from "lucide-react";
import {
  BlogFormData,
  BlogPost,
  blogSchema,
} from "@/app/types/create-blog-page.types";
import Image from "next/image";
import {
  AlignCenterButtonIcon,
  AlignJustifyButtonIcon,
  AlignLeftButtonIcon,
  AlignRightButtonIcon,
  AttachFileButtonIcon,
  AttachImageContentButtonIcon,
  BoldButtonIcon,
  CalendarDatePickerIcon,
  ItalicButtonIcon,
  LinkButtonIcon,
  ListButtonIcon,
  UnderlineButtonIcon,
} from "@/assets/icons";
import toast from "react-hot-toast";

// Zod validation schema

interface BlogCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => void;
  editBlogData: BlogPost;
}

const BlogEditModal: React.FC<BlogCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editBlogData,
}) => {
  const [formData, setFormData] = useState<Partial<BlogFormData>>({
    title: editBlogData.title || "",
    description: editBlogData.description || "",
    date: editBlogData.date || "",
    content: editBlogData.content || "",
    category: editBlogData.category || undefined,
    image: editBlogData.image || undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const contentRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [{ value: "inspiration", label: "Inspiration" }];

  // const colors = [
  //   '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  //   '#FFA500', '#800080', '#008000', '#FF1493', '#4169E1', '#32CD32', '#FF6347'
  // ];

  const handleInputChange = (
    field: keyof BlogFormData,
    value: string | File | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (field: "image", file: File | null) => {
    if (file) {
      handleInputChange(field, file);
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

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you'd upload the file and get a URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        executeCommand(
          "insertHTML",
          `<a href="${result}" target="_blank">${file.name}</a>`
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      handleInputChange("content", contentRef.current.innerHTML);
    }
  };

  const validateAndSubmit = async () => {
    try {
      setIsSubmitting(true);

      setErrors({});

      const validatedData = blogSchema.parse(formData);
      await onSubmit(validatedData);
      setFormData({
        title: "",
        description: "",
        date: "",
        content: "",
        category: undefined,
      });
      toast.success("Blog post updated successfully!");
      onClose();
    } catch (error) {
      console.error("Validation error caught:", error);
      if (error instanceof z.ZodError) {
        console.error("Zod validation errors:", error.errors);
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          console.error("Individual error:", err);
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.error("Processed errors:", newErrors);
        setErrors(newErrors);
      }
      toast.error(
        error instanceof Error
          ? `Failed to update blog post. ${error.message}`
          : "Failed to update blog post. An unknown error occurred.",
        {
          id: "update-blog-post-error",
        }
      )
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
      if (editBlogData.content && editBlogData.content.trim() !== "") {
        // Set the innerHTML to render the HTML content properly
        contentRef.current.innerHTML = editBlogData.content;
      } else {
        // Set placeholder content if no content exists
        contentRef.current.innerHTML =
          '<p class="text-gray-500">Write or type your blog post</p>';
      }
    }
  }, [editBlogData.content, isOpen]);

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
              Create Blog Post
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[rgba(17,24,39,1)] mb-2">
                Title
              </label>
              <input
                ref={titleInputRef}
                type="text"
                placeholder="Enter Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full p-3 max-h-[40px] border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[rgba(17,24,39,1)] mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter a brief description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className={`w-full p-3 max-h-[40px] border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <Image
                    src={CalendarDatePickerIcon}
                    alt="Calendar Icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    width={20}
                    height={20}
                  />
                  {/* <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category || ""}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-4 py-3 border cursor-pointer rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.category ? "border-red-500" : "border-gray-300"
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

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              Author Name
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={formData.authorName || ""}
                  onChange={(e) =>
                    handleInputChange("authorName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.authorName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.authorName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.authorName}
                  </p>
                )}
              </div>

              Author Image 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Image
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.authorImage ? (
                      <Image
                        src={
                          formData.authorImage instanceof File
                            ? URL.createObjectURL(formData.authorImage)
                            : formData.authorImage
                        }
                        alt="Author"
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <LucideImage size={20} className="text-gray-400" />
                    )}
                  </div>
                  <input
                    ref={authorImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        "authorImage",
                        e.target.files?.[0] || null
                      )
                    }
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => authorImageInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div> */}

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6">
                {formData.image ? (
                  <div className="relative">
                    <Image
                      src={
                        formData.image instanceof File
                          ? URL.createObjectURL(formData.image)
                          : formData.image
                      }
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                      width={84}
                      height={66}
                    />
                    <button
                      onClick={() => handleInputChange("image", undefined)}
                      className="absolute top-2 cursor-pointer right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center cursor-pointer">
                    <LucideImage
                      size={48}
                      className="mx-auto text-gray-400 mb-4"
                    />
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload("image", e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium"
                    >
                      Click to upload image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-[rgba(17,24,39,1)] mb-2">
                Content
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
                {/* <div className="w-px h-6 bg-gray-300 mx-1"></div> */}
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
                <button
                  type="button"
                  onClick={handleFileAttach}
                  className="p-1.5 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                  title="Attach File"
                >
                  <Image
                    src={AttachFileButtonIcon}
                    alt="Attach File"
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
                  errors.content ? "border-red-500" : ""
                }`}
                style={{ maxHeight: "400px", overflowY: "auto" }}
                suppressContentEditableWarning={true}
              >
                {formData.content || (
                  <p className="text-gray-500">Write or type your blog post</p>
                )}
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="">
              {/* <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button> */}
              <motion.button
                type="button"
                onClick={validateAndSubmit}
                disabled={isSubmitting}
                className="px-5 py-3.5 w-full cursor-pointer bg-[#017544] text-white rounded-xl hover:bg-[#016d3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? "Editing..." : "Save Edit"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Hidden file input for attachments */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogEditModal;
