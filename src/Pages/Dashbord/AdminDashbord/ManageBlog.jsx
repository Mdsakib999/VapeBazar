import React, { useState } from "react";
import EditBlogModal from "./EditBlogModal"; // Import the Edit modal component
import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from 'sonner'
import axios from "axios";
import { AlertTriangle, X } from 'lucide-react';

// Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, blogTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-700 text-base mb-2">
                        Are you sure you want to delete this blog?
                    </p>
                    {/* {blogTitle && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-4">
                            <p className="text-sm text-gray-600 mb-1">Blog Title:</p>
                            <p className="font-semibold text-gray-800">{blogTitle}</p>
                        </div>
                    )} */}
                    <p className="text-sm text-gray-500 mt-4">
                        This action cannot be undone. The blog will be permanently removed from the database.
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const ManageBlog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const { axiosNotSecure } = useAxiosNotSecure()
    const { data: blogData = [], refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blog`)
            return res.data;
        },
    });

    const handelDelete = async (id) => {
        try {
            // Send DELETE request to the server
            const response = await axiosNotSecure.delete(`/blog/${id}`);

            // Check if the response indicates a successful deletion
            if (response.data) {
                refetch(); // Refresh the blog data
                toast.success("Blog Deleted Successfully!");
                setIsDeleteModalOpen(false);
                setBlogToDelete(null);
            } else {
                toast.error("An error occurred while deleting the blog.");
            }
        } catch (error) {
            // Handle any unexpected errors
            toast.error("Failed to delete the blog. Please try again later.");
            console.error("Error deleting blog:", error);
        }
    };

    const openDeleteModal = (blog) => {
        setBlogToDelete(blog);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
    };

    const confirmDelete = () => {
        if (blogToDelete) {
            handelDelete(blogToDelete._id);
        }
    };

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    if (!blogData || blogData.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
        );
    }

    return (
        <div className="p-6  bg-white h-[100vh]">
            <Toaster />
            <h2 className="text-3xl font-bold  mb-8 text-center text-black">
                Manage Blogs
            </h2>
            <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 ">
                {blogData?.map((blog) => (
                    <div
                        key={blog._id}
                        className="group w-full border border-gray-300 rounded-2xl max-w-sm"
                    >
                        <div>
                            <img
                                src={blog.blogImage}
                                alt="blogs tailwind section"
                                className="h-[200px] rounded-t-xl w-full"
                            />
                        </div>
                        <div className="p-4 transition-all duration-300 rounded-b-2xl text-black group-hover:bg-gray-50">
                            <div className="flex gap-x-3 mb-3">
                                <div className="w-12 h-12 rounded-full border-2 border-orange-500">
                                    <img
                                        className="w-full h-full rounded-full object-cover object-center"
                                        src={blog?.authorImage}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold group-hover:text-black">{blog.authorName}</p>
                                    <p>
                                        <span className="text-orange-600 font-medium block">
                                            {blog.createdAt
                                                ? new Date(blog.createdAt).toLocaleString("en-US", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })
                                                : new Date().toLocaleString("en-US", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}
                                        </span>

                                    </p>
                                </div>
                            </div>
                            <p className="text-lg group-hover:text-black  font-semibold">
                                {blog?.blogTitle}
                            </p>
                            <div className="mt-4 flex justify-evenly">
                                <button
                                    onClick={() => openDeleteModal(blog)}
                                    className="bg-red-500 text-white px-3 py-1 font-bold rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="bg-blue-500 text-white px-3 py-1 font-bold rounded hover:bg-blue-600 mr-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                blogTitle={blogToDelete?.blogTitle}
            />

            {/* Edit Blog Modal */}
            {isModalOpen && (
                <EditBlogModal
                    blog={selectedBlog}
                    onClose={() => setIsModalOpen(false)}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default ManageBlog;