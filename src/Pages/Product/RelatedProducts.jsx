import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Package } from "lucide-react";

const RelatedProducts = ({ category, id }) => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const itemsPerPage = 4;

    const currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;

    useEffect(() => {
        if (category) {
            setSelectedCategory([category]);
        }
    }, [category]);

    const { data: productData = {}, isLoading, error } = useQuery({
        queryKey: ["related-products", selectedCategory, currentPage],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: {
                    category: selectedCategory,
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            return res.data;
        },
        enabled: selectedCategory.length > 0,
    });

    const { products = [], totalPages = 1 } = productData;
    const filteredProducts = products.filter((item) => item._id !== id);

    return (
        <div className="py-12">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-50 to-blue-50">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-xs font-semibold tracking-wider text-cyan-700 uppercase">
                        You May Also Like
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-cyan-800 to-purple-900">
                        Related{" "}
                    </span>
                    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 capitalize">
                        Products
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                        />
                    </span>
                </h2>
            </motion.div>

            {/* Loading Skeletons */}
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                            <div className="h-48 bg-gray-100 animate-pulse" />
                            <div className="p-4 space-y-2.5">
                                <div className="h-3 bg-gray-100 animate-pulse rounded-full w-1/3" />
                                <div className="h-4 bg-gray-100 animate-pulse rounded-full w-3/4" />
                                <div className="h-4 bg-gray-100 animate-pulse rounded-full w-1/2" />
                                <div className="h-9 bg-gray-100 animate-pulse rounded-xl mt-3" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-500 text-sm py-6">
                    Something went wrong: {error.message}
                </p>
            )}

            {/* Empty State */}
            {!isLoading && filteredProducts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center py-16 text-center"
                >
                    <div className="p-5 rounded-full bg-gradient-to-br from-cyan-50 to-purple-50 mb-4">
                        <Package className="w-9 h-9 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm">No related products found.</p>
                </motion.div>
            )}

            {/* Product Grid */}
            {!isLoading && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.07 }}
                        >
                            <Link
                                to={`/product/${product._id}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cyan-200 flex flex-col h-full block"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden bg-gray-50">
                                    <img
                                        src={product.images?.[0] || product.image}
                                        alt={product.name}
                                        className="h-48 w-full object-cover transform group-hover:scale-105 transition-transform duration-400"
                                        loading="lazy"
                                    />
                                    {product.discount_price && product.discount_price !== 0 && (
                                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
                                            -{product.discount_price}%
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Body */}
                                <div className="p-4 flex flex-col flex-1">
                                    {/* Category tag */}
                                    <div className="flex justify-between">
                                        <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200/50 px-2.5 py-0.5 rounded-full w-fit mb-2 capitalize">
                                        {product.category}
                                    </span>

                                    <div className="flex items-center gap-0.5 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} size={11} className="text-yellow-400" />
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">5.0</span>
                                    </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300 flex-1">
                                        {product.name}
                                    </h3>

                                    {/* Stars */}
                                    

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-lg font-black text-gray-900">
                                            Dhs {Math.round(
                                                product.discount_price && product.discount_price !== 0
                                                    ? product.price - (product.price * product.discount_price) / 100
                                                    : product.price
                                            )}
                                        </span>
                                        {product.discount_price && product.discount_price !== 0 && (
                                            <del className="text-xs text-gray-400">Dhs {product.price}</del>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-xs sm:text-sm">
                                        View Details
                                    </button>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center items-center gap-1.5 mt-10 flex-wrap"
                >
                    <Link
                        to={`?page=${Math.max(currentPage - 1, 1)}`}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            currentPage === 1
                                ? "bg-gray-100 text-gray-400 pointer-events-none"
                                : "bg-white border border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-sm"
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        const isActive = currentPage === page;
                        const show =
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1;

                        if (!show) {
                            if (page === 2 && currentPage > 3)
                                return <span key="el-s" className="text-gray-400 text-sm px-1">…</span>;
                            if (page === totalPages - 1 && currentPage < totalPages - 2)
                                return <span key="el-e" className="text-gray-400 text-sm px-1">…</span>;
                            return null;
                        }

                        return (
                            <Link
                                key={page}
                                to={`?page=${page}`}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20 scale-110"
                                        : "bg-white border border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600"
                                }`}
                            >
                                {page}
                            </Link>
                        );
                    })}

                    <Link
                        to={`?page=${Math.min(currentPage + 1, totalPages)}`}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 pointer-events-none"
                                : "bg-white border border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-sm"
                        }`}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default RelatedProducts;