import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CategoryProducts = () => {
    const { category } = useParams();
    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['products', category],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: { category },
            });
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="text-center py-12 text-xl font-semibold text-gray-600">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-xl font-semibold text-red-500">
                Failed to load products. Please try again later.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Category Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-12 capitalize text-center">
                {category} Products
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                                <p className="text-indigo-600 font-bold text-xl mt-2">${price}</p>

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
            <div>
                <Link></Link>
            </div>
        </div>
    );
};

export default CategoryProducts;
