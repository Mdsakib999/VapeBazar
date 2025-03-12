import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const RelatedProducts = ({ category, id }) => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([1, 10000]);
    const itemsPerPage = 4;

    const currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;


    useEffect(() => {
        if (category) {
            setSelectedCategory((prev) => [...prev, category]);
        }
    }, [category]);


    const { data: productData = {}, isLoading, error } = useQuery({
        queryKey: ["products", selectedCategory, searchTerm, priceRange, currentPage],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: {
                    category: selectedCategory,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            return res.data;
        },
        enabled: !!selectedCategory, // Ensures query runs only when category is available
    });

    const { products = [], totalPages = 1 } = productData;
    const productsd = products.filter(item => item._id !== id)

    return (
        <div className="py-10">
            <h2 className="text-2xl font-bold mb-6 text-white">Related Products</h2>

            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error.message}</p>}

            {!isLoading && products.length === 0 && (
                <p className="text-center text-gray-500">No related products found.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {productsd.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-transform transform hover:-translate-y-2"
                    >
                        <Link to={`/product/${product._id}`}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-md"
                            />
                        </Link>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    {[...Array(totalPages)].map((_, index) => (
                        <Link
                            key={index}
                            to={`?page=${index + 1}`}
                            className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700"
                                } hover:bg-indigo-500 hover:text-white transition`}
                        >
                            {index + 1}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RelatedProducts;
