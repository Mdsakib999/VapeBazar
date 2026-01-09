import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTitle } from "../../components/SetTitle";
import LoadingComponent from "../../components/LoadingComponent";
import { FiSliders, FiSearch, FiX } from 'react-icons/fi';
import { Range } from 'react-range';
import { AiFillTags } from "react-icons/ai";
import { FaStar, FaFilter } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

const Product = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([1, 10000]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const itemsPerPage = 10;
    const currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;

    const handleCategoryToggle = (category) => {
        setSelectedCategory((prevSelected) => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter((cat) => cat !== category);
            } else {
                return [...prevSelected, category];
            }
        });
    };

    const clearFilters = () => {
        setSelectedCategory([]);
        setSearchTerm("");
        setPriceRange([1, 10000]);
    };

    setTitle("Products | Vape Smoke 24");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Fetch categories for the dropdown
    const { data: categoriesData = [] } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/category/user`);
            return res.data;
        },
    });

    // Fetch products with query parameters
    const { data: productData = {}, isLoading, error } = useQuery({
        queryKey: ["products", selectedCategory, searchTerm, priceRange, currentPage],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: {
                    category: selectedCategory,
                    searchItem: searchTerm,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            return res.data;
        },
    });

    const { products = [], totalPages = 1 } = productData;

    if (error) return (
        <div className="mt-28 section-container flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <p className="text-gray-700 text-lg">Error fetching products. Please try again later.</p>
            </div>
        </div>
    );

    const FilterSection = ({ isMobile = false }) => (
        <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
            <div className={`${isMobile ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto' : 'bg-white rounded-2xl shadow-lg border border-gray-100'} p-6`}>
                {isMobile && (
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                )}

                {!isMobile && (
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaFilter className="text-indigo-600" />
                            Filters
                        </h2>
                        {(selectedCategory.length > 0 || searchTerm || priceRange[0] !== 1 || priceRange[1] !== 10000) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                )}

                {/* Search Field */}
                <div className="mb-6">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <FiSearch className="mr-2" />
                        Search Products
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Category Selection */}
                <div className="mb-6">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <AiFillTags className="mr-2" />
                        Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categoriesData.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryToggle(category.category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    selectedCategory.includes(category.category)
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                        <FiSliders className="mr-2" />
                        Price Range
                    </label>
                    <Range
                        step={1}
                        min={0}
                        max={10000}
                        values={priceRange}
                        onChange={(values) => setPriceRange(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    background: 'linear-gradient(to right, #e5e7eb, #e5e7eb)',
                                    borderRadius: '3px',
                                    margin: '0 8px',
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props, index }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '24px',
                                    width: '24px',
                                    backgroundColor: '#6366f1',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 6px rgba(99, 102, 241, 0.4)',
                                }}
                            />
                        )}
                    />
                    <div className="flex justify-between mt-4 px-2">
                        <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-xs text-gray-500">Min</span>
                            <p className="text-sm font-semibold text-gray-800">Dhs {priceRange[0]}</p>
                        </div>
                        <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-xs text-gray-500">Max</span>
                            <p className="text-sm font-semibold text-gray-800">Dhs {priceRange[1]}</p>
                        </div>
                    </div>
                </div>

                {isMobile && (
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
                    >
                        Apply Filters
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="mt-28 section-container min-h-screen pb-12">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                            <HiViewGrid className="text-indigo-600" />
                            Our Products
                        </h1>
                        <p className="text-gray-600">Discover premium vape products</p>
                    </div>
                    
                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="md:hidden flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md"
                    >
                        <FaFilter />
                        Filters
                        {(selectedCategory.length > 0 || searchTerm) && (
                            <span className="bg-white text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {selectedCategory.length + (searchTerm ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {/* Active Filters Display */}
                {(selectedCategory.length > 0 || searchTerm) && (
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                        {searchTerm && (
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                Search: {searchTerm}
                                <button onClick={() => setSearchTerm("")} className="hover:text-indigo-900">
                                    <FiX size={14} />
                                </button>
                            </span>
                        )}
                        {selectedCategory.map((cat, index) => (
                            <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                <button onClick={() => handleCategoryToggle(cat)} className="hover:text-purple-900">
                                    <FiX size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Desktop Filter Section */}
                <div className="hidden lg:block">
                    <FilterSection />
                </div>

                {/* Mobile Filter Modal */}
                {showMobileFilters && <FilterSection isMobile={true} />}

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {isLoading ? (
                        <LoadingComponent />
                    ) : (
                        <>
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-gray-600">
                                    Showing <span className="font-semibold text-gray-800">{products.length}</span> products
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <Link
                                            key={product._id}
                                            to={`/product/${product._id}`}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
                                        >
                                            <div className="relative overflow-hidden bg-gray-50">
                                                <img
                                                    className="h-64 w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                />
                                                {product.discount_price && product.discount_price !== 0 && (
                                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                                        -{product.discount_price}%
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5">
                                                <div className="mb-2">
                                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                                    {product.name}
                                                </h3>

                                                <div className="flex items-center gap-1 mb-4">
                                                    {[...Array(5)].map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            size={14}
                                                            className="text-yellow-400"
                                                        />
                                                    ))}
                                                    <span className="text-sm text-gray-600 ml-2">5.0</span>
                                                </div>

                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-bold text-gray-900">
                                                            Dhs {Math.round(
                                                                product.discount_price
                                                                    ? product.price - (product.price * product.discount_price) / 100
                                                                    : product.price
                                                            )}
                                                        </span>
                                                        {product.discount_price && product.discount_price !== 0 && (
                                                            <del className="text-sm text-gray-400">
                                                                Dhs {product.price}
                                                            </del>
                                                        )}
                                                    </div>
                                                </div>

                                                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                                                    View Details
                                                </button>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                                        <div className="text-gray-300 text-7xl mb-4">🔍</div>
                                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                                        <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                                        <button
                                            onClick={clearFilters}
                                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-12 gap-2">
                                    <Link
                                        to={`/product?page=${Math.max(currentPage - 1, 1)}`}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                            currentPage === 1
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
                                        }`}
                                    >
                                        Previous
                                    </Link>

                                    <div className="flex gap-2">
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const pageNumber = index + 1;
                                            // Show first page, last page, current page, and pages around current
                                            if (
                                                pageNumber === 1 ||
                                                pageNumber === totalPages ||
                                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                            ) {
                                                return (
                                                    <Link
                                                        key={index}
                                                        to={`/product?page=${pageNumber}`}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                            currentPage === pageNumber
                                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                                                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </Link>
                                                );
                                            } else if (
                                                pageNumber === currentPage - 2 ||
                                                pageNumber === currentPage + 2
                                            ) {
                                                return (
                                                    <span key={index} className="px-2 py-2 text-gray-400">
                                                        ...
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <Link
                                        to={`/product?page=${Math.min(currentPage + 1, totalPages)}`}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                            currentPage === totalPages
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200"
                                        }`}
                                    >
                                        Next
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;