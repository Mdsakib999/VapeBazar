import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Package, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const CategoryProducts = () => {
    const { category } = useParams();
    const location = useLocation();
    const currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;

    const { data: productData = {}, isLoading, error } = useQuery({
        queryKey: ["products", category, currentPage],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: { category: [category], page: currentPage },
            });
            return res.data;
        },
    });

    const { products = [], totalPages = 1 } = productData;

    // Loading Skeleton
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 ">
                <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12">
                    <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-full mx-auto mb-12" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                                <div className="h-56 bg-gray-200 animate-pulse" />
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded-full w-1/3" />
                                    <div className="h-5 bg-gray-200 animate-pulse rounded-full w-3/4" />
                                    <div className="h-4 bg-gray-200 animate-pulse rounded-full w-1/2" />
                                    <div className="h-10 bg-gray-200 animate-pulse rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center px-6">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
                    <p className="text-gray-500">Failed to load products. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 container mx-auto max-w-[1500px]">
            {/* Static background orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-24 left-6 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl" />
                <div className="absolute bottom-24 right-6 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-50 to-blue-50">
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-700 uppercase">
                            Browse Collection
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-cyan-800 to-purple-900">
                            Explore
                        </span>{" "}
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 capitalize">
                            {category}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                            />
                        </span>
                    </h1>

                    {products.length > 0 && (
                        <p className="mt-4 text-gray-500 text-sm sm:text-base">
                            Showing <span className="font-semibold text-gray-700">{products.length}</span> products
                            {totalPages > 1 && <> — Page <span className="font-semibold text-gray-700">{currentPage}</span> of <span className="font-semibold text-gray-700">{totalPages}</span></>}
                        </p>
                    )}
                </motion.div>

                {/* Product Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-200 flex flex-col h-full block"
                                >
                                    {/* Image */}
                                    <div className="relative overflow-hidden bg-gray-50">
                                        <img
                                            className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-400"
                                            src={product.images[0]}
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                        {/* Discount Badge */}
                                        {product.discount_price && product.discount_price !== 0 && (
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                                -{product.discount_price}%
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Category Tag */}
                                        <div className="mb-2">
                                            <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200/50 px-3 py-1 rounded-full">
                                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                            </span>
                                        </div>

                                        {/* Product Name */}
                                        <h3 className="text-base font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300 flex-1">
                                            {product.name}
                                        </h3>

                                        {/* Stars */}
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar key={index} size={13} className="text-yellow-400" />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1.5">5.0</span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-xl font-black text-gray-900">
                                                Dhs {Math.round(
                                                    product.discount_price && product.discount_price !== 0
                                                        ? product.price - (product.price * product.discount_price) / 100
                                                        : product.price
                                                )}
                                            </span>
                                            {product.discount_price && product.discount_price !== 0 && (
                                                <del className="text-sm text-gray-400 font-medium">
                                                    Dhs {product.price}
                                                </del>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-sm">
                                            View Details
                                        </button>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="p-6 rounded-full bg-gradient-to-br from-cyan-50 to-purple-50 mb-6">
                            <Package className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                        <p className="text-gray-400 max-w-sm">
                            We couldn't find any products in this category. Check back soon!
                        </p>
                    </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center items-center gap-1.5 sm:gap-2 mt-12 flex-wrap"
                    >
                        {/* Prev */}
                        <Link
                            to={`/products/${category}?page=${Math.max(currentPage - 1, 1)}`}
                            className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                currentPage === 1
                                    ? "bg-gray-100 text-gray-400 pointer-events-none"
                                    : "bg-white border border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md"
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Prev</span>
                        </Link>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1;
                            const isActive = currentPage === page;
                            // Show first, last, current, and neighbors; collapse others
                            const showPage =
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 1;

                            if (!showPage) {
                                // Show ellipsis only once per gap
                                if (page === 2 && currentPage > 3) return (
                                    <span key={`ellipsis-start`} className="px-2 text-gray-400 text-sm">…</span>
                                );
                                if (page === totalPages - 1 && currentPage < totalPages - 2) return (
                                    <span key={`ellipsis-end`} className="px-2 text-gray-400 text-sm">…</span>
                                );
                                return null;
                            }

                            return (
                                <Link
                                    key={page}
                                    to={`/products/${category}?page=${page}`}
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-200 ${
                                        isActive
                                            ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-110"
                                            : "bg-white border border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md"
                                    }`}
                                >
                                    {page}
                                </Link>
                            );
                        })}

                        {/* Next */}
                        <Link
                            to={`/products/${category}?page=${Math.min(currentPage + 1, totalPages)}`}
                            className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400 pointer-events-none"
                                    : "bg-white border border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md"
                            }`}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;