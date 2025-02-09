import { useQuery } from '@tanstack/react-query';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const FeaturedProducts = () => {
    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                // params: { category: selectedCategory, searchItem: searchTerm },
            });
            return res.data;
        },
        // enabled: !!selectedCategory || !!searchTerm, 
        // Fetch only when there's search or category selected
    });
    const featuredProducts = productData?.products?.slice(0, 4)
    if(isLoading){
        return <div>Loading....</div>
    }
    return (
        <section className="py-12 bg-white ">
             <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-black text-4xl font-extrabold mb-6">
                    Featured Products
                </h2>
                <p className='text-black text-center lg:w-[50%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum consequuntur, saepe quia sed hic iure fugit pariatur tempore, eius consequatur est ut harum ea optio sapiente? Quo, dolore quam.</p>
                <div className="w-4/5 mt-4 md:mt-0 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 px-1 md:px-4 py-11">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="group border border-gray-300 rounded-xl bg-white text-black  hover:shadow-lg overflow-hidden transition-shadow duration-300 "
                        >
                            <Link to={`/product/${product._id}`} className='relative'>
                                <img
                                    className="max-h-[250px] w-full rounded-t-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    src={product.images[0]}
                                    alt={product.name}
                                />
                              {
                                !product.discount_price || product.discount_price != 0 &&   <p className="text-red-500 font-semibold absolute top-2 left-2 px-2 rounded-full bg-red-100">
                                -{product.discount_price}%
                                
                            </p> 
                              }
                                <div className="px-4 flex flex-col justify-baseline ">
                                    <p className="text-xl font-semibold mt-4 ">{product.name}</p>
                                    <div className='flex my-2 justify-between'>
                                    <p className="text-lg text-gray-500 ">
                                         By{" "}
                                         <span className="text-red-500 font-semibold">
                                             {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                         </span>
                                     </p>
                                    <div className="flex items-center gap-x-2 text-yellow-400 ">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className={
                                                    index < Math.round(5)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />
                                        ))}
                                        <p className="text-black">{5}/5.0</p>
                                    </div>
                                    </div>
                                    <div className="flex gap-x-3 justify-between items-center mb-5">
                                        <p className="text-xl font-bold">
                                            Dhs {Math.round(
                                               product.discount_price
                                               ? product.price - (product.price * product.discount_price) / 100
                                               : product.price
                                               
                                            )}
                                            </p>
                                        
                                        {
                                            !product.discount_price || product.discount_price != 0 && <del className="text-xl font-semibold text-gray-400">
                                            {product.price}
                                            </del> 
                                        }
                                        
                                    </div>
                                    <div className="flex justify-center">
                                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all mb-2">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </section>

    );
};

export default FeaturedProducts;



// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// const FeaturedProducts = () => {
//     const { data: productData = [], isLoading, error } = useQuery({
//         queryKey: ['products'],
//         queryFn: async () => {
//             const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`);
//             return res.data;
//         },
//     });

//     const featuredProducts = productData?.products?.slice(0, 4) || [
//         {
//             _id: "1",
//             name: "Sample Product 1",
//             images: ["https://via.placeholder.com/250"],
//             rating: 4.5,
//             discount_price: 50,
//             regular_price: 100
//         },
//         {
//             _id: "2",
//             name: "Sample Product 2",
//             images: ["https://via.placeholder.com/250"],
//             rating: 4.0,
//             discount_price: 75,
//             regular_price: 150
//         },
//         {
//             _id: "3",
//             name: "Sample Product 3",
//             images: ["https://via.placeholder.com/250"],
//             rating: 5.0,
//             discount_price: 90,
//             regular_price: 120
//         },
//         {
//             _id: "4",
//             name: "Sample Product 4",
//             images: ["https://via.placeholder.com/250"],
//             rating: 3.5,
//             discount_price: 40,
//             regular_price: 80
//         }
//     ];

//     return (
//         <section className="py-12 bg-white">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-center text-black text-4xl font-extrabold mb-6">
//                     Featured Products
//                 </h2>
//                 <p className='text-black text-center lg:w-[50%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum consequuntur, saepe quia sed hic iure fugit pariatur tempore, eius consequatur est ut harum ea optio sapiente? Quo, dolore quam.</p>
//                 <div className="w-4/5 mt-4 md:mt-0 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 px-1 md:px-4 py-11">
//                     {featuredProducts.map((product) => (
//                         <div
//                             key={product._id}
//                             className="group border border-gray-300 rounded-xl bg-white text-black  hover:shadow-lg overflow-hidden transition-shadow duration-300 "
//                         >
//                             <Link to={`/product/${product._id}`}>
//                                 <img
//                                     className="max-h-[250px] w-full rounded-t-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                 />
//                                 <div className="px-4 flex flex-col justify-baseline ">
//                                     <p className="text-xl font-semibold mt-4 ">{product.name}</p>
//                                     <div className='flex my-2 justify-between'>
//                                     <p className="text-lg text-gray-500 ">
//                                          By{" "}
//                                          <span className="text-red-500 font-semibold">
//                                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                                          </span>
//                                      </p>
//                                     <div className="flex items-center gap-x-2 text-yellow-400 ">
//                                         {[...Array(5)].map((_, index) => (
//                                             <FaStar
//                                                 key={index}
//                                                 className={
//                                                     index < Math.round(product.rating)
//                                                         ? "text-yellow-400"
//                                                         : "text-gray-300"
//                                                 }
//                                             />
//                                         ))}
//                                         <p className="text-black">{product.rating}/5.0</p>
//                                     </div>
//                                     </div>
//                                     <div className="flex gap-x-3 justify-between items-center mb-5">
//                                         <p className="text-xl font-bold">${product.price}</p>
                                        
//                                         <del className="text-xl font-semibold text-gray-400">
//                                             500.00
//                                         </del>
//                                         <p className="text-red-500 font-semibold px-2 rounded-full bg-red-100">
//                                             -
//                                             {Math.round(
//                                                 ((500 - product.discount_price) /
//                                                     product.regular_price) *
//                                                 100
//                                             )}%
//                                         </p>
//                                     </div>
//                                     <div className="flex justify-center">
//                                         <button className="border-gray-400 px-4 py-2 mb-4 rounded-lg font-semibold text-white transition-all duration-500 bg-gradient-to-r from-[#03b8e1] via-[#112949] to-[#00c4f5] bg-[length:200%_auto] shadow-lg hover:bg-right">
//                                             Add to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FeaturedProducts;