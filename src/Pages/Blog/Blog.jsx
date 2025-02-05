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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  return (
    <div>
      <section className=" pt-28 pb-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-700 text-center mb-5">Fuel Your Body, Feed Your Soul</h2>
          <p className='mb-12 lg:w-[65%] mx-auto text-center'>Embark on your journey toward ultimate health and well-being. Nourish your body and enrich your soul with our flavorful, wholesome selections. Become part of a community that embraces the essence of natural living.</p>
          <div className="flex justify-center gap-y-8 lg:gap-y-5 flex-wrap md:flex-wrap xl:flex-nowrap lg:flex-row  lg:gap-x-8 ">
            {/* div start */}
            {
              blogData?.map(blog => <div key={blog._id} className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl ">
                <div className="">
                  <img
                    src={blog?.blogImage}
                    alt="blogs tailwind section"
                    className="max-h-[255px] rounded-t-xl w-full"
                  />
                </div>
                <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 ">

                  <div className='flex gap-x-3 mb-3'>
                    <div className='w-12 h-12 rounded-full border-2 border-orange-500'>

                      <img className='w-full h-full rounded-full object-cover object-center' src={blog?.authorImage} alt="" />
                    </div>

                    <div>
                      <p className='font-semibold'>{blog?.authorName}</p>
                      {/* <p><span className="text-orange-600 font-medium block">{formatDate(blog?.createdAt)}</span></p> */}
                    </div>
                  </div>
                  <Link to={`/blogDetails/${blog?.blogLink}`} className="text-xl text-gray-900 font-semibold">
                    {blog?.blogTitle}
                  </Link>
                  <p className="text-gray-500 leading-6 mt-2 mb-3">
                    {blog?.cardDescription}
                  </p>
                  <Link to={`/blogDetails/${blog?.blogLink}`} className="cursor-pointer text-lg text-orange-600 font-semibold">
                    Read more...
                  </Link>
                </div>
              </div>)
            }

            {/* <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
              <div className="flex items-center">
                <img
                  src="https://pagedone.io/asset/uploads/1696244340.png"
                  alt="blogs tailwind section"
                  className="rounded-t-2xl w-full object-cover"
                />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 ">

                <div className='flex items-center gap-x-3'>
                  <div className='w-12 h-12 rounded-full border border-orange-500'>

                    <img className='w-full h-full rounded-full object-cover object-center' src="https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e07f452/_orig/pixomatic_1572877263963.png" alt="" />
                  </div>

                  <div>
                    <p>SM Food</p>
                    <p><span className="text-orange-600 font-medium mb-3 block">Jan 01, 2023</span></p>
                  </div>
                </div>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
                  Clever ways to invest in product to organize your portfolio
                </h4>
                <p className="text-gray-500 leading-6 mb-3">
                  Discover smart investment strategies to streamline and organize your portfolio..
                </p>
                <a href="#" className="cursor-pointer text-lg text-orange-600 font-semibold">
                  Read more...
                </a>
              </div>
            </div>
            <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
              <div className="flex items-center">
                <img
                  src="https://pagedone.io/asset/uploads/1696244356.png"
                  alt="blogs tailwind section"
                  className="rounded-t-2xl w-full object-cover"
                />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 ">

                <div className='flex items-center gap-x-3'>
                  <div className='w-12 h-12 rounded-full border border-orange-500'>

                    <img className='w-full h-full rounded-full object-cover object-center' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LOeZCLbzHYW0TO096SYeuuOskkZNdmFw2DGCrAYOxr70TjRL59hkcL9adREHNkEU0-4&usqp=CAU" alt="" />
                  </div>

                  <div>
                    <p>SM Food</p>
                    <p><span className="text-orange-600 font-medium mb-3 block">Jan 01, 2023</span></p>
                  </div>
                </div>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
                  Clever ways to invest in product to organize your portfolio
                </h4>
                <p className="text-gray-500 leading-6 mb-3">
                  Discover smart investment strategies to streamline and organize your portfolio..
                </p>
                <a href="#" className="cursor-pointer text-lg text-orange-600 font-semibold">
                  Read more...
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
