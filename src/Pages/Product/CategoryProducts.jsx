import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const CategoryProducts = () => {
    const { category } = useParams();
    const itemsPerPage = 10;
    const currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;
    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['products', category],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: { category: [category] },
            });
            return res.data;
        },
    });
    console.log(productData);
    const { totalPages = 1 } = productData

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
        <div className="container mx-auto px-6 mt-20  py-12">
            {/* Category Name */}
            <h1 className="text-3xl font-bold  mb-12 capitalize text-center">
                {category} Products
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {productData?.products?.length > 0 ? (
                    productData?.products.map((product) => (
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
            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 text-black">
                <Link
                    to={`/products/${category}?${Math.max(currentPage - 1, 1)}`}
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
                        to={`/products/${category}?${index + 1}`}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {index + 1}
                    </Link>
                ))}
                <Link
                    to={`/products/${category}?${Math.min(currentPage + 1, totalPages)}`}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {`>`}
                </Link>
            </div>
        </div>
    );
};

export default CategoryProducts;
