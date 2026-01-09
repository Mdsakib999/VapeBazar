import React from "react";
import { Link } from "react-router-dom";
import useAxiosNotSecure from "../../Hooks/useAxiosNotSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Loader2, Newspaper } from "lucide-react";

const Blog = () => {
  const { axiosNotSecure } = useAxiosNotSecure();
  const { data: blogData = [], isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axiosNotSecure.get("/blog");

      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data?.result)) return res.data.result;

      return [];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Your Ultimate Guide to the{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Vaping World
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay Updated with the Latest Trends, Expert Tips, and In-Depth
            Reviews on All Things Vaping – Explore, Learn, and Elevate Your
            Vaping Experience!
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
        )}

        {/* No Blogs */}
        {!isLoading && blogData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <Newspaper className="w-20 h-20 text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Blogs Yet</h3>
            <p className="text-gray-500">Check back later for exciting content!</p>
          </motion.div>
        )}

        {/* Blog Grid */}
        {!isLoading && blogData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogData.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link
                  to={`/blogDetails/${blog?.blogLink}`}
                  className="relative overflow-hidden aspect-video bg-gradient-to-br from-gray-100 to-gray-200"
                >
                  <img
                    src={blog?.blogImage}
                    alt={blog?.blogTitle}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-purple-500 overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={blog?.authorImage}
                        alt={blog?.authorName}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-800 truncate">
                        {blog?.authorName}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <Link
                    to={`/blogDetails/${blog?.blogLink}`}
                    className="block mb-3 flex-1"
                  >
                    <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {blog?.blogTitle}
                    </h3>
                  </Link>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {blog?.cardDescription?.length > 95
                        ? `${blog.cardDescription.slice(0, 32)}.....`
                        : blog?.cardDescription}
                    </p>
                

                  {/* Read More Link */}
                  <Link
                    to={`/blogDetails/${blog?.blogLink}`}
                    className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text group-hover:gap-3 transition-all mt-auto"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;