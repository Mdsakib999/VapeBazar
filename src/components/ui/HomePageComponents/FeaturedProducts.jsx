// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

// const FeaturedProducts = () => {
//     const { data: productData = [], isLoading, error } = useQuery({
//         queryKey: ['products'],
//         queryFn: async () => {
//             const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
//                 // params: { category: selectedCategory, searchItem: searchTerm },
//             });
//             return res.data;
//         },
//         // enabled: !!selectedCategory || !!searchTerm, 
//         // Fetch only when there's search or category selected
//     });
//     const featuredProducts = productData?.products?.slice(0, 4)
//     return (
//         <section className="py-12 bg-white b">
//             <div className="container mx-auto px-4">
//                 {/* Section Heading */}
//                 <h2 className="text-center text-black text-4xl font-extrabold mb-12">
//                     Featured Products
//                 </h2>
//                 {/* Product Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {featuredProducts?.map((product) => (
//                         <Link
//                             to={`/product/${product._id}`}
//                             key={product._id}
//                             className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform transform hover:scale-105 duration-300"
//                         >
//                             {/* Heart Icon */}
//                             <div className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer z-10">
//                                 <AiOutlineHeart size={24} />
//                             </div>

//                             {/* Product Image */}
//                             <div className="relative w-full bg-gray-100 flex justify-center items-center overflow-hidden group">
//                                 {/* Primary Image */}
//                                 <img
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                     className="h-full w-full object-contain transition-transform duration-300 transform group-hover:translate-x-full"
//                                 />
//                                 {/* Hover Image */}
//                                 <img
//                                     src={product.images[1]}
//                                     alt={product.name}
//                                     className="h-full w-full object-contain absolute top-0 left-0 transition-transform duration-300 transform translate-x-[-100%] group-hover:translate-x-0"
//                                 />
//                             </div>

//                             {/* Product Details */}
//                             <div className="p-4 flex justify-between items-center">
//                                 {/* Left Section (Text Details) */}
//                                 <div className="flex flex-col">
//                                     {/* Product Rating */}
//                                     <div className="flex mb-2">
//                                         {[...Array(5)].map((_, index) => (
//                                             <span
//                                                 key={index}
//                                                 className={`${index < product.rating ? "text-yellow-400" : "text-gray-300"
//                                                     }`}
//                                             >
//                                                 ★
//                                             </span>
//                                         ))}
//                                     </div>

//                                     {/* Product Category */}
//                                     <p className="text-lg text-gray-500 mb-1">
//                                         By{" "}
//                                         <span className="text-red-500 font-semibold">
//                                             {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                                         </span>
//                                     </p>


//                                     {/* Product Name */}
//                                     <h3 className="text-base text-gray-800 font-semibold mb-2 truncate max-w-[200px] sm:max-w-[180px]">
//                                         {product.name}
//                                     </h3>

//                                     {/* Product Price */}
//                                     <p className="text-lg text-red-500 font-bold">Dhs {product.price}</p>
//                                 </div>

//                                 {/* Right Section (Icons) */}
//                                 <div className="flex flex-col space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                     {/* Add to Cart */}
//                                     <Link to={`/product/${product._id}`} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-black hover:bg-gray-300 transition duration-200">
//                                         <AiOutlineShoppingCart size={20} />
//                                     </Link>
//                                     {/* Add to Wishlist */}
//                                     <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-black hover:bg-gray-300 transition duration-200">
//                                         <AiOutlineHeart size={20} />
//                                     </button>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </section>

//     );
// };

// export default FeaturedProducts;



import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const FeaturedProducts = () => {
    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`);
            return res.data;
        },
    });

    const featuredProducts = productData?.products?.slice(0, 4) || [
        {
            _id: "1",
            name: "Sample Product 1",
            images: ["https://via.placeholder.com/250"],
            rating: 4.5,
            discount_price: 50,
            regular_price: 100
        },
        {
            _id: "2",
            name: "Sample Product 2",
            images: ["https://via.placeholder.com/250"],
            rating: 4.0,
            discount_price: 75,
            regular_price: 150
        },
        {
            _id: "3",
            name: "Sample Product 3",
            images: ["https://via.placeholder.com/250"],
            rating: 5.0,
            discount_price: 90,
            regular_price: 120
        },
        {
            _id: "4",
            name: "Sample Product 4",
            images: ["https://via.placeholder.com/250"],
            rating: 3.5,
            discount_price: 40,
            regular_price: 80
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-black text-4xl font-extrabold mb-6">
                    Featured Products
                </h2>
                <p className='text-black text-center lg:w-[50%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum consequuntur, saepe quia sed hic iure fugit pariatur tempore, eius consequatur est ut harum ea optio sapiente? Quo, dolore quam.</p>
                <div className="w-4/5 mt-4 md:mt-0 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 px-1 md:px-4 py-11">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="group border border-gray-300 rounded-xl bg-white text-black  hover:shadow-lg overflow-hidden transition-shadow duration-300 "
                        >
                            <Link to={`/product/${product._id}`}>
                                <img
                                    className="max-h-[250px] w-full rounded-t-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    src={product.images[0]}
                                    alt={product.name}
                                />
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
                                                    index < Math.round(product.rating)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />
                                        ))}
                                        <p className="text-black">{product.rating}/5.0</p>
                                    </div>
                                    </div>
                                    <div className="flex gap-x-3 justify-between items-center mb-5">
                                        <p className="text-xl font-bold">${product.price}</p>
                                        
                                        <del className="text-xl font-semibold text-gray-400">
                                            500.00
                                        </del>
                                        <p className="text-red-500 font-semibold px-2 rounded-full bg-red-100">
                                            -
                                            {Math.round(
                                                ((500 - product.discount_price) /
                                                    product.regular_price) *
                                                100
                                            )}%
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <button className="border-gray-400 px-4 py-2 mb-4 rounded-lg font-semibold text-white transition-all duration-500 bg-gradient-to-r from-[#03b8e1] via-[#112949] to-[#00c4f5] bg-[length:200%_auto] shadow-lg hover:bg-right">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;