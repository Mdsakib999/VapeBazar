import React, { useEffect, useRef, useState } from "react";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import { Toaster, toast } from 'sonner'
import JoditEditor from "jodit-pro-react";

import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";

const CreateBlog = () => {
    const [isUploading, setIsUploading] = useState(false);
    const { axiosNotSecure } = useAxiosNotSecure()
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
        setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsUploading(true);

            // Upload images to Cloudinary
            const authorImageUrl = await cloudinaryUpload(formData.authorImage);
            const blogImageUrl = await cloudinaryUpload(formData.blogImage);
            console.log(authorImageUrl);
            console.log(blogImageUrl);
            // Prepare final data
            const data = {
                ...formData,
                authorImage: authorImageUrl.secure_url,
                blogImage: blogImageUrl.secure_url,
                createdAt: new Date()
            };

            // API call to submit the blog
            console.log(data);
            const res = await axiosNotSecure.post(`/blog`, data);
            if (res.data) {
                toast.success("Blog Uploaded Successfully!");
                // Reset form
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
            }
        } catch (error) {
            toast.error("Failed to upload the blog. Please try again.");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen my-10">
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                    Create a Blog
                </h2>

                {/* Blog Title */}
                <div>
                    <label htmlFor="blogTitle" className="block text-sm font-semibold text-gray-700">
                        Blog Title
                    </label>
                    <input
                        type="text"
                        id="blogTitle"
                        name="blogTitle"
                        required
                        value={formData.blogTitle}
                        onChange={handleChange}
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm outline-orange-300 text-gray-800 placeholder-gray-400"
                        placeholder="Enter blog title"
                    />
                </div>

                {/* Blog Link */}
                <div>
                    <label htmlFor="blogLink" className="block text-sm font-semibold text-gray-700">
                        Blog Link
                    </label>
                    <input
                        type="text"
                        id="blogLink"
                        name="blogLink"
                        required
                        value={formData.blogLink}
                        onChange={handleChange}
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm outline-orange-300 text-gray-800 placeholder-gray-400"
                        placeholder="enter-blog-link-like-this"
                    />
                </div>

                {/* Author Name */}
                <div>
                    <label htmlFor="authorName" className="block text-sm font-semibold text-gray-700">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="authorName"
                        name="authorName"
                        required
                        value={formData.authorName}
                        onChange={handleChange}
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm outline-orange-300 text-gray-800 placeholder-gray-400"
                        placeholder="Enter author name"
                    />
                </div>

                {/* Author Image */}
                <div>
                    <label htmlFor="authorImage" className="block text-sm font-semibold text-gray-700">
                        Author Image
                    </label>
                    <input
                        type="file"
                        id="authorImage"
                        name="authorImage"
                        required
                        onChange={handleFileChange}
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm outline-orange-300 text-gray-800 placeholder-gray-400"
                    />
                </div>

                {/* Blog Image */}
                <div>
                    <label htmlFor="blogImage" className="block text-sm font-semibold text-gray-700">
                        Blog Home Image
                    </label>
                    <input
                        type="file"
                        id="blogImage"
                        name="blogImage"
                        required
                        onChange={handleFileChange}
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm outline-orange-300 text-gray-800 placeholder-gray-400"
                    />
                </div>

                {/* Card Description */}
                <div>
                    <label htmlFor="cardDescription" className="block text-sm font-semibold text-gray-700">
                        Card Description
                    </label>
                    <textarea
                        id="cardDescription"
                        name="cardDescription"
                        maxLength={120}
                        value={formData.cardDescription}
                        onChange={handleChange}
                        placeholder="Enter up to 120 characters"
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm outline-orange-300 text-gray-800 placeholder-gray-400"
                    />
                </div>

                {/* Blog Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                        Blog Description
                    </label>
                    <div className="mt-2">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            className="text-black"
                            onBlur={(newContent) => setContent(newContent)}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 rounded-lg font-bold shadow-md focus:outline-none"
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Publish Blog"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
