import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
    const { data: categoriesData = [], isLoading, error } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/category/user`);
            return res.data;
        },
    });
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-12 text-xl font-semibold text-gray-600">
                Loading categories...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-xl font-semibold text-red-500">
                Failed to load categories. Please try again later.
            </div>
        );
    }

    return (
        <section className="py-12 mt-10 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                    Our Categories
                </h2>

                <div className="space-y-8">
                    {categoriesData.map((category) => (
                        <div
                            key={category._id}
                            className="flex flex-col lg:flex-row items-center bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            {/* Image Section */}
                            <div className="w-full lg:w-1/3">
                                <img
                                    src={category.image}
                                    alt={category.category}
                                    className="w-full h-64 object-cover lg:rounded-l-xl"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col justify-between lg:w-2/3">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 capitalize mb-4">
                                        {category.category}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {category.description}
                                    </p>
                                </div>
                                <Link to={`/products/${category.category}`} className="self-start bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-500 transition duration-300">
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
