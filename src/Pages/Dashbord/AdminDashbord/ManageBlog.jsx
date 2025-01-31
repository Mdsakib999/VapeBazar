import React, { useState } from "react";
import EditBlogModal from "./EditBlogModal"; // Import the Edit modal component
import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from 'sonner'
import axios from "axios";


const ManageBlog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const { axiosNotSecure } = useAxiosNotSecure()
    const { data: blogData = [], refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blog`)
            return res.data;
        },
    });
    const handelDelete = async (id) => {
        // Confirm with the user before deleting the blog
        const isConfirmed = confirm("Do you want to delete this blog?");
        if (isConfirmed) {
            try {
                // Send DELETE request to the server
                const response = await axiosNotSecure.delete(`/blog/${id}`);

                // Check if the response indicates a successful deletion
                if (response.data) {
                    refetch(); // Refresh the blog data
                    toast.success("Blog deleted successfully!");
                } else {
                    toast.error("An error occurred while deleting the blog.");
                }
            } catch (error) {
                // Handle any unexpected errors
                toast.error("Failed to delete the blog. Please try again later.");
                console.error("Error deleting blog:", error);
            }
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
                                    onClick={() => handelDelete(blog._id)}
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
