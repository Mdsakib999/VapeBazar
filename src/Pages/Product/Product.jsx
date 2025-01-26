import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTitle } from "../../components/SetTitle";

const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    setTitle('Products | vape smoke 24')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    // Fetch categories data for the category dropdown
    const { data: categoriesData = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/category/user`);
            return res.data;
        },
    });
    console.log(categoriesData);
    // Extract category options
    const categoryOptions = categoriesData ? categoriesData?.map(item => ({ option: item.category })) : []

    // Fetch product data with category and search term as query parameters
    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory, searchTerm],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: { category: selectedCategory, searchItem: searchTerm },
            });
            return res.data;
        },
        // enabled: !!selectedCategory || !!searchTerm, 
        // Fetch only when there's search or category selected
    });
    console.log(productData);

    // Handle loading and error states
    // if (isLoading) {
    //     return <div>Loading products...</div>;
    // }

    // if (error) {
    //     return <div>Error fetching products. Please try again later.</div>;
    // }

    return (
        <div className="mt-8 section-container">
            {/* Search and Category Filter */}
            <div className="flex flex-col md:flex-row items-center justify-end  mb-6 gap-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/4 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Category Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-1/4 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Categories</option>
                    {categoryOptions.map((category, index) => (
                        <option className="text-black" key={index} value={category.option}>
                            {category.option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    isLoading && (
                        <div>Loading</div>
                    )
                }
                {productData?.length > 0 ? (
                    productData?.map(({ _id, image, name, price }) => (
                        <div
                            key={_id}
                            className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                className="w-full h-48 object-cover"
                                src={image}
                                alt={name}
                            />

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                                <p className="text-indigo-600 font-bold text-xl mt-2">Dhs {price}</p>

                                <Link
                                    to={`/product/${_id}`}
                                    className="mt-4 inline-block text-center w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-8 text-gray-500">
                        No products found for your search criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
