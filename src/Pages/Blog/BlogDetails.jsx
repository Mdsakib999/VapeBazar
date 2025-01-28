import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaQuoteRight, FaEye } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import useAxiosNotSecure from "../../Hooks/useAxiosNotSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BlogDetails = () => {
    const { link } = useParams()
    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`,
            );
            return res.data;
        },
        // enabled: !!selectedCategory || !!searchTerm, 
        // Fetch only when there's search or category selected
    });
    const { data: blogData = [], refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blog/${link}`)
            return res.data;
        },
    });
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="bg-gray-100">

            <div className="w-[90%] mx-auto  flex gap-x-6 text-black ">
                {/* main contain  */}
                <div className="w-[100%] lg:w-[75%] bg-white px-7 py-8 mt-10 rounded-md mb-12">
                    <p className="text-2xl md:text-2xl lg:text-3xl font-bold">
                        {blogData?.blogTitle}
                    </p>
                    <div className=" sm:flex justify-between items-center  mt-6 ">
                        <div className="flex items-center gap-x-3 ">
                            <div className="w-16 h-16 rounded-full border-2 border-orange-500">
                                <img
                                    className="w-full h-full rounded-full object-cover object-center"
                                    // src="https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e07f452/_orig/pixomatic_1572877263963.png"
                                    src={blogData?.authorImage}
                                    alt=""
                                />
                            </div>

                            <div>
                                <p className="font-semibold">{blogData?.authorName}</p>
                                <p>
                                    <span className="text-orange-600 font-medium mb-1 block">
                                        {/* {formatDate(blogData?.createdAt)} */}
                                        {
                                            new Date(blogData?.createdAt).toLocaleString("en-US", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })
                                        }
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* <div className="">
                <p className="flex items-center gap-x-2 text-gray-700 "><FaEye /> 2 Minutes Read</p>
              </div> */}

                        {/* social icon */}
                        <div className="flex space-x-4 ms-16 sm:ms-12 mt-">
                            <a
                                href="#"
                                className="text-blue-500 hover:text-blue-700  sm:p-3 rounded-full sm:bg-gray-100 "
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-red-500 hover:text-red-600 sm:p-3 rounded-full sm:bg-gray-100"
                            >
                                <FaYoutube size={26} />
                            </a>
                            <a
                                href="#"
                                className="text-pink-500 hover:text-pink-700 sm:p-3 rounded-full sm:bg-gray-100"
                            >
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>
                    {/* 1st image */}
                    <img
                        className="w-full max-h-[450px]  mt-7 rounded-md"
                        // src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600"
                        src={blogData?.blogImage}
                        alt=""
                    />

                    <div
                        className="mt-4 prose lg:prose-xl w-full max-w-none"
                        dangerouslySetInnerHTML={{ __html: blogData?.description }}
                    >
                    </div>
                </div>

                {/* side content */}
                <div className="hidden w-[25%] mt-10  lg:flex flex-col items-center ">
                    {/* Discount pic */}
                    <img className="max-h-[400px] max-w-full " src="https://img.pikbest.com/origin/09/01/35/pIkbEsT0ypIkbEsTKFX.jpg!sw800" alt="" />

                    {/* Popular product */}
                    <div className="mt-8 bg-white px-6 py-5 rounded-md w-full ">
                        <p className="text-xl font-bold mb-5">Best Selling Product</p>
                        <div>
                            {
                                productData?.products?.slice(0, 4).map((product, index, slicedArray) => (
                                    <Link to={`/product/${product._id}`} key={product._id}>
                                        <div className="flex lg:flex-col xl:flex-row items-center gap-x-4 mb-3">
                                            <img
                                                className="max-h-20 border rounded-md"
                                                src={product.images[0]}
                                                alt={product.name || 'Product Image'}
                                            />
                                            <div className="w-full lg:mt-2 xl:mt-0">
                                                <p className="xl:text-lg 2xl:text-xl font-semibold lg:text-center xl:text-left">
                                                    {product?.name}
                                                </p>
                                                <div className="flex gap-x-4 lg:justify-center xl:justify-start">
                                                    <p className="2xl:text-lg font-semibold text-orange-600">
                                                        {product?.price} Dhs
                                                    </p>
                                                    {/* <del>{product?.discount} Dhs</del> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Add <hr>, hidden for the last item */}
                                        <hr className={`mb-2 ${index === slicedArray.length - 1 ? 'hidden' : ''}`} />
                                    </Link>
                                ))

                            }
                        </div>
                        {/* <div className=" flex lg:flex-col xl:flex-row  items-center gap-x-4 mb-3">
              <img className=" max-h-20 border rounded-md" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
              <div className="w-full lg:mt-2 xl:mt-0">
                <p className=" xl:text-lg 2xl:text-xl font-semibold lg:text-center xl:text-left">Sarisha Oil</p>
                <div className="flex gap-x-4 lg:justify-center xl:justify-start">
                  <p className=" 2xl:text-lg font-semibold text-orange-600">1000 Tk</p>
                  <del>1200 Tk</del>
                </div>
              </div>
            </div>
            <hr />
            <div className="  flex items-center gap-x-4 my-3">
              <img className="max-w-[90px] border" src="https://i.ibb.co/CsNtTfM/Untitleddesign-86-removebg-preview.png" alt="" />
              <div className="w-full">
                <p className="xl:text-lg 2xl:text-xl font-semibold">Gawa Ghee / ঘি</p>
                <div className="flex gap-x-4">
                  <p className="2xl:text-lg font-semibold text-orange-600">1000 Tk</p>
                  <del>1200 Tk</del>
                </div>
              </div>
            </div>
            <hr />
            <div className="  flex items-center gap-x-4 my-3">
              <img className="w-24 border rounded-md" src="https://www.harniva.com/assets/backend/admin/plugins/source/hakkimizda/kalitelibal.png" alt="" />
              <div className="w-full">
                <p className="xl:text-lg 2xl:text-xl font-semibold">Fuler Modhu / মধু</p>
                <div className="flex gap-x-4">
                  <p className="2xl:text-lg font-semibold text-orange-600">1000 Tk</p>
                  <del>1200 Tk</del>
                </div>
              </div>
            </div>
            <hr />
            <div className="  flex items-center gap-x-4 my-3">
              <img className="w-24 border" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
              <div className="w-full">
                <p className="xl:text-lg 2xl:text-xl font-semibold">Product Name</p>
                <div className="flex gap-x-4">
                  <p className="text-lg font-semibold text-orange-600">1000 Tk</p>
                  <del>1200 Tk</del>
                </div>
              </div>
            </div> */}
                    </div>

                    {/* Popular Post-blog */}
                    {/* <div className="mt-10 bg-white px-6 py-5 rounded-md w-full ">
                        <p className="text-xl font-bold mb-5">Popular Post</p>
                        {
                            productData?.slice(5, 8).map((product, index, slicedArray) => <Link className="mt-4" to={`/productDetails/${product._id}`} key={product._id}>
                                <div className=" flex lg:flex-col  xl:flex-row items-center gap-x-4 mb-3">
                                    <img className="w-24 border" src={product.images[0]} alt="" />
                                    <div className="w-full lg:mt-2 xl:mt-0 ">
                                        <p className="2xl:font-bold font-semibold leading-5">{product?.name}</p>
                                        <p className="flex items-center  gap-x-2 mt-2"><CiClock2 /> {product?.createdAt ? formatDate(product?.createdAt) : 'Jan 01, 2025'}</p>
                                    </div>
                                </div>
                                <hr className={`mb-2 ${index === slicedArray.length - 1 ? 'hidden' : ''}`} />
                            </Link>)
                        } */}
                    {/* <div className=" flex lg:flex-col xl:flex-row items-center gap-x-4 mb-3">
              <img className="w-24 border" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
              <div className="w-full lg:mt-2 xl:mt-0 ">
                <p className="2xl:font-bold font-semibold leading-5">Sarisha Oil Lorem ipsum dolor sit ijtgh amet.</p>
                <p className="flex items-center gap-x-2 mt-2"><CiClock2 /> Jan 01, 2023</p>
              </div>
            </div>
            <hr />
            <div className="mt-3  flex items-center gap-x-4 mb-3">
              <img className="w-24 border" src="https://media.e-valy.com/cms/products/images/f4b3265d-df5e-4835-add4-0cd2654235d3" alt="" />
              <div className="w-full  ">
                <p className="font-bold leading-5">Sarisha Oil Lorem ipsum dolor sit ijtgh amet.</p>
                <p className="flex items-center gap-x-2 mt-2"><CiClock2 /> Jan 01, 2023</p>
              </div>
            </div>
            <hr />
            <div className="mt-3  flex items-center gap-x-4 mb-3">
              <img className="w-24 border" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
              <div className="w-full  ">
                <p className="font-bold leading-5">Sarisha Oil Lorem ipsum dolor sit ijtgh amet.</p>
                <p className="flex items-center gap-x-2 mt-2"><CiClock2 /> Jan 01, 2023</p>
              </div>
            </div> */}



                    {/* </div> */}


                </div>
            </div>

            {/* Related blog */}

        </div >
    );
};

