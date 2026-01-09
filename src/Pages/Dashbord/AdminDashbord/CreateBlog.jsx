import React, { useEffect, useRef, useState } from "react";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import { Toaster, toast } from 'sonner';
import JoditEditor from "jodit-pro-react";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    User,
    Link as LinkIcon,
    Image as ImageIcon,
    FileText,
    Upload,
    Loader2,
    Save,
    CheckCircle,
    AlertCircle,
    X
} from "lucide-react";

const CreateBlog = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [authorImagePreview, setAuthorImagePreview] = useState(null);
    const [blogImagePreview, setBlogImagePreview] = useState(null);
    const { axiosNotSecure } = useAxiosNotSecure();
    const [content, setContent] = useState('');
    const editor = useRef(null);
    const [formData, setFormData] = useState({
        blogTitle: "",
        blogLink: "",
        authorName: "",
        authorImage: null,
        description: "",
        blogImage: null,
        cardDescription: "",
    });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            description: content,
        }));
    }, [content]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (name === 'authorImage') {
                    setAuthorImagePreview(reader.result);
                } else if (name === 'blogImage') {
                    setBlogImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
            setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
        }
    };

    const clearImage = (type) => {
        if (type === 'author') {
            setAuthorImagePreview(null);
            setFormData((prev) => ({ ...prev, authorImage: null }));
            document.getElementById('authorImage').value = '';
        } else {
            setBlogImagePreview(null);
            setFormData((prev) => ({ ...prev, blogImage: null }));
            document.getElementById('blogImage').value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsUploading(true);
            setUploadSuccess(false);

            const authorImageUrl = await cloudinaryUpload(formData.authorImage);
            const blogImageUrl = await cloudinaryUpload(formData.blogImage);

            const data = {
                ...formData,
                authorImage: authorImageUrl.secure_url,
                blogImage: blogImageUrl.secure_url,
                createdAt: new Date()
            };

            const res = await axiosNotSecure.post(`/blog`, data);
            if (res.data) {
                toast.success("Blog published successfully!");
                setUploadSuccess(true);
                
                setTimeout(() => {
                    setFormData({
                        blogTitle: "",
                        blogLink: "",
                        authorName: "",
                        authorImage: null,
                        description: "",
                        blogImage: null,
                        cardDescription: "",
                    });
                    setContent("");
                    setAuthorImagePreview(null);
                    setBlogImagePreview(null);
                    setUploadSuccess(false);
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to upload the blog. Please try again.");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 p-4 md:px-20 md:py-10">
            <Toaster position="top-center" richColors />

            {/* Success Toast */}
            <AnimatePresence>
                {uploadSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <p className="font-bold">Success!</p>
                            <p className="text-sm">Blog published successfully</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                   
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                        Create New Blog
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Share your knowledge and insights with the community
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="relative bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600 px-8 py-6">
                            
                            <div className="relative z-10">
                                <h2 className="text-xl md:text-2xl font-bold text-white">Blog Information</h2>
                            </div>
                        </div>

                        <div className="p-8 md:p-10 space-y-8">
                            {/* Blog Title & Link */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-indigo-100">
                                            <BookOpen className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        Blog Title
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="blogTitle"
                                        name="blogTitle"
                                        required
                                        value={formData.blogTitle}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                        placeholder="Enter blog title"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-indigo-100">
                                            <LinkIcon className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        Blog Link
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="blogLink"
                                        name="blogLink"
                                        required
                                        value={formData.blogLink}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                        placeholder="enter-blog-link-like-this"
                                    />
                                </motion.div>
                            </div>

                            {/* Author Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-indigo-100">
                                            <User className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        Author Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="authorName"
                                        name="authorName"
                                        required
                                        value={formData.authorName}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                        placeholder="Enter author name"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-indigo-100">
                                            <ImageIcon className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        Author Image
                                        <span className="text-red-500">*</span>
                                    </label>
                                    
                                    {authorImagePreview ? (
                                        <div className="relative">
                                            <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-indigo-200">
                                                <img src={authorImagePreview} alt="Author" className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => clearImage('author')}
                                                className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                type="file"
                                                id="authorImage"
                                                name="authorImage"
                                                required
                                                onChange={handleFileChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            <label
                                                htmlFor="authorImage"
                                                className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                                            >
                                                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-600">Click to upload</span>
                                            </label>
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* Blog Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-indigo-100">
                                        <ImageIcon className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    Blog Cover Image
                                    <span className="text-red-500">*</span>
                                </label>
                                
                                {blogImagePreview ? (
                                    <div className="relative">
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-indigo-200">
                                            <img src={blogImagePreview} alt="Blog Cover" className="w-full h-full object-cover" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => clearImage('blog')}
                                            className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="file"
                                            id="blogImage"
                                            name="blogImage"
                                            required
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <label
                                            htmlFor="blogImage"
                                            className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                                        >
                                            <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                            <span className="text-sm font-semibold text-gray-600">Click to upload cover image</span>
                                            <span className="text-xs text-gray-400 mt-1">Recommended: 1200x630px</span>
                                        </label>
                                    </div>
                                )}
                            </motion.div>

                            {/* Card Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-indigo-100">
                                        <FileText className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    Card Description
                                    <span className="text-xs text-gray-500 font-normal">(Max 120 characters)</span>
                                </label>
                                <textarea
                                    id="cardDescription"
                                    name="cardDescription"
                                    maxLength={120}
                                    value={formData.cardDescription}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 font-medium resize-none"
                                    placeholder="Brief description for the blog card..."
                                />
                                <div className="text-right mt-2">
                                    <span className="text-xs text-gray-500">{formData.cardDescription.length}/120</span>
                                </div>
                            </motion.div>

                            {/* Blog Description Editor */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-indigo-100">
                                        <FileText className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    Blog Content
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        className="text-black"
                                        onBlur={(newContent) => setContent(newContent)}
                                    />
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="pt-6"
                            >
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Publishing Blog...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-6 h-6" />
                                            Publish Blog
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>

                
            </div>
        </div>
    );
};

export default CreateBlog;