import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTitle } from "../../components/SetTitle";
import LoadingComponent from "../../components/LoadingComponent";

const Product = () => {
    const location = useLocation()
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10; // Number of products per page
    const currentPage = Number(location.search.split("?")[1]) || 1
    // const [currentPage, setCurrentPage] = useState(); // Track current page

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

    // Fetch products with query parameters (pagination, category, search)
    const { data: productData = {}, isLoading, error } = useQuery({
        queryKey: ["products", selectedCategory, searchTerm, currentPage],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: {
                    category: selectedCategory,
                    searchItem: searchTerm,
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            return res.data;
        },
    });
    console.log(productData);
    const { products, totalPages } = productData



    // Handle loading and error states
    // if (isLoading) return <LoadingComponent />;
    if (error) return <div>Error fetching products. Please try again later.</div>;

    return (
        <div className="mt-8 section-container">
            {/* Search and Category Filter */}
            <div className="flex flex-col md:flex-row items-center justify-end mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/4 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-1/4 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Categories</option>
                    {categoriesData.map((category, index) => (
                        <option key={index} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>
            </div>
            {
                isLoading ? <LoadingComponent /> : <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {products.length > 0 ? (
                        products.map(({ _id, image, name, price, category }) => (
                            <div
                                key={_id}
                                className="group relative bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative">
                                    <img
                                        className="w-full h-64 object-cover rounded-t-xl transform group-hover:scale-105 transition-transform duration-300"
                                        src={image}
                                        alt={name}
                                    />
                                    <span className="absolute top-4 right-4 bg-gray-800 text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                                        {category}
                                    </span>
                                </div>

                                {/* Product Details */}
                                <div className="p-4">
                                    {/* Product Name */}
                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                                        {name}
                                    </h3>

                                    {/* Price */}
                                    <p className="text-indigo-500 font-bold text-2xl mt-2">
                                        Dhs {price}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex justify-between items-center">
                                        <Link
                                            to={`/product/${_id}`}
                                            className="text-indigo-600 border w-full text-center border-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200"
                                        >
                                            View Details
                                        </Link>
                                        {/* <button
                                            className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200"
                                        >
                                            Add to Cart
                                        </button> */}
                                    </div>
                                </div>
                            </div>


                        ))
                    ) : (
                        <div className="text-center mt-8 text-gray-500">
                            No products found for your search criteria.
                        </div>
                    )}
                </div>
            }
            {/* Product Grid */}


            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 text-black">
                {/* Previous Page Link */}
                <Link
                    to={`/product?${Math.max(currentPage - 1, 1)}`}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    Previous
                </Link>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <Link
                        key={index}
                        to={`/product?${index + 1}`}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {index + 1}
                    </Link>
                ))}

                {/* Next Page Link */}
                <Link
                    to={`/product?${Math.min(currentPage + 1, totalPages)}`}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    Next
                </Link>
            </div>

        </div>
    );
};

export default Product;