export default BlogDetails;

// {
//   <div className="w-[90%] mx-auto  flex gap-x-6 ">
//   {/* main contain  */}
//   <div className="w-[100%] lg:w-[75%] bg-white px-7 py-8 mt-10 rounded-md mb-12">
//     <p className="text-2xl md:text-2xl lg:text-3xl font-bold">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
//       itaque.
//     </p>
//     <div className=" sm:flex justify-between items-center  mt-6 ">
//       <div className="flex items-center gap-x-3 ">
//         <div className="w-16 h-16 rounded-full border-2 border-orange-500">
//           <img
//             className="w-full h-full rounded-full object-cover object-center"
//             src="https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e07f452/_orig/pixomatic_1572877263963.png"
//             alt=""
//           />
//         </div>

//         <div>
//           <p className="font-semibold">SM Food Authority</p>
//           <p>
//             <span className="text-orange-600 font-medium mb-1 block">
//               Jan 01, 2023
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* <div className="">
//           <p className="flex items-center gap-x-2 text-gray-700 "><FaEye /> 2 Minutes Read</p>
//         </div> */}

//       {/* social icon */}
//       <div className="flex space-x-4 ms-16 sm:ms-12 mt-">
//         <a
//           href="#"
//           className="text-blue-500 hover:text-blue-700  sm:p-3 rounded-full sm:bg-gray-100 "
//         >
//           <FaFacebook size={24} />
//         </a>
//         <a
//           href="#"
//           className="text-red-500 hover:text-red-600 sm:p-3 rounded-full sm:bg-gray-100"
//         >
//           <FaYoutube size={26} />
//         </a>
//         <a
//           href="#"
//           className="text-pink-500 hover:text-pink-700 sm:p-3 rounded-full sm:bg-gray-100"
//         >
//           <FaInstagram size={24} />
//         </a>
//       </div>
//     </div>
//     {/* 1st image */}
//     <img
//       className="w-full max-h-[450px]  mt-7 rounded-md"
//       src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600"
//       alt=""
//     />

