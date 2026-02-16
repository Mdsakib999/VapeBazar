import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-pro-react";
import { HiMiniXCircle } from "react-icons/hi2";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from "sonner";
import {
  X,
  Upload,
  User,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  Save,
  Loader2,
} from "lucide-react";

const EditBlogModal = ({ blog, onClose, refetch }) => {
  const [value, setValue] = useState(blog.description);
  const { axiosNotSecure } = useAxiosNotSecure();
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    ...blog,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  }, [value]);

  const [loading, setLoading] = useState(false);
  const [isAuthorImagesChange, setIsAuthorImagesChange] = useState(false);
  const [authorImagesUrl, setAuthorImagesUrl] = useState(blog?.authorImage);
  const [isBlogImagesChange, setIsBlogImagesChange] = useState(false);
  const [blogImagesUrl, setBlogImagesUrl] = useState(blog?.blogImage);
  const [authorImagePreview, setAuthorImagePreview] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "authorImage") {
          setAuthorImagePreview(reader.result);
        } else if (name === "blogImage") {
          setBlogImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }

    setFormData({ ...formData, [name]: file, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    setLoading(true);

    if (isAuthorImagesChange) {
      const galleryResponses = await cloudinaryUpload(updatedData.authorImage);
      updatedData.authorImage = galleryResponses.secure_url;
      updatedData.oldAuthorImage = blog.authorImage;
    }
    if (isBlogImagesChange) {
      const galleryResponses = await cloudinaryUpload(updatedData.blogImage);
      updatedData.blogImage = galleryResponses.secure_url;
      updatedData.oldBlogImage = blog.blogImage;
    }

    const res = await axiosNotSecure.patch(
      `/blog/${updatedData._id}`,
      updatedData,
    );
    if (res.data) {
      toast.success("Blog Updated Successfully");
      onClose();
      refetch();
      setLoading(false);
    } else {
      toast.error(res.error.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
      <Toaster position="top-center" />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl my-8 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Edit Blog Post</h2>
              <p className="text-purple-100 text-sm">
                Update your blog content and settings
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 max-h-[calc(100vh-12rem)] overflow-y-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Blog Title */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Blog Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="blogTitle"
                  value={formData.blogTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-200"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Blog Link */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <LinkIcon className="w-4 h-4 text-blue-600" />
                  Blog Link
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="blogLink"
                  value={formData.blogLink}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter blog URL"
                />
              </div>

              {/* Author Name */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 text-green-600" />
                  Author Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-200"
                  placeholder="Enter author name"
                />
              </div>

              {/* Card Description */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 text-orange-600" />
                  Card Description
                  <span className="text-xs text-gray-500 font-normal ml-auto">
                    {formData.cardDescription?.length || 0}/120
                  </span>
                </label>
                <textarea
                  name="cardDescription"
                  value={formData.cardDescription}
                  onChange={handleChange}
                  maxLength={120}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-200 resize-none"
                  placeholder="Enter a brief description (max 120 characters)"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Blog Image */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <ImageIcon className="w-4 h-4 text-pink-600" />
                  Blog Home Image
                </label>

                {!isBlogImagesChange ? (
                  <div className="relative inline-block">
                    <img
                      src={blogImagesUrl}
                      className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                      alt="Blog"
                    />
                    <button
                      type="button"
                      onClick={() => setIsBlogImagesChange(true)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        id="blogImage"
                        name="blogImage"
                        onChange={handleFileChange}
                        type="file"
                        className="hidden"
                      />
                      <label
                        htmlFor="blogImage"
                        className="flex flex-col items-center justify-center w-full h-40 bg-white border-2 border-dashed border-pink-300 rounded-xl cursor-pointer hover:border-pink-500 transition-all duration-200"
                      >
                        {blogImagePreview ? (
                          <img
                            src={blogImagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <>
                            <Upload className="w-10 h-10 text-pink-400 mb-2" />
                            <p className="text-sm text-gray-600 font-medium">
                              Upload new image
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogImagesUrl(blog?.blogImage);
                        setIsBlogImagesChange(false);
                        setBlogImagePreview(null);
                      }}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                      Cancel Change
                    </button>
                  </div>
                )}
              </div>

              {/* Author Image */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 text-indigo-600" />
                  Author Image
                </label>

                {!isAuthorImagesChange ? (
                  <div className="relative inline-block">
                    <img
                      src={authorImagesUrl}
                      className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
                      alt="Author"
                    />
                    <button
                      type="button"
                      onClick={() => setIsAuthorImagesChange(true)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        id="authorImage"
                        type="file"
                        onChange={handleFileChange}
                        name="authorImage"
                        className="hidden"
                      />
                      <label
                        htmlFor="authorImage"
                        className="flex flex-col items-center justify-center w-full h-32 bg-white border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:border-indigo-500 transition-all duration-200"
                      >
                        {authorImagePreview ? (
                          <img
                            src={authorImagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-indigo-400 mb-2" />
                            <p className="text-sm text-gray-600 font-medium">
                              Upload new image
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthorImagesUrl(blog?.authorImage);
                        setIsAuthorImagesChange(false);
                        setAuthorImagePreview(null);
                      }}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                      Cancel Change
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Blog Description - Full Width */}
          <div className="mt-8 bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border-2 border-gray-200">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <FileText className="w-4 h-4 text-gray-600" />
              Blog Description
            </label>
            <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-purple-500 transition-all duration-200">
              <JoditEditor
                ref={editor}
                value={value}
                className="text-black"
                onBlur={(newContent) => setValue(newContent)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${loading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
