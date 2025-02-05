import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../../LoadingComponent';
import useBlog from '../../../Hooks/useBlog';

const BlogSection = () => {
    // Fetch blog data using React Query
    // const { data: blogData = [], isLoading } = useQuery({
    //     queryKey: ['blog'],
    //     queryFn: async () => {
    //         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blog`);
    //         return res.data;
    //     },
    // });
    const { blogData, isLoading } = useBlog()
    const blogPosts = blogData.length == 0 ? [] : blogData
    // Show loading state while fetching data

    if (isLoading || blogData.length === undefined) return <div>Loading...</div>;

    return (
        <section className="bg-gray-300 container mx-auto max-w-[1340px]  px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
            {/* Section Title */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Highlights of Recent Blog Posts
            </h2>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts?.map((post) => (
                    <article
                        key={post._id}
                        className="relative overflow-hidden rounded-lg shadow-lg group"
                    >
                        {/* Blog Post Image */}
                        <img
                            src={post.blogImage}
                            alt={post.blogTitle}
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>

                        {/* Blog Post Content */}
                        <div className="absolute bottom-0 p-6 text-white transition-opacity duration-300 group-hover:opacity-100">
                            <h3 className="text-xl font-semibold">{post.blogTitle}</h3>
                            <p className="mt-2 text-sm line-clamp-2">{post.cardDescription}</p>
                            <Link
                                to={`/blogDetails/${post.blogLink}`}
                                className="mt-4 inline-block text-rose-400 hover:underline"
                            >
                                Read More
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