//     <p className="mt-8">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Accusantium, nobis ipsum? Est non laboriosam natus. Eos veniam
//       obcaecati consequuntur numquam.
//     </p>

//     <p className="mt-5">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Accusantium, nobis ipsum? Est non laboriosam natus. Eos veniam
//       obcaecati consequuntur numquam. Lorem ipsum dolor sit amet
//       consectetur adipisicing elit. Possimus sint, iusto maxime mollitia,
//       velit similique perferendis omnis rem laborum consectetur officia
//       voluptate distinctio cupiditate. Voluptatum aut ipsum illo quis
//       odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
//       quos nulla delectus voluptas cum aut impedit. Enim ipsam ut animi!
//     </p>

//     {/* Quit style div */}
//     <div className="bg-slate-100 px-6 md:px-12 py-5 md:py-10 my-7 rounded-md text-lg font-semibold font-mono leading-8 relative">
//       <p className="z-10 relative">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
//         omnis reiciendis neque! Sunt asperiores architecto quibusdam
//         itaque aut necessitatibus voluptate.
//       </p>
//       <FaQuoteRight className="absolute text-6xl md:text-8xl right-10 bottom-4 md:right-20 lg:right-32 md:bottom-5 lg:top-5 text-gray-300 opacity-50 z-0" />
//     </div>

//     <p className="mt-5 text-xl font-bold">Heading text Guid to fashion</p>
//     <p className="mt-3">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Accusantium, nobis ipsum? Est non laboriosam natus. Eos veniam
//       obcaecati consequuntur numquam. Lorem ipsum dolor sit amet
//       consectetur adipisicing elit. Possimus sint, iusto maxime mollitia,
//       velit similique perferendis omnis rem laborum consectetur officia
//       voluptate distinctio cupiditate. Voluptatum aut ipsum illo quis
//       odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
//       quos nulla delectus voluptas cum aut impedit. Enim ipsam ut animi!
//     </p>
//     <p className="mt-5 text-xl font-bold">Heading text Guid to fashion</p>
//     <p className="mt-3">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Accusantium, nobis ipsum? Est non laboriosam natus. Eos veniam
//       obcaecati consequuntur numquam. Lorem ipsum dolor sit amet
//       consectetur adipisicing elit. Possimus sint, iusto maxime mollitia,
//       velit similique perferendis omnis rem laborum consectetur officia
//       voluptate distinctio cupiditate. Voluptatum aut ipsum illo quis
//       odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
//       quos nulla delectus voluptas cum aut impedit. Enim ipsam ut animi!
//     </p>
//     <p className="mt-5 text-xl font-bold">Heading text Guid to fashion</p>
//     <p className="mt-3">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Accusantium, nobis ipsum? Est non laboriosam natus. Eos veniam
//       obcaecati consequuntur numquam. Lorem ipsum dolor sit amet
//       consectetur adipisicing elit. Possimus sint, iusto maxime mollitia,
//       velit similique perferendis omnis rem laborum consectetur officia
//       voluptate distinctio cupiditate. Voluptatum aut ipsum illo quis
//       odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
//       quos nulla delectus voluptas cum aut impedit. Enim ipsam ut animi!
//     </p>
//   </div>

