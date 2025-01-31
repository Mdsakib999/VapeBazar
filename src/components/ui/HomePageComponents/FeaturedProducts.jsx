import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';


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
    const featuredProducts = productData.slice(0, 4)
    return (
        <section className="py-12 bg-backgroundColor">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-center text-white text-4xl font-extrabold mb-12">
                    Featured Products
                </h2>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden rounded-t-lg group">
                                {/* Default Image */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-64 object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                                />
                                {/* Hover Image */}
                                <img
                                    src={product.images[1]}
                                    alt={`${product.name} alternate`}
                                    className="w-full h-64 object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                />
                                <div className="absolute top-2 left-2 bg-primaryColor text-white text-xs font-bold px-2 py-1 rounded-md">
                                    Featured
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                                    {product.name}
                                </h3>
                                <p className="text-xl font-bold text-primaryColor mb-4">
                                    Dhs {product.price}
                                </p>
                                <Link to={`/product/${product._id}`} className="px-6 py-2 bg-primaryColor text-white rounded-full text-sm font-medium hover:bg-secondaryColor transition duration-300">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedProducts;
