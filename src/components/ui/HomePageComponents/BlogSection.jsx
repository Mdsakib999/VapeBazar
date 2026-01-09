import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import useBlog from "../../../Hooks/useBlog";
import LoadingComponent from "../../LoadingComponent";

const BlogSection = () => {
  // Fetch blog data using custom hook
  const { blogData, isLoading } = useBlog();

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogData?.map((post) => (
            <article
              key={post._id}
              className="relative overflow-hidden rounded-lg shadow-lg group border"
            >
              {/* Blog Post Image */}
              <img
                src={post.blogImage}
                alt={post.blogTitle}
                className="max-h-[255px] rounded-t-xl w-full object-fi transition-transform duration-300 group-hover:scale-105 overflow-hidden "
              />

              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover">
                <div className="flex justify-between mb-3">
                  <p className="bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text font-medium block">
                    {new Date(post.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <Link
                  to={`/blogDetails/${post.blogLink}`}
                  className="text-xl text-gray-900 font-semibold"
                >
                  {post.blogTitle}
                </Link>

                <p className="text-gray-500 leading-6 mt-2 mb-3">
                  {post.cardDescription?.length > 95
                    ? `${post.cardDescription.slice(0, 80)}...`
                    : post.cardDescription}
                </p>

                <Link
                  to={`/blogDetails/${post.blogLink}`}
                  className="cursor-pointer text-lg bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text font-semibold"
                >
                  Read more...
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Read All Button */}
        <div className="flex justify-center">
          <Link to="/blog" className="px-6 rounded-md font-semibold mt-12 bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 flex items-center gap-2">
            Read All <FaArrowRightLong />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
