import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTitle } from "../../components/SetTitle";
import LoadingComponent from "../../components/LoadingComponent";
import { FiSliders } from 'react-icons/fi';
import { Range } from 'react-range';
import { AiFillTags } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const Product = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([1, 10000]);
    const itemsPerPage = 10;
    const currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;
    // console.log(currentPage1);
    // const currentPage = 1;
    const handleCategoryToggle = (category) => {
        setSelectedCategory((prevSelected) => {
            if (prevSelected.includes(category)) {
                // If category is already selected, remove it
                return prevSelected.filter((cat) => cat !== category);
            } else {
                // If category is not selected, add it
                return [...prevSelected, category];
            }
        });
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

    if (error) return <div>Error fetching products. Please try again later.</div>;

    return (
        <div className="mt-28 section-container grid grid-cols-1 md:grid-cols-4 md:gap-6">
            {/* Filter Section */}
            <div className="mb-4">
                <div className="col-span-1 bg-gray-50 p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Filter Products</h2>

                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Category Dropdown */}
                    {/* <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Categories</option>
                        {categoriesData.map((category, index) => (
                            <option key={index} value={category.category}>
                                {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                            </option>
                        ))}
                    </select> */}
                    <div>
                        <label className="flex text-gray-700  items-center">
                            < AiFillTags className="mr-2" />
                            Categories
                        </label>
                        <div className="text-black space-x-4 space-y-4">
                            {categoriesData.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategoryToggle(category.category)}
                                    className={`px-4 py-2 rounded-md ${selectedCategory.includes(category.category)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                                </button>
                            ))}
                        </div>
                        {/* Display selected categories */}
                        {selectedCategory.length > 0 && (
                            <div className="mt-4 text-black">
                                <h3 className="text-gray-700">Selected Categories:</h3>
                                <ul className="list-disc list-inside">
                                    {selectedCategory.map((category, index) => (
                                        <li key={index}>{category.charAt(0).toUpperCase() + category.slice(1)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="mb-4">
                        <label className="flex text-gray-700 mb-2  items-center">
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
                                        background: 'linear-gradient(to right, #ccc, #ccc)',
                                        borderRadius: '3px',
                                        margin: '0 15px',
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '20px',
                                        width: '20px',
                                        backgroundColor: '#999',
                                        borderRadius: '50%',
                                    }}
                                />
                            )}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-sm text-gray-600">Min: ${priceRange[0]}</span>
                            <span className="text-sm text-gray-600">Max: ${priceRange[1]}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="col-span-3">
                <p className="text-xl text-center block md:hidden">Products</p>
                {isLoading ? (
                    <LoadingComponent />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.length > 0 ? (
                            products?.map(product => (
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
                                            !product.discount_price || product.discount_price != 0 && <p className="text-red-500 font-semibold absolute top-2 left-2 px-2 rounded-full bg-red-100">
                                                -{product.discount_price}%

                                            </p>
                                        }
                                        <div className="px-4 flex flex-col justify-baseline ">
                                            <p className="text-lg mt-4 text-gray-500 ">
                                                By{" "}
                                                <span className="text-red-500 font-semibold">
                                                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                                </span>
                                            </p>
                                            <p className="text-xl font-semibold  ">{product.name}</p>
                                            <div className='flex my-2 justify-between'>

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
                            ))
                        ) : (
                            <div className="text-center mt-8 text-gray-500">
                                No products found for your search criteria.
                            </div>
                        )}

                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center items-center mt-8 text-black">
                    <Link
                        to={`/product?${Math.max(currentPage - 1, 1)}`}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {`<`}
                    </Link>
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
                    <Link
                        to={`/product?${Math.min(currentPage + 1, totalPages)}`}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {`>`}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
