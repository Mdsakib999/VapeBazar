import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-pro-react";
import { HiMiniXCircle } from "react-icons/hi2";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from 'sonner'

const EditBlogModal = ({ blog, onClose, refetch }) => {
    const [value, setValue] = useState(blog.description);
    const { axiosNotSecure } = useAxiosNotSecure()
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

    const [loading, setLoading] = useState(false)
    const [isAuthorImagesChange, setIsAuthorImagesChange] = useState(false)
    const [authorImagesUrl, setAuthorImagesUrl] = useState(blog?.authorImage)
    const [isBlogImagesChange, setIsBlogImagesChange] = useState(false)
    const [blogImagesUrl, setBlogImagesUrl] = useState(blog?.blogImage)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0], description: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { ...formData };
        setLoading(true)
        if (isAuthorImagesChange) {
            const galleryResponses = await cloudinaryUpload(updatedData.authorImage);
            updatedData.authorImage = galleryResponses.secure_url
            updatedData.oldAuthorImage = blog.authorImage
        }
        if (isBlogImagesChange) {
            const galleryResponses = await cloudinaryUpload(updatedData.blogImage);
            updatedData.blogImage = galleryResponses.secure_url
            updatedData.oldBlogImage = blog.blogImage
        }
        const res = await axiosNotSecure.patch(`/blog/${updatedData._id}`, updatedData);
        console.log(res);
        if (res.data) {
            toast.success("Blog Update Successfully");
            onClose()
            refetch()
            setLoading(false)
        }
        else {
            toast.error(res.error.data.message)
            setLoading(false)
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-screen sm:min-h-[100vh] overflow-y-auto z-50">
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-sm mx-auto rounded-lg text-black max-w-5xl w-full max-h-[95vh] overflow-hidden overflow-y-auto"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 text-center">
                    Edit Blog
                </h2>

                {/* Blog Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Blog Title
                    </label>
                    <input
                        type="text"
                        name="blogTitle"
                        value={formData.blogTitle}
                        onChange={handleChange}
                        required
                        className="my-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                </div>

                {/* Blog Link */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Blog Link
                    </label>
                    <input
                        type="text"
                        name="blogLink"
                        value={formData.blogLink}
                        onChange={handleChange}
                        required
                        className="my-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                </div>

                {/* Author Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Author Name
                    </label>
                    <input
                        type="text"
                        name="authorName"
                        value={formData.authorName}
                        onChange={handleChange}
                        required
                        className="my-2 block w-full px-4 py-3 border rounded-md shadow-sm text-gray-00 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                {/* Author Image */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 my-3 ">
                        Author Image
                    </label>
                    {
                        !isAuthorImagesChange ? (
                            <div className='relative '>
                                <img src={authorImagesUrl} className="h-16" alt="" />
                                <span onClick={() => {
                                    setIsAuthorImagesChange(true)
                                }
                                } className="absolute text-red-500 -top-1 left-16 rounded-full  ">
                                    <HiMiniXCircle size={26} />
                                </span>
                            </div>
                        )
                            :
                            <div>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    name="authorImage"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                                <button onClick={() => {
                                    setAuthorImagesUrl(blog?.authorImage)
                                    setIsAuthorImagesChange(false)
                                }} className="bg-red-500 text-white p-1 mt-2 rounded-md">Dont Change</button>
                            </div>
                    }
                </div>

                {/* Blog Image */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 my-3">
                        Blog Home Image
                    </label>
                    {
                        !isBlogImagesChange ? (
                            <div className='relative'>
                                <img src={blogImagesUrl} className="h-28 w-28" alt="" />
                                <span onClick={() => {
                                    setIsBlogImagesChange(true)
                                }
                                } className="absolute text-red-500 -top-1 left-28 rounded-full  ">
                                    <HiMiniXCircle size={26}></HiMiniXCircle>
                                </span>
                            </div>
                        )
                            :
                            <div>
                                <input
                                    id="blogImage"
                                    name="blogImage"
                                    onChange={handleFileChange}
                                    type="file"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button onClick={() => {
                                    setBlogImagesUrl(blog?.blogImage)
                                    setIsBlogImagesChange(false)
                                }} className="bg-red-500 text-white p-1 mt-2 rounded-md">Don't Change</button>
                            </div>
                    }
                </div>

                {/* Card Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mt-4">
                        Card Description
                    </label>
                    <textarea
                        name="cardDescription"
                        value={formData.cardDescription}
                        onChange={handleChange}
                        maxLength={120}
                        className="mt-2 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter up to 140 characters"
                    />
                </div>

                {/* Blog Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mt-4">
                        Blog Description
                    </label>
                    <div className="mt-2">
                        <div className="mt-2">
                            <div className="mt-2">
                                <JoditEditor
                                    ref={editor}
                                    value={value}
                                    className="text-black"
                                    onBlur={(newContent) => setValue(newContent)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between  mt-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>

    );
};

export default EditBlogModal;