//   {/* side content */}
//   <div className="hidden w-[25%] mt-10  lg:flex flex-col items-center ">
//     {/* Discount pic */}
//     <img className="max-h-[400px] max-w-full " src="https://img.pikbest.com/origin/09/01/35/pIkbEsT0ypIkbEsTKFX.jpg!sw800" alt="" />

//     {/* Popular product */}
//     <div className="mt-8 bg-white px-6 py-5 rounded-md w-full ">
//       <p className="text-xl font-bold mb-5">Popular Product</p>
//       <div className=" flex lg:flex-col xl:flex-row  items-center gap-x-4 mb-3">
//         <img className=" max-h-20 border rounded-md" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
//         <div className="w-full lg:mt-2 xl:mt-0">
//           <p className=" xl:text-lg 2xl:text-xl font-semibold lg:text-center xl:text-left">Sarisha Oil</p>
//           <div className="flex gap-x-4 lg:justify-center xl:justify-start">
//             <p className=" 2xl:text-lg font-semibold text-orange-600">1000 Tk</p>
//             <del>1200 Tk</del>
//           </div>
//         </div>
//       </div>
//       <hr />
//       <div className="  flex items-center gap-x-4 my-3">
//         <img className="max-w-[90px] border" src="https://i.ibb.co/CsNtTfM/Untitleddesign-86-removebg-preview.png" alt="" />
//         <div className="w-full">
//           <p className="xl:text-lg 2xl:text-xl font-semibold">Gawa Ghee / ঘি</p>
//           <div className="flex gap-x-4">
//             <p className="2xl:text-lg font-semibold text-orange-600">1000 Tk</p>
//             <del>1200 Tk</del>
//           </div>
//         </div>
//       </div>
//       <hr />
//       <div className="  flex items-center gap-x-4 my-3">
//         <img className="w-24 border rounded-md" src="https://www.harniva.com/assets/backend/admin/plugins/source/hakkimizda/kalitelibal.png" alt="" />
//         <div className="w-full">
//           <p className="xl:text-lg 2xl:text-xl font-semibold">Fuler Modhu / মধু</p>
//           <div className="flex gap-x-4">
//             <p className="2xl:text-lg font-semibold text-orange-600">1000 Tk</p>
//             <del>1200 Tk</del>
//           </div>
//         </div>
//       </div>
//       <hr />
//       <div className="  flex items-center gap-x-4 my-3">
//         <img className="w-24 border" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
//         <div className="w-full">
//           <p className="xl:text-lg 2xl:text-xl font-semibold">Product Name</p>
//           <div className="flex gap-x-4">
//             <p className="text-lg font-semibold text-orange-600">1000 Tk</p>
//             <del>1200 Tk</del>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Popular Post-blog */}
//     <div className="mt-10 bg-white px-6 py-5 rounded-md w-full ">
//       <p className="text-xl font-bold mb-5">Popular Post</p>
//       <div className=" flex lg:flex-col xl:flex-row items-center gap-x-4 mb-3">
//         <img className="w-24 border" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
//         <div className="w-full lg:mt-2 xl:mt-0 ">
//           <p className="2xl:font-bold font-semibold leading-5">Sarisha Oil Lorem ipsum dolor sit ijtgh amet.</p>
//           <p className="flex items-center gap-x-2 mt-2"><CiClock2 /> Jan 01, 2023</p>
//         </div>
//       </div>
//       <hr />
//       <div className="mt-3  flex items-center gap-x-4 mb-3">
//         <img className="w-24 border" src="https://media.e-valy.com/cms/products/images/f4b3265d-df5e-4835-add4-0cd2654235d3" alt="" />
//         <div className="w-full  ">
//           <p className="font-bold leading-5">Sarisha Oil Lorem ipsum dolor sit ijtgh amet.</p>
//           <p className="flex items-center gap-x-2 mt-2"><CiClock2 /> Jan 01, 2023</p>
//         </div>
//       </div>
//       <hr />
//       <div className="mt-3  flex items-center gap-x-4 mb-3">
//         <img className="w-24 border" src="https://greenmartbd.net/storage/upload/product/phT3W2MDVDODfNv1lZ62K8qedUEAIHbtD5ouqvM5.png" alt="" />
//         <div className="w-full  ">
//           <p className="font-bold leading-5">Sarisha Oil Lorem ipsum dolor sit ijtgh amet.</p>
//           <p className="flex items-center gap-x-2 mt-2"><CiClock2 /> Jan 01, 2023</p>
//         </div>
//       </div>



