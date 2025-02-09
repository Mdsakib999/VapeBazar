import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosNotSecure from '../../Hooks/useAxiosNotSecure';
import { useQuery } from '@tanstack/react-query';

const Blog = () => {
  const { axiosNotSecure } = useAxiosNotSecure()
  const { data: blogData = [], refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await axiosNotSecure.get(`/blog`);
      return res.data;
    },
  });
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, [])
  return (
    <div>
      <section className=" pt-28 pb-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-700 text-center mb-5">Your Ultimate Guide to the <span className='bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text'>Vaping World</span></h2>
          <p className='mb-12 lg:w-[65%] mx-auto text-center'>Stay Updated with the Latest Trends, Expert Tips, and In-Depth Reviews on All Things Vaping – Explore, Learn, and Elevate Your Vaping Experience! Become part of a community that embraces the essence of natural living.</p>
          <div className="flex justify-center gap-y-8 lg:gap-y-5 flex-wrap md:flex-wrap xl:flex-nowrap lg:flex-row  lg:gap-x-8 ">
            {/* div start */}
            {
              blogData?.map(blog => <div key={blog._id} className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-xl ">
                {
                  console.log(blog)
                }
                <div className="">
                  <img
                    src={blog?.blogImage}
                    alt="blogs tailwind section"
                    className="max-h-[255px] rounded-t-xl w-full "
                  />
                </div>
                <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover  ">

                  <div className='flex gap-x-3 mb-3 '>
                    <div className='w-12 h-12 rounded-full border-2 border-indigo-500'>

                      <img className='w-full h-full rounded-full object-cover object-center' src={blog?.authorImage} alt="" />
                    </div>

                    <div>
                      <p className='font-semibold'>{blog?.authorName}</p>
                      <p><span className="bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text font-medium block">{
                                            new Date(blog?.createdAt).toLocaleString("en-US", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })
                                        }</span></p>
                    </div>
                  </div>
                  <Link to={`/blogDetails/${blog?.blogLink}`} className="text-xl text-gray-900 font-semibold">
                    {blog?.blogTitle}
                  </Link>
                  <p className="text-gray-500 leading-6 mt-2 mb-3">
  {blog?.cardDescription?.length > 95 
    ? `${blog.cardDescription.slice(0, 95)}.....` 
    : blog?.cardDescription}
</p>
                  <Link to={`/blogDetails/${blog?.blogLink}`} className="cursor-pointer text-lg bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text font-semibold">
                    Read more...
                  </Link>
                </div>
              </div>)
            }

           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
