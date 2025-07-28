import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variant, Variants } from 'framer-motion';
import { z } from 'zod';
import { X, Calendar, Image, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Square, Link, Upload, Palette } from 'lucide-react';

// Zod validation schema
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  date: z.string().min(1, 'Date is required'),
  image: z.union([z.string().url(), z.instanceof(File)]).optional(),
  content: z.string().min(1, 'Content is required'),
  authorName: z.string().min(1, 'Author name is required'),
  authorImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
  category: z.enum(['design', 'product', 'software engineering', 'customer success'], {
    errorMap: () => ({ message: 'Please select a valid category' })
  })
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => void;
}

const BlogCreationModal: React.FC<BlogCreationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<BlogFormData>>({
    title: '',
    date: '',
    content: '',
    authorName: '',
    category: undefined
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const authorImageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'software engineering', label: 'Software Engineering' },
    { value: 'customer success', label: 'Customer Success' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#FF1493', '#4169E1', '#32CD32', '#FF6347'
  ];

  const handleInputChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (field: 'image' | 'authorImage', file: File | null) => {
    if (file) {
      handleInputChange(field, file);
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertImage', url);
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
        executeCommand('insertHTML', `<a href="${result}" target="_blank">${file.name}</a>`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      handleInputChange('content', contentRef.current.innerHTML);
    }
  };

  const validateAndSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});
      
      const validatedData = blogSchema.parse(formData);
      await onSubmit(validatedData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
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
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create Blog Post</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                ref={titleInputRef}
                type="text"
                placeholder="Enter Title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={formData.authorName || ''}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    errors.authorName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.authorName && <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>}
              </div>

              {/* Author Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Image</label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.authorImage ? (
                      <img 
                        src={formData.authorImage instanceof File ? URL.createObjectURL(formData.authorImage) : formData.authorImage} 
                        alt="Author" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image size={20} className="text-gray-400" />
                    )}
                  </div>
                  <input
                    ref={authorImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>  handleImageUpload('authorImage', e.target.files?.[0] || null)}
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
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {formData.image ? (
                  <div className="relative">
                    <img 
                      src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleInputChange('image', undefined)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Image size={48} className="mx-auto text-gray-400 mb-4" />
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('image', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Click to upload image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              
              {/* Formatting Toolbar */}
              <div className="border border-gray-300 rounded-t-lg p-3 bg-gray-50 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => executeCommand('bold')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Bold"
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand('italic')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Italic"
                >
                  <Italic size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand('underline')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Underline"
                >
                  <Underline size={16} />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => executeCommand('insertUnorderedList')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Bullet List"
                >
                  <List size={16} />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => executeCommand('justifyLeft')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Align Left"
                >
                  <AlignLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand('justifyCenter')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Align Center"
                >
                  <AlignCenter size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => executeCommand('justifyRight')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Align Right"
                >
                  <AlignRight size={16} />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => executeCommand('formatBlock', 'blockquote')}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Block Quote"
                >
                  <Square size={16} />
                </button>
                <button
                  type="button"
                  onClick={insertLink}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Insert Link"
                >
                  <Link size={16} />
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Insert Image"
                >
                  <Image size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleFileAttach}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  title="Attach File"
                >
                  <Upload size={16} />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <div className="flex items-center space-x-2">
                  <Palette size={16} className="text-gray-600" />
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => {
                      setSelectedColor(e.target.value);
                      executeCommand('foreColor', e.target.value);
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
                className={`min-h-[200px] p-4 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.content ? 'border-red-500' : ''
                }`}
                style={{ maxHeight: '400px', overflowY: 'auto' }}
                suppressContentEditableWarning={true}
              >
                <p className="text-gray-500">Write or type your blog post</p>
              </div>
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="button"
                onClick={validateAndSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
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

// Example usage component
const TestForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlogSubmit = (data: BlogFormData) => {
    console.log('Blog data submitted:', data);
    // Here you would send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Blog Post
      </button>

      <BlogCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBlogSubmit}
      />
    </div>
  );
};

export default TestForm;