//     </div>


//   </div>
// </div>
// }

// {
//     <div className="w-[90%]  mx-auto">
//                 <p className="text-3xl text-center font-semibold">Related Blog</p>

//                 <section className=" pt-10 pb-20 ">
//                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//                         <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
//                             {/* div start */}
//                             <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl ">
//                                 <div className="flex items-center">
//                                     <img
//                                         src="https://pagedone.io/asset/uploads/1696244317.png"
//                                         alt="blogs tailwind section"
//                                         className="rounded-t-2xl w-full object-cover"
//                                     />
//                                 </div>
//                                 <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl bg-white group-hover:bg-gray-50">

//                                     <div className='flex items-center gap-x-3'>
//                                         <div className='w-12 h-12 rounded-full border border-orange-500'>

//                                             <img className='w-full h-full rounded-full object-cover object-center' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LOeZCLbzHYW0TO096SYeuuOskkZNdmFw2DGCrAYOxr70TjRL59hkcL9adREHNkEU0-4&usqp=CAU" alt="" />
//                                         </div>

//                                         <div>
//                                             <p>SM Food</p>
//                                             <p><span className="text-orange-600 font-medium mb-3 block">Jan 01, 2023</span></p>
//                                         </div>
//                                     </div>
//                                     <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
//                                         Clever ways to invest in product to organize your portfolio
//                                     </h4>
//                                     <p className="text-gray-500 leading-6 mb-">
//                                         Discover smart investment strategies to streamline and organize your portfolio..
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
//                                 <div className="flex items-center">
//                                     <img
//                                         src="https://pagedone.io/asset/uploads/1696244340.png"
//                                         alt="blogs tailwind section"
//                                         className="rounded-t-2xl w-full object-cover"
//                                     />
//                                 </div>
//                                 <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 ">

//                                     <div className='flex items-center gap-x-3'>
//                                         <div className='w-12 h-12 rounded-full border border-orange-500'>

//                                             <img className='w-full h-full rounded-full object-cover object-center' src="https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e07f452/_orig/pixomatic_1572877263963.png" alt="" />
//                                         </div>

//                                         <div>
//                                             <p>SM Food</p>
//                                             <p><span className="text-orange-600 font-medium mb-3 block">Jan 01, 2023</span></p>
//                                         </div>
//                                     </div>
//                                     <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
//                                         Clever ways to invest in product to organize your portfolio
//                                     </h4>
//                                     <p className="text-gray-500 leading-6 mb-">
//                                         Discover smart investment strategies to streamline and organize your portfolio..
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
//                                 <div className="flex items-center">
//                                     <img
//                                         src="https://pagedone.io/asset/uploads/1696244356.png"
//                                         alt="blogs tailwind section"
//                                         className="rounded-t-2xl w-full object-cover"
//                                     />
//                                 </div>
//                                 <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 ">

//                                     <div className='flex items-center gap-x-3'>
//                                         <div className='w-12 h-12 rounded-full border border-orange-500'>

//                                             <img className='w-full h-full rounded-full object-cover object-center' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LOeZCLbzHYW0TO096SYeuuOskkZNdmFw2DGCrAYOxr70TjRL59hkcL9adREHNkEU0-4&usqp=CAU" alt="" />
//                                         </div>

//                                         <div>
//                                             <p>SM Food</p>
//                                             <p><span className="text-orange-600 font-medium mb-3 block">Jan 01, 2023</span></p>
//                                         </div>
//                                     </div>
//                                     <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
//                                         Clever ways to invest in product to organize your portfolio
//                                     </h4>
//                                     <p className="text-gray-500 leading-6 mb- ">
//                                         Discover smart investment strategies to streamline and organize your portfolio..
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//             </div>
// }