import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import useBlog from "../../../Hooks/useBlog";
import LoadingComponent from "../../LoadingComponent";

const BlogSection = () => {
  // Fetch blog data using custom hook
  const { blogData, isLoading } = useBlog();
  const [isVisible, setIsVisible] = useState(false);

  // Show loading state while fetching data
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="bg-slate-5">
      <section className="container mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:py-6 lg:pe-0 lg:ps-8 xl:py-5 mt-10">
        {/* Section Title */}
        <h2 className="font-manrope text-4xl font-bold text-gray-700 text-center mb-5">
          Highlights of Recent{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
            Blog Posts
          </span>
        </h2>

        <p className="mb-12 lg:w-[65%] mx-auto text-center">
          Stay Updated with the Latest Trends, Expert Tips, and In-Depth Reviews
          on All Things Vaping – Explore, Learn, and Elevate Your Vaping
          Experience! Become part of a community that embraces the essence of
          natural living.
        </p>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 container mx-auto max-w-[1240px]">
          {blogData?.map((blog, index) => (
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

        {/* Read All Button */}
        <div className="flex justify-center">


          {/*  Read All Button */}
                          
                              <Link to="/blog">
                                  <motion.button
                                      // whileHover={{ scale: 1.05, y: -2 }}
                                      // whileTap={{ scale: 0.95 }}
                                      className="group relative px-10 mt-12 py-4 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 bg-[length:200%_100%] text-white font-bold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                                  >
                                      {/* Animated Background */}
                                      <motion.div
                                          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 bg-[length:200%_100%]"
                                          animate={{
                                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                          }}
                                          transition={{
                                              duration: 3,
                                              repeat: Infinity,
                                              ease: "linear",
                                          }}
                                      />
          
                                      {/* Button Content */}
                                      <span className="relative z-10 flex items-center gap-3">
                                          <span> Read All Blogs</span>
                                          <motion.div
                                              animate={{
                                                  x: [0, 5, 0],
                                              }}
                                              transition={{
                                                  duration: 1.5,
                                                  repeat: Infinity,
                                                  ease: "easeInOut",
                                              }}
                                          >
                                              <ArrowRight className="w-5 h-5" />
                                          </motion.div>
                                      </span>
          
                                      {/* Glow Effect */}
                                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                          <div className="absolute inset-0 bg-white/20 blur-xl" />
                                      </div>
                                  </motion.button>
                              </Link>
                          
        </div>
      </section>
    </div>
  );
};

export default BlogSection;