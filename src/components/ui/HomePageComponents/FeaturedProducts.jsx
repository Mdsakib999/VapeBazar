import { useQuery } from '@tanstack/react-query';
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
    return (
        <section className="py-12 bg-backgroundColor">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-center text-white text-4xl font-extrabold mb-12">
                    Featured Products
                </h2>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts?.map((product) => (
                        <Link
                            to={`/product/${product._id}`}
                            key={product._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform transform hover:scale-105 duration-300"
                        >
                            {/* Heart Icon */}
                            <div className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer z-10">
                                <AiOutlineHeart size={24} />
                            </div>

                            {/* Product Image */}
                            <div className="relative w-full bg-gray-100 flex justify-center items-center overflow-hidden group">
                                {/* Primary Image */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="h-full w-full object-contain transition-transform duration-300 transform group-hover:translate-x-full"
                                />
                                {/* Hover Image */}
                                <img
                                    src={product.images[1]}
                                    alt={product.name}
                                    className="h-full w-full object-contain absolute top-0 left-0 transition-transform duration-300 transform translate-x-[-100%] group-hover:translate-x-0"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="p-4 flex justify-between items-center">
                                {/* Left Section (Text Details) */}
                                <div className="flex flex-col">
                                    {/* Product Rating */}
                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span
                                                key={index}
                                                className={`${index < product.rating ? "text-yellow-400" : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    {/* Product Category */}
                                    <p className="text-lg text-gray-500 mb-1">
                                        By{" "}
                                        <span className="text-red-500 font-semibold">
                                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                        </span>
                                    </p>


                                    {/* Product Name */}
                                    <h3 className="text-base text-gray-800 font-semibold mb-2 truncate max-w-[200px] sm:max-w-[180px]">
                                        {product.name}
                                    </h3>

                                    {/* Product Price */}
                                    <p className="text-lg text-red-500 font-bold">Dhs {product.price}</p>
                                </div>

                                {/* Right Section (Icons) */}
                                <div className="flex flex-col space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {/* Add to Cart */}
                                    <Link to={`/product/${product._id}`} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-black hover:bg-gray-300 transition duration-200">
                                        <AiOutlineShoppingCart size={20} />
                                    </Link>
                                    {/* Add to Wishlist */}
                                    <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-black hover:bg-gray-300 transition duration-200">
                                        <AiOutlineHeart size={20} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default FeaturedProducts;
